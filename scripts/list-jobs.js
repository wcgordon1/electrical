#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(__dirname, '..', 'src', 'content', 'jobs');
const outputFile = path.join(__dirname, 'job-listings.txt');

// Read and log all job titles and locations
function listJobs() {
  const jobs = fs.readdirSync(jobsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        title: data.position,
        location: data.location
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  // Create output content
  let output = 'All Job Titles and Locations:\n\n';
  for (const job of jobs) {
    output += `${job.title} in ${job.location}\n`;
  }
  output += `\nTotal Jobs: ${jobs.length}\n`;

  // Write to file
  fs.writeFileSync(outputFile, output);
  console.log(`Job listings saved to: ${outputFile}`);
  console.log(`Total jobs found: ${jobs.length}`);
}

listJobs(); 