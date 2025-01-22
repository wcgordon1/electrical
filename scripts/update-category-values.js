const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');

function updateCategoryValues() {
  const files = fs.readdirSync(jobsDir);

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(jobsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Check if occupationalCategory matches Level 2 or Level 3
    if (['Helper'].includes(data.occupationalCategory)) {
      // Update to Low Voltage
      data.occupationalCategory = 'Apprentice';

      // Convert back to markdown
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated category in: ${file}`);
    }
  }

  console.log('Category value update complete!');
}

updateCategoryValues(); 