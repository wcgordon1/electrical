#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

// File paths
const jobsDir = path.join(__dirname, '..', 'src', 'content', 'jobs');
const llmsFile = path.join(__dirname, '..', 'public', 'llms-full.txt');

// Read all job files and extract info
function getJobListings() {
  return fs.readdirSync(jobsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        title: data.position,
        location: data.location,
        filename: file.replace('.md', ''),
        datePosted: new Date(data.datePosted)
      };
    })
    // Sort by date, newest first
    .sort((a, b) => b.datePosted - a.datePosted);
}

// Generate markdown links for jobs
function generateJobLinks(jobs) {
  return jobs.map(job => 
    `- [${job.title} in ${job.location}](https://www.bestelectricianjobs.com/jobs/${job.filename})`
  ).join('\n');
}

// Update llms-full.txt
function updateLlmsFile() {
  // Read existing content
  let content = fs.readFileSync(llmsFile, 'utf8');
  
  // Split at the job listings section
  const parts = content.split('## Recent Job Listings');
  if (parts.length !== 2) {
    console.error('Could not find "## Recent Job Listings" section in llms-full.txt');
    process.exit(1);
  }

  // Get job listings
  const jobs = getJobListings();
  const jobLinks = generateJobLinks(jobs);

  // Create new content
  const newContent = parts[0] + 
    '## Recent Job Listings\n\n' +
    jobLinks + '\n';

  // Write updated content
  fs.writeFileSync(llmsFile, newContent);
  console.log(`Updated ${jobs.length} job listings in llms-full.txt`);
}

// Run the update
updateLlmsFile(); 