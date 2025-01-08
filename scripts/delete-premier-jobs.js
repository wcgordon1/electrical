#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');
const outputFile = path.join(__dirname, 'deleted-premier-jobs.json');

// Companies to match (case insensitive)
const COMPANY_PATTERNS = [
  'premier electric',
  'premier',
  'premiere'
];

function processJobFile(filePath) {
  try {
    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    // Check if this is a Premier job
    const companyName = data.hiringOrganization?.name?.toLowerCase() || '';
    const isPremierJob = COMPANY_PATTERNS.some(pattern => 
      companyName.includes(pattern.toLowerCase())
    );

    if (!isPremierJob) {
      return null;
    }

    // Get job info before deletion
    const jobInfo = {
      originalPath: filePath,
      filename: path.basename(filePath),
      position: data.position,
      company: data.hiringOrganization?.name,
      location: `${data.jobLocation?.addressLocality}, ${data.jobLocation?.addressRegion}`,
      dateDeleted: new Date().toISOString(),
      url: `https://bestelectricianjobs.com/jobs/${path.basename(filePath, '.md')}`
    };

    // Delete the file
    fs.unlinkSync(filePath);
    
    return jobInfo;
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

async function main() {
  try {
    const files = fs.readdirSync(jobsDir);
    const deletedJobs = [];
    let processedCount = 0;
    
    console.log(`\nScanning ${files.length} job files for Premier Electric jobs...\n`);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(jobsDir, file);
      const result = processJobFile(filePath);
      
      processedCount++;
      
      if (result) {
        deletedJobs.push(result);
        console.log(`✓ Deleted: ${result.filename}`);
        console.log(`  Position: ${result.position}`);
        console.log(`  Location: ${result.location}`);
        console.log('---');
      }
    }
    
    // Save the list of deleted jobs
    if (deletedJobs.length > 0) {
      fs.writeFileSync(outputFile, JSON.stringify(deletedJobs, null, 2));
      
      console.log('\n========== Summary ==========');
      console.log(`Total files processed: ${processedCount}`);
      console.log(`Premier Electric jobs deleted: ${deletedJobs.length}`);
      console.log(`Deleted jobs list saved to: ${outputFile}`);
      console.log('============================');
    } else {
      console.log('\nNo Premier Electric jobs found to delete!');
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main(); 