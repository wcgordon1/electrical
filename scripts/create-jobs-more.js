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
  `Draft a COMPELLING job description (around 150 words) tailored to this role's key requirements. Use these as reference but create a concise description using only h2 and h3 tags for headings.

Provide a concise and engaging overview of the position in {city}, {state} at {company}, highlighting its purpose at {company}.

## Background
List the most essential qualifications, certifications, or skills for success:
{qualifications}

## Responsibilities
Detail the major tasks and responsibilities this role entails:
{responsibilities}

## Ideal Experience
Emphasize desired experience, including:
- {experience} 
- Any required certifications or licenses

## Compensation and Benefits
Outline competitive salary, benefits, and perks:
{benefits}`,

  `Create a BRIEF job description (around 200 words) emphasizing CORE REQUIREMENTS.
Use these as reference but create a concise description using only h2 and h3 tags for headings:

Role Overview:
{prompt}

Write a direct summary of this position in {city}, {state} at {company}.

## Qualifications
Select the most critical qualifications:
{qualifications}

## Responsibilities
Focus on primary responsibilities:
{responsibilities}

## Preferred Experience 
- {experience} years of electrical experience
- List required licenses

## Compensation
{benefits}`
];

const JOB_TYPES = {
  'Electrician': {
    minValue: 28,
    maxValue: 36,
    experienceLevel: 'midLevel',
    category: 'Journeyman',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Install and maintain electrical systems in commercial buildings, troubleshoot and repair power distribution systems, ensure compliance with safety codes, implement lighting control systems, plan and execute electrical upgrades, manage materials and tools for projects, coordinate with other construction teams, inspect and test installations for quality assurance, document work progress and maintenance records, mentor apprentices and junior electricians, provide on-site technical expertise, support emergency power system installations, integrate energy-efficient solutions into designs',
    qualifications: 'Relevant electrical certification or licensure preferred, strong understanding of commercial electrical systems, ability to read and interpret blueprints and technical diagrams, hands-on experience with power tools and diagnostic equipment, solid troubleshooting and problem-solving skills, knowledge of safety protocols and building codes, ability to work both independently and as part of a team, good communication and organizational skills, physically capable of handling electrical tools and equipment',
    prompt: 'Create a job description for a Commercial Journeyman Electrician focusing on electrical installations and maintenance in commercial buildings. Must understand power distribution systems, lighting controls, and troubleshooting. Experience with electrical upgrades, energy-efficient designs, and safety compliance required. Position involves planning and executing installations, ensuring quality assurance, and mentoring apprentices. Role includes maintaining documentation and coordinating with construction teams. Must have knowledge of safety codes and relevant certifications or licensure. Physical requirements include working at heights, using power tools, and handling materials.'
},
'Security Technician': {
    minValue: 20,
    maxValue: 28,
    experienceLevel: 'entryLevel',
    category: 'Security',
    team: 'Commercial',
    yearsExperience: '1-3',
    responsibilities: 'Install and configure security systems including cameras and access control, perform routine system maintenance and updates, troubleshoot and resolve technical issues, conduct site assessments for optimal equipment placement, manage system documentation and warranties, ensure compliance with security protocols, assist with network integration of security devices, provide training to end-users, coordinate with vendors for repairs or upgrades, participate in testing and commissioning of new systems, adhere to safety and installation standards, maintain inventory of equipment and materials',
    qualifications: 'Basic understanding of security systems and networks, ability to read and follow technical manuals, proficiency with basic hand and power tools, strong problem-solving skills, effective communication and teamwork abilities, attention to detail and organizational skills, willingness to learn and stay updated on emerging security technologies, physical ability to handle and install equipment',
    prompt: 'Create a job description for a Security Technician focusing on installing and maintaining security systems. Entry-level position involving hands-on installation, troubleshooting, and configuration of security devices. Must have basic understanding of security technologies and network integration. Experience with technical documentation and testing preferred but not required. Position involves ensuring compliance with safety standards, maintaining equipment inventory, and providing user training. Must be comfortable working with tools and in a variety of environments. Role offers growth opportunities and exposure to advanced security technologies.'
},
'Cable Installer': {
    minValue: 18,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'Voice Data',
    team: 'Commercial',
    yearsExperience: '1-5',
    responsibilities: 'Install and route cabling for data, voice, and video systems, terminate and test cables for proper functionality, assist in setting up network and communication systems, follow project blueprints and technical diagrams, maintain inventory of cables and tools, collaborate with other team members and trades on site, ensure installations meet safety and quality standards, document work performed and test results, troubleshoot and resolve basic connectivity issues, support system upgrades and expansions as needed, assist in training new team members on installation techniques, adhere to company and project protocols',
    qualifications: 'High school diploma or equivalent, familiarity with cable installation techniques, ability to use hand and power tools, basic understanding of networking concepts, strong organizational and time-management skills, attention to detail, effective communication skills, physical ability to lift and handle cabling equipment, willingness to learn and grow in the field, reliable transportation and punctuality',
    prompt: 'Create a job description for a Cable Installer focusing on data, voice, and video system installations. Entry-level position involving hands-on cabling, testing, and troubleshooting. Must be familiar with installation techniques and networking concepts. Experience with tools and basic cable termination preferred but not required. Position involves following blueprints, documenting work, and collaborating with team members. Physical requirements include lifting and handling cables and equipment. Role offers training opportunities and exposure to advanced communication technologies.'
},
'Commercial Apprentice': {
    minValue: 18,
    maxValue: 22,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '0-3',
    responsibilities: 'Assist in electrical installations and upgrades, learn wiring methods and safety protocols, support team with material handling and logistics, observe and practice blueprint reading, help install conduit, panels, and devices, perform routine equipment checks under supervision, maintain a clean and safe worksite, document daily tasks and lessons learned, attend required training and apprenticeship classes, collaborate with team members and supervisors, develop skills in troubleshooting and problem resolution, participate in team meetings and safety briefings, provide support for system testing and commissioning',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts, willingness to learn and follow instructions, good communication and teamwork skills, physical ability to handle tools and materials, attention to detail and safety awareness, reliable transportation and punctuality',
    prompt: 'Create a job description for a Commercial Electrical Apprentice focusing on learning and supporting electrical installations. Entry-level position involving training and hands-on work under licensed electricians. Must have basic understanding of electrical systems and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, conduit installation, and equipment setup. Role offers growth opportunities and exposure to commercial electrical projects. Must be physically capable of working in various environments and attending required classes for skill development.'
},
'Residential Electrician': {
    minValue: 18,
    maxValue: 27,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Residential',
    yearsExperience: '0-3',
    responsibilities: 'Assist in the installation of residential electrical systems, learn wiring techniques and safety protocols, support team with material handling and job site preparation, observe and practice interpreting electrical blueprints, assist in installing outlets, switches, lighting fixtures, and circuit breakers, maintain a clean and organized workspace, perform basic troubleshooting under supervision, document daily tasks and learning progress, attend required apprenticeship classes and training sessions, follow safety guidelines and regulations, participate in site inspections and testing procedures, coordinate with team members and supervisors on project tasks',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts, willingness to learn and follow instructions, good communication and teamwork skills, physical ability to lift tools and materials, attention to detail and safety awareness, reliable transportation and punctuality, strong interest in residential electrical systems',
    prompt: 'Create a job description for a Residential Electrician Apprentice focusing on learning and supporting residential electrical installations. Entry-level position involving hands-on training under licensed electricians. Must have a basic understanding of electrical systems and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, installing fixtures, and troubleshooting residential electrical systems. Role offers growth opportunities and exposure to residential projects. Must be physically capable of working in various environments and attending required training.'
},

'Industrial Electrician': {
    minValue: 22,
    maxValue: 31,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Industrial',
    yearsExperience: '0-3',
    responsibilities: 'Assist in the installation and maintenance of industrial electrical systems, learn to work with high-voltage equipment and machinery, support team with material preparation and organization, help install and troubleshoot motor controls, PLCs, and automation systems, observe and practice interpreting technical diagrams and schematics, assist with conduit bending, wiring, and panel assembly, maintain a clean and safe job site, document learning progress and daily tasks, attend required training and apprenticeship classes, follow safety guidelines and protocols, participate in system testing and inspections, collaborate with team members and supervisors on project tasks',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts and safety protocols, willingness to learn and follow instructions, strong interest in industrial electrical systems, good communication and teamwork skills, physical ability to handle tools and materials, attention to detail and problem-solving mindset, reliable transportation and punctuality',
    prompt: 'Create a job description for an Industrial Electrician Apprentice focusing on learning and supporting the installation and maintenance of industrial electrical systems. Entry-level position involving hands-on training under licensed electricians. Must have a basic understanding of high-voltage equipment and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, troubleshooting motor controls, and working with PLCs and automation systems. Role offers growth opportunities and exposure to industrial projects. Must be physically capable of working in various environments and attending required training.'
},
'Electrician Helper': {
    minValue: 15,
    maxValue: 20,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '0-2',
    responsibilities: 'Assist electricians with installations and repairs, handle materials and tools on job sites, follow instructions to complete basic electrical tasks, prepare and clean work areas, support cable pulling and conduit installation, learn to read and interpret blueprints under supervision, maintain safety and organization of tools and equipment, document work activities as directed, assist in troubleshooting and resolving minor issues, ensure adherence to safety standards and protocols, participate in team meetings and safety briefings, provide support for testing and system commissioning, demonstrate a willingness to learn and grow in the trade',
    qualifications: 'High school diploma or equivalent preferred, basic understanding of electrical concepts, ability to use hand tools and follow instructions, strong work ethic and eagerness to learn, good communication and teamwork skills, attention to detail and safety awareness, physical ability to lift and carry tools and materials, reliable transportation and punctuality',
    prompt: 'Create a job description for an Electrician Helper focusing on supporting electricians with installations, repairs, and general tasks. Entry-level position involving hands-on work with tools and materials under supervision. Must have a basic understanding of electrical concepts and a strong work ethic. Position includes preparing work areas, assisting with conduit installation, and documenting tasks. Role offers opportunities for learning and advancement in the electrical trade. Must be physically capable of working in various environments and committed to safety standards.'
},
'Fiber Optic Technician': {
    minValue: 26,
    maxValue: 35,
    experienceLevel: 'midLevel',
    category: 'Fiber',
    team: 'Commercial',
    yearsExperience: '2-5',
    responsibilities: 'Design and implement fiber optic networks, perform fusion splicing operations, test and certify fiber installations, maintain splice documentation, install fiber distribution systems, configure DWDM systems, perform OTDR testing, implement fiber management systems, coordinate pathway installations, maintain clean work environment, perform emergency restoration, train junior technicians',
    qualifications: 'FOA certification required, extensive experience with fusion splicing, proven expertise in OTDR testing, demonstrated ability with fiber management systems, advanced knowledge of fiber types, certification in multiple splice platforms, strong troubleshooting skills, experience with documentation systems, proven emergency response experience',
    prompt: 'Create a job description for a Fiber Optic Network Specialist specializing in enterprise fiber systems. Must understand complete fiber infrastructure including single-mode, multi-mode, and DWDM systems. Experience with fusion splicing, OTDR testing, and emergency restoration required. Must have FOA certification, OSHA-10, and splice platform certifications. Knowledge of fiber types, testing procedures, and documentation essential. Position involves designing and implementing fiber networks, performing precision splicing, and maintaining detailed records. Must understand loss budgets, fiber management, and testing protocols. Role includes emergency response, system certification, and mentoring junior technicians. Some projects require after-hours emergency response. Physical requirements include performing precise hand work, climbing ladders, and working in confined spaces.'
},
'Data Center Cable Tech': {
   minValue: 22,
   maxValue: 30,
   experienceLevel: 'entryLevel',
   category: 'Voice Data',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install and dress Category 6/6A cabling systems, terminate copper and fiber connections, maintain proper cable management in server racks, install overhead cable tray and ladder rack, perform cable testing and certification, document test results and warranties, maintain clean room protocols, organize patch panel layouts, implement proper cable routing and separation, assist with fiber trunk installation, maintain detailed labeling systems',
   qualifications: 'BICSI Installer 1 preferred, experience with structured cabling systems, proficiency in cable termination techniques, knowledge of testing procedures, understanding of cable management best practices, ability to read network drawings, experience with labeling systems, attention to detail, basic understanding of network hardware',
   prompt: 'Create a job description for a Data Center Cable Technician focusing on structured cabling installation. Must understand cable management, termination standards, and testing procedures. Experience with Cat 6/6A installation, rack management, and documentation required. BICSI certification preferred but not required. Knowledge of cable testing, proper dressing techniques, and labeling standards essential. Position involves installing and certifying copper/fiber cabling in data center environments. Must understand proper routing, separation requirements, and rack management. Role includes maintaining test documentation, as-built records, and warranty information. Some projects require off-hours maintenance windows. Physical requirements include ladder work, extended periods of cable termination, and working in active data centers. Must follow clean room protocols and maintain organized work areas. Position offers exposure to enterprise data center environments and advancement opportunities. Weekend work possible during maintenance windows. Clean background check required.'
},
};

