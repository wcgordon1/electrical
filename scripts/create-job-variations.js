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

const PROMPTS = [
  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a DETAILED job description (800+ words) for an experienced {jobTitle}. Write this as if you are a Senior {jobTitle} explaining the role to potential candidates at {company} in {city}, {state}.

## About Our {jobTitle} Team
Start with a detailed paragraph about what it's like being a {jobTitle} at {company}, including our reputation in {city} and surrounding areas.

## The {jobTitle} Role
Explain what makes a successful {jobTitle} at our company:
- Day-to-day work environment
- Types of projects you'll handle as a {jobTitle}
- Team dynamics and leadership opportunities
- Career growth path for {jobTitle}s

## Essential {jobTitle} Duties
{responsibilities}
- Add 3-4 key {jobTitle} responsibilities
- Include local project examples
- Detail safety requirements

## Required {jobTitle} Experience
{qualifications}
- {experience} years as a {jobTitle}
- List critical technical skills
- Detail required certifications

## What We Offer Our {jobTitle}s
{benefits}
- Explain advancement opportunities
- Detail training programs
- List {jobTitle}-specific perks`,

  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a PRACTICAL job description (400-500 words) for a {jobTitle}. Write it like you're a foreman explaining the position to someone interested in joining {company} in {city}, {state}.

## Life as a {jobTitle}
Quick overview of what it's really like being a {jobTitle} here. Keep it straightforward.

## Your Daily Work as a {jobTitle}
{responsibilities}
- Add 2-3 typical {jobTitle} tasks
- Focus on hands-on work

## What Makes a Great {jobTitle}
{qualifications}
- {experience} years in the field
- List essential skills
- Highlight key traits

## Why Join Our {jobTitle} Team
{benefits}
- Focus on growth opportunities
- Highlight work-life balance`,

  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a DIRECT job description (200-300 words) for a {jobTitle}. Write it like a project manager who needs to fill this position at {company} in {city}, {state} quickly.

## {jobTitle} Overview
One strong paragraph about what we need in a {jobTitle}.

## Requirements for {jobTitle}
- {experience} years as a {jobTitle}
{qualifications}
- List must-have skills

## Key {jobTitle} Tasks
{responsibilities}
- Focus on essential duties

## Benefits for {jobTitle}s
{benefits}`,

  `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a CONCISE job description (200 words) for a {jobTitle} position at {company} in {city}, {state}.

## Quick Facts
- Role: {jobTitle}
- Experience: {experience} years as a {jobTitle}
- Location: {city}, {state}

## Core {jobTitle} Skills
{qualifications}

## Essential {jobTitle} Duties
{responsibilities}

## What We Offer
{benefits}`
];

const JOB_TYPES = {
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
    team: "Construction",
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
},

};

const COMPANIES = {
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
  'T&D Communications': {
    name: 'T&D Communications',
    sameAs: 'https://www.tanddcomm.com/',
    logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHzkB3k7eQoSQ/company-logo_200_200/company-logo_200_200/0/1631320385872?e=2147483647&v=beta&t=nuFy5lrwqoCuQ6_2P8hO_EwhwJlnndzcbM7ZPSfdKlM'
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

async function createJob(location, jobType, company, promptIndex) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  const prompt = PROMPTS[promptIndex]
    .replace('{prompt}', jobInfo.prompt)
    .replace('{qualifications}', jobInfo.qualifications)
    .replace('{responsibilities}', jobInfo.responsibilities)
    .replace('{experience}', jobInfo.yearsExperience)
    .replace('{city}', location.city)
    .replace('{state}', location.state)
    .replace('{company}', company.name)
    .replace('{benefits}', `- Competitive salary range: $${minValue}-$${maxValue} per hour depending on experience
- Comprehensive medical, dental, and vision coverage
- Paid time off and holidays
- Career advancement opportunities
- Ongoing training and certifications`);

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
    description: strippedDescription.substring(0, 500) + '...',
    location: `${location.city}, ${location.state}`,
    team: jobInfo.team,
    datePosted,
    validThrough,
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
      'Michael.Mckeaige@pes123.com',
    ]
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${description}`;
  
  const filename = generateFilename(company, jobType, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} for ${company.name} in ${location.city}: ${filename}`);
  
  // Add delay between API calls
  await new Promise(resolve => setTimeout(resolve, 2000));
}

async function main() {
  const jobTypes = Object.keys(JOB_TYPES);
  const companies = Object.values(COMPANIES);
  let jobTypeIndex = 0;
  let promptIndex = 0;
  let totalJobs = 0;

  // Process one location at a time
  for (const location of LOCATIONS) {
    try {
      // Pick one company for this location
      const company = companies[totalJobs % companies.length];
      const jobType = jobTypes[jobTypeIndex];
      
      console.log(`\nCreating job #${totalJobs + 1}/50 in ${location.city}`);
      console.log(`Company: ${company.name}, Job Type: ${jobType}, Prompt Style: ${promptIndex + 1}`);
      
      await createJob(location, jobType, company, promptIndex);

      // Move to next job type and prompt for next iteration
      jobTypeIndex = (jobTypeIndex + 1) % jobTypes.length;
      promptIndex = (promptIndex + 1) % PROMPTS.length;
      totalJobs++;
      
    } catch (error) {
      console.error(`Error in ${location.city}:`, error);
    }
  }

  console.log('\nJob creation complete!');
  console.log(`Created ${totalJobs} total jobs across ${LOCATIONS.length} locations`);
}

main().catch(console.error); 