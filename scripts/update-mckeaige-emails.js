#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');
const OLD_EMAIL = 'michael.mckeaige@pes123.com';
const NEW_EMAILS = ['will@bestelectricianjobs.com', 'support@primepartners.info'];

function updateJobFile(filePath) {
  try {
    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Check if this job has the old email (case insensitive)
    const emails = data.email || [];
    const hasOldEmail = emails.some(email => 
      email.toLowerCase() === OLD_EMAIL.toLowerCase()
    );

    if (!hasOldEmail) {
      return false;
    }

    // Replace all emails with new ones
    data.email = NEW_EMAILS;

    // Reconstruct the file content with updated frontmatter
    const updatedContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, updatedContent);
    
    return true;
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

async function main() {
  try {
    const files = fs.readdirSync(jobsDir);
    let updatedCount = 0;
    
    console.log(`\nScanning ${files.length} job files for email updates...\n`);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(jobsDir, file);
      const wasUpdated = updateJobFile(filePath);
      
      if (wasUpdated) {
        updatedCount++;
        console.log(`✓ Updated: ${file}`);
      }
    }
    
    console.log('\n========== Summary ==========');
    console.log(`Total files scanned: ${files.length}`);
    console.log(`Files updated: ${updatedCount}`);
    console.log('============================');
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main(); 