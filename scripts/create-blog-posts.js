#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const OpenAI = require('openai');
require('dotenv').config({ 
  path: path.join(__dirname, 'config', '.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY not found in scripts/config/.env.local file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Blog post metadata
const BLOG_POSTS = [
    {
      title: "Texas Commercial Electrician Staffing",
      slug: "texas-commercial-electrician-staffing",
      description: "Discover the high demand for commercial electricians in Texas. Learn about the industries driving this need, the skills required, and how staffing solutions can help meet the growing demand in the Lone Star State.",
      tags: ["Commercial Electricians", "Staffing", "Texas", "Jobs"]
    },
    {
      title: "Texas Residential Electrician Staffing",
      slug: "texas-residential-electrician-staffing",
      description: "Texas' booming housing market has led to a surge in demand for residential electricians. Explore how staffing agencies are addressing this demand and connecting skilled professionals to residential projects.",
      tags: ["Residential Electricians", "Staffing", "Texas", "Careers"]
    },
    {
      title: "Texas Industrial Electrician Staffing",
      slug: "texas-industrial-electrician-staffing",
      description: "Industrial electricians are critical for Texas' thriving manufacturing and energy industries. Discover the opportunities and solutions for staffing these vital roles across the state.",
      tags: ["Industrial Electricians", "Staffing", "Texas", "Careers"]
    },
    {
      title: "Texas Fire Alarm Technician Staffing",
      slug: "texas-fire-alarm-technician-staffing",
      description: "With the rise in residential and commercial development, Texas is experiencing a growing need for fire alarm technicians. Learn how staffing solutions can connect companies with top talent for this essential role.",
      tags: ["Fire Alarm Technicians", "Staffing", "Texas", "Jobs"]
    },
    {
      title: "Texas Controls Technician Staffing",
      slug: "texas-controls-technician-staffing",
      description: "The automation and industrial sectors in Texas are expanding rapidly, driving demand for skilled controls technicians. Explore how staffing agencies can bridge the gap in this critical field.",
      tags: ["Controls Technicians", "Staffing", "Texas", "Careers"]
    },
    {
      title: "Texas Security Technician Staffing",
      slug: "texas-security-technician-staffing",
      description: "As technology evolves, the demand for security technicians in Texas is on the rise. Learn how staffing agencies are helping businesses find qualified professionals for this critical role.",
      tags: ["Security Technicians", "Staffing", "Texas", "Jobs"]
    },
    {
      title: "Texas Solar Installer Staffing",
      slug: "texas-solar-installer-staffing",
      description: "Texas is leading the way in renewable energy, creating significant opportunities for solar installers. Discover how staffing solutions are addressing the increasing need for professionals in this green energy sector.",
      tags: ["Solar Installers", "Staffing", "Texas", "Green Energy"]
    },
    {
      title: "Texas Voice Data Technician Staffing",
      slug: "texas-voice-data-technician-staffing",
      description: "Voice data technicians are essential for Texas' tech and business hubs. Explore how staffing agencies are helping businesses find skilled professionals to keep their systems connected.",
      tags: ["Voice Data Technicians", "Staffing", "Texas", "Technology"]
    },
    {
      title: "Texas Audio Visual Technician Staffing",
      slug: "texas-audio-visual-technician-staffing",
      description: "From corporate events to entertainment, Texas has a growing need for audio visual technicians. Learn how staffing solutions are helping businesses meet the demand for this specialized role.",
      tags: ["Audio Visual Technicians", "Staffing", "Texas", "Careers"]
    }
  ];
  
  

async function generateOutline(title, description) {
  const outlinePrompt = `Create a detailed outline for a blog post titled "${title}". Start off with an introduction and never use h1 headings. The post should cover: ${description}

The outline should:
1. Include a compelling introduction
2. Have 4-6 main sections with h2 headings
3. Include 2-3 subsections under each main section with h3 headings
4. End with a strong conclusion section
5. Focus on practical, actionable information
6. Include specific examples and data points to cover, the more specific data points the better
7. Consider SEO optimization and readability

Format the outline in markdown using ## for main sections and ### for subsections. Do not include actual content, just the structure.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: outlinePrompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function generateBlogPost(title, description, outline, otherPosts, currentTags) {
  const relatedPosts = otherPosts.filter(post => 
    post.title !== title && 
    (post.description.toLowerCase().includes(title.toLowerCase()) || 
     title.toLowerCase().includes(post.title.toLowerCase()) ||
     post.tags.some(tag => currentTags.includes(tag)))
  );

  const blogPrompt = `Write a comprehensive blog post based on this outline:

${outline}

The blog post should:
1. Be written in a conversational, engaging tone
2. Include practical examples and specific details
3. Use markdown formatting (## for h2, ### for h3, ** for bold), never use h1 headings
4. Be optimized for SEO while maintaining readability
5. Only include links to these related blog posts (no external links):
${relatedPosts.map(post => `- [${post.title}](/posts/${post.slug})`).join('\n')}

Title: ${title}
Description: ${description}

Important:
- Do not include any SEO or readability notes at the end
- Do not include any meta commentary about the post
- End with a strong conclusion that ties everything together
- Only link to the related blog posts provided above, no external links
- Make sure to naturally reference and link to the related posts within the content where relevant

Format the content in markdown. Do not include frontmatter. Start with the main content after the introduction.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: blogPrompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function createBlogPost(postData) {
  console.log(`Generating outline for: ${postData.title}`);
  const outline = await generateOutline(postData.title, postData.description);
  
  console.log(`Generating full blog post for: ${postData.title}`);
  const content = await generateBlogPost(
    postData.title, 
    postData.description, 
    outline, 
    BLOG_POSTS,
    postData.tags
  );

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);

  // Create frontmatter with tags array directly from BLOG_POSTS
  const frontmatter = `---
pubDate: ${futureDate.toISOString().split('T')[0]}
modDate: "${futureDate.toISOString().split('.')[0]}Z"
author: Best Electrician
title: ${postData.title}
description: "${postData.description}"
avatar:
  url: "/images/eleclog.png"
  alt: "Best Electrician Jobs"
image:
  url: "https://i.pinimg.com/564x/f3/56/71/f35671374c45021df13bb688c390a3a2.jpg"
  alt: "Best Electrician Jobs"
tags: ${JSON.stringify(postData.tags)}
---

${content.trim()}`;

  const filePath = path.join(__dirname, '..', 'src', 'content', 'posts', `${postData.slug}.md`);
  fs.writeFileSync(filePath, frontmatter);
  console.log(`Created blog post: ${filePath}`);
}

async function createAllBlogPosts() {
  for (const post of BLOG_POSTS) {
    await createBlogPost(post);
    // Add a delay between posts to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

createAllBlogPosts().catch(console.error); 