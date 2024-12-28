#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');

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

const JOB_TYPES = {
  'Industrial Electrician': {
    minValue: 22,
    maxValue: 30,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Industrial',
    yearsExperience: '1-3',
    prompt: 'Create a job description for an Industrial Apprentice Electrician. Must understand 3-phase power, motor controls, PLC basics, and conduit installation. Experience with hand/power tools, digital multimeters, meggars required. Must have Electrical Apprentice License, OSHA-30, Arc Flash, First Aid/CPR certifications. Knowledge of industrial safety protocols, blueprint reading, and basic troubleshooting essential.'
  },
  'Industrial Journeyman Electrician': {
    minValue: 34,
    maxValue: 42,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman',
    team: 'Industrial',
    yearsExperience: '5+',
    prompt: 'Create a job description for an Industrial Journeyman Electrician. Expert in 3-phase power, VFDs, PLCs, instrumentation, and industrial control systems. Proficient in conduit bending, cable tray, hazardous location wiring. Must have State Electrical License, OSHA-30, Arc Flash, Confined Space certifications. Experience with industrial maintenance, automation systems, and mentoring apprentices required.'
  },
  'Senior Controls Technician': {
   minValue: 55,
   maxValue: 65, 
   experienceLevel: 'seniorLevel',
   category: 'Controls',
   team: 'Industrial',
   yearsExperience: '7+',
   prompt: 'Create a job description for a Senior Controls Technician specializing in manufacturing automation. Expert in Allen-Bradley PLCs, HMI programming, SCADA systems, and industrial networking protocols (EtherNet/IP, Modbus TCP/IP). Must have ISA Certified Control Systems Technician (CCST) Level III, OSHA-30, Arc Flash certification, and CompTIA Network+. Experience with Rockwell RSLogix 5000/Studio 5000, FactoryTalk View, Wonderware InTouch, and Siemens TIA Portal required. Strong background in process control loops, VFD configuration, and troubleshooting complex automation systems. Position requires 50-75% travel for commissioning and emergency support.'
},

'Process Controls Technician': {
   minValue: 48,
   maxValue: 58,
   experienceLevel: 'midLevel', 
   category: 'Controls',
   team: 'Industrial',
   yearsExperience: '5+',
   prompt: 'Create a job description for a Process Controls Technician. Expert in DCS systems (Honeywell, DeltaV), instrumentation calibration, and process control loops. Must have ISA Certified Control Systems Technician (CCST) Level II, OSHA-30, confined space certification, and ISA Certified Automation Professional (CAP). Experience with analog/digital instrumentation, control valve maintenance, and PID loop tuning. Proficient in HART protocol, Foundation Fieldbus, and industrial networking. Position requires 40-60% travel for plant startups and system upgrades.'
},

'Automation Controls Specialist': {
   minValue: 47,
   maxValue: 57,
   experienceLevel: 'seniorLevel',
   category: 'Controls', 
   team: 'Industrial',
   yearsExperience: '8+',
   prompt: 'Create a job description for an Automation Controls Specialist. Expert in multiple PLC platforms (Allen-Bradley, Siemens, Omron), robotics integration, and motion control systems. Must have Universal Robotics certification, FANUC robotics certification, OSHA-30, and PMMI Mechatronics certification. Experience with servo systems, vision systems, and industrial safety systems (Safety PLC). Proficient in AutoCAD Electrical, EPLAN, and panel design. Position requires 60-80% travel for robot cell commissioning and automation system deployments.'
},

'Controls Technician': {
   minValue: 46,
   maxValue: 58,
   experienceLevel: 'midLevel',
   category: 'Controls',
   team: 'Industrial', 
   yearsExperience: '4+',
   prompt: 'Create a job description for a Building Controls Technician. Expert in BAS/BMS systems (Johnson Controls, Honeywell, Siemens), HVAC controls, and energy management systems. Must have NEBB Building Systems Technical Certification, OSHA-30, and EPA Universal certification. Experience with Niagara Framework, Tridium, and LON/BACnet protocols. Proficient in DDC programming, VFD configuration, and mechanical systems integration. Position requires 30-50% travel for multiple site maintenance and system commissioning.'
},

'Controls Engineer': {
   minValue: 58,
   maxValue: 68,
   experienceLevel: 'seniorLevel',
   category: 'Controls',
   team: 'Industrial',
   yearsExperience: '10+', 
   prompt: 'Create a job description for a Safety Controls Engineer. Expert in machine safety systems, safety PLCs (Allen-Bradley GuardLogix, Siemens F-CPU), and risk assessment. Must have TÜV Functional Safety Engineer certification, OSHA-30, and Certified Machinery Safety Expert (CMSE) credentials. Experience with ISO 13849/IEC 62061 standards, safety system design, and safety network protocols (CIP Safety, PROFIsafe). Proficient in Sistema calculations, safety circuit design, and robot safety systems. Position requires 40-70% travel for safety system validation and compliance assessments.'
}
};

const PROMPT_STYLES = {
  'conversational': 'Make this job description friendly and conversational, using casual language while maintaining professionalism. Use "you" and "we" to speak directly to the candidate. Randomly select which requirement and certs are necessary for the role.',
  'formal': 'Write this job description in a formal, traditional corporate style with clear sections and bullet points. Randomly select which requirement and certs are necessary for the role.',
  'detailed': 'Create a comprehensive and detailed job description with specific examples and clear expectations for each responsibility. Randomly select which requirement and certs are necessary for the role.',
  'concise': 'Write a clear and concise job description focusing on key requirements and essential responsibilities. Randomly select which requirement and certs are necessary for the role.',
  'engaging': 'Create an engaging and energetic job description that excites potential candidates while highlighting growth opportunities. Randomly select which requirement and certs are necessary for the role.'
};

