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
  "minValue": 38,
  "maxValue": 46,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "3-5",
  "responsibilities": "Install, maintain, and troubleshoot electrical systems specifically for electric vehicle (EV) charging stations, including service panels, transformers, and related components. Accurately measure, cut, and bend conduit (EMT, rigid) for installations, ensuring precise alignment. Pull, label, and terminate wiring, maintaining clean and organized connections according to NEC and California Electric Code standards. Perform load calculations and install main service equipment for EV charging infrastructure. Conduct system testing to verify performance, safety, and compliance with site specifications. Work collaboratively with project managers and other trades to meet construction schedules and deliver quality installations. Supervise apprentices, ensuring adherence to safety and best practices while mentoring on EV-specific electrical systems. Maintain accurate documentation of installations and site activities, submitting daily reports as required.",
  "qualifications": "Active and valid journeyman electrician certification from the California Department of Industrial Relations (DIR). Strong knowledge of NEC and California Electric Code, with specific experience in EV charging station installations. Proficiency with conduit bending tools, multimeters, and other diagnostic equipment. Ability to read and interpret blueprints, schematics, and electrical diagrams. Demonstrated leadership skills in supervising apprentices and managing on-site safety. Excellent communication and organizational skills to ensure project success.",
  "prompt": "Create a job description for a Certified Journeyman Electrician focusing on the installation and maintenance of electric vehicle charging stations, ensuring compliance with California DIR certification requirements."
},
"Civil General Foreman": {
  "minValue": 65,
  "maxValue": 80,
  "experienceLevel": "seniorLevel",
  "category": "Foreman",
  "team": "Commercial",
  "yearsExperience": "8-10",
  "responsibilities": "Oversee and manage the civil scope of work for medium to large-scale electrical projects, specifically electric vehicle (EV) charging station installations. Supervise multiple crews performing excavation, backfill, rebar, concrete pouring, bollard installation, asphalt work, and other civil tasks. Review and interpret project plans, blueprints, and schematics to ensure compliance with design specifications and California Building Code standards. Coordinate with project managers, subcontractors, and other teams to ensure work is executed on time, within budget, and to quality expectations. Conduct milestone inspections, verify adherence to safety standards, and implement corrective actions as needed. Maintain daily reports detailing labor hours, resource usage, and project status. Monitor and enforce compliance with SWIPPs, ensuring environmental conditions like stormwater management and site cleanliness. Conduct regular toolbox talks and safety meetings to uphold a safety-first culture. Ensure all crew certifications and equipment are current and compliant with governing standards. Collaborate with project leadership to address scope changes, track additional work, and maintain accurate documentation for contract variations.",
  "qualifications": "Minimum 8-10 years of experience as a lead project foreman in commercial civil construction. Strong knowledge of the California Building Code and OSHA safety standards. Proven track record in leading teams for excavation, concrete, rebar, asphalt, and similar civil tasks. Strong leadership, organizational, and problem-solving skills. Proficient in Microsoft Office Suite and familiarity with construction project management software (e.g., Site Tracker). Valid driver's license with a clean record and the ability to maintain coverage on company auto insurance. OSHA 30-hour and First Aid/CPR certifications preferred.",
  "prompt": "Create a job description for a Civil General Foreman overseeing the construction of electric vehicle (EV) charging stations. The ideal candidate will have extensive experience in managing crews for civil tasks such as excavation, concrete work, and asphalt installation. Responsibilities should include supervising crews, ensuring compliance with safety and environmental regulations, coordinating with project managers, and maintaining accurate documentation. Emphasize the importance of leadership, organization, and adherence to California Building Code standards. Candidates must have a minimum of 8-10 years of experience as a foreman and strong familiarity with commercial civil construction best practices."
},
"Electrical Foreman": {
  "minValue": 45,
  "maxValue": 55,
  "experienceLevel": "seniorLevel",
  "category": "Foreman",
  "team": "Commercial",
  "yearsExperience": "5-7",
  "responsibilities": "Lead field operations for the installation and maintenance of electric vehicle (EV) charging stations, ensuring compliance with project designs, safety standards, and deadlines. Oversee the installation of commercial electrical systems, including service panels, transformers, conduit (EMT, rigid), and EV charging equipment. Plan and allocate daily tasks for journeymen and apprentices, ensuring efficient crew operations and adherence to safety protocols. Perform and supervise conduit bending, wire pulling, labeling, and terminations to meet NEC and California Electric Code standards. Troubleshoot and resolve electrical issues, conducting diagnostics using tools like multimeters, megohmmeters, and other testing equipment. Provide on-site leadership, coaching, and mentoring for team members while ensuring a clean and organized job site. Collaborate with project managers, clients, and other trades to resolve field challenges and ensure seamless project execution. Maintain daily reports documenting project progress, labor hours, material usage, and any deviations from the plan. Conduct regular safety meetings and enforce stop work authority in the event of violations or unsafe conditions. Ensure proper material ordering, inventory management, and adherence to project schedules.",
  "qualifications": "Active and valid journeyman electrician certification from the California Department of Industrial Relations (DIR). Minimum of 5 years of experience in commercial electrical work, with at least 2 years in a leadership role. Extensive knowledge of NEC and California Electric Code, with hands-on experience in EV charging station installations. Proficiency with conduit bending, wire termination, and troubleshooting electrical systems. Strong leadership and communication skills, with a proven ability to mentor apprentices and manage field teams. Valid driver's license with a clean driving record and the ability to maintain auto insurance coverage. OSHA 30-hour certification and First Aid/CPR preferred. Familiarity with construction management software and tools such as Site Tracker is a plus.",
  "prompt": "Create a job description for an Electrical Foreman responsible for leading field operations in the installation and maintenance of EV charging stations. Emphasize the requirement for an active journeyman certification from the California DIR, strong leadership skills, and in-depth knowledge of NEC and California Electric Code. Responsibilities should include supervising field crews, managing safety protocols, troubleshooting, and collaborating with project managers to ensure timely and high-quality project completion."
},
"Apprentice Electrician": {
  "minValue": 18,
  "maxValue": 23,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "0-2",
  "responsibilities": "Assist journeymen and foremen in the installation and maintenance of electric vehicle (EV) charging stations, ensuring all tasks align with NEC and California Electric Code standards. Pull and secure electrical wiring through conduits, trenches, and walls, ensuring proper labeling and organization. Assist in conduit bending (EMT, rigid) and installation under supervision. Help with the installation of service panels, transformers, and EV charging equipment. Perform basic troubleshooting tasks and system testing under the guidance of licensed electricians. Maintain cleanliness and organization on the job site, including proper storage of tools, materials, and equipment. Attend daily safety meetings and adhere to all workplace safety protocols. Learn and implement proper techniques for wire terminations, conduit layout, and electrical system components. Document daily work progress and report any safety or operational issues to supervisors. Proactively support team members in achieving project milestones and deadlines.",
  "qualifications": "Valid Electrical Trainee card from the California Department of Industrial Relations (DIR). Basic understanding of electrical systems, tools, and equipment. Familiarity with NEC and California Electric Code is a plus. Strong willingness to learn and develop skills under the supervision of experienced electricians. Reliable transportation to job sites and ability to work across multiple locations. OSHA 10-hour certification and First Aid/CPR preferred. Physical stamina to perform manual labor, including lifting up to 50 pounds and working on ladders or in confined spaces.",
  "prompt": "Create a job description for an Apprentice Electrician assisting in the installation and maintenance of EV charging stations. Emphasize the requirement for a valid Electrical Trainee card from the California DIR, willingness to learn, and ability to work collaboratively under supervision. Responsibilities should include pulling wires, assisting in conduit installation, supporting troubleshooting efforts, and maintaining job site cleanliness while adhering to safety protocols."
}



    
};

