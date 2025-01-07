#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');

function listJobFile(filePath) {
  try {
    const filename = path.basename(filePath);
    
    // Only process Premier Electric files
    if (!filename.startsWith('premier-')) {
      return null;
    }

    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    // Check if this is a Texas job
    if (!data.jobLocation || data.jobLocation.addressRegion !== 'TX') {
      return null;
    }

    return {
      filename,
      position: data.position,
      location: `${data.jobLocation.addressLocality}, ${data.jobLocation.addressRegion}`,
      emails: data.email || []
    };
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

async function main() {
  try {
    const files = fs.readdirSync(jobsDir);
    const texasJobs = [];
    let processedCount = 0;
    
    console.log('\nScanning for Premier Electric jobs in Texas...\n');
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(jobsDir, file);
      const result = listJobFile(filePath);
      
      processedCount++;
      
      if (result) {
        texasJobs.push(result);
      }
    }
    
    if (texasJobs.length > 0) {
      console.log('========== Premier Electric Texas Jobs ==========');
      texasJobs.forEach(job => {
        console.log(`\nPosition: ${job.position}`);
        console.log(`Location: ${job.location}`);
        console.log(`File: ${job.filename}`);
        console.log('Current emails:');
        job.emails.forEach(email => console.log(`- ${email}`));
        console.log('---');
      });
      
      console.log('\n========== Summary ==========');
      console.log(`Total files scanned: ${processedCount}`);
      console.log(`Premier Electric TX jobs found: ${texasJobs.length}`);
      console.log('============================');
    } else {
      console.log('\nNo Premier Electric jobs found in Texas!');
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main(); 