const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

async function generateLinksList() {
  try {
    console.log('Starting link list generation...');
    let output = '<h1>Current Job Openings</h1>\n\n<div class="jobs-list">\n';

    // Get all jobs from the content directory
    const jobsDir = path.join(process.cwd(), 'src/content/jobs');
    console.log('Reading jobs from:', jobsDir);
    const jobFiles = fs.readdirSync(jobsDir).filter(file => file.endsWith('.md'));
    console.log(`Found ${jobFiles.length} job files`);

    // Process and sort jobs
    const jobs = jobFiles.map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        position: data.position,
        slug: file.replace('.md', '')
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`Processed ${jobs.length} jobs`);

    // Generate jobs list
    for (const job of jobs) {
      const { position, slug } = job;
      output += `<a href="https://www.bestelectricianjobs.com/jobs/${slug}" target="_blank" rel="noopener noreferrer">${position}</a><br><br>\n\n`;
    }

    // Add separator and recruiting section
    output += '</div>\n\n<hr>\n\n<h1>Recruiting Services</h1>\n\n<div class="recruiting-list">\n';

    // Get all recruiting content
    const recruitingDir = path.join(process.cwd(), 'src/content/recruiting');
    console.log('Reading recruiting content from:', recruitingDir);
    
    // Function to process recruiting files recursively
    let recruitingFilesCount = 0;
    const processRecruitingFiles = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          processRecruitingFiles(fullPath);
        } else if (item === 'index.md' || item.endsWith('.md')) {
          const fileContent = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContent);
          
          // Get relative path for URL
          const relativePath = path.relative(recruitingDir, fullPath)
            .replace(/\.md$/, '')
            .replace(/index$/, '')
            .replace(/\\/g, '/');
          
          // Create URL-friendly path
          const urlPath = relativePath.replace(/\s+/g, '-').toLowerCase();
          
          // Use name from frontmatter as the link text
          output += `<a href="https://www.bestelectricianjobs.com/recruiting/${urlPath}" target="_blank" rel="noopener noreferrer">${data.name}</a><br><br>\n\n`;
          recruitingFilesCount++;
        }
      }
    };

    processRecruitingFiles(recruitingDir);
    console.log(`Processed ${recruitingFilesCount} recruiting files`);

    // Close the recruiting div
    output += '</div>\n';

    // Add basic HTML structure and styling
    const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Electrician Jobs - Links</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2563eb;
            margin-top: 2em;
        }
        a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
            display: inline-block;
        }
        a:hover {
            text-decoration: underline;
        }
        hr {
            margin: 2em 0;
            border: none;
            border-top: 2px solid #e5e7eb;
        }
        .jobs-list, .recruiting-list {
            margin: 2em 0;
        }
    </style>
</head>
<body>
${output}
</body>
</html>`;

    // Write to file in the scripts directory
    const outputPath = path.join(process.cwd(), 'scripts', 'job-and-recruiting-links.html');
    console.log('Writing output file to:', outputPath);
    fs.writeFileSync(outputPath, htmlOutput);
    console.log('Links list generated successfully!');
    console.log('File created at:', outputPath);

  } catch (error) {
    console.error('Error generating links list:', error);
    console.error('Error details:', error.message);
    if (error.code === 'ENOENT') {
      console.error('Directory or file not found. Please check the paths.');
    }
  }
}

generateLinksList(); 