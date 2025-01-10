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

Create a COMPREHENSIVE job description (800+ words) for an experienced ${jobType}. Write this as if you are a Senior ${jobType} with 20 years of experience creating a job post for ${company} in ${city}, ${state}.

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

Create a PRACTICAL job description (400-500 words) that focuses on the daily work life of a ${jobType}. Write it like a foreman explaining the ${jobType} position to a potential hire at ${company} in ${city}, ${state}.

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

Create a QUICK job description (200-300 words). Write it like a busy project manager needs this ${jobType} position filled ASAP at ${company} in ${city}, ${state}.

## ${jobType} Position Overview
One paragraph about what we need in a ${jobType} and what you'll do.

## Must Haves for ${jobType}
- ${experience} years experience as a ${jobType}
${qualifications}
- List top 3 requirements

## Key ${jobType} Duties
${responsibilities}
- Focus on main tasks only

## What We Offer Our ${jobType}s
${benefits}`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a BRIEF job description (200 words max) that's perfect for job boards. Seeking a ${jobType} at ${company} in ${city}, ${state}.

## Quick Facts
- Position: ${jobType}
- Experience: ${experience} years as a ${jobType}
- Location: ${city}, ${state}

## Background
${qualifications}

## Main Duties
${responsibilities}

## Benefits
${benefits}`
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}

