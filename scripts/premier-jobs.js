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

Weave some of these responsibilities throughout the description:
${jobInfo.responsibilities}

Naturally incorporate some of these qualifications into the conversation:
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

'Electrician': {
  minValue: 30,
  maxValue: 36,
  experienceLevel: 'midLevel',
  category: 'Journeyman',
  team: 'Commercial',
  yearsExperience: '3-5',
  responsibilities: 'Install and maintain electrical systems using tools such as conduit benders, multimeters, and circuit testers; troubleshoot power systems; work on commercial projects including office buildings, retail spaces, and industrial facilities; upgrade lighting systems with LED retrofits; install fire alarms and backup generators; ensure compliance with NEC codes and safety protocols.',
  qualifications: 'Valid electrical license; proficiency with tools like conduit benders, power drills, and diagnostic equipment; experience with reading blueprints and technical diagrams; strong troubleshooting skills; knowledge of NEC codes; ability to work independently and in teams; physically capable of lifting heavy tools and materials.',
  prompt: 'Create a job description for a Commercial Electrician focusing on installations, troubleshooting, and upgrades in commercial settings. Must have experience with tools like conduit benders and multimeters and knowledge of NEC codes.'
},
'Security Technician': {
  minValue: 23,
  maxValue: 29,
  experienceLevel: 'entryLevel',
  category: 'Security',
  team: 'Commercial',
  yearsExperience: '1-3',
  responsibilities: 'Install and configure security systems, including CCTV, access control, and intrusion alarms, using tools like crimpers, cable testers, and network switches; perform maintenance on cameras and alarm panels; assist in system integration for office buildings and warehouses; troubleshoot device connectivity issues; document installations and update system schematics.',
  qualifications: 'Basic knowledge of security systems and networks; experience with hand tools and diagnostic equipment like cable testers; ability to read technical manuals; strong problem-solving skills; willingness to learn new technologies; physical ability to install and lift equipment; valid driver’s license.',
  prompt: 'Create a job description for a Security Technician focusing on installing and maintaining security systems. Must have experience with tools like crimpers and cable testers and basic knowledge of security devices and networking.'
},
'Cable Tech': {
  minValue: 21,
  maxValue: 28,
  experienceLevel: 'seniorLevel',
  category: 'Voice Data',
  team: 'Commercial',
  yearsExperience: '3-5',
  responsibilities: 'Install structured cabling systems using tools like punch-down tools, cable testers, and fusion splicers; terminate and test Cat5e, Cat6, and fiber optic cables; work on projects such as data centers, call centers, and educational facilities; troubleshoot connectivity issues; ensure compliance with TIA/EIA standards; document test results and project progress.',
  qualifications: 'Experience with structured cabling systems and tools like punch-down tools and fusion splicers; ability to read blueprints and follow technical diagrams; basic understanding of networking; attention to detail and organizational skills; physically capable of handling cables and equipment; certifications like BICSI Installer preferred.',
  prompt: 'Create a job description for a Cable Tech focusing on structured cabling installations and troubleshooting. Must have experience with tools like punch-down tools and knowledge of TIA/EIA standards.'
},
  'Commercial Apprentice': {
    minValue: 17,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '0-3',
    responsibilities: 'Assist in electrical installations and upgrades, learn wiring methods and safety protocols, support team with material handling and logistics, observe and practice blueprint reading, help install conduit, panels, and devices, perform routine equipment checks under supervision, maintain a clean and safe worksite, document daily tasks and lessons learned, attend required training and apprenticeship classes, collaborate with team members and supervisors, develop skills in troubleshooting and problem resolution, participate in team meetings and safety briefings, provide support for system testing and commissioning',
    qualifications: 'High school diploma or equivalent, enrollment in an apprenticeship program preferred, basic understanding of electrical concepts, willingness to learn and follow instructions, good communication and teamwork skills, physical ability to handle tools and materials, attention to detail and safety awareness, reliable transportation and punctuality',
    prompt: 'Create a job description for a Commercial Electrical Apprentice focusing on learning and supporting electrical installations. Entry-level position involving training and hands-on work under licensed electricians. Must have basic understanding of electrical systems and safety protocols. Enrollment in an apprenticeship program preferred. Position includes assisting with wiring, conduit installation, and equipment setup. Role offers growth opportunities and exposure to commercial electrical projects. Must be physically capable of working in various environments and attending required classes for skill development.'
  },
  'Data Center Technician': {
    minValue: 28,
    maxValue: 34,
    experienceLevel: 'seniorLevel',
    category: 'Data Center',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Install and dress Category 6/6A cabling systems, terminate copper and fiber connections, maintain proper cable management in server racks, install overhead cable tray and ladder rack, perform cable testing and certification, document test results and warranties, maintain clean room protocols, organize patch panel layouts, implement proper cable routing and separation, assist with fiber trunk installation, maintain detailed labeling systems',
    qualifications: 'BICSI Installer 1 preferred, experience with structured cabling systems, proficiency in cable termination techniques, knowledge of testing procedures, understanding of cable management best practices, ability to read network drawings, experience with labeling systems, attention to detail, basic understanding of network hardware',
    prompt: 'Create a job description for a Data Center Cable Technician focusing on structured cabling installation. Must understand cable management, termination standards, and testing procedures. Experience with Cat 6/6A installation, rack management, and documentation required. BICSI certification preferred but not required. Knowledge of cable testing, proper dressing techniques, and labeling standards essential. Position involves installing and certifying copper/fiber cabling in data center environments. Must understand proper routing, separation requirements, and rack management. Role includes maintaining test documentation, as-built records, and warranty information. Some projects require off-hours maintenance windows. Physical requirements include ladder work, extended periods of cable termination, and working in active data centers. Must follow clean room protocols and maintain organized work areas. Position offers exposure to enterprise data center environments and advancement opportunities. Weekend work possible during maintenance windows. Clean background check required.'
  },
   'Apprentice Electrician': {
  minValue: 18,
  maxValue: 25,
  experienceLevel: 'entryLevel',
  category: 'Apprentice',
  team: 'Commercial',
  yearsExperience: '0-4',
  responsibilities: 'Assist with pulling wire, installing conduit, and mounting electrical panels; support material handling and setup; use basic tools like wire strippers, screwdrivers, and drills; follow instructions to learn blueprint reading and wiring methods; maintain clean and organized workspaces.',
  qualifications: 'Basic knowledge of tools like wire strippers and drills; strong work ethic; ability to follow directions and learn quickly; physically able to lift materials and work on ladders; good teamwork and communication skills.',
  prompt: 'Create a job description for a Commercial Electrical Apprentice focusing on assisting licensed electricians with hands-on tasks like wiring, conduit installation, and material handling. Must be willing to learn and work with basic tools in a commercial environment.'
},
'Data Center Technician': {
  minValue: 24,
  maxValue: 29,
  experienceLevel: 'seniorLevel',
  category: 'Data Center',
  team: 'Commercial',
  yearsExperience: '3-5',
  responsibilities: 'Install and terminate Cat6/6A and fiber cables; dress cables in racks using Velcro ties and cable combs; test cables using Fluke testers; mount patch panels and servers; install cable trays and ladder racks; document installations and test results.',
  qualifications: 'Proficiency with Fluke testers, cable combs, and termination tools; experience with structured cabling and rack management; ability to read network diagrams; attention to detail for proper labeling and routing; familiarity with clean room standards.',
  prompt: 'Create a job description for a Data Center Technician focusing on installing, terminating, and testing Cat6/6A and fiber cables. Must have experience with tools like Fluke testers, cable combs, and termination equipment, and an understanding of cable management and documentation.'
},
'Electrician': {
  minValue: 18,
  maxValue: 25,
  experienceLevel: 'entryLevel',
  category: 'Apprentice',
  team: 'Commercial',
  yearsExperience: '0-3',
  responsibilities: 'Assist licensed electricians with installing conduit, pulling wire, and mounting electrical devices; use basic tools like wire strippers, drills, and measuring tapes; transport and organize materials; support panel assembly and device connections; ensure workspace cleanliness and safety; shadow electricians to learn wiring techniques, blueprint reading, and troubleshooting; participate in jobsite setup and teardown; document completed tasks and daily progress.',
  qualifications: 'Familiarity with basic tools such as wire strippers, drills, and pliers; ability to follow instructions and learn on the job; strong physical stamina for lifting materials and working on ladders; basic math skills for measuring and calculations; reliable transportation and punctuality; safety-conscious and detail-oriented.',
  prompt: 'Create a concise and practical job description for a Commercial Electrical Apprentice. The role involves heling with wiring, and panel assembly using basic tools. Must be eager to learn, safety-focused, and capable of physical labor in commercial settings.'
},
'Electrician Helper': {
  minValue: 16,
  maxValue: 20,
  experienceLevel: 'entryLevel',
  category: 'Helper',
  team: 'Commercial',
  yearsExperience: '0-2',
  responsibilities: 'Assist electricians by organizing tools, materials, and equipment; pull wire, mount fixtures, and prepare conduit under supervision; use basic tools such as pliers, screwdrivers, and measuring tapes; ensure job site cleanliness and safety; load and unload supplies; support electricians with troubleshooting and testing circuits; learn basic wiring and installation techniques through hands-on experience.',
  qualifications: 'Ability to follow directions and work in a team; familiarity with basic tools like pliers and drills; physical ability to lift materials and work on ladders; attention to detail and safety; reliable transportation and strong work ethic; willingness to learn electrical trade skills.',
  prompt: 'Create a job description for an Electrician Helper focusing on supporting licensed electricians with wiring, mounting fixtures, and organizing tools. The role is entry-level and involves learning basic electrical techniques while assisting with physical tasks on job sites.'
},
'Industrial Electrician': {
  minValue: 30,
  maxValue: 40,
  experienceLevel: 'midLevel',
  category: 'Electrician',
  team: 'Industrial',
  yearsExperience: '3-5',
  responsibilities: 'Install and repair electrical systems in industrial facilities, including control panels, motors, and conveyors; troubleshoot and maintain PLC systems using multimeters and oscilloscopes; run and terminate conduit (EMT, Rigid); interpret and work from blueprints, schematics, and wiring diagrams; ensure compliance with safety and electrical codes; perform preventive maintenance on high-voltage equipment; install and test variable frequency drives (VFDs) and motor control systems; document work performed and maintain service logs.',
  qualifications: 'Proficiency with tools such as multimeters, conduit benders, and oscilloscopes; strong understanding of PLC systems and industrial automation; experience working with high-voltage equipment and motor controls; ability to read blueprints and schematics; solid troubleshooting skills; physical ability to work in industrial environments, including heights and confined spaces; team-oriented with good communication skills.',
  prompt: 'Create a job description for an Industrial Electrician focusing on installing, troubleshooting, and maintaining electrical systems in industrial facilities. Must have experience with PLCs, motor controls, and conduit work, as well as a strong understanding of high-voltage systems and industrial automation.'
}
};

