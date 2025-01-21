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
    "minValue": 28,
    "maxValue": 34,
    "experienceLevel": "midLevel",
    "category": "Journeyman",
    "team": "Commercial",
    "yearsExperience": "5+",
    "responsibilities": "Install and maintain advanced electrical systems in high-rise office buildings and large-scale commercial projects. Perform precise routing, bending, and securing of conduit (EMT, rigid, and PVC) to support complex wiring layouts. Assemble and install switchgear, distribution panels, and motor control centers. Read and interpret blueprints and specifications to ensure proper placement of electrical components. Conduct on-site load calculations for lighting and power systems. Supervise apprentices during wiring and panel installations, ensuring adherence to project timelines and safety standards. Troubleshoot and resolve electrical issues in newly installed systems, including power distribution and lighting controls.",
    "qualifications": "Proficient in advanced conduit bending techniques, including offsets and saddles. Skilled in the use of hand and power tools for installing electrical systems. Strong ability to read and apply electrical blueprints and technical documentation. Experienced in installing and maintaining lighting controls, motor controls, and distribution equipment. Capable of leading teams and managing job site workflows to meet deadlines.",
    "prompt": "Create a job description for a Journeyman Electrician specializing in large commercial projects, focusing on advanced conduit work, distribution systems, and team supervision in California."
  },
  "Apprentice Electrician": {
    "minValue": 18,
    "maxValue": 22,
    "experienceLevel": "entryLevel",
    "category": "Apprentice",
    "team": "Commercial",
    "yearsExperience": "1-4",
    "responsibilities": "Assist in installing electrical systems for large-scale retail and warehouse facilities. Run and secure conduit (EMT and PVC) under the guidance of journeymen. Pull, terminate, and label wiring for lighting and power circuits. Help install and test control systems for HVAC, security, and automated doors. Prepare work areas by organizing tools, equipment, and materials for efficient operations. Follow blueprints and detailed instructions to assist with lighting installations and equipment wiring. Learn to troubleshoot basic issues in electrical circuits and control systems.",
    "qualifications": "Ability to handle and install conduit and wiring in a structured environment. Comfortable working at heights on ladders and lifts. Strong organizational skills to manage tools and job site materials. Eager to learn the basics of control systems and power distribution. Capable of following detailed instructions while adhering to safety standards.",
    "prompt": "Create a job description for an entry-level Apprentice Electrician working on retail and warehouse projects. Focus on assisting with conduit, wiring, and control system installations in California."
  },
  "Security Alarm Installer": {
    "minValue": 23,
    "maxValue": 28,
    "experienceLevel": "entryLevel",
    "category": "Security",
    "team": "Commercial",
    "yearsExperience": "1-3",
    "responsibilities": "Install and integrate security alarm systems for large commercial properties and multi-unit residential buildings. Mount and configure motion sensors, glass break detectors, and door/window contacts. Program security systems to integrate with building access control systems. Test alarm systems for functionality, ensuring all zones and devices operate correctly. Conduct system walk-throughs with clients, explaining operational features and settings. Repair or replace damaged components, including wiring and sensors. Maintain accurate records of installation work, including device locations and programming details.",
    "qualifications": "Hands-on experience with low-voltage wiring, including terminations and splicing. Strong technical skills in configuring alarm panels and access control systems. Proficient in using diagnostic tools to troubleshoot wiring and device issues. Able to follow technical diagrams and blueprints to place and connect devices. Strong customer communication skills for client walk-throughs and education.",
    "prompt": "Create a job description for a Security Alarm Installer specializing in large commercial and multi-unit residential installations. Emphasize system integration, testing, and troubleshooting in California."
  },
  "Fire Alarm Installer": {
    "minValue": 23,
    "maxValue": 26,
    "experienceLevel": "midLevel",
    "category": "Fire Alarm",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install fire alarm systems in high-density commercial and industrial buildings. Run conduit and pull fire-rated cables to support system installations. Mount and connect control panels, notification devices, smoke detectors, and heat sensors. Conduct functional testing of fire alarm systems to verify compliance with California building codes. Coordinate with HVAC and sprinkler contractors to integrate fire alarm systems into building safety networks. Repair or replace faulty components to maintain system reliability. Document installation details and system configurations for inspection and customer records.",
    "qualifications": "Expertise in installing and maintaining fire alarm control panels and field devices. Skilled in pulling fire-rated wiring and connecting notification devices. Familiar with testing and troubleshooting tools for fire alarm systems. Strong ability to interpret building plans and system schematics for integration. Able to manage multiple installation projects with tight deadlines.",
    "prompt": "Create a job description for a Fire Alarm Installer specializing in high-density commercial and industrial installations. Focus on system integration, code compliance, and troubleshooting in California."
  },
  "Apprentice Electrician ": {
    "minValue": 18,
    "maxValue": 22,
    "experienceLevel": "entryLevel",
    "category": "Apprentice",
    "team": "Renewable Energy",
    "yearsExperience": "1-4",
    "responsibilities": "Support the installation of rooftop solar arrays, battery systems, and EV chargers on commercial properties. Assist in running and securing conduit for DC wiring from solar modules to inverters. Perform basic wiring tasks, such as terminating PV modules and connecting battery storage systems. Learn to test and troubleshoot solar inverters and monitoring systems under supervision. Coordinate material preparation, including pre-assembling racking systems and ensuring tools are organized. Follow safety procedures for rooftop work and use of fall protection equipment.",
    "qualifications": "Understanding of basic electrical principles, including DC power systems. Willingness to work outdoors on rooftops in varying weather conditions. Ability to follow technical instructions for assembling and wiring renewable energy systems. Strong organizational skills for material handling and job site preparation. Comfortable working with hand tools and basic testing equipment.",
    "prompt": "Create a job description for an entry-level Apprentice Electrician focusing on renewable energy installations, including solar and EV chargers. Emphasize system assembly, wiring, and safety procedures in California."
  },
  "Cable Puller": {
    "minValue": 17,
    "maxValue": 22,
    "experienceLevel": "entryLevel",
    "category": "Voice Data",
    "team": "Commercial",
    "yearsExperience": "2+",
    "responsibilities": "Assist in installing low voltage cabling for data centers and office networks, including Ethernet and fiber optic cables. Terminate cables with jacks and patch panels to ensure a reliable connection. Install cable pathways, including trays and raceways, for structured cabling systems. Perform testing and certification of installed cables using network testing equipment. Work with project managers to document cable runs and labeling for system maps. Troubleshoot network connectivity issues during installation and final commissioning.",
    "qualifications": "Proficiency in handling and terminating Cat5e, Cat6, and fiber optic cables. Skilled in using hand tools and cable testing devices. Knowledge of cable management techniques for professional installations. Strong problem-solving skills for addressing connectivity issues. Physical ability to work in confined spaces and elevated environments.",
    "prompt": "Create a job description for an entry-level Low Voltage Cable Technician focusing on data center and office network installations. Emphasize structured cabling, troubleshooting, and system documentation in California."
  },
  "Electrician Helper": {
  "minValue": 16,
  "maxValue": 20,
  "experienceLevel": "entryLevel",
  "category": "Helper",
  "team": "Construction",
  "yearsExperience": "0-2",
  "responsibilities": "Assist electricians in installing and maintaining electrical systems in residential and light commercial construction projects. Carry materials, tools, and equipment to work areas and ensure job sites remain organized and clean. Help pull wires and cables through conduits and walls under supervision. Support the installation of lighting fixtures, outlets, and switchgear. Perform basic tasks such as drilling holes, mounting boxes, and labeling wires. Follow instructions to prepare tools and materials needed for each task. Learn to identify electrical components and read basic diagrams to assist in system assembly.",
  "qualifications": "Willingness to learn electrical trade practices and safety protocols. Basic understanding of tools used in electrical work, including drills, saws, and voltage testers. Physical ability to lift and carry heavy materials, work on ladders, and perform repetitive tasks. Attention to detail and ability to follow instructions precisely. Strong work ethic and reliability in a fast-paced construction environment.",
  "prompt": "Create a job description for an entry-level Electrician Helper working on residential and light commercial construction projects. Focus on assisting electricians with material handling, basic tasks, and learning foundational skills on the job in California."
}
};


