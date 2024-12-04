const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const { google } = require('googleapis');

// Verify directory structure first
const dirs = {
  config: path.resolve(__dirname, 'config'),
  logs: path.resolve(__dirname, 'logs'),
};

// Check if directories exist
Object.entries(dirs).forEach(([name, dir]) => {
  if (!fs.existsSync(dir)) {
    console.error(`Required directory missing: ${name} (${dir})`);
    process.exit(1);
  }
});

// Load environment variables
require('dotenv').config({ 
  path: path.resolve(dirs.config, '.env.local')
});

// Verify required files exist
const requiredFiles = {
  credentials: path.resolve(dirs.config, 'credentials.json'),
  logFile: path.resolve(dirs.logs, 'indexing.log'),
  envFile: path.resolve(dirs.config, '.env.local')
};

Object.entries(requiredFiles).forEach(([name, file]) => {
  if (!fs.existsSync(file)) {
    console.error(`Required file missing: ${name} (${file})`);
    process.exit(1);
  }
});

// Add environment variable check
if (!process.env.JOBS_DIRECTORY || !process.env.LOG_FILE) {
  console.error('Required environment variables are missing');
  console.log('JOBS_DIRECTORY:', process.env.JOBS_DIRECTORY);
  console.log('LOG_FILE:', process.env.LOG_FILE);
  process.exit(1);
}

// Log function with absolute path
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  const logPath = path.resolve(dirs.logs, 'indexing.log');
  fs.appendFileSync(logPath, logMessage);
  console.log(message);
};

console.log('Script starting...');
console.log('Current directory:', __dirname);
console.log('Looking for jobs in:', process.env.JOBS_DIRECTORY);

async function getRecentJobs() {
  const jobsDir = path.resolve(__dirname, process.env.JOBS_DIRECTORY);
  const files = fs.readdirSync(jobsDir);
  const today = new Date();
  const thirtyDaysAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        slug: file.replace('.md', ''),
        datePosted: new Date(data.datePosted),
        url: `${process.env.SITE_URL}/jobs/${file.replace('.md', '')}`
      };
    })
    .filter(job => job.datePosted > thirtyDaysAgo);
}

async function indexJobs() {
  try {
    // Auth setup with absolute path
    const credentialsPath = path.resolve(__dirname, 'config/credentials.json');
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });
    const jobs = await getRecentJobs();

    for (const job of jobs) {
      try {
        const result = await indexing.urlNotifications.publish({
          requestBody: {
            url: job.url,
            type: 'URL_UPDATED'
          }
        });
        log(`Indexed: ${job.url} - Status: ${result.status}`);
      } catch (error) {
        log(`Error indexing ${job.url}: ${error.message}`);
      }
    }
  } catch (error) {
    log(`Fatal error: ${error.message}`);
  }
}

// Validate paths
const validatePaths = () => {
  // Check if logs directory is writable
  try {
    fs.accessSync(dirs.logs, fs.constants.W_OK);
  } catch (error) {
    console.error(`Logs directory not writable: ${dirs.logs}`);
    process.exit(1);
  }

  // Check if jobs directory exists and is readable
  const jobsDir = path.resolve(__dirname, process.env.JOBS_DIRECTORY);
  try {
    fs.accessSync(jobsDir, fs.constants.R_OK);
  } catch (error) {
    console.error(`Jobs directory not readable: ${jobsDir}`);
    process.exit(1);
  }
};

validatePaths();

// Run the indexing
indexJobs();