const DESCRIPTION_LENGTHS = {
  'short': 400,
  'medium': 600,
  'long': 900
};

const COMPANIES = {
  'Prime Partners': {
    name: 'Prime Partners',
    sameAs: 'https://www.primepartners.com/',
    logo: 'https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1.png'
  },
  'Staley Technologies': {
    name: 'Staley Technologies',
    sameAs: 'https://staleytechnologies.com/',
    logo: 'https://staleytechnologies.com/wp-content/uploads/2021/02/cropped-Logo_StaleyTechnologies.png'
  },
  'TR Group': {
    name: 'TR Group',
    sameAs: 'https://www.trgroup.com/',
    logo: 'https://www.trgroup.com/wp-content/uploads/2022/04/TR-Group-Logo.png'
  },
  'Integra Electrical': {
    name: 'Integra Electrical',
    sameAs: 'https://www.integraelectrical.co/',
    logo: 'https://www.integraelectrical.co/images/logos/Logo2.2403050635216.png'
  },
  'Swan Electrical Systems': {
    name: 'Swan Electrical Systems',
    sameAs: 'https://www.swanquality.com/',
    logo: 'https://images.squarespace-cdn.com/content/v1/54fbb084e4b0a61cf90b2a6b/1511915437509-KMEEKDHKFLZ8J2AD7Y8M/SWAN_logo_horz_black.jpg?format=1500w'
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
  }
};

const LOCATIONS = [
  { city: 'Kansas City', state: 'MO', zipCode: '64101' },
  { city: 'Glendale', state: 'AZ', zipCode: '85301' },
  { city: 'Richmond', state: 'VA', zipCode: '23219' },
  { city: 'Nashville', state: 'TN', zipCode: '37201' },
  { city: 'Cincinnati', state: 'OH', zipCode: '45202' },
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Fullerton', state: 'CA', zipCode: '92832' },
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Irving', state: 'TX', zipCode: '75061' },
  { city: 'Glendale', state: 'CA', zipCode: '91205' },
  { city: 'Sacramento', state: 'CA', zipCode: '95814' },
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'San Diego', state: 'CA', zipCode: '92101' },
  { city: 'Anaheim', state: 'CA', zipCode: '92805' },
  { city: 'Seattle', state: 'WA', zipCode: '98101' },
  { city: 'Columbus', state: 'OH', zipCode: '43215' },
  { city: 'Portland', state: 'OR', zipCode: '97201' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
  { city: 'St. Louis', state: 'MO', zipCode: '63101' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
  { city: 'Washington', state: 'DC', zipCode: '20001' },
  { city: 'Louisville', state: 'KY', zipCode: '40202' },
  { city: 'Cleveland', state: 'OH', zipCode: '44113' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'San Francisco', state: 'CA', zipCode: '94102' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Portland', state: 'OR', zipCode: '97201' },
  { city: 'Cleveland', state: 'OH', zipCode: '44113' },
  { city: 'Seattle', state: 'WA', zipCode: '98101' },
  { city: 'Las Vegas', state: 'NV', zipCode: '89101' },
  { city: 'San Jose', state: 'CA', zipCode: '95113' }
];

const STREET_TYPES = [
  'Main St.', 'Technology Dr.', 'Innovation Way', 'Corporate Blvd.', 
  'Commerce Dr.', 'Industrial Pkwy.', 'Enterprise Ave.', 'Business Center Dr.',
  'Professional Pkwy.', 'Executive Dr.', 'Tech Park Way', 'Trade Center Blvd.'
];

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
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

function generateRecentDate() {
  const now = new Date();
  const twoDaysAgo = new Date(now - (2 * 24 * 60 * 60 * 1000));
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const daysToAdd = Math.floor(Math.random() * (45 - 31 + 1) + 31);
  const validThrough = new Date(postedDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

function generateJobId(company, type) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  const promptStyles = Object.entries(PROMPT_STYLES);
  const selectedStyle = promptStyles[Math.floor(Math.random() * promptStyles.length)];
  
  const descLengths = Object.entries(DESCRIPTION_LENGTHS);
  const selectedLength = descLengths[Math.floor(Math.random() * descLengths.length)];

  const prompt = `${selectedStyle[1]} Create a ${selectedLength[0]} word job description in markdown format, do not include ticks to show the markdown:

${jobInfo.prompt}

Start with a paragraph about the role. Never use h1 tags or headings before this paragraph. After the paragraph intro, go into h2 tags for required experience and pay/benefits, Use the following information to format the job:

- Location: ${location.city}, ${location.state}. Name surrounding neighboring cities to ${location.city}.
- Company: ${company.name}
- Required Experience: ${jobInfo.yearsExperience} years plus 3 more experience nice to have bullet points for ${jobType} of role, certifications, and licenses
- Salary Range: $${minValue}-$${maxValue} per hour and benefits

Format in markdown without h1 tags. Do not include ticks or markdown formatting instructions. just show me the markdown.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: prompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  const jobData = {
    position: jobType,
    description: fullDescription.substring(0, 500) + '...',
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
  
  for (const location of LOCATIONS) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    await createJob(location, jobType, company);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

createAllJobs().catch(console.error);