const JOB_TYPES = {
  "Security Tech": {
    minValue: 27,
    maxValue: 32,
    experienceLevel: "entryLevel",
    category: "Security",
    team: "Commercial",
    yearsExperience: "1-3",
    responsibilities: "Install and configure IP cameras and access control systems, terminate low voltage cabling, program basic access devices, test system connectivity, troubleshoot security equipment, maintain installation logs, and liaise with clients for system demonstrations.",
    qualifications: "Experience installing security systems, familiarity with cable termination tools, understanding of basic networking protocols, proficiency with IP camera systems, strong attention to detail, and effective customer service skills.",
    prompt: "Create a job description for a Security Technician focusing on system installations and maintenance."
  },
  "Electrician": {
    minValue: 29,
    maxValue: 38,
    experienceLevel: "midLevel",
    category: "Journeyman",
    team: "Commercial",
    yearsExperience: "3-5",
    responsibilities: "Install and maintain commercial electrical systems, bend and install EMT and rigid conduit, troubleshoot electrical circuits using multimeters, wire and test lighting controls, replace and upgrade switchgear, install transformers, and oversee apprentices on job sites.",
    qualifications: "Proficiency with conduit benders and power tools, in-depth knowledge of NEC codes, ability to work on lifts and scaffolding, strong troubleshooting skills, experience with lighting control systems, and leadership capabilities to mentor apprentices.",
    prompt: "Create a job description for a Commercial Electrician focusing on installations and maintenance in commercial settings."
  },
  "Electrical Trainee": {
    minValue: 18,
    maxValue: 22,
    experienceLevel: "entryLevel",
    category: "Apprentice",
    team: "Commercial",
    yearsExperience: "0-3",
    responsibilities: "Support licensed electricians with wiring installations, assist in cutting and threading conduit, prepare materials for job sites, help with panel wiring and mounting, perform routine safety checks on tools and equipment, clean and organize work areas, and learn to read electrical schematics under supervision.",
    qualifications: "Basic familiarity with hand tools like wire strippers and voltage testers, strong willingness to learn on the job, ability to follow safety protocols, excellent teamwork and communication skills, and physical ability to lift up to 50 lbs and work in confined spaces.",
    prompt: "Create a job description for an Electrical Trainee focusing on supporting licensed electricians and learning the trade through hands-on experience."
  },
  "Apprentice Electrician": {
    minValue: 18,
    maxValue: 27,
    experienceLevel: "entryLevel",
    category: "Assistant",
    team: "Residential",
    yearsExperience: "0-2",
    responsibilities: "Assist with residential electrical installations, run and secure cables through walls and ceilings, prepare job site materials and tools, install basic fixtures like outlets and switches, provide support for troubleshooting and repairs, and maintain safety compliance on work sites.",
    qualifications: "Basic knowledge of residential wiring and circuits, ability to handle tools such as pliers and drills, strong attention to detail, good organizational skills, and reliable transportation to job sites.",
    prompt: "Create a job description for an Electrical Helper focusing on assisting with residential wiring and installations in homes."
  },
  "Cable Tech": {
    minValue: 23,
    maxValue: 30,
    experienceLevel: "seniorLevel",
    category: "Voice Data",
    team: "Commercial",
    yearsExperience: "3-5",
    responsibilities: "Install structured cabling systems including Cat5e, Cat6, and fiber optics, terminate and test fiber connections using Fluke equipment, install and dress network racks, set up cable tray systems, document as-built plans, and lead small project teams.",
    qualifications: "Extensive experience with structured cabling, proficiency in terminating fiber and copper, knowledge of TIA/EIA cabling standards, ability to read network blueprints, and organizational skills for managing tools and inventory.",
    prompt: "Create a job description for a Cable Tech focusing on structured cabling and fiber optic installations."
  },
  "Data Center Tech": {
    minValue: 24,
    maxValue: 32,
    experienceLevel: "seniorLevel",
    category: "Data Center",
    team: "Commercial",
    yearsExperience: "3-5",
    responsibilities: "Install and maintain server racks, route and secure high-density cabling, set up PDUs, perform cable testing using Fluke tools, document network layouts and connections, and adhere to strict data center cleanliness standards.",
    qualifications: "Experience in data center environments, knowledge of power and cooling systems, proficiency with cable testers, understanding of network configurations, and ability to follow precise documentation protocols.",
    prompt: "Create a job description for a Data Center Technician focusing on infrastructure and cabling installations."
  },
  "Electrician Helper": {
    minValue: 15,
    maxValue: 18,
    experienceLevel: "entryLevel",
    category: "Helper",
    team: "Commercial",
    yearsExperience: "0-2",
    responsibilities: "Assist with pulling wires through conduit, mount electrical boxes and fixtures, prepare and organize materials, maintain a clean job site, support tool maintenance, and help licensed electricians with on-site tasks.",
    qualifications: "Basic understanding of hand tools such as pliers and screwdrivers, ability to follow instructions, strong physical stamina, reliable work habits, and safety awareness for handling materials and equipment.",
    prompt: "Create a job description for an Electrician Helper focusing on assisting with installations and site work."
  },
  "Fire Alarm Installer": {
    minValue: 18,
    maxValue: 25,
    experienceLevel: "entryLevel",
    category: "Fire Systems",
    team: "Commercial",
    yearsExperience: "0-2",
    responsibilities: "Assist with the installation of fire alarm systems, pull and terminate low-voltage wiring, mount devices such as smoke detectors and pull stations, follow layout diagrams to route cables, ensure proper labeling of wires, perform basic testing of installed components, and maintain a clean job site.",
    qualifications: "Basic knowledge of hand tools like drills and cable strippers, familiarity with low-voltage wiring, strong attention to detail, ability to follow instructions and safety guidelines, and physical ability to lift up to 50 lbs and work on ladders.",
    prompt: "Create a job description for a Fire Alarm Installer focusing on assisting with the installation of low-voltage fire alarm systems in commercial buildings."
},
"Fire Alarm Technician": {
    minValue: 25,
    maxValue: 35,
    experienceLevel: "midLevel",
    category: "Fire Systems",
    team: "Commercial",
    yearsExperience: "3-5",
    responsibilities: "Install, maintain, and troubleshoot fire alarm systems, program fire alarm control panels, test system functionality to ensure compliance with local codes, inspect and repair devices such as smoke detectors and strobes, prepare detailed service reports, coordinate with building managers to schedule testing, and train end-users on system operation.",
    qualifications: "Experience with fire alarm systems and control panels, understanding of local fire codes and regulations, ability to troubleshoot and resolve system issues, familiarity with programming fire panels preferred, excellent communication skills, and attention to detail in documentation.",
    prompt: "Create a job description for a Fire Alarm Technician focusing on installation, maintenance, and programming of fire alarm systems for commercial properties."
}

};

