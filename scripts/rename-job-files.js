const fs = require('node:fs');
const path = require('node:path');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');
const renamedFilesJson = path.join(__dirname, 'renamed-jobs.json');

function renameFiles() {
  try {
    // Read all files in the jobs directory
    const files = fs.readdirSync(jobsDir);
    const renamedFiles = [];

    for (const file of files) {
      if (file.includes(' ')) {
        const oldPath = path.join(jobsDir, file);
        const newFileName = file.replace(/\s+/g, '-');
        const newPath = path.join(jobsDir, newFileName);

        // Rename the file
        fs.renameSync(oldPath, newPath);
        
        // Add to renamed files array
        renamedFiles.push({
          filename: newFileName,
          oldFilename: file,
          timestamp: new Date().toISOString()
        });
        
        console.log('Renamed:');
        console.log(`  Original: ${file}`);
        console.log(`  New: ${newFileName}`);
        console.log('---');
      }
    }

    // Save renamed files to JSON if any files were renamed
    if (renamedFiles.length > 0) {
      fs.writeFileSync(renamedFilesJson, JSON.stringify(renamedFiles, null, 2));
      console.log(`Saved ${renamedFiles.length} renamed files to ${renamedFilesJson}`);
    }

    console.log('File renaming complete!');
  } catch (error) {
    console.error('Error renaming files:', error);
  }
}

renameFiles(); 