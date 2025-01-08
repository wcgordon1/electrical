#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');

// Load environment variables
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

// Premier Electric company info
const COMPANY = {
  name: 'Premier Electric',
  sameAs: 'https://www.premierelectricalstaffing.com/',
  logo: 'https://www.premierelectricalstaffing.com/wp-content/uploads/2020/05/Premier-Electrical-Staffing-logo.png'
};

// Dynamic prompts based on job type and style
const PROMPT_STYLES = {
  detailed: {
    wordCount: 400,
    style: 'comprehensive and detailed',
    tone: 'professional and thorough'
  },
  standard: {
    wordCount: 300,
    style: 'balanced and informative',
    tone: 'clear and engaging'
  },
  concise: {
    wordCount: 200,
    style: 'direct and focused',
    tone: 'straightforward and practical'
  },
  brief: {
    wordCount: 50,
    style: 'concise and to the point',
    tone: 'direct and clear like a project foreman talking to his crew'
  }
};

function generatePromptA(jobType, jobInfo, location, style, salary) {
  const { wordCount, tone } = PROMPT_STYLES[style];
  
  return `Create a ${wordCount}-word ${tone} job description for a ${jobType} position at Premier Electric in ${location.city}, ${location.state}. Format in markdown using only h2 and h3 tags for headings. This description will be directly converted to HTML, so no markdown code blocks needed.

${jobInfo.prompt}

## About Premier Electric
Highlight our reputation in ${location.city} for excellence in electrical contracting and large projects. Mention our focus on ${jobInfo.team} projects and commitment to quality.

## Role Overview
Detail the ${jobType} position, emphasizing:
- Work in our ${jobInfo.team} division
- ${jobInfo.yearsExperience} years of experience level
- Key project types and responsibilities
- Growth opportunities

## Essential Qualifications
${jobInfo.qualifications}

## Core Responsibilities
${jobInfo.responsibilities}

## Location & Schedule
- Primary location: ${location.city}, ${location.state}
- List actual neighboring cities that border ${location.city}
- Schedule details and expectations

## Compensation Package
- Competitive pay: $${salary.minValue}-$${salary.maxValue} per hour
- Comprehensive benefits
- Professional development
- Career advancement opportunities

Focus on Premier Electric's commitment to employee growth, safety, and excellence in the electrical industry.`;
}

function generatePromptB(jobType, jobInfo, location, style, salary) {
  const { wordCount, tone } = PROMPT_STYLES[style];
  
  return `Write a ${wordCount}-word ${tone} job posting that feels more conversational and engaging. This is for a ${jobType} role at Premier Electric in ${location.city}, ${location.state}. Use only h2 and h3 markdown tags for headings, no code blocks needed.

${jobInfo.prompt}

Then, naturally flow into what makes this ${jobType} role exciting. Mention:
- The impact they'll have
- Who they'll work with
- What their day might look like
- Growth potential
- Work locations including ${location.city} and surrounding areas

Weave some of these responsibilities throughout the description with the title Responsibilities:
${jobInfo.responsibilities}

Naturally incorporate some of these qualifications into the conversation with a tile of what we are looking for (you don't have to include all of them only what you think is important):
${jobInfo.qualifications}

Include these key details in a way that feels organic:
- Experience level: ${jobInfo.yearsExperience} years
- Pay range: $${salary.minValue}-$${salary.maxValue} per hour
- Location: ${location.city}, ${location.state} and neighboring cities
- Benefits and perks
- Tools and equipment provided
- Training opportunities

End with a strong call to action that emphasizes Premier Electric's commitment to employee development and long-term career growth. Make the reader feel excited about joining our team.`;
}