const COMPANIES = {
  'Bright Move Energy': {
    name: 'Bright Move Energy',
    sameAs: 'https://www.brytemove.com/',
    logo: 'https://www.brytemove.com/wp-content/uploads/2021/04/bme_logo_white-light_backgroun-2.png'
  },
  'Blink Charging': {
    name: 'Blink Charging',
    sameAs: 'https://blinkcharging.com/',
    logo: 'https://play-lh.googleusercontent.com/r1o4hHnnpz4nBmWPMUzPIHxA9Ei-VcabK1yDpBVkCu19UOeZFBlBhD7-uE7q9TlSEJo'
  },
  'EV GO': {
    name: 'EV GO',
    sameAs: 'https://evgo.com/',
    logo: 'https://play-lh.googleusercontent.com/BMy1sIp658aqwGM1YNE8sNF9UVgdj56o09jsyuk-IbCdAwVVpLCAhPNvmYDPRO7pi0E'
  },
  'ChargePoint': {
    name: 'ChargePoint',
    sameAs: 'https://chargepoint.com/',
    logo: 'https://www.chargepoint.com/themes/chargepoint/logo.svg'
  },
  'Bidram Electric': {
    name: 'Bidram Electric',
    sameAs: 'https://bmodernelectric.com/',
    logo: 'https://bmodernelectric.com/wp-content/uploads/2018/03/BMODERN_1212-e1595396794929.png'
  },
  'Collins Electrical': {
    name: 'Collins Electrical',
    sameAs: 'https://www.collinselectric.com/commercial-ev-charging-station/',
    logo: 'https://marvel-b1-cdn.bc0a.com/f00000000225472/www.collinselectric.com/wp-content/uploads/2025/01/Collins-Electrical-Logo-New._withTag-01.png'
  }
};

