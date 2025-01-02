#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const jobsDir = path.join(__dirname, '..', 'src', 'content', 'jobs');

function updateStateEmails() {
  const files = fs.readdirSync(jobsDir);
  let updatedCount = 0;

  const targetStates = ['RI', 'MI', 'CA', 'MA'];
  const newEmails = [
    'will@bestelectricianjobs.com',
    'support@primepartners.info'
  ];

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const filePath = path.join(jobsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (parsed.data.jobLocation?.addressRegion && 
        targetStates.includes(parsed.data.jobLocation.addressRegion)) {
      
      parsed.data.email = newEmails;
      
      const updatedContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`Updated emails in: ${file} (${parsed.data.jobLocation.addressRegion})`);
      updatedCount++;
    }
  });

  console.log(`\nTotal files updated: ${updatedCount}`);
}

updateStateEmails(); 