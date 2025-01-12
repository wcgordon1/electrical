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

Create a QUICK job description (200 words). Write it like a busy project manager needs this ${jobType} position filled ASAP at ${company} in ${city}, ${state}.

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
${benefits}`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a BRIEF job description (200 words max) that's perfect for job boards. Seeking a ${jobType} at ${company} in ${city}, ${state}.

## Role Overview
- Position: ${jobType}
- Experience: ${experience} years as a ${jobType}
- Location: ${city}, ${state}

## Qualifications
${qualifications}

## Responsibilities
${responsibilities}`
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}

const JOB_TYPES = {
  "Security Technician": {
    "minValue": 22,
    "maxValue": 30,
    "experienceLevel": "entryLevel",
    "category": "Security",
    "team": "Commercial",
    "yearsExperience": "1-3",
    "responsibilities": "Install and configure IP cameras, access control systems, and motion sensors at commercial job sites. Pull and terminate low-voltage cables, including proper labeling and routing through conduits and cable trays. Mount and align security cameras and ensure proper field-of-view adjustments. Install and secure control panels, keypads, and card readers. Perform on-site functional testing of systems, including power and connectivity checks. Collaborate with general contractors and other trades to ensure installations meet site specifications. Maintain cleanliness and organization of tools, materials, and job sites.",
    "qualifications": "Experience installing security systems, familiarity with cable termination tools, understanding of basic networking protocols, proficiency with IP camera systems, strong attention to detail, and effective customer service skills.",
    "prompt": "Create a job description for a Security Technician focusing on system installations and maintenance."
  },
  "Electrician": {
    "minValue": 30,
    "maxValue": 38,
    "experienceLevel": "midLevel",
    "category": "Journeyman",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Perform installations of commercial electrical systems, including switchgear, panels, and transformers. Measure, cut, bend, and install EMT and rigid conduit accurately based on blueprints. Pull and terminate wires within conduits and boxes, ensuring secure and neat connections. Install and wire lighting fixtures, outlets, and power circuits. Perform testing and troubleshooting of circuits and electrical components using tools such as multimeters. Collaborate with other trades to plan and complete installations within project timelines. Ensure work areas are organized, clean, and compliant with safety standards.",
    "qualifications": "Proficiency with conduit benders and power tools, in-depth knowledge of NEC codes, ability to work on lifts and scaffolding, strong troubleshooting skills, experience with lighting control systems, and leadership capabilities to mentor apprentices.",
    "prompt": "Create a job description for a Commercial JourneymanElectrician focusing on installations and maintenance in commercial new constructionsettings."
  },
  "Apprentice Electrician": {
    "minValue": 18,
    "maxValue": 27,
    "experienceLevel": "entryLevel",
    "category": "Assistant",
    "team": "Residential",
    "yearsExperience": "0-2",
    "responsibilities": "Assist licensed electricians with the installation of residential electrical systems, including wiring for outlets, switches, and lighting fixtures. Pull and secure electrical cables through walls, attics, and crawl spaces. Set up and maintain job site tools and materials. Perform basic tasks such as mounting electrical boxes and preparing conduit for wiring. Help with labeling and organizing wires according to system plans. Maintain safety practices and a clean job site, ensuring all tools and debris are properly stored or disposed of. Shadow experienced electricians to learn proper techniques and methods.",
    "qualifications": "Basic knowledge of residential wiring and circuits, ability to handle tools such as pliers and drills, strong attention to detail, good organizational skills, and reliable transportation to job sites.",
    "prompt": "Create a job description for an Electrical Helper focusing on assisting with residential wiring and installations in homes."
  },
  "Cable Installer": {
    "minValue": 18,
    "maxValue": 28,
    "experienceLevel": "seniorLevel",
    "category": "Voice Data",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install structured cabling systems, including Cat5e, Cat6, and fiber optics, in new construction and retrofit environments. Terminate and test copper and fiber optic cables using precision tools and testers. Mount, secure, and label network racks and patch panels. Install cable tray and ladder rack systems, ensuring proper routing and support. Dress and bundle cables neatly to meet industry and site-specific standards. Read and follow construction blueprints and cabling diagrams to complete installations accurately. Coordinate with construction teams to integrate cabling systems with other infrastructure components.",
    "qualifications": "Extensive experience with structured cabling, proficiency in terminating fiber and copper, knowledge of TIA/EIA cabling standards, ability to read network blueprints, and organizational skills for managing tools and inventory.",
    "prompt": "Create a job description for a Voice and Data Structured Cable Technician focusing on structured cabling and fiber optic installations, terminating cat 5 and cat 6 cabling, patch panels, and network racks primarily in commercial new construction office buildings."
  },
  "Data Center Technician": {
    "minValue": 24,
    "maxValue": 32,
    "experienceLevel": "seniorLevel",
    "category": "Data Center",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install server racks and cabinets, ensuring proper alignment and anchoring. Route and secure high-density cabling within racks, overhead trays, and under-floor systems. Mount and connect power distribution units (PDUs) and manage cable pathways to ensure a clean and organized setup. Perform basic cable testing and labeling to maintain accuracy in data center documentation. Work closely with project managers and other trades to meet installation schedules. Maintain adherence to strict cleanliness and operational standards in the data center environment. Assist with material and inventory management to support ongoing projects.",
    "qualifications": "Experience in data center environments, knowledge of power and cooling systems, proficiency with cable testers, understanding of network configurations, and ability to follow precise documentation protocols.",
    "prompt": "Create a job description for a Data Center Technician focusing on infrastructure and cabling installations."
  },
  "Electrician Helper": {
    "minValue": 15,
    "maxValue": 18,
    "experienceLevel": "entryLevel",
    "category": "Apprentice",
    "team": "Commercial",
    "yearsExperience": "0-2",
    "responsibilities": "Support electricians by pulling wires through conduit systems, cutting and preparing conduit, and mounting electrical boxes. Organize and prepare materials and tools for daily tasks. Assist in assembling light fixtures and basic electrical components. Maintain cleanliness and organization on the job site, including debris removal. Ensure tools and materials are stored safely and returned to proper locations. Provide general assistance with measurements and marking layouts as directed by licensed electricians.",
    "qualifications": "Basic understanding of hand tools such as pliers and screwdrivers, ability to follow instructions, strong physical stamina, reliable work habits, and safety awareness for handling materials and equipment.",
    "prompt": "Create a job description for an Electrician Helper focusing on assisting with installations and site work."
  },
  "Alarm Installer": {
    "minValue": 18,
    "maxValue": 25,
    "experienceLevel": "entryLevel",
    "category": "Fire Alarm",
    "team": "Commercial",
    "yearsExperience": "0-2",
    "responsibilities": "Assist in the installation of fire alarm systems by pulling low-voltage wiring and securing it within conduits and cable trays. Mount devices such as smoke detectors, pull stations, and notification appliances according to layout plans. Perform labeling and basic testing of installed components under supervision. Prepare tools and materials for daily tasks and maintain a clean and safe work environment. Work closely with team members to ensure installations are completed on schedule.",
    "qualifications": "Basic knowledge of hand tools like drills and cable strippers, familiarity with low-voltage wiring, strong attention to detail, ability to follow instructions and safety guidelines, and physical ability to lift up to 50 lbs and work on ladders.",
    "prompt": "Create a job description for a Fire Alarm Installer focusing on assisting with the installation of low-voltage fire alarm systems in commercial office buildings."
  },
  "Fire Alarm Technician": {
    "minValue": 29,
    "maxValue": 38,
    "experienceLevel": "midLevel",
    "category": "Fire Alarm",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install, inspect, and troubleshoot fire alarm systems, ensuring all devices are mounted and wired according to layout plans. Perform system testing and adjustments to ensure proper functionality and compliance with site requirements. Route and secure low-voltage cabling in ceilings and walls. Coordinate with general contractors to integrate fire alarm systems with other building systems. Document work progress and maintain accurate records of installations and repairs. Provide basic on-site training for end-users on operating fire alarm systems.",
    "qualifications": "Experience with fire alarm systems and control panels, understanding of local fire codes and regulations, ability to troubleshoot and resolve system issues, familiarity with programming fire panels preferred, excellent communication skills, and attention to detail in documentation.",
    "prompt": "Create a job description for a Fire Alarm Technician focusing on installation, maintenance, and programming of fire alarm systems for commercial properties."
  },
  "Audio Visual Technician": {
    "minValue": 25,
    "maxValue": 34,
    "experienceLevel": "midLevel",
    "category": "Audio Visual",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install and set up audio-visual systems, including projectors, monitors, speakers, and microphones, in commercial environments. Route and terminate low-voltage cabling for AV components, ensuring proper labeling and connections. Mount and secure equipment such as displays, ceiling speakers, and wall control panels. Perform on-site system testing to verify sound quality, video clarity, and overall functionality. Troubleshoot connectivity and performance issues with AV systems and make necessary adjustments. Collaborate with construction teams to integrate AV systems into larger project plans. Document installation details, including wiring diagrams and equipment configurations, for future reference. Maintain organized tools, materials, and work areas on job sites.",
    "qualifications": "Experience with audio-visual installations, knowledge of AV system components and connectivity standards, proficiency in routing and terminating low-voltage cabling, attention to detail in mounting and alignment, and effective communication skills for client interactions.",
    "prompt": "Create a job description for an Audio Visual Technician focusing on installations, system setup, and troubleshooting in commercial settings."
}
};

