import { getCollection } from 'astro:content';
import { OpenAI } from 'openai';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function updateJobDescriptions() {
  try {
    const jobsDir = join(process.cwd(), 'src/content/jobs');
    const jobs = await getCollection('jobs');

    for (const job of jobs) {
      const filePath = join(jobsDir, `${job.id}.md`);
      const fileContent = await readFile(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      // Create prompt for OpenAI to summarize the markdown content
      const prompt = `Summarize this job description into a concise HTML format suitable for Google Jobs. 
      Include key responsibilities, qualifications, and requirements. 
      Use only <p>, <ul>, and <li> tags for formatting. 
      Keep it under 2000 characters:

      ${content}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      // Get the HTML summary
      const htmlDescription = completion.choices[0].message.content;

      // Update the frontmatter description
      data.description = htmlDescription;

      // Create new file content
      const newContent = matter.stringify(content, data);

      // Write back to file
      await writeFile(filePath, newContent);
      console.log(`Updated description for: ${job.id}`);

      // Add delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('All job descriptions updated successfully!');
  } catch (error) {
    console.error('Error updating descriptions:', error);
  }
}

updateJobDescriptions(); 