#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');

function countJobs() {
  try {
    const files = fs.readdirSync(jobsDir);
    const totalFiles = files.filter(file => file.endsWith('.md')).length;
    
    // Initialize counters
    const stateCount = {};
    const locationCount = {};
    
    console.log(`\nAnalyzing ${totalFiles} job files...\n`);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(jobsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      // Count by state
      const state = data.jobLocation?.addressRegion || 'Unknown';
      stateCount[state] = (stateCount[state] || 0) + 1;
      
      // Count by full location
      const location = data.location || 'Unknown';
      locationCount[location] = (locationCount[location] || 0) + 1;
    }
    
    // Sort and display results
    console.log('========== Total Jobs ==========');
    console.log(`Total job files: ${totalFiles}`);
    
    console.log('\n========== Jobs by State ==========');
    const sortedStates = Object.entries(stateCount)
      .sort(([,a], [,b]) => b - a);
    
    sortedStates.forEach(([state, count]) => {
      console.log(`${state}: ${count} jobs`);
    });
    
    console.log('\n========== Jobs by Location ==========');
    const sortedLocations = Object.entries(locationCount)
      .sort(([,a], [,b]) => b - a);
    
    sortedLocations.forEach(([location, count]) => {
      console.log(`${location}: ${count} jobs`);
    });
    
    console.log('\n============================');
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

countJobs(); 