#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');
const outputFile = path.join(__dirname, 'updated-az-emails.json');

// Arizona specific email list
const AZ_EMAILS = [
  'will@bestelectricianjobs.com',
  'Michael.Mckeaige@pes123.com',
  'Sarahann.Moody@pes123.com',
  'Makicha.Castaneda@pes123.com',
  'Sam.Sosa@pes123.com'
];

function updateJobFile(filePath) {
  try {
    const filename = path.basename(filePath);
    
    // Only process Premier Electric files
    if (!filename.startsWith('premier-')) {
      return null;
    }

    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Check if this is an Arizona job by looking at the jobLocation state
    if (!data.jobLocation || data.jobLocation.addressRegion !== 'FL') {
      return null;
    }

    // Update the email field
    const updatedData = {
      ...data,
      email: AZ_EMAILS
    };

    // Create new file content
    const updatedContent = matter.stringify(content, updatedData);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    return {
      filename,
      location: `${data.jobLocation.addressLocality}, ${data.jobLocation.addressRegion}`,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

async function main() {
  try {
    const files = fs.readdirSync(jobsDir);
    const updatedFiles = [];
    let processedCount = 0;
    let updatedCount = 0;
    
    console.log(`\nChecking ${files.length} job files for Premier Electric Arizona jobs...\n`);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(jobsDir, file);
      const result = updateJobFile(filePath);
      
      processedCount++;
      
      if (result) {
        updatedFiles.push(result);
        updatedCount++;
        console.log(`✓ Updated: ${result.filename}`);
        console.log(`  Location: ${result.location}`);
        console.log(`  Emails updated to AZ distribution list`);
        console.log('---');
      }
    }
    
    // Save the list of updated files
    if (updatedFiles.length > 0) {
      fs.writeFileSync(outputFile, JSON.stringify(updatedFiles, null, 2));
      
      console.log('\n========== Summary ==========');
      console.log(`Total files processed: ${processedCount}`);
      console.log(`Premier Electric AZ files updated: ${updatedCount}`);
      console.log(`Updated files list saved to: ${outputFile}`);
      console.log('\nEmail distribution list applied:');
      AZ_EMAILS.forEach(email => console.log(`- ${email}`));
      console.log('============================');
    } else {
      console.log('\nNo Premier Electric Arizona files found to update!');
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main(); 