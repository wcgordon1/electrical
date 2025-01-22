const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.join(process.cwd(), 'src/content/jobs');

function updateTeamValues() {
  const files = fs.readdirSync(jobsDir);

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const filePath = path.join(jobsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Check if team matches any of the specified values
    if (['Construction'].includes(data.team)) {
      // Update team to Commercial
      data.team = 'Commercial';

      // Convert back to markdown
      const updatedContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated team value in: ${file}`);
    }
  });

  console.log('Team value update complete!');
}

updateTeamValues(); 