#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const jobsDir = path.join(__dirname, '..', 'src', 'content', 'jobs');

function updatePremierEmails() {
  const files = fs.readdirSync(jobsDir);
  let updatedCount = 0;

  const newEmails = [
    'will@bestelectricianjobs.com',
    'Michael.Mckeaige@pes123.com',
    'Sarahann.Moody@pes123.com'
  ];

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const filePath = path.join(jobsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(content);

    if (parsed.data.hiringOrganization?.name?.toLowerCase().startsWith('premier')) {
      parsed.data.email = newEmails;
      
      const updatedContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, updatedContent);
      
      console.log(`Updated emails in: ${file}`);
      updatedCount++;
    }
  });

  console.log(`\nTotal files updated: ${updatedCount}`);
}

updatePremierEmails(); 