#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const { google } = require('googleapis');

// Load environment variables
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

// Constants
const inputFile = path.join(__dirname, 'recently-updated-jobs.json');
const BATCH_SIZE = 10; // Process in smaller batches
const DELAY_BETWEEN_BATCHES = 5000; // 5 seconds between batches
const LOG_FILE = path.join(__dirname, 'indexing-log.json');

// Track indexing status
let indexingLog = {};
try {
  indexingLog = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
} catch {
  indexingLog = {};
}

async function notifyGoogle(urls, auth) {
  const indexing = google.indexing({ version: 'v3', auth });
  const results = [];

  for (const url of urls) {
    try {
      const result = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });

      // Update log
      const urlKey = url.split('/').pop();
      indexingLog[urlKey] = {
        lastIndexed: new Date().toISOString(),
        status: result.status,
        notificationType: 'URL_UPDATED'
      };

      results.push({
        url: url,
        status: result.status,
        timestamp: new Date().toISOString()
      });

      console.log(`Notified Google about: ${url} - Status: ${result.status}`);
    } catch (error) {
      console.error(`Error notifying Google about ${url}:`, error.message);
      results.push({
        url: url,
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

async function notifyUpdatedJobs() {
  try {
    // Setup auth
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'config/credentials.json'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    // Read the list of updated files
    const updatedFiles = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    // Convert filenames to full URLs
    const urls = updatedFiles.map(file => 
      `${process.env.SITE_URL}/jobs/${file.filename.replace('.md', '')}`
    );

    console.log(`Found ${urls.length} URLs to process`);

    // Process in batches
    const batches = [];
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      batches.push(urls.slice(i, i + BATCH_SIZE));
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
notifyUpdatedJobs(); 