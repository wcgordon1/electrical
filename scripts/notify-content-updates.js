#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const { google } = require('googleapis');
const matter = require('gray-matter');
const { argv } = require('process');

// Load environment variables
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

// Constants
const BATCH_SIZE = 50; // Number of URLs to process in each batch
const DELAY_BETWEEN_BATCHES = 5000; // 5 seconds between batches
const LOG_FILE = path.join(__dirname, 'indexing-log.json');

// Parse command-line arguments for date range
const fromDateArg = argv.find(arg => arg.startsWith('--from='));
const toDateArg = argv.find(arg => arg.startsWith('--to='));
const fromDate = fromDateArg ? new Date(fromDateArg.split('=')[1]) : null;
const toDate = toDateArg ? new Date(toDateArg.split('=')[1]) : null;

// Track indexing status
let indexingLog = {};
try {
  indexingLog = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
} catch {
  indexingLog = {};
}

async function getJobUrls() {
  const jobsDir = path.resolve(__dirname, '..', 'src', 'content', 'jobs');
  const files = fs.readdirSync(jobsDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        url: `${process.env.SITE_URL}/jobs/${file.replace('.md', '')}`,
        datePosted: new Date(data.datePosted),
        lastIndexed: indexingLog[file]?.lastIndexed || null
      };
    })
    .filter(job => {
      if (fromDate && job.datePosted < fromDate) return false;
      if (toDate && job.datePosted > toDate) return false;
      return true;
    })
    .sort((a, b) => b.datePosted - a.datePosted);
}

async function notifyGoogle(urls, auth) {
  const indexing = google.indexing({ version: 'v3', auth });
  const results = [];

  for (const url of urls) {
    try {
      const result = await indexing.urlNotifications.publish({
        requestBody: {
          url: url.url,
          type: 'URL_UPDATED'
        }
      });

      // Update log
      const urlKey = url.url.split('/').pop();
      indexingLog[urlKey] = {
        lastIndexed: new Date().toISOString(),
        status: result.status,
        notificationType: 'URL_UPDATED'
      };

      results.push({
        url: url.url,
        status: result.status,
        timestamp: new Date().toISOString()
      });

      console.log(`Notified Google about: ${url.url} - Status: ${result.status}`);
    } catch (error) {
      console.error(`Error notifying Google about ${url.url}:`, error.message);
      results.push({
        url: url.url,
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }

    // Small delay between individual requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  return results;
}

async function processBatch(urls, auth) {
  console.log(`Processing batch of ${urls.length} URLs...`);
  const results = await notifyGoogle(urls, auth);
  
  // Save log after each batch
  fs.writeFileSync(LOG_FILE, JSON.stringify(indexingLog, null, 2));
  
  return results;
}

async function notifyContentUpdates() {
  try {
    // Setup auth
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'config/credentials.json'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    // Get all job URLs
    const allUrls = await getJobUrls();
    console.log(`Found ${allUrls.length} total URLs to process`);

    // Process in batches
    const batches = [];
    for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
      const batch = allUrls.slice(i, i + BATCH_SIZE);
      batches.push(batch);
    }

    let allResults = [];
    for (let i = 0; i < batches.length; i++) {
      console.log(`Processing batch ${i + 1} of ${batches.length}`);
      const results = await processBatch(batches[i], auth);
      allResults = allResults.concat(results);

      // Delay between batches
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
      }
    }

    // Final summary
    const successful = allResults.filter(r => r.status === 200).length;
    const failed = allResults.filter(r => r.status === 'error').length;
    
    console.log('\nIndexing Summary:');
    console.log(`Total URLs processed: ${allResults.length}`);
    console.log(`Successfully notified: ${successful}`);
    console.log(`Failed notifications: ${failed}`);

    // Save final results
    const summaryFile = path.join(__dirname, 'indexing-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      results: allResults,
      summary: {
        total: allResults.length,
        successful,
        failed
      }
    }, null, 2));

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
notifyContentUpdates(); 