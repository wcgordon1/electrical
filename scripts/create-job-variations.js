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

function generatePrompt(jobType, company, city, state, responsibilities, qualifications, experience, benefits) {
  const prompts = [
    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a COMPREHENSIVE job description (800+ words) for an experienced ${jobType}. Write this as if you are a Senior ${jobType} with 20 years of experience creating a job post for ${company} for a multi-year project in ${city}, ${state} with additional projects near ${city} (list neighboring cities to ${city}).

## About Our ${jobType} Team
Start with a detailed paragraph about working as a ${jobType} at ${company}, our reputation in ${city}, and the types of projects our ${jobType}s handle. Mention surrounding cities we work in.

## The ${jobType} Position
Write a thorough overview of being a ${jobType} on our team, focusing on:
- Day-to-day responsibilities of a ${jobType}
- Types of projects and environments you'll work in
- Team structure and supervision
- Growth potential within ${company}

## Core ${jobType} Responsibilities
${responsibilities}
- Add 3-4 advanced technical duties specific to a ${jobType}
- Include regional project specifics
- Detail safety protocols

## Required Experience & Skills
${qualifications}
- ${experience} years minimum experience as a ${jobType}
- List essential certifications
- Detail required technical knowledge

## Tools & Equipment
- List specific tools used daily by our ${jobType}s
- Detail required personal tools
- Explain company-provided equipment

## Physical Requirements
- Detail lifting requirements for a ${jobType}
- Explain working conditions
- List safety gear needed

## Training & Development
- Describe ${jobType} mentorship program
- List available certifications
- Detail career advancement path

## Compensation Package
${benefits}
- Explain overtime policies
- Detail tool allowances
- List additional perks`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a PRACTICAL job description (400-500 words) that focuses on the daily work life of a ${jobType}. Write it like a foreman explaining the ${jobType} position to a potential hire at ${company} for a multi-year project in ${city}, ${state} with additional projects near ${city} (list neighboring cities to ${city})..

## What You'll Do as a ${jobType}
Quick overview of the ${jobType} role and our current projects in ${city}. Keep it real and straightforward about what a ${jobType} does day-to-day.

## Your Daily Tasks as a ${jobType}
${responsibilities}
- Add 2-3 common daily ${jobType} activities
- Focus on practical work examples

## What You Need to Be a ${jobType}
${qualifications}
- ${experience} years in the field as a ${jobType}
- List must-have skills
- Focus on hands-on abilities

## Compensation
${benefits}
- Highlight key benefits for ${jobType}s
- Mention training opportunities`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a QUICK job description (200 words). Write it like a busy project manager needs this ${jobType} position filled ASAP at ${company} in ${city}, ${state} for long term projects.

## ${jobType} Position Overview
One paragraph about what we need in a ${jobType} and what you'll do.

## Qualifications for ${jobType}
- ${experience} years experience as a ${jobType}
${qualifications}
- List top 3 requirements

## Responsibilities for ${jobType}
${responsibilities}
- Focus on main tasks only

## What We Offer Our ${jobType}s
${benefits}`
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}

const JOB_TYPES = {
  "Journeyman Electrician": {
  "minValue": 32,
  "maxValue": 39,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "5+",
  "responsibilities": "Install and maintain complex electrical systems in new hospital construction projects, including patient rooms, operating theaters, and critical care units. Route, bend, and install conduit (EMT, rigid) to support high-density wiring requirements for medical-grade equipment. Ensure proper grounding and bonding of all systems in compliance with NEC and hospital-specific codes. Collaborate with engineers and medical equipment specialists to ensure power systems meet design specifications and safety standards. Perform load calculations and install service equipment, emergency power systems, and backup generators. Supervise apprentices, ensuring adherence to safety protocols and quality workmanship. Troubleshoot and test critical electrical systems, including fire alarm circuits, nurse call systems, and life safety equipment.",
  "qualifications": "Must have a valid California Journeyman Certification from the Department of Industrial Relations. Extensive knowledge of NEC and healthcare-specific electrical standards. Experience with emergency power systems, backup generators, and life safety circuits. Ability to read and interpret complex blueprints, electrical schematics, and technical manuals. Proficiency with diagnostic tools such as multimeters and megohmmeters. Strong communication skills and ability to collaborate with diverse teams in high-pressure environments.",
  "prompt": "Create a job description for a Certified Journeyman Electrician specializing in new hospital construction. Emphasize the installation and maintenance of critical healthcare systems, compliance with medical-grade standards, and leadership in mentoring apprentices. Must have a valid California Journeyman Certification from the Department of Industrial Relations."
},
"Journeyman Electrician": {
  "minValue": 33,
  "maxValue": 40,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "5+",
  "responsibilities": "Install and maintain electrical systems in high-rise office buildings, focusing on power distribution, lighting systems, and tenant build-outs. Perform conduit installation (EMT, rigid) through walls, ceilings, and floors of high-rise structures. Pull, label, and terminate wiring for lighting systems, outlets, and high-voltage panels. Collaborate with general contractors and building management to ensure compliance with building codes and construction schedules. Conduct system testing, troubleshooting, and commissioning for tenant-specific electrical installations. Install and configure building automation systems, including lighting controls and energy management systems. Supervise and mentor apprentices, ensuring quality and safety on the job site.",
  "qualifications": "Must have a valid California Journeyman Certification from the Department of Industrial Relations. Strong knowledge of NEC and California Building Code requirements for high-rise structures. Proficiency in conduit bending, wiring, and troubleshooting commercial electrical systems. Experience with building automation systems and energy-efficient technologies. Ability to read and interpret blueprints, tenant improvement plans, and construction documents. Strong organizational and leadership skills for managing apprentices and site activities.",
  "prompt": "Create a job description for a Certified Journeyman Electrician focusing on electrical installations in high-rise office buildings. Highlight responsibilities in power distribution, tenant build-outs, and building automation systems while ensuring compliance with California DIR certification. Must have a valid California Journeyman Certification from the Department of Industrial Relations."
},
"Journeyman Electrician": {
  "minValue": 34,
  "maxValue": 42,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "4+",
  "responsibilities": "Install, maintain, and troubleshoot electrical systems for large-scale data centers, ensuring consistent uptime and reliability. Perform conduit installation and cable routing for high-density server environments, including under-floor systems and cable trays. Install and test uninterruptible power supply (UPS) systems, switchgear, and high-voltage transformers. Collaborate with engineers to ensure electrical systems meet design specifications for redundancy and scalability. Conduct load calculations and install backup generators and battery storage systems. Implement grounding and bonding practices to minimize system disruptions. Supervise apprentices and ensure strict adherence to safety standards in high-risk environments. Maintain detailed documentation of electrical installations, test results, and maintenance schedules.",
  "qualifications": "Must have a valid California Journeyman Certification from the Department of Industrial Relations. Strong knowledge of NEC and electrical systems for data centers, including UPS and backup generators. Proficiency in conduit installation, wiring, and troubleshooting high-voltage equipment. Ability to read and interpret technical blueprints, wiring diagrams, and schematics. Experience working in high-security, controlled environments such as data centers. Strong leadership and problem-solving skills with a focus on maintaining uptime.",
  "prompt": "Create a job description for a Certified Journeyman Electrician specializing in data center electrical systems. Focus on responsibilities like UPS installation, high-voltage equipment maintenance, and collaboration with engineers to ensure system reliability and scalability. Must have a valid California Journeyman Certification from the Department of Industrial Relations."
},
"Journeyman Electrician": {
  "minValue": 30,
  "maxValue": 35,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "4+",
  "responsibilities": "Install, maintain, and troubleshoot renewable energy systems for commercial properties, including solar panels, energy storage systems, and inverters. Route and install conduit (EMT, rigid) and wiring for high-voltage DC and AC systems. Perform system testing and commissioning for solar arrays, ensuring optimal energy output and compliance with local regulations. Collaborate with engineers and project managers to design and implement energy-efficient electrical solutions. Install and maintain battery energy storage systems (BESS) and integrate them with building power systems. Conduct preventive maintenance on renewable energy equipment, including replacing faulty components and ensuring proper grounding. Supervise apprentices, ensuring adherence to safety standards and proper installation techniques. Prepare detailed reports on system performance and maintenance activities.",
  "qualifications": "Must have a valid California Journeyman Certification from the Department of Industrial Relations. Extensive knowledge of NEC and renewable energy codes, including solar and battery storage regulations. Experience with solar panel installations, inverters, and high-voltage DC systems. Proficiency with multimeters, megohmmeters, and other diagnostic tools. Ability to read and interpret blueprints, electrical schematics, and energy system diagrams. Strong problem-solving skills and attention to detail for troubleshooting and system optimization.",
  "prompt": "Create a job description for a Certified Journeyman Electrician specializing in renewable energy systems for commercial properties. Focus on solar panel installations, energy storage integration, and system commissioning. Highlight the importance of NEC compliance and California DIR certification."
}

};

const COMPANIES = {
  'TEC Electric': {
    name: 'TEC Electric',
    sameAs: 'https://tec-electric.com/',
    logo: 'https://tec-electric.com/wp-content/themes/tec-electric/imgs/tec-logo.png'
  },
  'Howell Electric': {
    name: 'Howell Electric',
    sameAs: 'https://www.howellelectric.com/',
    logo: 'https://howellelectric.com/live/wp-content/uploads/2019/04/Howell-logo-img.png'
  },
  'Rex Moore Electric': {
    name: 'Rex Moore Electric',
    sameAs: 'https://www.rexmoore.com/',
    logo: 'https://www.rexmoore.com/wp-content/uploads/2022/03/100-years.png'
  },
  'Helix Electric': {
    name: 'Helix Electric',
    sameAs: 'https://www.helixelectric.com/',
    logo: 'https://www.helixelectric.com/wp-content/uploads/2022/07/Helping-Hands-Logo_Blue-e1656694113799.jpg'
  },
  'IES Electric': {
    name: 'IES Electric',
    sameAs: 'https://iesci.net/',
    logo: 'https://iesci.net/wp-content/uploads/2024/08/IES-Electrical-Logo-color.png'
  },
  'MMR Group': {
    name: 'MMR Group',
    sameAs: 'https://www.mmrgrp.com/',
    logo: 'https://www.mmrgrp.com/assets/images/mmrlogo.svg'
  },
  'Teleco': {
    name: 'Teleco',
    sameAs: 'https://www.teleco.com/',
    logo: 'https://www.teleco.com/wp-content/uploads/2019/10/telecologo-2023.png'
  },
  'FSG': {
    name: 'FSG',
    sameAs: 'https://www.fsg.com/',
    logo: 'https://fsg.com/wp-content/uploads/2020/10/fsgLogoUpdated@2x-1-2.png'
  }
};

const LOCATIONS = [
  { city: 'Culver City', state: 'CA', zipCode: '90230' },
{ city: 'Santa Monica', state: 'CA', zipCode: '90401' },
{ city: 'Burbank', state: 'CA', zipCode: '91501' },
{ city: 'Pasadena', state: 'CA', zipCode: '91101' },
{ city: 'Long Beach', state: 'CA', zipCode: '90802' },
{ city: 'Torrance', state: 'CA', zipCode: '90501' },
{ city: 'San Pedro', state: 'CA', zipCode: '90731' },
{ city: 'Glendale', state: 'CA', zipCode: '91203' },
{ city: 'Inglewood', state: 'CA', zipCode: '90301' },
{ city: 'Hawthorne', state: 'CA', zipCode: '90250' },
{ city: 'Anaheim', state: 'CA', zipCode: '92801' },
{ city: 'Santa Ana', state: 'CA', zipCode: '92701' },
{ city: 'Irvine', state: 'CA', zipCode: '92618' },
{ city: 'Huntington Beach', state: 'CA', zipCode: '92646' },
{ city: 'Fullerton', state: 'CA', zipCode: '92831' },
{ city: 'Orange', state: 'CA', zipCode: '92865' },
{ city: 'San Diego', state: 'CA', zipCode: '92101' },
{ city: 'Chula Vista', state: 'CA', zipCode: '91910' },
{ city: 'Escondido', state: 'CA', zipCode: '92025' },
{ city: 'Oceanside', state: 'CA', zipCode: '92054' },
{ city: 'Carlsbad', state: 'CA', zipCode: '92008' },
{ city: 'Fresno', state: 'CA', zipCode: '93721' },
{ city: 'Clovis', state: 'CA', zipCode: '93612' },
{ city: 'Bakersfield', state: 'CA', zipCode: '93301' },
{ city: 'San Jose', state: 'CA', zipCode: '95112' },
{ city: 'Santa Clara', state: 'CA', zipCode: '95050' },
{ city: 'Sunnyvale', state: 'CA', zipCode: '94086' },
{ city: 'Palo Alto', state: 'CA', zipCode: '94301' },
{ city: 'San Mateo', state: 'CA', zipCode: '94401' },
{ city: 'Oakland', state: 'CA', zipCode: '94612' },
{ city: 'Berkeley', state: 'CA', zipCode: '94704' },
{ city: 'Richmond', state: 'CA', zipCode: '94804' },
{ city: 'San Francisco', state: 'CA', zipCode: '94103' },
{ city: 'Daly City', state: 'CA', zipCode: '94015' },
{ city: 'Sacramento', state: 'CA', zipCode: '95814' },
{ city: 'Elk Grove', state: 'CA', zipCode: '95757' },
{ city: 'Roseville', state: 'CA', zipCode: '95678' },
{ city: 'Riverside', state: 'CA', zipCode: '92501' },
{ city: 'San Bernardino', state: 'CA', zipCode: '92401' },
{ city: 'Ontario', state: 'CA', zipCode: '91761' },
{ city: 'Rancho Cucamonga', state: 'CA', zipCode: '91730' },
{ city: 'Palm Springs', state: 'CA', zipCode: '92262' },
{ city: 'Santa Rosa', state: 'CA', zipCode: '95401' },
{ city: 'Redding', state: 'CA', zipCode: '96001' },
{ city: 'Modesto', state: 'CA', zipCode: '95354' },
{ city: 'Stockton', state: 'CA', zipCode: '95202' },
{ city: 'Chico', state: 'CA', zipCode: '95928' },
{ city: 'Visalia', state: 'CA', zipCode: '93277' },
{ city: 'San Luis Obispo', state: 'CA', zipCode: '93401' }
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

function generateJobId(company, type, variant) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s?/g, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/`{1,3}/g, '') // Remove code blocks
    .replace(/\[|\]/g, '') // Remove link brackets
    .replace(/\(.*?\)/g, '') // Remove link URLs
    .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  const benefits = `- Competitive salary range: $${minValue}-$${maxValue} per hour depending on experience
- Career advancement opportunities
- Ongoing training and certifications`;

  // Generate the prompt using our new function
  const selectedPrompt = generatePrompt(
    jobType,
    company.name,
    location.city,
    location.state,
    jobInfo.responsibilities,
    jobInfo.qualifications,
    jobInfo.yearsExperience,
    benefits
  );

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: selectedPrompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  const jobData = {
    position: jobType,
    description: `${fullDescription.substring(0, 500)}...`,
    location: `${location.city}, ${location.state}`,
    team: jobInfo.team,
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: company.name,
      sameAs: company.sameAs,
      logo: company.logo
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
      value: Number(((minValue + maxValue) / 2).toFixed(2)),
      minValue: minValue,
      maxValue: maxValue,
      unitText: 'HOUR'
    },
    experienceRequirements: jobInfo.experienceLevel,
    occupationalCategory: jobInfo.category,
    identifier: {
      name: company.name,
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'support@primepartners.info'
    ]
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = generateFilename(company, jobType, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} for ${company.name} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  const companies = Object.values(COMPANIES);
  const jobTypes = Object.keys(JOB_TYPES);
  let jobTypeIndex = 0;
  let companyIndex = 0;
  let totalJobs = 0;
  
  for (const location of LOCATIONS) {
    try {
      // Cycle through companies and job types
      const company = companies[companyIndex];
      const jobType = jobTypes[jobTypeIndex];
      
      console.log(`\nCreating job #${totalJobs + 1}/${LOCATIONS.length}`);
      console.log(`Location: ${location.city}, ${location.state}`);
      console.log(`Company: ${company.name}`);
      console.log(`Position: ${jobType}`);
      
      await createJob(location, jobType, company);
      
      // Update indexes for next iteration
      jobTypeIndex = (jobTypeIndex + 1) % jobTypes.length;
      if (jobTypeIndex === 0) {
        companyIndex = (companyIndex + 1) % companies.length;
      }
      
      totalJobs++;
      
      // Add delay between API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error creating job in ${location.city}:`, error);
    }
  }
  
  console.log('\nJob creation complete!');
  console.log(`Created ${totalJobs} jobs across ${LOCATIONS.length} locations`);
}

createAllJobs().catch(console.error); 