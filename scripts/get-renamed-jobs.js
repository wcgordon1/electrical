const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const renamedFilesJson = path.join(__dirname, 'renamed-jobs.json');

function getRenamedFiles() {
  try {
    // Get renamed files from git status
    const gitCommand = 'git log -M --name-status --pretty=format: HEAD~5..HEAD';
    const output = execSync(gitCommand, { encoding: 'utf8' });
    
    const renamedFiles = [];
    const lines = output.split('\n').filter(Boolean);
    
    for (const line of lines) {
      // R100 means 100% similarity (renamed)
      if (line.startsWith('R')) {
        const [, oldFile, newFile] = line.split('\t');
        
        // Only process files from src/content/jobs
        if (oldFile.includes('src/content/jobs/') && newFile.includes('src/content/jobs/')) {
          const oldFilename = path.basename(oldFile);
          const newFilename = path.basename(newFile);
          
          renamedFiles.push({
            filename: newFilename,
            oldFilename: oldFilename,
            timestamp: new Date().toISOString()
          });
          
          console.log('Found renamed file:');
          console.log(`  Original: ${oldFilename}`);
          console.log(`  New: ${newFilename}`);
          console.log('---');
        }
      }
    }

    // Save renamed files to JSON if any were found
    if (renamedFiles.length > 0) {
      fs.writeFileSync(renamedFilesJson, JSON.stringify(renamedFiles, null, 2));
      console.log(`Saved ${renamedFiles.length} renamed files to ${renamedFilesJson}`);
    } else {
      console.log('No renamed files found in recent git history');
    }

  } catch (error) {
    console.error('Error getting renamed files:', error);
  }
}

getRenamedFiles(); 