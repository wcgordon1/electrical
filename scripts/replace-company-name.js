import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [
  '../src/components',
  '../src/layouts',
  '../src/pages'
];

console.log('🔍 Starting company name replacement script...');

function processFile(filePath) {
  try {
    console.log(`📄 Reading file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/will@bestelectricianjobs.com/g, 'will@jakesjobs.com');
    
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
  const absolutePath = path.resolve(__dirname, dir);
  if (fs.existsSync(absolutePath)) {
    console.log(`🎯 Processing directory: ${dir}`);
    walkDir(absolutePath);
  } else {
    console.log(`⚠️  Directory not found: ${absolutePath}`);
  }
}

console.log('✨ Company name replacement complete!'); 