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
    wordCount: 100,
    style: 'concise and to the point',
    tone: 'direct and clear'
  }
};

function generatePromptA(jobType, jobInfo, location, style, salary) {
  const { wordCount, tone } = PROMPT_STYLES[style];
  
  return `Create a ${wordCount}-word ${tone} job description for a ${jobType} position at Premier Electric in ${location.city}, ${location.state}. Format in markdown using only h2 and h3 tags for headings. This description will be directly converted to HTML, so no markdown code blocks needed.

${jobInfo.prompt}

## About Premier Electric
Highlight our reputation in ${location.city} for excellence in electrical contracting and staffing. Mention our focus on ${jobInfo.team} projects and commitment to quality.

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

Start with a compelling introduction about why someone would want to join Premier Electric in ${location.city}. Focus on our culture, growth opportunities, and impact in the ${jobInfo.team} sector.

Then, naturally flow into what makes this ${jobType} role exciting. Mention:
- The impact they'll have
- Who they'll work with
- What their day might look like
- Growth potential
- Work locations including ${location.city} and surrounding areas

Weave these responsibilities throughout the description:
${jobInfo.responsibilities}

Naturally incorporate these qualifications into the conversation:
${jobInfo.qualifications}

Include these key details in a way that feels organic:
- Experience level: ${jobInfo.yearsExperience} years
- Pay range: $${salary.minValue}-$${salary.maxValue} per hour
- Location: ${location.city}, ${location.state} and neighboring cities
- ${location.state} licensing requirements
- Benefits and perks
- Tools and equipment provided
- Training opportunities

End with a strong call to action that emphasizes Premier Electric's commitment to employee development and long-term career growth. Make the reader feel excited about joining our team.`;
}

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
    prompt: 'Create a job description for a Commercial Electrician focusing on electrical installations and maintenance in commercial buildings. Must understand power distribution systems, lighting controls, and troubleshooting. Experience with electrical upgrades, energy-efficient designs, and safety compliance required. Position involves planning and executing installations, ensuring quality assurance, and mentoring apprentices. Role includes maintaining documentation and coordinating with construction teams. Must have knowledge of safety codes and relevant certifications or licensure. Physical requirements include working at heights, using power tools, and handling materials.'
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
  'Cable Tech': {
    minValue: 21,
    maxValue: 24,
    experienceLevel: 'seniorLevel',
    category: 'Voice Data',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Install and route cabling for data, voice, and video systems, terminate and test cables for proper functionality, assist in setting up network and communication systems, follow project blueprints and technical diagrams, maintain inventory of cables and tools, collaborate with other team members and trades on site, ensure installations meet safety and quality standards, document work performed and test results, troubleshoot and resolve basic connectivity issues, support system upgrades and expansions as needed, assist in training new team members on installation techniques, adhere to company and project protocols',
    qualifications: 'High school diploma or equivalent, familiarity with cable installation techniques, ability to use hand and power tools, basic understanding of networking concepts, strong organizational and time-management skills, attention to detail, effective communication skills, physical ability to lift and handle cabling equipment, willingness to learn and grow in the field, reliable transportation and punctuality',
    prompt: 'Create a job description for a Cable Tech focusing on data, voice, and video system installations. Entry-level position involving hands-on cabling, testing, and troubleshooting. Must be familiar with installation techniques and networking concepts. Experience with tools and basic cable termination preferred but not required. Position involves following blueprints, documenting work, and collaborating with team members. Physical requirements include lifting and handling cables and equipment. Role offers training opportunities and exposure to advanced communication technologies.'
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
  'Data Center Technician': {
    minValue: 24,
    maxValue: 29,
    experienceLevel: 'seniorLevel',
    category: 'Data Center',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Install and dress Category 6/6A cabling systems, terminate copper and fiber connections, maintain proper cable management in server racks, install overhead cable tray and ladder rack, perform cable testing and certification, document test results and warranties, maintain clean room protocols, organize patch panel layouts, implement proper cable routing and separation, assist with fiber trunk installation, maintain detailed labeling systems',
    qualifications: 'BICSI Installer 1 preferred, experience with structured cabling systems, proficiency in cable termination techniques, knowledge of testing procedures, understanding of cable management best practices, ability to read network drawings, experience with labeling systems, attention to detail, basic understanding of network hardware',
    prompt: 'Create a job description for a Data Center Cable Technician focusing on structured cabling installation. Must understand cable management, termination standards, and testing procedures. Experience with Cat 6/6A installation, rack management, and documentation required. BICSI certification preferred but not required. Knowledge of cable testing, proper dressing techniques, and labeling standards essential. Position involves installing and certifying copper/fiber cabling in data center environments. Must understand proper routing, separation requirements, and rack management. Role includes maintaining test documentation, as-built records, and warranty information. Some projects require off-hours maintenance windows. Physical requirements include ladder work, extended periods of cable termination, and working in active data centers. Must follow clean room protocols and maintain organized work areas. Position offers exposure to enterprise data center environments and advancement opportunities. Weekend work possible during maintenance windows. Clean background check required.'
  }
};

const LOCATIONS = [ 
  // Colorado
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Aurora', state: 'CO', zipCode: '80012' },
  { city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
  // Texas
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  // Florida
  { city: 'Orlando', state: 'FL', zipCode: '32801' },
  { city: 'Tampa', state: 'FL', zipCode: '33602' },
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  // North Carolina
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Durham', state: 'NC', zipCode: '27701' }
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
      'Michael.Mckeaige@pes123.com'
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