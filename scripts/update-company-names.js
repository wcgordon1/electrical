#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const jobsDir = path.join(__dirname, '..', 'src', 'content', 'jobs');

function updateCompanyNames() {
  const files = fs.readdirSync(jobsDir);
  let updatedCount = 0;

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const filePath = path.join(jobsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (parsed.data.hiringOrganization?.name === 'Premiere Electric' || 
        parsed.data.hiringOrganization?.name === 'Premiere Electrical') {
      
      parsed.data.hiringOrganization.name = 'Premier Electric';
      
      const updatedContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`Updated company name in: ${file}`);
      updatedCount++;
    }
  });

  console.log(`\nTotal files updated: ${updatedCount}`);
}

updateCompanyNames(); 