const LOCATIONS = [ 
  { "city": "Charlotte", "state": "NC", "zipCode": "28202" },
  { "city": "Raleigh", "state": "NC", "zipCode": "27601" },
  { "city": "Greensboro", "state": "NC", "zipCode": "27401" },
  { "city": "Durham", "state": "NC", "zipCode": "27701" },
  { "city": "Winston-Salem", "state": "NC", "zipCode": "27101" },
  { "city": "Fayetteville", "state": "NC", "zipCode": "28301" },
  { "city": "Cary", "state": "NC", "zipCode": "27511" },
  { "city": "Wilmington", "state": "NC", "zipCode": "28401" },
  { "city": "High Point", "state": "NC", "zipCode": "27260" },
  { "city": "Concord", "state": "NC", "zipCode": "28025" },
  { "city": "Asheville", "state": "NC", "zipCode": "28801" },
  { "city": "Greenville", "state": "NC", "zipCode": "27834" },
  { "city": "Jacksonville", "state": "NC", "zipCode": "28540" },
  { "city": "Gastonia", "state": "NC", "zipCode": "28052" },
  { "city": "Chapel Hill", "state": "NC", "zipCode": "27514" },
  { "city": "Rocky Mount", "state": "NC", "zipCode": "27801" },
  { "city": "Burlington", "state": "NC", "zipCode": "27215" },
  { "city": "Wilson", "state": "NC", "zipCode": "27893" },
  { "city": "Huntersville", "state": "NC", "zipCode": "28078" },
  { "city": "Kannapolis", "state": "NC", "zipCode": "28081" },
  { "city": "Apex", "state": "NC", "zipCode": "27502" },
  { "city": "Hickory", "state": "NC", "zipCode": "28601" },
  { "city": "Indian Trail", "state": "NC", "zipCode": "28079" },
  { "city": "Mooresville", "state": "NC", "zipCode": "28115" },
  { "city": "Wake Forest", "state": "NC", "zipCode": "27587" },
  { "city": "Monroe", "state": "NC", "zipCode": "28110" },
  { "city": "Salisbury", "state": "NC", "zipCode": "28144" },
  { "city": "New Bern", "state": "NC", "zipCode": "28560" },
  { "city": "Holly Springs", "state": "NC", "zipCode": "27540" },
  { "city": "Goldsboro", "state": "NC", "zipCode": "27530" }
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
      'PESdallas@pes123.com'
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