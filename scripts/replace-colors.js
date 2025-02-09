const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/layout'),
  path.join(__dirname, '../src/pages')
];

console.log('🔍 Starting color replacement script...');

function processFile(filePath) {
  try {
    console.log(`📄 Reading file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/\bemerald\b/g, 'blue');
    
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
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.astro') || file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')) {
        processFile(filePath);
      } else {
        console.log(`⏭️  Skipping non-source file: ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error accessing directory ${dir}:`, error);
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

console.log('✨ Color replacement complete!'); 