const COMPANIES = {
  'Kirby Electric': {
    name: 'Kirby Electric',
    sameAs: 'https://kirbyelectric.com/',
    logo: 'https://kirbyelectric.com/wp-content/uploads/2023/03/kirby_logo.png'
  },
  'Myro Electrical': {
    name: 'Myro Electrical',
    sameAs: 'https://myroelectrical.com/',
    logo: 'https://images.squarespace-cdn.com/content/v1/6441d6a8c943293c268b4359/7b2478ca-3514-499f-80c1-3a92bb142f0c/curve__1_-removebg-preview.png?format=1500w'
  },
  'Berks Electrical': {
    name: 'Berks Electrical',
    sameAs: 'https://berkselectrical.com/',
    logo: 'https://berkselectrical.com/wp-content/uploads/2022/03/berk-logo.jpg'
  },
  'Tech Electronics': {
    name: 'Tech Electronics',
    sameAs: 'https://www.techelectronics.com/',
    logo: 'https://www.techelectronics.com/wp-content/uploads/2020/10/tech-electronics-logo.png'
  },
  'Oak Electrical': {
    name: 'Oak Electrical',
    sameAs: 'https://oakelectriccompany.com/',
    logo: 'https://oakelectriccompany.com/wp-content/uploads/2017/04/logoNav-for-web.png'
  },
  'Crosby Electric': {
    name: 'Crosby Electric',
    sameAs: 'https://www.crosbyelectric.com/',
    logo: 'https://www.crosbyelectric.com/images/crosbyelectric_logo_crete.png'
  },
  'Reliable Electric': {
    name: 'Reliable Electric',
    sameAs: 'https://reliable-contractors.com/',
    logo: 'https://reliable-contractors.com/wp-content/uploads/2020/03/Reliable-Electric-Logo.jpg'
  },
  'Granite State Electric': {
    name: 'Granite State Electric',
    sameAs: 'https://granitestateelectricians.com/',
    logo: 'https://granitestateelectricians.com/wp-content/uploads/2018/03/GSE-2c-Logo-4.jpg'
  },
  'EZ Electric': {
    name: 'EZ Electric',
    sameAs: 'https://ezelectric.com/',
    logo: 'https://cdn.prod.website-files.com/62858eb9f95b5ef6ab8256be/66195b93d011344d05b98867_ez-electric-logo.svg'
  },
  'JP Electric': {
    name: 'JP Electric',
    sameAs: 'https://jpelectric.com/',
    logo: 'https://jpelectric.com/wp-content/uploads/2021/05/logo.png'
  },
  'Star Electric': {
    name: 'Star Electric',
    sameAs: 'https://www.starelectricmt.com/',
    logo: 'https://www.starelectricmt.com/wp-content/uploads/2023/11/starelectric-favicon-black-and-white.svg'
  },
  'JD Electric': {
    name: 'JD Electric',
    sameAs: 'https://jdproelectric.com/',
    logo: 'https://img1.wsimg.com/isteam/ip/243bff06-83b1-4928-b792-0338b6394a0b/logo/f2643ee5-278f-40f6-b108-dfc392a3d6fa.png/:/rs=w:662,h:160,cg:true,m/cr=w:662,h:160/qt=q:95'
  },
  'Tully Electric': {
    name: 'Tully Electric',
    sameAs: 'https://www.tully-electric.com/',
    logo: 'https://static.wixstatic.com/media/3a1e46_522696ccd68b4e63b984a72af3fe2da3~mv2.jpg/v1/fill/w_310,h_118,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/tully_logo_name_(640x245).jpg'
  },
  'Marathon Electrical': {
    name: 'Marathon Electrical',
    sameAs: 'https://marathonelectric.com/',
    logo: 'https://static.wixstatic.com/media/619c2c_813b990e8a82413597ed3f144ac0cb67~mv2.png/v1/crop/x_0,y_93,w_2420,h_815/fill/w_820,h_276,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/Marathon_Horizontal_Reversed_RGB.png'
  },
  'Eskew Electric': {
    name: 'Eskew Electric',
    sameAs: 'https://eskewelectric.com/',
    logo: 'https://img1.wsimg.com/isteam/ip/a06397fa-6f72-478f-ae05-6cf10229cbc5/blob-b5037f9.png/:/rs=w:501,h:400,cg:true,m/cr=w:501,h:400/qt=q:95'
  },
  'Colvin Electric': {
    name: 'Colvin Electric',
    sameAs: 'https://colvinelectric.com/',
    logo: 'https://colvinelectric.com/wp-content/uploads/2018/10/colvin-electric_footer-logo-1.png'
  },
  'Passion Electric': {
    name: 'Passion Electric',
    sameAs: 'https://passionelectric.com/',
    logo: 'https://passionelectric.com/wp-content/uploads/Passion-Electric-Logo-web-final-wide-full-color.png.webp'
  },
  'Braco Electrical': {
    name: 'Braco Electrical',
    sameAs: 'https://bracoelectrical.com/',
    logo: 'https://www.bracoelectrical.com/images/logo.png'
  },
  'Safe Electric': {
    name: 'Safe Electric',
    sameAs: 'https://callsafe.com/',
    logo: 'https://callsafe.com/wp-content/uploads/2024/05/Safe-Electric-Plumbing-Logo.png.webp'
  },
  'ESP Electrical': {
    name: 'ESP Electrical',
    sameAs: 'https://www.espelectrical.net/',
    logo: 'https://www.espelectrical.net/images/logo.png'
  },
  'DP Electric': {
    name: 'DP Electric',
    sameAs: 'https://dpelectric.com/',
    logo: 'https://dpelectric.com/wp-content/uploads/2022/03/DPA.png'
  },
  'Simple Electric': {
    name: 'Simple Electric',
    sameAs: 'https://simpleelectricaz.com/',
    logo: 'https://simpleelectricaz.com/wp-content/uploads/2017/10/logo.png'
  },
  'Dodge Electric': {
    name: 'Dodge Electric',
    sameAs: 'https://dodgeelectric.com/',
    logo: 'https://dodgeelectric.com/wp-content/uploads/2016/04/logo.jpg?quality=100.3022012111021'
  },
  'Miller Electric': {
    name: 'Miller Electric',
    sameAs: 'https://millerelect.com/',
    logo: 'https://millerelect.com/wp-content/uploads/2022/04/logo.png'
  },
  'Arc Electric': {
    name: 'Arc Electric',
    sameAs: 'https://www.arcelectric.co/',
    logo: 'https://static.wixstatic.com/media/6fbf59_32ce059a02c943c1a4ca0da76effedcc~mv2.png/v1/fill/w_116,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Arc%20Electric%20Logo.png'
  },
  'Koehler Electric': {
    name: 'Koehler Electric',
    sameAs: 'https://jwkoehler.com/',
    logo: 'https://jwkoehler.com/wp-content/uploads/2022/04/Koehler-Electric-Logo-2022-01.svg'
  }
};

