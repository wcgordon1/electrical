const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const { google } = require('googleapis');

// Load environment variables
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

const args = process.argv.slice(2);
const usage = `
Usage: 
  npm run index-recent -- -days=7     (index last 7 days)
  npm run index-recent -- -since=2024-04-20  (index since date)
  npm run index-recent -- -limit=100  (index most recent 100)
`;

// Parse arguments
let filter = {
    days: null,
    since: null,
    limit: null
};

args.forEach(arg => {
    if (arg.startsWith('-days=')) {
        filter.days = parseInt(arg.split('=')[1]);
    }
    if (arg.startsWith('-since=')) {
        filter.since = new Date(arg.split('=')[1]);
    }
    if (arg.startsWith('-limit=')) {
        filter.limit = parseInt(arg.split('=')[1]);
    }
});

// Filter by days
function filterByDays(jobs, days) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return jobs.filter(job => job.datePosted > cutoff);
}

// Filter by specific date
function filterBySince(jobs, since) {
    return jobs.filter(job => job.datePosted > since);
}

// Filter by limit (most recent N)
function filterByLimit(jobs, limit) {
    return jobs
        .sort((a, b) => b.datePosted - a.datePosted)
        .slice(0, limit);
} 

// Add imports and setup from index-jobs.js
// Then modify getRecentJobs to use our filters:

async function getRecentJobs() {
  const jobsDir = path.resolve(__dirname, process.env.JOBS_DIRECTORY);
  const files = fs.readdirSync(jobsDir);
  let jobs = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        slug: file.replace('.md', ''),
        datePosted: new Date(data.datePosted),
        url: `${process.env.SITE_URL}/jobs/${file.replace('.md', '')}`
      };
    });

  // Apply filters based on arguments
  if (filter.days) {
    jobs = filterByDays(jobs, filter.days);
  }
  if (filter.since) {
    jobs = filterBySince(jobs, filter.since);
  }
  if (filter.limit) {
    jobs = filterByLimit(jobs, filter.limit);
  }

  return jobs;
} 

async function indexJobs() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, 'config/credentials.json'),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });
    const jobs = await getRecentJobs();

    console.log(`Found ${jobs.length} jobs to index...`);

    for (const job of jobs) {
      try {
        const result = await indexing.urlNotifications.publish({
          requestBody: {
            url: job.url,
            type: 'URL_UPDATED'
          }
        });
        console.log(`Indexed: ${job.url} - Status: ${result.status}`);
      } catch (error) {
        console.error(`Error indexing ${job.url}: ${error.message}`);
      }
    }
  } catch (error) {
    console.error(`Fatal error: ${error.message}`);
  }
}

// Run the indexing
indexJobs();