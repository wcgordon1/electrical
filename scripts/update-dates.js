const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

// Batch size and delay
const BATCH_SIZE = 25;
const DAYS_BETWEEN_BATCHES = 1;

// Track progress in a JSON file
const progressFile = path.join(__dirname, 'config/update-progress.json');
let progress = { 
    lastBatch: -1,
    lastRun: null
};

// Load previous progress
if (fs.existsSync(progressFile)) {
    progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

// Check if enough time has passed
const lastRun = progress.lastRun ? new Date(progress.lastRun) : null;
const now = new Date();
if (lastRun && (now - lastRun) < (DAYS_BETWEEN_BATCHES * 24 * 60 * 60 * 1000)) {
    console.log(`Please wait ${DAYS_BETWEEN_BATCHES} day(s) between batches.`);
    console.log(`Last run: ${lastRun.toLocaleString()}`);
    process.exit(0);
}

// Get next batch
const nextBatch = progress.lastBatch + 1;
const jobsDir = path.resolve(__dirname, '../src/content/jobs');
const jobFiles = fs.readdirSync(jobsDir).filter(file => file.endsWith('.md'));
const batches = [];
for (let i = 0; i < jobFiles.length; i += BATCH_SIZE) {
    batches.push(jobFiles.slice(i, i + BATCH_SIZE));
}

if (nextBatch >= batches.length) {
    console.log('All batches completed!');
    process.exit(0);
}

// Process next batch
console.log(`Processing batch ${nextBatch + 1}/${batches.length}`);
const batch = batches[nextBatch];
batch.forEach((file, jobIndex) => {
    const filePath = path.join(jobsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const doc = matter(content);
    
    // Update datePosted
    const newDate = generateDate(nextBatch, jobIndex);
    doc.data.datePosted = newDate;
    
    // Write back to file
    const updatedContent = matter.stringify(doc.content, doc.data);
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`Updated ${file} to ${newDate}`);
});

// Save progress
progress.lastBatch = nextBatch;
progress.lastRun = now.toISOString();
fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));

console.log(`\nBatch ${nextBatch + 1} complete. Run again in ${DAYS_BETWEEN_BATCHES} day(s).`); 