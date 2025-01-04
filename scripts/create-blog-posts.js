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
      title: "Los Angeles Commercial Electrician Staffing",
      slug: "los-angeles-commercial-electrician-staffing",
      description: "Los Angeles is a hub for commercial development, making commercial electricians essential for powering offices, retail spaces, and large infrastructure projects. Discover how staffing agencies are connecting businesses with skilled commercial electricians to meet the growing demands of this bustling metropolitan area.",
      tags: ["Commercial Electricians", "Staffing", "Los Angeles", "Jobs"]
    },
    {
      title: "Los Angeles Residential Electrician Staffing",
      slug: "los-angeles-residential-electrician-staffing",
      description: "As one of the largest housing markets in the country, Los Angeles has a constant need for residential electricians. From new housing developments to renovations, learn how staffing solutions are addressing the demand for skilled electricians in Los Angeles' competitive real estate market.",
      tags: ["Residential Electricians", "Staffing", "Los Angeles", "Careers"]
    },
    {
      title: "Los Angeles Industrial Electrician Staffing",
      slug: "los-angeles-industrial-electrician-staffing",
      description: "Industrial electricians play a crucial role in Los Angeles’ manufacturing and logistics sectors. With the city’s economy relying on port operations, factories, and high-tech industrial facilities, discover how staffing agencies are helping businesses meet their electrical labor needs.",
      tags: ["Industrial Electricians", "Staffing", "Los Angeles", "Careers"]
    },
    {
      title: "Los Angeles Fire Alarm Technician Staffing",
      slug: "los-angeles-fire-alarm-technician-staffing",
      description: "Fire alarm technicians are essential for maintaining safety in Los Angeles’ residential, commercial, and industrial buildings. This blog explores how staffing agencies are ensuring that businesses and property owners have access to certified fire alarm technicians in this safety-critical field.",
      tags: ["Fire Alarm Technicians", "Staffing", "Los Angeles", "Jobs"]
    },
    {
      title: "Los Angeles Controls Technician Staffing",
      slug: "los-angeles-controls-technician-staffing",
      description: "Automation and energy efficiency are driving the demand for controls technicians in Los Angeles. Explore how staffing solutions are helping businesses find the right professionals to manage advanced electrical systems in a city known for innovation and development.",
      tags: ["Controls Technicians", "Staffing", "Los Angeles", "Careers"]
    },
    {
      title: "Los Angeles Security Technician Staffing",
      slug: "los-angeles-security-technician-staffing",
      description: "With its vibrant business scene and sprawling residential areas, Los Angeles has a growing need for security technicians. Learn how staffing agencies are connecting businesses and property owners with skilled security professionals to protect their assets and properties.",
      tags: ["Security Technicians", "Staffing", "Los Angeles", "Jobs"]
    },
    {
      title: "Los Angeles Solar Installer Staffing",
      slug: "los-angeles-solar-installer-staffing",
      description: "As a leader in renewable energy adoption, Los Angeles is experiencing a high demand for solar installers. Discover how staffing agencies are helping businesses and homeowners find qualified professionals to support the city’s transition to sustainable energy solutions.",
      tags: ["Solar Installers", "Staffing", "Los Angeles", "Green Energy"]
    },
    {
      title: "Los Angeles Voice Data Technician Staffing",
      slug: "los-angeles-voice-data-technician-staffing",
      description: "Voice data technicians are crucial for keeping Los Angeles' tech hubs, businesses, and institutions connected. Learn how staffing agencies are meeting the rising demand for skilled voice data professionals in the City of Angels.",
      tags: ["Voice Data Technicians", "Staffing", "Los Angeles", "Technology"]
    },
    {
      title: "Los Angeles Audio Visual Technician Staffing",
      slug: "los-angeles-audio-visual-technician-staffing",
      description: "From Hollywood productions to corporate events, Los Angeles has a thriving demand for audio visual technicians. Explore how staffing solutions are filling this critical need in the entertainment capital of the world.",
      tags: ["Audio Visual Technicians", "Staffing", "Los Angeles", "Careers"]
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