const LOCATIONS = [
  { city: 'Anaheim', state: 'CA', zipCode: '92801' },
{ city: 'Santa Ana', state: 'CA', zipCode: '92701' },
{ city: 'Huntington Beach', state: 'CA', zipCode: '92646' },
{ city: 'Fullerton', state: 'CA', zipCode: '92831' },
{ city: 'Orange', state: 'CA', zipCode: '92865' },
{ city: 'Costa Mesa', state: 'CA', zipCode: '92626' },
{ city: 'Garden Grove', state: 'CA', zipCode: '92840' },
{ city: 'Tustin', state: 'CA', zipCode: '92780' },
{ city: 'Laguna Beach', state: 'CA', zipCode: '92651' },
{ city: 'Newport Beach', state: 'CA', zipCode: '92660' },
{ city: 'Mission Viejo', state: 'CA', zipCode: '92691' },
{ city: 'Laguna Niguel', state: 'CA', zipCode: '92677' },
{ city: 'Lake Forest', state: 'CA', zipCode: '92630' },
{ city: 'Aliso Viejo', state: 'CA', zipCode: '92656' },
{ city: 'Fountain Valley', state: 'CA', zipCode: '92708' },
{ city: 'San Clemente', state: 'CA', zipCode: '92672' },
{ city: 'Brea', state: 'CA', zipCode: '92821' },
{ city: 'Placentia', state: 'CA', zipCode: '92870' },
{ city: 'San Juan Capistrano', state: 'CA', zipCode: '92675' },
{ city: 'Laguna Hills', state: 'CA', zipCode: '92653' },
{ city: 'Dana Point', state: 'CA', zipCode: '92629' },
{ city: 'Seal Beach', state: 'CA', zipCode: '90740' },
{ city: 'Cypress', state: 'CA', zipCode: '90630' },
{ city: 'Buena Park', state: 'CA', zipCode: '90620' },
{ city: 'Yorba Linda', state: 'CA', zipCode: '92886' },
{ city: 'La Habra', state: 'CA', zipCode: '90631' },
{ city: 'Westminster', state: 'CA', zipCode: '92683' },
{ city: 'Stanton', state: 'CA', zipCode: '90680' },
{ city: 'Los Alamitos', state: 'CA', zipCode: '90720' },
{ city: 'La Palma', state: 'CA', zipCode: '90623' },
{ city: 'Rancho Santa Margarita', state: 'CA', zipCode: '92688' },
{ city: 'Coto de Caza', state: 'CA', zipCode: '92679' },
{ city: 'Ladera Ranch', state: 'CA', zipCode: '92694' },
{ city: 'Norwalk', state: 'CA', zipCode: '90650' },
{ city: 'Cerritos', state: 'CA', zipCode: '90703' },
{ city: 'Hawaiian Gardens', state: 'CA', zipCode: '90716' },
{ city: 'Long Beach', state: 'CA', zipCode: '90802' },
{ city: 'Carson', state: 'CA', zipCode: '90745' },
{ city: 'San Pedro', state: 'CA', zipCode: '90731' },
{ city: 'Lakewood', state: 'CA', zipCode: '90712' },
{ city: 'Bellflower', state: 'CA', zipCode: '90706' },
{ city: 'Downey', state: 'CA', zipCode: '90241' },
{ city: 'Santa Fe Springs', state: 'CA', zipCode: '90670' },
{ city: 'Whittier', state: 'CA', zipCode: '90601' },
{ city: 'Paramount', state: 'CA', zipCode: '90723' },
{ city: 'South Gate', state: 'CA', zipCode: '90280' },
{ city: 'Pico Rivera', state: 'CA', zipCode: '90660' },
{ city: 'Torrance', state: 'CA', zipCode: '90501' },
{ city: 'Manhattan Beach', state: 'CA', zipCode: '90266' },
{ city: 'Redondo Beach', state: 'CA', zipCode: '90277' }
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