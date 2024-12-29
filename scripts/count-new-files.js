#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  // Get untracked files using git command
  const untrackedFiles = execSync('git ls-files --others --exclude-standard', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean); // Remove empty lines

  console.log('\nUntracked files:');
  untrackedFiles.forEach(file => console.log(`- ${file}`));
  console.log(`\nTotal new files: ${untrackedFiles.length}\n`);
} catch (error) {
  console.error('Error:', error.message);
} 