const LOCATIONS = [
  { city: 'Denver', state: 'CO', zipCode: '80202' },
{ city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
{ city: 'Aurora', state: 'CO', zipCode: '80012' },
{ city: 'Fort Collins', state: 'CO', zipCode: '80521' },
{ city: 'Boulder', state: 'CO', zipCode: '80301' },
{ city: 'Pueblo', state: 'CO', zipCode: '81003' },
{ city: 'Cheyenne', state: 'WY', zipCode: '82001' },
{ city: 'Casper', state: 'WY', zipCode: '82601' },
{ city: 'Billings', state: 'MT', zipCode: '59101' },
{ city: 'Missoula', state: 'MT', zipCode: '59801' },
{ city: 'Bozeman', state: 'MT', zipCode: '59715' },
{ city: 'Fargo', state: 'ND', zipCode: '58102' },
{ city: 'Bismarck', state: 'ND', zipCode: '58501' },
{ city: 'Minot', state: 'ND', zipCode: '58701' },
{ city: 'Sioux Falls', state: 'SD', zipCode: '57101' },
{ city: 'Rapid City', state: 'SD', zipCode: '57701' },
{ city: 'Omaha', state: 'NE', zipCode: '68102' },
{ city: 'Lincoln', state: 'NE', zipCode: '68502' },
{ city: 'Grand Island', state: 'NE', zipCode: '68801' },
{ city: 'Overland Park', state: 'KS', zipCode: '66212' },
{ city: 'Wichita', state: 'KS', zipCode: '67202' },
{ city: 'Topeka', state: 'KS', zipCode: '66603' },
{ city: 'Des Moines', state: 'IA', zipCode: '50309' },
{ city: 'Cedar Rapids', state: 'IA', zipCode: '52401' },
{ city: 'Davenport', state: 'IA', zipCode: '52801' },
{ city: 'Madison', state: 'WI', zipCode: '53703' },
{ city: 'Milwaukee', state: 'WI', zipCode: '53202' },
{ city: 'Green Bay', state: 'WI', zipCode: '54301' },
{ city: 'Minneapolis', state: 'MN', zipCode: '55401' },
{ city: 'Saint Paul', state: 'MN', zipCode: '55101' },
{ city: 'Rochester', state: 'MN', zipCode: '55901' },
{ city: 'Detroit', state: 'MI', zipCode: '48201' },
{ city: 'Grand Rapids', state: 'MI', zipCode: '49503' },
{ city: 'Lansing', state: 'MI', zipCode: '48933' },
{ city: 'Louisville', state: 'KY', zipCode: '40202' },
{ city: 'Lexington', state: 'KY', zipCode: '40507' },
{ city: 'Bowling Green', state: 'KY', zipCode: '42101' },
{ city: 'Nashville', state: 'TN', zipCode: '37203' },
{ city: 'Memphis', state: 'TN', zipCode: '38103' },
{ city: 'Knoxville', state: 'TN', zipCode: '37902' },
{ city: 'Chattanooga', state: 'TN', zipCode: '37402' },
{ city: 'Huntsville', state: 'AL', zipCode: '35801' },
{ city: 'Birmingham', state: 'AL', zipCode: '35203' },
{ city: 'Montgomery', state: 'AL', zipCode: '36104' },
{ city: 'Jackson', state: 'MS', zipCode: '39201' },
{ city: 'Gulfport', state: 'MS', zipCode: '39501' },
{ city: 'Hattiesburg', state: 'MS', zipCode: '39401' },
{ city: 'Atlanta', state: 'GA', zipCode: '30303' },
{ city: 'Savannah', state: 'GA', zipCode: '31401' },
{ city: 'Augusta', state: 'GA', zipCode: '30901' },
{ city: 'Charleston', state: 'SC', zipCode: '29401' },
{ city: 'Columbia', state: 'SC', zipCode: '29201' },
{ city: 'Greenville', state: 'SC', zipCode: '29601' },
{ city: 'Charlotte', state: 'NC', zipCode: '28202' },
{ city: 'Raleigh', state: 'NC', zipCode: '27601' },
{ city: 'Greensboro', state: 'NC', zipCode: '27401' },
{ city: 'Richmond', state: 'VA', zipCode: '23219' },
{ city: 'Virginia Beach', state: 'VA', zipCode: '23451' },
{ city: 'Norfolk', state: 'VA', zipCode: '23510' },
{ city: 'Roanoke', state: 'VA', zipCode: '24011' },
{ city: 'Baltimore', state: 'MD', zipCode: '21202' },
{ city: 'Frederick', state: 'MD', zipCode: '21701' },
{ city: 'Annapolis', state: 'MD', zipCode: '21401' },
{ city: 'Philadelphia', state: 'PA', zipCode: '19103' },
{ city: 'Pittsburgh', state: 'PA', zipCode: '15222' },
{ city: 'Allentown', state: 'PA', zipCode: '18101' },
{ city: 'Scranton', state: 'PA', zipCode: '18503' },
{ city: 'Providence', state: 'RI', zipCode: '02903' },
{ city: 'Worcester', state: 'MA', zipCode: '01608' },
{ city: 'Boston', state: 'MA', zipCode: '02108' },
{ city: 'Springfield', state: 'MA', zipCode: '01103' },
{ city: 'Manchester', state: 'NH', zipCode: '03101' },
{ city: 'Nashua', state: 'NH', zipCode: '03060' },
{ city: 'Portland', state: 'ME', zipCode: '04101' },
{ city: 'Bangor', state: 'ME', zipCode: '04401' },
{ city: 'Burlington', state: 'VT', zipCode: '05401' },
{ city: 'Montpelier', state: 'VT', zipCode: '05602' },
{ city: 'Harrisburg', state: 'PA', zipCode: '17101' },
{ city: 'Charleston', state: 'WV', zipCode: '25301' },
{ city: 'Huntington', state: 'WV', zipCode: '25701' },
{ city: 'Beckley', state: 'WV', zipCode: '25801' },
{ city: 'Salt Lake City', state: 'UT', zipCode: '84101' },
{ city: 'West Valley City', state: 'UT', zipCode: '84119' },
{ city: 'Provo', state: 'UT', zipCode: '84601' },
{ city: 'Ogden', state: 'UT', zipCode: '84401' },
{ city: 'Albuquerque', state: 'NM', zipCode: '87101' },
{ city: 'Santa Fe', state: 'NM', zipCode: '87501' },
{ city: 'Las Cruces', state: 'NM', zipCode: '88001' },
{ city: 'Taos', state: 'NM', zipCode: '87571' }
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