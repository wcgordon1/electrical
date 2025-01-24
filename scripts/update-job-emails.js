const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

const JOBS_DIR = path.join(__dirname, '..', 'src', 'content', 'jobs');
const OLD_EMAIL = 'will@bjakesjobs.com';
const NEW_EMAIL = 'will@jakesjobs.com';

console.log('🔍 Starting email update in job files...');

function updateJobFile(filePath) {
  try {
    console.log(`📄 Processing: ${filePath}`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Update email array
    if (Array.isArray(data.email)) {
      const oldEmails = [...data.email];
      data.email = [NEW_EMAIL];
      
      // Check if anything changed
      if (JSON.stringify(oldEmails) !== JSON.stringify(data.email)) {
        // Reconstruct the file content with updated frontmatter
        const updatedContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ Updated emails in: ${path.basename(filePath)}`);
        console.log(`   Old: ${oldEmails.join(', ')}`);
        console.log(`   New: ${data.email.join(', ')}`);
      } else {
        console.log(`⏭️  No changes needed in: ${path.basename(filePath)}`);
      }
    } else {
      console.log(`⚠️  No email array found in: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

// Process all .md files in the jobs directory
const jobFiles = fs.readdirSync(JOBS_DIR).filter(file => file.endsWith('.md'));

console.log(`Found ${jobFiles.length} job files to process`);

for (const file of jobFiles) {
  updateJobFile(path.join(JOBS_DIR, file));
}

console.log('✨ Email update complete!'); 