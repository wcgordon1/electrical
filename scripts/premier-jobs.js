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

// Prime Partners company info
const COMPANY = {
  name: 'Prime Partners',
  sameAs: 'https://www.primepartners.info/',
  logo: 'https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1-1.png'
};

// Dynamic prompts based on job type and style
const PROMPT_STYLES = {
  standard: {
    wordCount: 300,
    style: 'balanced and informative focusing on day to day tasks',
    tone: 'clear and engaging'
  },
  concise: {
    wordCount: 200,
    style: 'direct and focused like a project foreman talking to his crew',
    tone: 'straightforward and practical'
  },
  brief: {
    wordCount: 50,
    style: 'concise, to the point, and very direct',
    tone: 'direct and clear like a project foreman talking to his crew'
  }
};

function generatePromptA(jobType, jobInfo, location, style, salary) {
  const { wordCount, tone } = PROMPT_STYLES[style];
  
  return `Create a ${wordCount}-word ${tone} job description for a ${jobType} position at Prime Partners in ${location.city}, ${location.state}. Format in markdown using only h2 and h3 tags for headings. This description will be directly converted to HTML, so no markdown code blocks needed.

${jobInfo.prompt}

## About Prime Partners
Highlight our reputation in ${location.city} for excellence in contracting and large projects. Mention our focus on ${jobInfo.team} projects and commitment to quality.

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

Focus on Prime Partners commitment to employee growth, safety, and excellence in the electrical industry.`;
}

function generatePromptB(jobType, jobInfo, location, style, salary) {
  const { wordCount, tone } = PROMPT_STYLES[style];
  
  return `Write a ${wordCount}-word ${tone} job posting that feels more conversational and engaging. This is for a ${jobType} role at Prime Partners in ${location.city}, ${location.state}. Use only h2 and h3 markdown tags for headings, no code blocks needed.

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

End with a strong call to action that emphasizes Prime Partners commitment to employee development and long-term career growth. Make the reader feel excited about joining our team.`;
}

