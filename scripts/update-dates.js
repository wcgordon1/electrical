const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Parse command line arguments
const args = process.argv.slice(2);
const usage = `
Usage: 
  npm run update-dates -- --from="2024-01-01" --to="2024-01-15"
  npm run update-dates -- --days=7 (jobs from last 7 days)
`;

if (args.length === 0) {
  console.log(usage);
  process.exit(1);
}

// Parse date range
let fromDate, toDate;
args.forEach(arg => {
  if (arg.startsWith('--from=')) {
    fromDate = new Date(arg.split('=')[1]);
  }
  if (arg.startsWith('--to=')) {
    toDate = new Date(arg.split('=')[1]);
  }
  if (arg.startsWith('--days=')) {
    const days = parseInt(arg.split('=')[1]);
    toDate = new Date();
    fromDate = new Date(toDate - days * 24 * 60 * 60 * 1000);
  }
});

// Get random date within last 2 days
function getRandomDateInRange() {
  const now = new Date();
  const twoDaysAgo = new Date(now - 2 * 24 * 60 * 60 * 1000);
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  return new Date(randomTime);
}

// Get random number of days between 30-45
function getRandomValidDays() {
  return Math.floor(Math.random() * (45 - 30 + 1) + 30);
}

// Get all job files and filter by date range
const jobFiles = fs.readdirSync(jobsDir)
  .filter(file => file.endsWith('.md'))
  .filter(file => {
    const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
    const { data } = matter(content);
    const jobDate = new Date(data.datePosted);
    return jobDate >= fromDate && jobDate <= toDate;
  });

console.log(`Found ${jobFiles.length} jobs between ${fromDate.toISOString()} and ${toDate.toISOString()}`);

// Process each job file
jobFiles.forEach((file) => {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Generate random datePosted in last 2 days
  const datePosted = getRandomDateInRange();
  
  // Calculate validThrough (random 30-45 days after datePosted)
  const validThrough = new Date(datePosted);
  validThrough.setDate(validThrough.getDate() + getRandomValidDays());
  
  // Update the frontmatter with millisecond precision
  doc.data.datePosted = datePosted.toISOString();
  doc.data.validThrough = validThrough.toISOString();
  
  // Write back to file
  const updatedContent = matter.stringify(doc.content, doc.data);
  fs.writeFileSync(filePath, updatedContent);
  
  console.log(`Updated ${file}:`);
  console.log(`  datePosted: ${doc.data.datePosted}`);
  console.log(`  validThrough: ${doc.data.validThrough}`);
});

console.log(`\nUpdated ${jobFiles.length} job files`);