const JOB_TYPES = {
    "Electrician": {
      "minValue": 29,
      "maxValue": 38,
      "experienceLevel": "midLevel",
      "category": "Journeyman",
      "team": "Commercial",
      "yearsExperience": "3-5",
      "responsibilities": "Install and maintain electrical systems, troubleshoot issues, upgrade lighting systems, and work on large-scale projects, including upcoming data centers and manufacturing plants in North Carolina.",
      "qualifications": "Experience with conduit benders, multimeters, and circuit testers; ability to read diagrams and troubleshoot systems; hands-on experience with commercial installations.",
      "prompt": "Create a job description for a Commercial Electrician focusing on installations and upgrades in commercial settings, with tools like conduit benders and multimeters."
    },
    "Security Tech": {
      "minValue": 20,
      "maxValue": 27,
      "experienceLevel": "entryLevel",
      "category": "Security",
      "team": "Commercial",
      "yearsExperience": "1-3",
      "responsibilities": "Install and maintain security systems, troubleshoot connectivity issues, and assist with system integration on commercial properties statewide.",
      "qualifications": "Basic experience with tools like crimpers and cable testers; understanding of security systems; hands-on troubleshooting skills.",
      "prompt": "Create a job description for a Security Technician focusing on installing and maintaining security systems. Must have experience with tools like crimpers and cable testers."
    },
    "Cable Tech": {
      "minValue": 23,
      "maxValue": 30,
      "experienceLevel": "seniorLevel",
      "category": "Voice Data",
      "team": "Commercial",
      "yearsExperience": "3-5",
      "responsibilities": "Install structured cabling systems, terminate Cat5e/6 cables, and work on high-demand projects like upcoming warehouses and logistics centers.",
      "qualifications": "Proficient with punch-down tools and cable testers; experience with structured cabling installations; ability to troubleshoot connectivity issues.",
      "prompt": "Create a job description for a Cable Tech focusing on structured cabling installations and troubleshooting."
    },
    "Electrician Apprentice": {
      "minValue": 18,
      "maxValue": 24,
      "experienceLevel": "entryLevel",
      "category": "Apprentice",
      "team": "Commercial",
      "yearsExperience": "0-3",
      "responsibilities": "Assist with electrical installations, handle materials, and learn wiring methods on projects such as commercial developments and industrial facilities.",
      "qualifications": "Familiarity with basic tools like drills and wire strippers; willingness to learn and follow safety protocols; hands-on assistance experience.",
      "prompt": "Create a job description for an Electrical Apprentice focusing on learning and assisting in commercial installations."
    },
    "Data Center Tech": {
      "minValue": 24,
      "maxValue": 32,
      "experienceLevel": "seniorLevel",
      "category": "Data Center",
      "team": "Commercial",
      "yearsExperience": "3-5",
      "responsibilities": "Install and terminate Cat6 cables, manage cable racks, and maintain server environments for upcoming statewide data center projects.",
      "qualifications": "Experience with Fluke testers, cable management, and termination tools; hands-on data center installation experience.",
      "prompt": "Create a job description for a Data Center Technician focusing on cable installations and management for large-scale data centers."
    },
    "Electrician Apprentice": {
  "minValue": 18,
  "maxValue": 25,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "0-4",
  "responsibilities": "Work alongside licensed electricians to install wiring, mount panels, and assist with conduit preparation; handle tools such as pliers, voltage testers, and drills; maintain a clean workspace and ensure tools are organized for efficiency.",
  "qualifications": "Familiarity with hand tools like pliers and drills; eagerness to learn the trade; dependable and detail-oriented with strong problem-solving skills.",
  "prompt": "Create a job description for an Electrician Apprentice focusing on hands-on assistance with electrical installations, including conduit prep, wiring, and tool management in a commercial environment."
},
"Apprentice Electrician": {
  "minValue": 18,
  "maxValue": 25,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "0-4",
  "responsibilities": "Support electricians by preparing materials, pulling wires, and setting up panels; operate basic tools like cable cutters, wire strippers, and measuring tapes; follow safety guidelines and contribute to smooth project execution.",
  "qualifications": "Hands-on experience with basic tools preferred but not required; quick learner with excellent teamwork and communication skills; physically capable of lifting materials and working on ladders.",
  "prompt": "Draft a job description for an Apprentice Electrician role that emphasizes assisting with wire pulling, panel setup, and material handling in a commercial setting while learning safety protocols and tool use."
},
    "Electrician Helper": {
      "minValue": 15,
      "maxValue": 18,
      "experienceLevel": "entryLevel",
      "category": "Helper",
      "team": "Commercial",
      "yearsExperience": "0-2",
      "responsibilities": "Assist electricians by organizing tools, materials, and equipment; pull wire, mount fixtures, and prepare conduit under supervision; use basic tools such as pliers, screwdrivers, and measuring tapes.",
      "qualifications": "Ability to follow directions and work in a team; familiarity with basic tools like pliers and drills; physical ability to lift materials and work on ladders.",
      "prompt": "Create a job description for an Electrician Helper focusing on supporting licensed electricians with wiring, mounting fixtures, and organizing tools."
    },
    "Data Center Tech 2": {
  "minValue": 30,
  "maxValue": 39,
  "experienceLevel": "seniorLevel",
  "category": "Data Center",
  "team": "Commercial",
  "yearsExperience": "5-7",
  "responsibilities": "Oversee installations of structured cabling, ensure adherence to data center standards, support team coordination for large-scale deployments, manage inventory of cabling materials and tools, and perform quality checks on completed work.",
  "qualifications": "Proven experience in leading data center projects, strong understanding of best practices for cable management, and ability to mentor junior technicians in efficient workflows.",
  "prompt": "Create a job description for a Data Center Tech 2 focusing on team coordination, adherence to standards, and advanced cabling management for large-scale data centers."
},
"Rack and Stack Installer": {
  "minValue": 17,
  "maxValue": 20,
  "experienceLevel": "entryLevel",
  "category": "Data Center",
  "team": "Commercial",
  "yearsExperience": "1-3",
  "responsibilities": "Assist in assembling and securing server racks in data center environments; follow blueprints and layout plans to position racks accurately; organize and manage tools and materials; install equipment into racks under supervision, including shelves and mounting brackets; ensure cable pathways are clear and accessible; perform basic quality checks to verify proper assembly; maintain cleanliness and safety on the job site.",
  "qualifications": "Hands-on construction or mechanical assembly experience; familiarity with basic hand tools such as drills, wrenches, and levels; ability to lift and position heavy materials (up to 50 lbs); strong attention to detail and ability to follow instructions; good communication skills and teamwork mindset; reliable transportation and punctuality.",
  "prompt": "Write a job description for a Rack and Stack Installer focusing on entry-level tasks in assembling server racks in data centers. The role emphasizes hands-on assembly work, safety, and teamwork, requiring construction or similar experience."
}

  };