const COMPANIES = {
  'MMR Group': {
    name: 'MMR Group',
    sameAs: 'https://www.mmrgrp.com/',
    logo: 'https://www.mmrgrp.com/assets/images/mmrlogo.svg'
  },
  'Rogers Electric': {
    name: 'Rogers Electric',
    sameAs: 'https://www.rogerselectric.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvt0RMRvj6bZdL81Q6HJeRVl_qflQIGgp9w&s'
  },
  'Staley Technologies': {
    name: 'Staley Technologies',
    sameAs: 'https://staleytechnologies.com/',
    logo: 'https://staleytechnologies.com/wp-content/uploads/2021/02/cropped-Logo_StaleyTechnologies.png'
  },
  'Reliable Electric': {
    name: 'Reliable Electric',
    sameAs: 'https://reliable-contractors.com/',
    logo: 'https://reliable-contractors.com/wp-content/uploads/2020/03/Reliable-Electric-Logo.jpg'
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
  'LEI Electrical': {
    name: 'LEI Electrical',
    sameAs: 'https://leielectricalcontractors.com/',
    logo: 'https://leielectricalcontractors.com/wp-content/uploads/2023/06/IMG_2720-e1686941081414-1024x614-1.png'
  },
  'AVI SPL': {
    name: 'AVI SPL',
    sameAs: 'https://avispl.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyraGCdDcBhUVCLjb9MI2McsVysMD7wjYlIQ&s'
  },
  'T&D Communications': {
    name: 'T&D Communications',
    sameAs: 'https://www.tanddcomm.com/',
    logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHzkB3k7eQoSQ/company-logo_200_200/company-logo_200_200/0/1631320385872?e=2147483647&v=beta&t=nuFy5lrwqoCuQ6_2P8hO_EwhwJlnndzcbM7ZPSfdKlM'
  },
  '3D Communications': {
    name: '3D Communications',
    sameAs: 'https://www.3dtsi.com/',
    logo: 'https://threedtsistage.wpenginepowered.com/wp-content/uploads/2021/01/logo-default.png'
  },
  'WiLine': {
    name: 'WiLine',
    sameAs: 'https://www.wiline.com/',
    logo: 'https://www.wiline.com/img/logo_blue.png'
  },
  'SRP Electric': {
    name: 'SRP Electric',
    sameAs: 'https://www.srpelectricinc.com/',
    logo: 'https://lirp.cdn-website.com/b7067fab/dms3rep/multi/opt/srp-electric-1920w.png'
  },
  'Convergint': {
    name: 'Convergint',
    sameAs: 'https://www.convergint.com/',
    logo: 'https://www.convergint.com/wp-content/uploads/2021/06/logo-on-dark-blue.png'
  },
  
};

const LOCATIONS = [{ "city": "San Francisco", "state": "CA", "zipCode": "94102" },
  { "city": "Oakland", "state": "CA", "zipCode": "94601" },
  { "city": "San Jose", "state": "CA", "zipCode": "95101" },
  { "city": "Berkeley", "state": "CA", "zipCode": "94704" },
  { "city": "Fremont", "state": "CA", "zipCode": "94536" },
  { "city": "Palo Alto", "state": "CA", "zipCode": "94301" },
  { "city": "Mountain View", "state": "CA", "zipCode": "94040" },
  { "city": "Sunnyvale", "state": "CA", "zipCode": "94085" },
  { "city": "Santa Clara", "state": "CA", "zipCode": "95050" },
  { "city": "Daly City", "state": "CA", "zipCode": "94015" },
  { "city": "Redwood City", "state": "CA", "zipCode": "94061" },
  { "city": "San Mateo", "state": "CA", "zipCode": "94401" },
  { "city": "Hayward", "state": "CA", "zipCode": "94541" },
  { "city": "Union City", "state": "CA", "zipCode": "94587" },
  { "city": "Milpitas", "state": "CA", "zipCode": "95035" },
  { "city": "Cupertino", "state": "CA", "zipCode": "95014" },
  { "city": "Gilroy", "state": "CA", "zipCode": "95020" },
  { "city": "Morgan Hill", "state": "CA", "zipCode": "95037" },
  { "city": "Los Gatos", "state": "CA", "zipCode": "95030" },
  { "city": "Campbell", "state": "CA", "zipCode": "95008" },
  { "city": "Saratoga", "state": "CA", "zipCode": "95070" },
  { "city": "Los Altos", "state": "CA", "zipCode": "94022" },
  { "city": "Menlo Park", "state": "CA", "zipCode": "94025" },
  { "city": "Atherton", "state": "CA", "zipCode": "94027" },
  { "city": "Belmont", "state": "CA", "zipCode": "94002" },
  { "city": "San Carlos", "state": "CA", "zipCode": "94070" },
  { "city": "Foster City", "state": "CA", "zipCode": "94404" },
  { "city": "Burlingame", "state": "CA", "zipCode": "94010" },
  { "city": "Millbrae", "state": "CA", "zipCode": "94030" },
  { "city": "South San Francisco", "state": "CA", "zipCode": "94080" },
  { "city": "Brisbane", "state": "CA", "zipCode": "94005" },
  { "city": "San Bruno", "state": "CA", "zipCode": "94066" },
  { "city": "Pacifica", "state": "CA", "zipCode": "94044" },
  { "city": "Half Moon Bay", "state": "CA", "zipCode": "94019" },
  { "city": "Richmond", "state": "CA", "zipCode": "94801" },
  { "city": "El Cerrito", "state": "CA", "zipCode": "94530" },
  { "city": "Albany", "state": "CA", "zipCode": "94706" },
  { "city": "Emeryville", "state": "CA", "zipCode": "94608" },
  { "city": "Piedmont", "state": "CA", "zipCode": "94611" },
  { "city": "Alameda", "state": "CA", "zipCode": "94501" },
  { "city": "San Leandro", "state": "CA", "zipCode": "94577" },
  { "city": "Castro Valley", "state": "CA", "zipCode": "94546" },
  { "city": "Pleasanton", "state": "CA", "zipCode": "94566" },
  { "city": "Livermore", "state": "CA", "zipCode": "94550" },
  { "city": "Dublin", "state": "CA", "zipCode": "94568" },
  { "city": "San Ramon", "state": "CA", "zipCode": "94582" },
  { "city": "Danville", "state": "CA", "zipCode": "94526" },
  { "city": "Walnut Creek", "state": "CA", "zipCode": "94596" },
  { "city": "Concord", "state": "CA", "zipCode": "94520" },
  { "city": "Martinez", "state": "CA", "zipCode": "94553" },
  { "city": "Pittsburg", "state": "CA", "zipCode": "94565" },
  { "city": "Antioch", "state": "CA", "zipCode": "94509" },
  { "city": "Brentwood", "state": "CA", "zipCode": "94513" },
  { "city": "Los Angeles", "state": "CA", "zipCode": "90001" },
  { "city": "Long Beach", "state": "CA", "zipCode": "90802" },
  { "city": "Glendale", "state": "CA", "zipCode": "91201" },
  { "city": "Santa Monica", "state": "CA", "zipCode": "90401" },
  { "city": "Burbank", "state": "CA", "zipCode": "91501" },
  { "city": "Pasadena", "state": "CA", "zipCode": "91101" },
  { "city": "Inglewood", "state": "CA", "zipCode": "90301" },
  { "city": "Culver City", "state": "CA", "zipCode": "90230" },
   { "city": "Torrance", "state": "CA", "zipCode": "90501" },
  { "city": "Carson", "state": "CA", "zipCode": "90745" },
  { "city": "Gardena", "state": "CA", "zipCode": "90247" },
  { "city": "Hawthorne", "state": "CA", "zipCode": "90250" },
  { "city": "Redondo Beach", "state": "CA", "zipCode": "90277" },
  { "city": "Hermosa Beach", "state": "CA", "zipCode": "90254" },
  { "city": "Manhattan Beach", "state": "CA", "zipCode": "90266" },
  { "city": "El Segundo", "state": "CA", "zipCode": "90245" },
  { "city": "Compton", "state": "CA", "zipCode": "90220" },
  { "city": "Downey", "state": "CA", "zipCode": "90241" },
  { "city": "Norwalk", "state": "CA", "zipCode": "90650" },
  { "city": "Whittier", "state": "CA", "zipCode": "90601" },
  { "city": "Pico Rivera", "state": "CA", "zipCode": "90660" },
  { "city": "Montebello", "state": "CA", "zipCode": "90640" },
  { "city": "Bell Gardens", "state": "CA", "zipCode": "90201" },
  { "city": "Huntington Park", "state": "CA", "zipCode": "90255" },
  { "city": "South Gate", "state": "CA", "zipCode": "90280" },
  { "city": "Lynwood", "state": "CA", "zipCode": "90262" },
  { "city": "Paramount", "state": "CA", "zipCode": "90723" },
  { "city": "Lakewood", "state": "CA", "zipCode": "90712" },
  { "city": "Bellflower", "state": "CA", "zipCode": "90706" },
  { "city": "Cerritos", "state": "CA", "zipCode": "90703" },
  { "city": "Artesia", "state": "CA", "zipCode": "90701" },
  { "city": "La Mirada", "state": "CA", "zipCode": "90638" },
  { "city": "Fullerton", "state": "CA", "zipCode": "92831" },
  { "city": "Anaheim", "state": "CA", "zipCode": "92805" },
  { "city": "Orange", "state": "CA", "zipCode": "92866" },
  { "city": "Santa Ana", "state": "CA", "zipCode": "92701" },
  { "city": "Tustin", "state": "CA", "zipCode": "92780" },
  { "city": "Irvine", "state": "CA", "zipCode": "92618" },
  { "city": "Costa Mesa", "state": "CA", "zipCode": "92627" },
  { "city": "Huntington Beach", "state": "CA", "zipCode": "92647" },
  { "city": "Newport Beach", "state": "CA", "zipCode": "92660" },
  { "city": "Laguna Beach", "state": "CA", "zipCode": "92651" },
  { "city": "Mission Viejo", "state": "CA", "zipCode": "92691" },
  { "city": "Aliso Viejo", "state": "CA", "zipCode": "92656" },
  { "city": "Laguna Niguel", "state": "CA", "zipCode": "92677" },
  { "city": "Lake Forest", "state": "CA", "zipCode": "92630" },
  { "city": "San Clemente", "state": "CA", "zipCode": "92672" },
  { "city": "Dana Point", "state": "CA", "zipCode": "92629" },
  { "city": "Rancho Santa Margarita", "state": "CA", "zipCode": "92688" },
  { "city": "Brea", "state": "CA", "zipCode": "92821" },
  { "city": "Yorba Linda", "state": "CA", "zipCode": "92886" },
  { "city": "Placentia", "state": "CA", "zipCode": "92870" },
  { "city": "Buena Park", "state": "CA", "zipCode": "90620" },
  { "city": "Garden Grove", "state": "CA", "zipCode": "92840" },
  { "city": "Westminster", "state": "CA", "zipCode": "92683" },
  { "city": "Fountain Valley", "state": "CA", "zipCode": "92708" }

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
- Paid time off and holidays
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