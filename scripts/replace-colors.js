import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [
  '../src/components',
  '../src/layout',
  '../src/pages'
];

console.log('🔍 Starting color replacement script...');

function processFile(filePath) {
  try {
    console.log(`📄 Reading file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/\bgreen\b/g, 'indigo');
    
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
        // Recursively process subdirectories
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
  const absolutePath = path.resolve(__dirname, dir);
  if (fs.existsSync(absolutePath)) {
    console.log(`🎯 Processing directory: ${dir}`);
    walkDir(absolutePath);
  } else {
    console.log(`⚠️  Directory not found: ${absolutePath}`);
  }
}

console.log('✨ Color replacement complete!'); 