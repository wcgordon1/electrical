const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Get all job files
const jobFiles = fs.readdirSync(jobsDir).filter(file => file.endsWith('.md'));

// Generate dates for the last 3 days
const today = new Date();
const dates = [];
for (let i = 1; i <= 3; i++) {
  const date = new Date(today);
  date.setDate(date.getDate() - i);
  dates.push(date);
}

// Process each job file
jobFiles.forEach((file, index) => {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Assign a random date from the last 3 days
  const datePosted = dates[index % 3];
  
  // Calculate validThrough (60 days after datePosted)
  const validThrough = new Date(datePosted);
  validThrough.setDate(validThrough.getDate() + 60);
  
  // Update the frontmatter
  doc.data.datePosted = datePosted.toISOString().split('.')[0] + 'Z';
  doc.data.validThrough = validThrough.toISOString().split('.')[0] + 'Z';
  
  // Write back to file
  const updatedContent = matter.stringify(doc.content, doc.data);
  fs.writeFileSync(filePath, updatedContent);
  
  console.log(`Updated ${file}:`);
  console.log(`  datePosted: ${doc.data.datePosted}`);
  console.log(`  validThrough: ${doc.data.validThrough}`);
});

console.log(`\nUpdated ${jobFiles.length} job files`);