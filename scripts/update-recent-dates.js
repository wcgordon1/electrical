const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Parse command line arguments
const args = process.argv.slice(2);
const usage = `
Usage: 
  npm run update-recent-dates -- --from="2024-03-20T10:30:00" --limit=75
  (updates 75 jobs posted after the specified date/time to today)
`;

if (args.length === 0) {
  console.log(usage);
  process.exit(1);
}

// Parse start date and limit
let fromDate, limit = 75;
args.forEach(arg => {
  if (arg.startsWith('--from=')) {
    fromDate = new Date(arg.split('=')[1]);
  }
  if (arg.startsWith('--limit=')) {
    limit = parseInt(arg.split('=')[1]);
  }
});

if (!fromDate) {
  console.log('Please specify a start date');
  console.log(usage);
  process.exit(1);
}

// Get random time for today between midnight and now
function getRandomRecentDate() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const randomTime = todayStart.getTime() + Math.random() * (now.getTime() - todayStart.getTime());
  return new Date(randomTime);
}

// Get random number of days between 30-45
function getRandomValidDays() {
  return Math.floor(Math.random() * (45 - 30 + 1) + 30);
}

// Get all job files and sort by date
console.log('\n🔍 Scanning job files...');
const jobFiles = fs.readdirSync(jobsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => {
    const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
    const { data } = matter(content);
    return {
      file,
      datePosted: new Date(data.datePosted)
    };
  })
  .sort((a, b) => a.datePosted - b.datePosted)
  .filter(job => job.datePosted >= fromDate)
  .slice(0, limit)
  .map(job => job.file);

const now = new Date();
console.log(`\n📅 Today's date: ${now.toLocaleString()}`);
console.log(`🎯 Target date range: Today between midnight and ${now.toLocaleTimeString()}`);
console.log(`📊 Found ${jobFiles.length} jobs to update starting from ${fromDate.toLocaleString()}\n`);

let lastUpdatedDate = fromDate;
let updatedCount = 0;

// Process each job file
jobFiles.forEach((file, index) => {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Generate random datePosted for today
  const datePosted = getRandomRecentDate();
  
  // Track the latest date for reporting
  if (datePosted > lastUpdatedDate) {
    lastUpdatedDate = datePosted;
  }
  
  // Calculate validThrough
  const validThrough = new Date(datePosted);
  validThrough.setDate(validThrough.getDate() + getRandomValidDays());
  
  // Update the frontmatter
  doc.data.datePosted = datePosted.toISOString();
  doc.data.validThrough = validThrough.toISOString();
  
  // Write back to file
  const updatedContent = matter.stringify(doc.content, doc.data);
  fs.writeFileSync(filePath, updatedContent);
  
  updatedCount++;
  console.log(`✅ [${updatedCount}/${jobFiles.length}] Updated ${file}:`);
  console.log(`   Posted: ${datePosted.toLocaleString()}`);
  console.log(`   Valid Through: ${validThrough.toLocaleString()}\n`);
});

console.log('📝 Summary:');
console.log(`✨ Updated ${updatedCount} job files`);
console.log(`🕒 Last updated time: ${lastUpdatedDate.toLocaleString()}`);
console.log(`\n✅ Update complete!\n`); 