const LOCATIONS = [ 

  { "city": "Virginia Beach", "state": "VA", "zipCode": "23450" },
  { "city": "Norfolk", "state": "VA", "zipCode": "23510" },
  { "city": "Chesapeake", "state": "VA", "zipCode": "23320" },
  { "city": "Richmond", "state": "VA", "zipCode": "23219" },
  { "city": "Newport News", "state": "VA", "zipCode": "23607" },
  { "city": "Alexandria", "state": "VA", "zipCode": "22314" },
  { "city": "Hampton", "state": "VA", "zipCode": "23669" },
  { "city": "Roanoke", "state": "VA", "zipCode": "24011" },
  { "city": "Portsmouth", "state": "VA", "zipCode": "23704" },
  { "city": "Suffolk", "state": "VA", "zipCode": "23434" },
  { "city": "Lynchburg", "state": "VA", "zipCode": "24504" },
  { "city": "Harrisonburg", "state": "VA", "zipCode": "22801" },
  { "city": "Leesburg", "state": "VA", "zipCode": "20175" },
  { "city": "Charlottesville", "state": "VA", "zipCode": "22902" },
  { "city": "Danville", "state": "VA", "zipCode": "24541" },
  { "city": "Blacksburg", "state": "VA", "zipCode": "24060" },
  { "city": "Manassas", "state": "VA", "zipCode": "20110" },
  { "city": "Petersburg", "state": "VA", "zipCode": "23803" },
  { "city": "Winchester", "state": "VA", "zipCode": "22601" },
  { "city": "Salem", "state": "VA", "zipCode": "24153" },
  { "city": "Fredericksburg", "state": "VA", "zipCode": "22401" },
  { "city": "Staunton", "state": "VA", "zipCode": "24401" },
  { "city": "Waynesboro", "state": "VA", "zipCode": "22980" },
  { "city": "Bristol", "state": "VA", "zipCode": "24201" },
  { "city": "Colonial Heights", "state": "VA", "zipCode": "23834" },
  { "city": "Radford", "state": "VA", "zipCode": "24141" },
  { "city": "Hopewell", "state": "VA", "zipCode": "23860" },
  { "city": "Falls Church", "state": "VA", "zipCode": "22046" },
  { "city": "Fairfax", "state": "VA", "zipCode": "22030" },
  { "city": "Vienna", "state": "VA", "zipCode": "22180" },
  { "city": "Herndon", "state": "VA", "zipCode": "20170" },
  { "city": "Reston", "state": "VA", "zipCode": "20190" },
  { "city": "Sterling", "state": "VA", "zipCode": "20164" },
  { "city": "Ashburn", "state": "VA", "zipCode": "20147" },
  { "city": "Dulles", "state": "VA", "zipCode": "20166" },
  { "city": "Chantilly", "state": "VA", "zipCode": "20151" },
  { "city": "Centreville", "state": "VA", "zipCode": "20120" },
  { "city": "Gainesville", "state": "VA", "zipCode": "20155" },
  { "city": "Woodbridge", "state": "VA", "zipCode": "22191" },
  { "city": "Dale City", "state": "VA", "zipCode": "22193" },
  { "city": "Annandale", "state": "VA", "zipCode": "22003" },
  { "city": "Springfield", "state": "VA", "zipCode": "22150" },
  { "city": "Lorton", "state": "VA", "zipCode": "22079" },
  { "city": "Midlothian", "state": "VA", "zipCode": "23112" },
  { "city": "Mechanicsville", "state": "VA", "zipCode": "23111" },
  { "city": "Chester", "state": "VA", "zipCode": "23831" },
  { "city": "Tuckahoe", "state": "VA", "zipCode": "23229" },
  { "city": "Bon Air", "state": "VA", "zipCode": "23235" },
  { "city": "Short Pump", "state": "VA", "zipCode": "23233" }
];

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (5000 - 1000) + 1000);
  return `${number} Technology Drive`;
}

