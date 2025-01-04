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
      title: "Dallas Commercial Electrician Staffing",
      slug: "dallas-commercial-electrician-staffing",
      description: "Dallas' booming commercial construction sector has created an increasing demand for skilled commercial electricians. From high-rise office buildings to sprawling retail complexes, discover how staffing agencies are helping businesses meet their electrical needs.",
      tags: ["Commercial Electricians", "Staffing", "Dallas", "Jobs"]
    },
    {
      title: "Dallas Residential Electrician Staffing",
      slug: "dallas-residential-electrician-staffing",
      description: "With rapid population growth and new housing developments, Dallas has a high demand for residential electricians. Explore how staffing solutions are connecting homeowners and contractors with experienced professionals.",
      tags: ["Residential Electricians", "Staffing", "Dallas", "Careers"]
    },
    {
      title: "Dallas Industrial Electrician Staffing",
      slug: "dallas-industrial-electrician-staffing",
      description: "Industrial electricians are essential to Dallas' manufacturing and logistics industries. Learn how staffing agencies are helping companies find the skilled workers they need to maintain and power industrial facilities.",
      tags: ["Industrial Electricians", "Staffing", "Dallas", "Careers"]
    },
    {
      title: "Dallas Fire Alarm Technician Staffing",
      slug: "dallas-fire-alarm-technician-staffing",
      description: "As Dallas grows, so does the demand for fire alarm technicians to ensure safety in residential, commercial, and industrial buildings. Discover how staffing agencies are providing certified professionals to meet these critical needs.",
      tags: ["Fire Alarm Technicians", "Staffing", "Dallas", "Jobs"]
    },
    {
      title: "Dallas Controls Technician Staffing",
      slug: "dallas-controls-technician-staffing",
      description: "Dallas' expanding industrial and automation sectors have increased the need for controls technicians. Learn how staffing agencies are bridging the gap between businesses and skilled professionals in this high-demand field.",
      tags: ["Controls Technicians", "Staffing", "Dallas", "Careers"]
    },
    {
      title: "Dallas Security Technician Staffing",
      slug: "dallas-security-technician-staffing",
      description: "Security technicians play a vital role in safeguarding Dallas' businesses and residences. Explore how staffing solutions are helping connect employers with top security professionals to install and maintain advanced systems.",
      tags: ["Security Technicians", "Staffing", "Dallas", "Jobs"]
    },
    {
      title: "Dallas Solar Installer Staffing",
      slug: "dallas-solar-installer-staffing",
      description: "As one of Texas' leading cities in renewable energy initiatives, Dallas has a growing need for solar installers. Learn how staffing agencies are supporting the city's green energy goals by connecting businesses with skilled solar professionals.",
      tags: ["Solar Installers", "Staffing", "Dallas", "Green Energy"]
    },
    {
      title: "Dallas Voice Data Technician Staffing",
      slug: "dallas-voice-data-technician-staffing",
      description: "Voice data technicians are crucial for Dallas' tech-driven businesses and industries. Discover how staffing agencies are meeting the demand for skilled technicians who can keep communication systems running seamlessly.",
      tags: ["Voice Data Technicians", "Staffing", "Dallas", "Technology"]
    },
    {
      title: "Dallas Audio Visual Technician Staffing",
      slug: "dallas-audio-visual-technician-staffing",
      description: "Dallas' thriving corporate and entertainment sectors create a significant demand for audio visual technicians. Learn how staffing solutions are connecting businesses with experienced professionals in this specialized field.",
      tags: ["Audio Visual Technicians", "Staffing", "Dallas", "Careers"]
    },
    {
      title: "Dallas Data Center Technician Staffing",
      slug: "dallas-data-center-technician-staffing",
      description: "Dallas is emerging as a key hub for data centers, creating an urgent demand for skilled data center technicians. Discover how staffing agencies are helping companies find the professionals needed to maintain these critical facilities.",
      tags: ["Data Center Technicians", "Staffing", "Dallas", "Technology"]
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
1. Be written in a conversational, engaging tone, and keep your sentences short, concise, and dont use filler words
2. Include practical examples and specific details
3. Bring up specific cities in the state along with large projects and companies that are hiring
4. Include specific data points and statistics around construction and hiring in the state
5. Use markdown formatting (## for h2, ### for h3, ** for bold), never use h1 headings
6. Be optimized for SEO while maintaining readability
7. Only include links to these related blog posts (no external links):
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
    model: "gpt-4o",
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