const JOB_TYPES = {
"Journeyman Electrician": {
      "minValue": 32,
      "maxValue": 42,
      "experienceLevel": "seniorLevel",
      "category": "Journeyman",
      "team": "Data Center",
      "yearsExperience": "4-6",
      "responsibilities": "Install, maintain, and troubleshoot electrical systems, including switchgear, UPS systems, and power distribution units (PDUs); ensure compliance with NEC and local electrical codes for data center construction and operations.",
      "qualifications": "Valid journeyman electrician license; experience with high-voltage systems, conduit bending, and data center electrical infrastructure; strong knowledge of safety protocols and electrical schematics.",
      "prompt": "Create a job description for a Journeyman Electrician specializing in electrical installations and maintenance for data center facilities."
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
      "prompt": "Create a job description for a Structured Cable Technician focusing on voice and data structured cabling installations and troubleshooting."
    },
"HVAC Technician": {
      "minValue": 30,
      "maxValue": 40,
      "experienceLevel": "midLevel",
      "category": "HVAC",
      "team": "Data Center",
      "yearsExperience": "3-5",
      "responsibilities": "Maintain, repair, and install HVAC systems to ensure optimal cooling for server rooms; monitor and troubleshoot airflow and environmental controls in large-scale data center environments.",
      "qualifications": "Experience with CRAC/CRAH units, precision cooling systems, and HVAC diagnostics; EPA certification and familiarity with data center cooling requirements.",
      "prompt": "Create a job description for an HVAC Technician specializing in maintaining and optimizing cooling systems for data center operations."
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
    "Fiber Optic Technician": {
      "minValue": 28,
      "maxValue": 36,
      "experienceLevel": "midLevel",
      "category": "Fiber Optics",
      "team": "Data Center",
      "yearsExperience": "2-4",
      "responsibilities": "Install, splice, and test fiber optic cables; manage fiber pathways and troubleshoot connectivity issues in large-scale data center environments.",
      "qualifications": "Proficiency in OTDR testing, fiber splicing, and termination techniques; experience with fiber management systems and adhering to industry standards.",
      "prompt": "Create a job description for a Fiber Optic Technician specializing in fiber installations and maintenance for data center projects."
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
},
"Access Control Technician": {
      "minValue": 25,
      "maxValue": 35,
      "experienceLevel": "midLevel",
      "category": "Security",
      "team": "Data Center",
      "yearsExperience": "2-4",
      "responsibilities": "Install, configure, and maintain access control systems, including badge readers, biometric scanners, and door hardware; troubleshoot and repair security devices to ensure secure operations in data center environments.",
      "qualifications": "Experience with access control systems such as Lenel, Honeywell, or HID; proficiency in low-voltage wiring and system integration; strong knowledge of security protocols and data center standards.",
      "prompt": "Create a job description for an Access Control Technician specializing in installing and maintaining physical security systems for data center facilities."
    },
    "Facilities Technician": {
      "minValue": 26,
      "maxValue": 34,
      "experienceLevel": "midLevel",
      "category": "Data Center",
      "team": "Facilities",
      "yearsExperience": "2-4",
      "responsibilities": "Perform routine inspections, maintenance, and repairs of data center infrastructure, including HVAC systems, electrical systems, and fire suppression systems; ensure operational efficiency and compliance with safety standards.",
      "qualifications": "Experience in facilities maintenance, including HVAC, electrical, and plumbing systems; familiarity with data center infrastructure management (DCIM) tools; strong problem-solving and troubleshooting skills.",
      "prompt": "Create a job description for a Facilities Technician specializing in maintaining and optimizing data center infrastructure and supporting day-to-day operations."
    }


  };

const LOCATIONS = [ 
  { "city": "Ashburn", "state": "VA", "zipCode": "20147" },
  { "city": "Leesburg", "state": "VA", "zipCode": "20175" },
  { "city": "Chantilly", "state": "VA", "zipCode": "20151" },
  { "city": "Richmond", "state": "VA", "zipCode": "23219" },
  { "city": "Santa Clara", "state": "CA", "zipCode": "95050" },
  { "city": "San Jose", "state": "CA", "zipCode": "95110" },
  { "city": "Fremont", "state": "CA", "zipCode": "94536" },
  { "city": "Dallas", "state": "TX", "zipCode": "75201" },
  { "city": "Plano", "state": "TX", "zipCode": "75023" },
  { "city": "Fort Worth", "state": "TX", "zipCode": "76102" },
  { "city": "Austin", "state": "TX", "zipCode": "78701" },
  { "city": "Chicago", "state": "IL", "zipCode": "60601" },
  { "city": "Aurora", "state": "IL", "zipCode": "60502" },
  { "city": "Naperville", "state": "IL", "zipCode": "60540" },
  { "city": "Secaucus", "state": "NJ", "zipCode": "07094" },
  { "city": "Piscataway", "state": "NJ", "zipCode": "08854" },
  { "city": "Edison", "state": "NJ", "zipCode": "08817" },
  { "city": "Phoenix", "state": "AZ", "zipCode": "85001" },
  { "city": "Mesa", "state": "AZ", "zipCode": "85201" },
  { "city": "Tempe", "state": "AZ", "zipCode": "85281" },
  { "city": "Atlanta", "state": "GA", "zipCode": "30301" },
  { "city": "Marietta", "state": "GA", "zipCode": "30060" },
  { "city": "Alpharetta", "state": "GA", "zipCode": "30004" },
  { "city": "Salt Lake City", "state": "UT", "zipCode": "84101" },
  { "city": "West Jordan", "state": "UT", "zipCode": "84084" },
  { "city": "Ogden", "state": "UT", "zipCode": "84401" },
  { "city": "Seattle", "state": "WA", "zipCode": "98101" },
  { "city": "Redmond", "state": "WA", "zipCode": "98052" },
  { "city": "Tacoma", "state": "WA", "zipCode": "98402" },
  { "city": "Denver", "state": "CO", "zipCode": "80201" },
  { "city": "Boulder", "state": "CO", "zipCode": "80301" },
  { "city": "Aurora", "state": "CO", "zipCode": "80010" },
  { "city": "Miami", "state": "FL", "zipCode": "33101" },
  { "city": "Orlando", "state": "FL", "zipCode": "32801" },
  { "city": "Tampa", "state": "FL", "zipCode": "33601" },
  { "city": "New York", "state": "NY", "zipCode": "10001" },
  { "city": "Buffalo", "state": "NY", "zipCode": "14201" },
  { "city": "Albany", "state": "NY", "zipCode": "12207" },
  { "city": "Las Vegas", "state": "NV", "zipCode": "89101" },
  { "city": "Henderson", "state": "NV", "zipCode": "89002" },
  { "city": "Reno", "state": "NV", "zipCode": "89501" },
  { "city": "Portland", "state": "OR", "zipCode": "97201" },
  { "city": "Hillsboro", "state": "OR", "zipCode": "97123" },
  { "city": "Salem", "state": "OR", "zipCode": "97301" },
  { "city": "Charlotte", "state": "NC", "zipCode": "28202" },
  { "city": "Raleigh", "state": "NC", "zipCode": "27601" },
  { "city": "Durham", "state": "NC", "zipCode": "27701" },
  { "city": "Columbus", "state": "OH", "zipCode": "43201" },
  { "city": "Cleveland", "state": "OH", "zipCode": "44101" },
  { "city": "Cincinnati", "state": "OH", "zipCode": "45201" }
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
  return `p-id-${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(title, location, jobId) {
  return `prime-data-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
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
    description: `Join our team at Prime Partners as a ${jobType} in ${location.city}, ${location.state}. ${strippedDescription}`,
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
      'support@primepartners.info'
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
  console.log(`Created ${totalJobs} Prime Partners jobs across ${LOCATIONS.length} locations`);
}

main().catch(console.error); 