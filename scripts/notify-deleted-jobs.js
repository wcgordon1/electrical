#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const { google } = require('googleapis');

// Load environment variables
require('dotenv').config({ 
  path: path.join(__dirname, 'config', '.env.local')
});

const inputFile = path.join(__dirname, 'deleted-premier-jobs.json');
const logFile = path.join(__dirname, 'deleted-jobs-notifications.json');

// Batch size and delay between batches (ms)
const BATCH_SIZE = 100;
const BATCH_DELAY = 1000;
const DAILY_LIMIT = 200;

async function getAuthClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'config', 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/indexing']
    });
    return await auth.getClient();
  } catch (error) {
    console.error('Error getting auth client:', error);
    throw error;
  }
}

async function notifyGoogle(url, authClient) {
  try {
    const indexing = google.indexing({ version: 'v3', auth: authClient });
    const result = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_DELETED'
      }
    });
    return {
      url,
      status: 'success',
      notifiedAt: new Date().toISOString(),
      response: result.data
    };
  } catch (error) {
    return {
      url,
      status: 'error',
      notifiedAt: new Date().toISOString(),
      error: error.message
    };
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processBatch(urls, authClient, results) {
  const promises = urls.map(url => notifyGoogle(url, authClient));
  const batchResults = await Promise.all(promises);
  results.push(...batchResults);
  
  // Log progress
  const successCount = results.filter(r => r.status === 'success').length;
  console.log(`Progress: ${results.length} processed, ${successCount} successful`);
  
  // Update log file
  fs.writeFileSync(logFile, JSON.stringify(results, null, 2));
}

async function notifyDeletedJobs() {
  try {
    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      console.error('No deleted jobs file found:', inputFile);
      process.exit(1);
    }

    // Read deleted jobs
    const deletedJobs = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    if (!deletedJobs.length) {
      console.log('No jobs to process');
      return;
    }

    console.log(`Found ${deletedJobs.length} deleted jobs to process...\n`);

    // Get auth client
    const authClient = await getAuthClient();
    
    // Process in batches
    const results = [];
    let processedToday = 0;
    let remainingJobs = [];

    for (let i = 0; i < deletedJobs.length; i += BATCH_SIZE) {
      const batch = deletedJobs.slice(i, i + BATCH_SIZE);
      const urls = batch.map(job => job.url);
      
      // Check if we'll exceed daily limit
      if (processedToday + urls.length > DAILY_LIMIT) {
        // Calculate how many URLs we can still process today
        const remainingToday = DAILY_LIMIT - processedToday;
        if (remainingToday > 0) {
          // Process remaining URLs for today
          await processBatch(urls.slice(0, remainingToday), authClient, results);
          processedToday += remainingToday;
        }
        
        // Store remaining jobs for tomorrow
        remainingJobs = deletedJobs.slice(i + remainingToday);
        console.log('\n⚠️ Daily limit reached!');
        console.log(`Remaining jobs for tomorrow: ${remainingJobs.length}`);
        console.log('First 5 remaining URLs:');
        remainingJobs.slice(0, 5).forEach(job => console.log(`- ${job.url}`));
        break;
      }
      
      await processBatch(urls, authClient, results);
      processedToday += urls.length;
      
      if (i + BATCH_SIZE < deletedJobs.length) {
        console.log(`Waiting ${BATCH_DELAY}ms before next batch...`);
        await sleep(BATCH_DELAY);
      }
    }

    // Final summary
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;
    
    console.log('\n========== Summary ==========');
    console.log(`Total jobs processed today: ${processedToday}`);
    console.log(`Successful notifications: ${successCount}`);
    console.log(`Failed notifications: ${errorCount}`);
    console.log(`Results saved to: ${logFile}`);
    if (remainingJobs.length > 0) {
      console.log(`\nRemaining jobs for tomorrow: ${remainingJobs.length}`);
      console.log('To continue tomorrow, remove these URLs from deleted-premier-jobs.json:');
      results.forEach(result => console.log(`- ${result.url}`));
    }
    console.log('============================');

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

notifyDeletedJobs(); 