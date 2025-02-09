const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/layouts'),
  path.join(__dirname, '../src/pages')
];

console.log('🔍 Starting company name replacement script...');

function processFile(filePath) {
  try {
    console.log(`📄 Reading file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content
      .replace(/jake'?s jobs/gi, 'Electrical Jobs')
      .replace(/jakesjobs/gi, 'electrical.jobs')
      .replace(/will@jakesjobs\.com/g, 'will@electrical.jobs');
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed in: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

function walkDir(dir) {
  console.log(`📁 Scanning directory: ${dir}`);
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else {
      processFile(filePath);
    }
  }
}

for (const dir of directories) {
  if (fs.existsSync(dir)) {
    console.log(`🎯 Processing directory: ${dir}`);
    walkDir(dir);
  } else {
    console.log(`⚠️  Directory not found: ${dir}`);
  }
}

console.log('✨ Company name replacement complete!'); 