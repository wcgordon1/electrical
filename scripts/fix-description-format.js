#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');
const outputFile = path.join(__dirname, 'recently-updated-jobs.json');

function fixJobFile(filePath) {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const { data, content } = matter(fileContent);
    
    // Check if there's a line break after description
    const lines = fileContent.split('\n');
    let hasLineBreakAfterDescription = false;
    let descriptionLineIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('description:')) {
        descriptionLineIndex = i;
        // Check if there's an empty line between description: and the text
        if (lines[i + 1].trim() === '') {
          hasLineBreakAfterDescription = true;
        }
        break;
      }
    }
    
    // Only process files that need fixing
    if (!hasLineBreakAfterDescription) {
      return null;
    }
    
    // Rebuild the frontmatter with fixed description format
    const updatedData = {
      ...data,
      description: data.description
    };
    
    // Create new file content with proper formatting
    const updatedContent = matter.stringify(content, updatedData);
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent);
    
    return {
      filename: path.basename(filePath),
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
    
    console.log(`Found ${files.length} job files to check...`);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(jobsDir, file);
      const result = fixJobFile(filePath);
      
      processedCount++;
      
      if (result) {
        updatedFiles.push(result);
        updatedCount++;
        console.log(`Updated: ${file}`);
      }
      
      // Log progress every 50 files
      if (processedCount % 50 === 0) {
        console.log(`Processed ${processedCount}/${files.length} files...`);
      }
    }
    
    // Save the list of updated files
    if (updatedFiles.length > 0) {
      fs.writeFileSync(outputFile, JSON.stringify(updatedFiles, null, 2));
      console.log(`\nSummary:`);
      console.log(`Total files processed: ${processedCount}`);
      console.log(`Files updated: ${updatedCount}`);
      console.log(`Updated files list saved to: ${outputFile}`);
      console.log(`\nRun 'node scripts/notify-updated-jobs.js' to notify search engines about the updates.`);
    } else {
      console.log(`\nNo files needed updating!`);
    }
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main(); 