const COMPANIES = {
  'Premier Electric': {
    name: 'Premier Electric',
    sameAs: 'https://www.premierelectricalstaffing.com/',
    logo: 'https://www.premierelectricalstaffing.com/wp-content/uploads/2020/05/Premier-Electrical-Staffing-logo.png'
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
  'Berg Electric': {
    name: 'Berg Electric',
    sameAs: 'https://www.berg-electric.com/',
    logo: 'https://pbs.twimg.com/profile_images/1433515221495123981/lN1y0hEr_400x400.png'
  },
  'TR Group': {
    name: 'TR Group',
    sameAs: 'https://www.trgroup.com/',
    logo: 'https://www.trgroup.com/wp-content/uploads/2022/04/TR-Group-Logo.png'
  }
};

const LOCATIONS = [
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
{ city: 'Raleigh', state: 'NC', zipCode: '27601' },
{ city: 'Greensboro', state: 'NC', zipCode: '27401' },
{ city: 'Durham', state: 'NC', zipCode: '27701' },
{ city: 'Winston-Salem', state: 'NC', zipCode: '27101' },
{ city: 'Fayetteville', state: 'NC', zipCode: '28301' },
{ city: 'Cary', state: 'NC', zipCode: '27511' },
{ city: 'Wilmington', state: 'NC', zipCode: '28401' },
{ city: 'High Point', state: 'NC', zipCode: '27260' },
{ city: 'Concord', state: 'NC', zipCode: '28025' },
{ city: 'Asheville', state: 'NC', zipCode: '28801' },
{ city: 'Greenville', state: 'NC', zipCode: '27834' },
{ city: 'Jacksonville', state: 'NC', zipCode: '28540' },
{ city: 'Gastonia', state: 'NC', zipCode: '28052' },
{ city: 'Chapel Hill', state: 'NC', zipCode: '27514' },
{ city: 'Rocky Mount', state: 'NC', zipCode: '27801' },
{ city: 'Mooresville', state: 'NC', zipCode: '28115' },
{ city: 'Hickory', state: 'NC', zipCode: '28601' },
{ city: 'Kannapolis', state: 'NC', zipCode: '28081' },
{ city: 'Apex', state: 'NC', zipCode: '27502' },
{ city: 'Huntersville', state: 'NC', zipCode: '28078' },
{ city: 'Wake Forest', state: 'NC', zipCode: '27587' },
{ city: 'Burlington', state: 'NC', zipCode: '27215' },
{ city: 'Wilson', state: 'NC', zipCode: '27893' },
{ city: 'Monroe', state: 'NC', zipCode: '28110' },
{ city: 'Indian Trail', state: 'NC', zipCode: '28079' },
{ city: 'Salisbury', state: 'NC', zipCode: '28144' },
{ city: 'New Bern', state: 'NC', zipCode: '28560' },
{ city: 'Holly Springs', state: 'NC', zipCode: '27540' },
{ city: 'Goldsboro', state: 'NC', zipCode: '27530' },
{ city: 'Sanford', state: 'NC', zipCode: '27330' },
{ city: 'Matthews', state: 'NC', zipCode: '28105' },
{ city: 'Carrboro', state: 'NC', zipCode: '27510' },
{ city: 'Elizabeth City', state: 'NC', zipCode: '27909' }
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