const COMPANIES = {
  'MMR Group': {
    name: 'MMR Group',
    sameAs: 'https://www.mmrgrp.com/',
    logo: 'https://www.mmrgrp.com/assets/images/mmrlogo.svg'
  },
  'Staley Technologies': {
    name: 'Staley Technologies',
    sameAs: 'https://staleytechnologies.com/',
    logo: 'https://staleytechnologies.com/wp-content/uploads/2021/02/cropped-Logo_StaleyTechnologies.png'
  },
  'IES Electric': {
    name: 'IES Electric',
    sameAs: 'https://iesci.net/',
    logo: 'https://iesci.net/wp-content/uploads/2024/08/IES-Electrical-Logo-color.png'
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
  'Vision Technologies': {
    name: 'Vision Technologies',
    sameAs: 'https://www.visiontechnologies.com/',
    logo: 'https://www.visiontechnologies.com/themes/custom/vt/logo.svg'
  },
  'Tech Electronics': {
    name: 'Tech Electronics',
    sameAs: 'https://www.techelectronics.com/',
    logo: 'https://www.techelectronics.com/wp-content/uploads/2020/10/tech-electronics-logo.png'
  },
  'High Point Networks': {
    name: 'High Point Networks',
    sameAs: 'https://www.highpointnetworks.com/',
    logo: 'https://highpointnetworks.com/wp-content/uploads/2023/11/HPN-logo-fullColor-rgb.svg'
  },
  'M3 Technology': {
    name: 'M3 Technology',
    sameAs: 'https://m3tc.com/',
    logo: 'https://m3tc.com/wp-content/uploads/2020/09/m3svg2.svg'
  },
  'Enhanced Voice & Data': {
    name: 'Enhanced Voice & Data',
    sameAs: 'https://www.evdnetworks.com/',
    logo: 'https://le-cdn.hibuwebsites.com/96e0889d6ad24d76868742b04ea19ca4/dms3rep/multi/opt/enhanced-voice-and-data-networks-logo-530w.jpg'
  },
  'Inc Installs': {
    name: 'Inc Installs',
    sameAs: 'https://www.inc-installs.com/',
    logo: 'https://www.inc-installs.com/wp-content/uploads/2019/12/INC-Installs-Web-Logo.png'
  },
  'Direct Line': {
    name: 'Direct Connect',
    sameAs: 'https://www.dlci.net/',
    logo: 'https://cdn.freebiesupply.com/logos/thumbs/2x/direct-line-2-logo.png'
  },
  'Atek Communications': {
    name: 'Atek Communications',
    sameAs: 'https://www.atekcommunications.com/',
    logo: 'https://www.atekcommunications.com/images/gif/icclogo2000.gif'
  },
  'Shelby Communications': {
    name: 'Shelby Communications',
    sameAs: 'https://www.shelbycommunications.com/',
    logo: 'https://shelbycommunications.com/wp-content/uploads/2022/02/eQkSUiEUF9h03zP_TRYxMq9BEwyVxvd6tiQOkA.png'
  },
  'Texas Voice & Data': {
    name: 'Texas Voice & Data',
    sameAs: 'http://www.texasvoicedata.com/',
    logo: 'https://nebula.wsimg.com/3d01291556c12048b98053e61436463c?AccessKeyId=1694F521AED933792FFF&disposition=0&alloworigin=1'
  },
  'Teleco': {
    name: 'Teleco',
    sameAs: 'https://www.teleco.com/',
    logo: 'https://www.teleco.com/wp-content/uploads/2019/10/telecologo-2023.png'
  }
};

const LOCATIONS = [
  { "city": "Miami", "state": "FL", "zipCode": "33101" },
  { "city": "Orlando", "state": "FL", "zipCode": "32801" },
  { "city": "Tampa", "state": "FL", "zipCode": "33601" },
  { "city": "Jacksonville", "state": "FL", "zipCode": "32201" },
  { "city": "Fort Lauderdale", "state": "FL", "zipCode": "33301" },
  { "city": "Tallahassee", "state": "FL", "zipCode": "32301" },
  { "city": "Naples", "state": "FL", "zipCode": "34101" },
  { "city": "Sarasota", "state": "FL", "zipCode": "34230" },
  { "city": "Cape Coral", "state": "FL", "zipCode": "33904" },
  { "city": "Pensacola", "state": "FL", "zipCode": "32501" },
  { "city": "St. Petersburg", "state": "FL", "zipCode": "33701" },
  { "city": "Lakeland", "state": "FL", "zipCode": "33801" },
  { "city": "Melbourne", "state": "FL", "zipCode": "32901" },
  { "city": "Palm Bay", "state": "FL", "zipCode": "32905" },
  { "city": "Hialeah", "state": "FL", "zipCode": "33002" },
  { "city": "Delray Beach", "state": "FL", "zipCode": "33444" },
  { "city": "Boca Raton", "state": "FL", "zipCode": "33427" },
  { "city": "Hollywood", "state": "FL", "zipCode": "33019" },
  { "city": "Coral Springs", "state": "FL", "zipCode": "33065" },
  { "city": "Miami Beach", "state": "FL", "zipCode": "33139" },
  { "city": "Kissimmee", "state": "FL", "zipCode": "34741" },
  { "city": "West Palm Beach", "state": "FL", "zipCode": "33401" },
  { "city": "Port St. Lucie", "state": "FL", "zipCode": "34952" },
  { "city": "Gainesville", "state": "FL", "zipCode": "32601" },
  { "city": "Daytona Beach", "state": "FL", "zipCode": "32114" },
  { "city": "Clearwater", "state": "FL", "zipCode": "33755" },
  { "city": "Ocala", "state": "FL", "zipCode": "34470" },
  { "city": "Doral", "state": "FL", "zipCode": "33122" },
  { "city": "Altamonte Springs", "state": "FL", "zipCode": "32701" },
  { "city": "Sanford", "state": "FL", "zipCode": "32771" },
  { "city": "Winter Park", "state": "FL", "zipCode": "32789" },
  { "city": "Winter Haven", "state": "FL", "zipCode": "33880" },
  { "city": "Lake Worth", "state": "FL", "zipCode": "33460" },
  { "city": "Palm Coast", "state": "FL", "zipCode": "32137" },
  { "city": "Fort Myers", "state": "FL", "zipCode": "33901" },
  { "city": "North Miami", "state": "FL", "zipCode": "33161" },
  { "city": "Lehigh Acres", "state": "FL", "zipCode": "33936" },
  { "city": "Homestead", "state": "FL", "zipCode": "33030" },
  { "city": "Davie", "state": "FL", "zipCode": "33314" },
  { "city": "Houston", "state": "TX", "zipCode": "77001" },
  { "city": "Dallas", "state": "TX", "zipCode": "75201" },
  { "city": "Austin", "state": "TX", "zipCode": "78701" },
  { "city": "San Antonio", "state": "TX", "zipCode": "78201" },
  { "city": "Fort Worth", "state": "TX", "zipCode": "76101" },
  { "city": "El Paso", "state": "TX", "zipCode": "79901" },
  { "city": "Plano", "state": "TX", "zipCode": "75023" },
  { "city": "Arlington", "state": "TX", "zipCode": "76001" },
  { "city": "Corpus Christi", "state": "TX", "zipCode": "78401" },
  { "city": "Laredo", "state": "TX", "zipCode": "78040" },
  { "city": "Lubbock", "state": "TX", "zipCode": "79401" },
  { "city": "Irving", "state": "TX", "zipCode": "75038" },
  { "city": "Garland", "state": "TX", "zipCode": "75040" },
  { "city": "Frisco", "state": "TX", "zipCode": "75033" },
  { "city": "McKinney", "state": "TX", "zipCode": "75069" },
  { "city": "Killeen", "state": "TX", "zipCode": "76540" },
  { "city": "Pasadena", "state": "TX", "zipCode": "77501" },
  { "city": "Midland", "state": "TX", "zipCode": "79701" },
  { "city": "Amarillo", "state": "TX", "zipCode": "79101" },
  { "city": "Brownsville", "state": "TX", "zipCode": "78520" },
  { "city": "Sugar Land", "state": "TX", "zipCode": "77478" },
  { "city": "Pearland", "state": "TX", "zipCode": "77581" },
  { "city": "College Station", "state": "TX", "zipCode": "77840" },
  { "city": "Round Rock", "state": "TX", "zipCode": "78664" },
  { "city": "Odessa", "state": "TX", "zipCode": "79760" },
  { "city": "Beaumont", "state": "TX", "zipCode": "77701" },
  { "city": "Carrollton", "state": "TX", "zipCode": "75006" },
  { "city": "Abilene", "state": "TX", "zipCode": "79601" },
  { "city": "Waco", "state": "TX", "zipCode": "76701" },
  { "city": "Denton", "state": "TX", "zipCode": "76201" },
  { "city": "Atlanta", "state": "GA", "zipCode": "30301" },
  { "city": "Augusta", "state": "GA", "zipCode": "30901" },
  { "city": "Savannah", "state": "GA", "zipCode": "31401" },
  { "city": "Athens", "state": "GA", "zipCode": "30601" },
  { "city": "Sandy Springs", "state": "GA", "zipCode": "30328" },
  { "city": "Macon", "state": "GA", "zipCode": "31201" },
  { "city": "Roswell", "state": "GA", "zipCode": "30075" },
  { "city": "Marietta", "state": "GA", "zipCode": "30060" },
  { "city": "Alpharetta", "state": "GA", "zipCode": "30009" },
  { "city": "Warner Robins", "state": "GA", "zipCode": "31088" },
  { "city": "Valdosta", "state": "GA", "zipCode": "31601" },
  { "city": "Dalton", "state": "GA", "zipCode": "30720" },
  { "city": "Peachtree City", "state": "GA", "zipCode": "30269" },
  { "city": "Columbus", "state": "GA", "zipCode": "31901" },
  { "city": "Gainesville", "state": "GA", "zipCode": "30501" },
  { "city": "Charleston", "state": "SC", "zipCode": "29401" },
  { "city": "Columbia", "state": "SC", "zipCode": "29201" },
  { "city": "Greenville", "state": "SC", "zipCode": "29601" },
  { "city": "Mount Pleasant", "state": "SC", "zipCode": "29464" },
  { "city": "North Charleston", "state": "SC", "zipCode": "29405" },
  { "city": "Rock Hill", "state": "SC", "zipCode": "29730" },
  { "city": "Summerville", "state": "SC", "zipCode": "29483" },
  { "city": "Hilton Head Island", "state": "SC", "zipCode": "29928" },
  { "city": "Florence", "state": "SC", "zipCode": "29501" },
  { "city": "Spartanburg", "state": "SC", "zipCode": "29301" },
  { "city": "Anderson", "state": "SC", "zipCode": "29621" },
  { "city": "Beaufort", "state": "SC", "zipCode": "29902" },
  { "city": "Greenwood", "state": "SC", "zipCode": "29646" },
  { "city": "Aiken", "state": "SC", "zipCode": "29801" },
  { "city": "Greer", "state": "SC", "zipCode": "29650" }
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