function generateRecentDate() {
  const now = new Date();
  const threeHoursAgo = new Date(now - (3 * 60 * 60 * 1000));
  const randomTime = threeHoursAgo.getTime() + Math.random() * (now.getTime() - threeHoursAgo.getTime());
  return new Date(randomTime).toISOString();
}

function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const validThrough = new Date(postedDate.getTime() + (30 * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

function generateSalaryWithCents(baseMin, baseMax) {
  const extraDollars = Math.random() * (3 - 1) + 1;
  const minCents = Math.random();
  const maxCents = Math.random();
  
  return {
    minValue: Number((baseMin + extraDollars + minCents).toFixed(2)),
    maxValue: Number((baseMax + extraDollars + maxCents).toFixed(2))
  };
}

function generateJobId(type) {
  return `PREM${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(title, location, jobId) {
  return `premier-electric-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s?/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`{1,3}/g, '')
    .replace(/\[|\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/^\s*[-*+]\s/gm, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function createJob(location, jobType, promptStyle) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(jobType);
  
  const salary = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);
  
  // Alternate between prompt styles
  const prompt = Math.random() < 0.5 
    ? generatePromptA(jobType, jobInfo, location, promptStyle, salary)
    : generatePromptB(jobType, jobInfo, location, promptStyle, salary);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: prompt
    }],
    temperature: 0.7,
  });

  const description = completion.choices[0].message.content;
  const strippedDescription = stripMarkdown(description);

  const jobData = {
    position: jobType,
    description: `Join our team at Premier Electric as a ${jobType} in ${location.city}, ${location.state}. ${strippedDescription.substring(0, 400)}...`,
    location: `${location.city}, ${location.state}`,
    team: jobInfo.team,
    datePosted,
    validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: COMPANY.name,
      sameAs: COMPANY.sameAs,
      logo: COMPANY.logo
    },
    jobLocation: {
      streetAddress: generateStreetAddress(),
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: 'USA'
    },
    baseSalary: {
      currency: 'USD',
      value: Number(((salary.minValue + salary.maxValue) / 2).toFixed(2)),
      minValue: salary.minValue,
      maxValue: salary.maxValue,
      unitText: 'HOUR'
    },
    experienceRequirements: jobInfo.experienceLevel,
    occupationalCategory: jobInfo.category,
    identifier: {
      name: COMPANY.name,
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'Michael.Mckeaige@pes123.com',
      'Sarahann.Moody@pes123.com',
      'Dylan.Gibson@pes123.com',
      'Sheila.Villagomez@pes123.com'
    ]
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${description}`;
  
  const filename = generateFilename(jobType, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} in ${location.city}: ${filename}`);
  
  // Add delay between API calls
  await new Promise(resolve => setTimeout(resolve, 2000));
}

async function main() {
  const jobTypes = Object.keys(JOB_TYPES);
  const promptStyles = Object.keys(PROMPT_STYLES);
  let jobTypeIndex = 0;
  let promptStyleIndex = 0;
  let totalJobs = 0;

  for (const location of LOCATIONS) {
    try {
      const jobType = jobTypes[jobTypeIndex];
      const promptStyle = promptStyles[promptStyleIndex];
      
      console.log(`\nCreating job #${totalJobs + 1}/${LOCATIONS.length} in ${location.city}`);
      console.log(`Job Type: ${jobType}, Style: ${promptStyle}`);
      
      await createJob(location, jobType, promptStyle);

      // Cycle through job types and prompt styles
      jobTypeIndex = (jobTypeIndex + 1) % jobTypes.length;
      promptStyleIndex = (promptStyleIndex + 1) % promptStyles.length;
      totalJobs++;
      
    } catch (error) {
      console.error(`Error in ${location.city}:`, error);
    }
  }

  console.log('\nJob creation complete!');
  console.log(`Created ${totalJobs} Premier Electric jobs across ${LOCATIONS.length} locations`);
}

main().catch(console.error); 