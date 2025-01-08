#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');

const deletedJobsFile = path.join(__dirname, 'deleted-premier-jobs.json');
const notifiedJobsFile = path.join(__dirname, 'deleted-jobs-notifications.json');
const remainingJobsFile = path.join(__dirname, 'remaining-jobs.json');

function getRemainingJobs() {
  try {
    // Read both files
    if (!fs.existsSync(deletedJobsFile)) {
      console.error('No deleted jobs file found:', deletedJobsFile);
      process.exit(1);
    }
    if (!fs.existsSync(notifiedJobsFile)) {
      console.error('No notified jobs file found:', notifiedJobsFile);
      process.exit(1);
    }

    const deletedJobs = JSON.parse(fs.readFileSync(deletedJobsFile, 'utf8'));
    const notifiedJobs = JSON.parse(fs.readFileSync(notifiedJobsFile, 'utf8'));

    // Get set of notified URLs
    const notifiedUrls = new Set(notifiedJobs.map(job => job.url));

    // Filter out jobs that have been notified
    const remainingJobs = deletedJobs.filter(job => !notifiedUrls.has(job.url));

    // Save remaining jobs
    fs.writeFileSync(remainingJobsFile, JSON.stringify(remainingJobs, null, 2));

    // Print summary
    console.log('\n========== Summary ==========');
    console.log(`Total deleted jobs: ${deletedJobs.length}`);
    console.log(`Jobs already notified: ${notifiedUrls.size}`);
    console.log(`Remaining jobs: ${remainingJobs.length}`);
    console.log(`Saved remaining jobs to: ${remainingJobsFile}`);
    if (remainingJobs.length > 0) {
      console.log('\nFirst 5 remaining jobs:');
      remainingJobs.slice(0, 5).forEach(job => console.log(`- ${job.url}`));
    }
    console.log('============================');

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

getRemainingJobs(); 