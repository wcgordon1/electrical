#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

// Constants
const jobsDir = path.resolve(__dirname, '../src/content/jobs');
const outputFile = path.join(__dirname, 'recently-updated-jobs.json');
const JOBS_TO_UPDATE = 100;

// Get random time on current date before current time
function getRandomDateInRange() {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0); // Start of today

  // Get random time between start of today and now
  const randomTime = today.getTime() + Math.random() * (now.getTime() - today.getTime());
  return new Date(randomTime);
}

// Get random number of days between 30-45 for validThrough
function getRandomValidDays() {
  return Math.floor(Math.random() * (45 - 30 + 1) + 30);
}

// Main function to update jobs
async function updateOldestJobs() {
  // Get all job files and their dates
  const jobFiles = fs.readdirSync(jobsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        filename: file,
        datePosted: new Date(data.datePosted)
      };
    })
    // Sort by oldest first
    .sort((a, b) => a.datePosted - b.datePosted)
    // Take only the oldest 100
    .slice(0, JOBS_TO_UPDATE);

  console.log(`Found ${jobFiles.length} jobs to update`);
  const updatedFiles = [];

  // Update each job
  for (const jobFile of jobFiles) {
    const filePath = path.join(jobsDir, jobFile.filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const doc = matter(content);
    
    // Generate new dates
    const datePosted = getRandomDateInRange();
    const validThrough = new Date(datePosted);
    validThrough.setDate(validThrough.getDate() + getRandomValidDays());
    
    // Update the frontmatter
    doc.data.datePosted = datePosted.toISOString();
    doc.data.validThrough = validThrough.toISOString();
    
    // Write back to file
    const updatedContent = matter.stringify(doc.content, doc.data);
    fs.writeFileSync(filePath, updatedContent);
    
    // Store updated file info
    updatedFiles.push({
      filename: jobFile.filename,
      oldDate: jobFile.datePosted.toISOString(),
      newDate: datePosted.toISOString()
    });
    
    console.log(`Updated ${jobFile.filename}:`);
    console.log(`  Old date: ${jobFile.datePosted.toISOString()}`);
    console.log(`  New date: ${datePosted.toISOString()}`);
  }

  // Save list of updated files
  fs.writeFileSync(outputFile, JSON.stringify(updatedFiles, null, 2));
  console.log(`\nUpdated ${updatedFiles.length} jobs`);
  console.log(`Updated files list saved to: ${outputFile}`);
}

// Run the script
updateOldestJobs().catch(console.error); 