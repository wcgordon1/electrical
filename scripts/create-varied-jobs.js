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
    responsibilities: 'Install and maintain industrial electrical systems, assist with motor control installations, perform conduit bending and installation, help troubleshoot electrical issues, follow safety protocols',
    qualifications: 'Electrical Apprentice License, OSHA-30 certification, ability to read blueprints, knowledge of basic electrical theory, experience with hand and power tools',
    prompt: 'Create a job description for an Industrial Apprentice Electrician. Must understand 3-phase power, motor controls, PLC basics, and conduit installation. Experience with hand/power tools, digital multimeters, meggars required. Must have Electrical Apprentice License, OSHA-30, Arc Flash, First Aid/CPR certifications. Knowledge of industrial safety protocols, blueprint reading, and basic troubleshooting essential.'
  },
  'Cable Installer': {
   minValue: 20,
   maxValue: 28,
   experienceLevel: 'entryLevel',
   category: 'Low Voltage',
   team: 'Commercial',
   yearsExperience: '0-2',
   responsibilities: 'Install and terminate CAT5e/CAT6/CAT6A cabling, maintain cable management systems, perform cable testing and certification, pull cable through various pathways, document cable installations',
   qualifications: 'BICSI Installer 1 certification, experience with cable testing equipment, knowledge of TIA/EIA standards, physical ability to lift 50+ lbs, valid drivers license',
   prompt: 'Create a job description for a Cable Installation Technician. Must understand structured cabling standards, cable testing/certification procedures, and pathway requirements. Experience with Fluke testing equipment, cable termination tools, and cable management required. Must have BICSI Installer 1, OSHA-10, scissor lift certifications. Knowledge of TIA/EIA standards, telecommunications room requirements, and proper labeling essential. Some travel between job sites required.'
},
'Security Technician': {
   minValue: 24,
   maxValue: 32,
   experienceLevel: 'entryLevel',
   category: 'Security',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install security cameras, access control systems, and intrusion detection devices, configure basic system programming, maintain security equipment, troubleshoot system issues',
   qualifications: 'ESA Level 1 certification, experience with IP cameras, knowledge of access control systems, clean background check, valid drivers license',
   prompt: 'Create a job description for a Security Systems Installer for low voltage commercial projects. Must understand IP camera systems, access control platforms, and intrusion detection devices. Experience with Milestone, Genetec, or similar VMS platforms required. Must have ESA Level 1, OSHA-10, low voltage license where required. Knowledge of network basics, PoE, basic programming, and system commissioning essential. Local travel between customer sites required. Clean background check and drug screening mandatory.'
},

'Data Center Technician': {
   minValue: 25,
   maxValue: 35,
   experienceLevel: 'entryLevel', 
   category: 'Data Center',
   team: 'Data Center',
   yearsExperience: '1-3',
   responsibilities: 'Install and maintain data center infrastructure, rack and stack equipment, run structured cabling, assist with cooling systems maintenance, monitor power distribution',
   qualifications: 'CDCTP certification preferred, understanding of data center operations, knowledge of cooling systems, ability to lift 50+ lbs, willing to work rotating shifts',
   prompt: 'Create a job description for a Data Center Infrastructure Technician. Must understand power distribution, cooling systems, and rack infrastructure. Experience with structured cabling, environmental monitoring, and basic networking required. Must have CDCTP or equivalent certification, OSHA-10, and ESD certification. Knowledge of raised floor systems, hot/cold aisle containment, and critical facility operations essential. Must be willing to work rotating shifts including nights/weekends. Emergency on-call rotation required.'
},

'Fiber Optics Installer': {
   minValue: 23,
   maxValue: 31,
   experienceLevel: 'entryLevel',
   category: 'Fiber Optics',
   team: 'Commercial',
   yearsExperience: '1-5',
   responsibilities: 'Install and terminate fiber optic cables, perform OTDR testing, maintain fiber documentation, splice fiber cables, troubleshoot fiber issues',
   qualifications: 'FOA CFOT certification, experience with fusion splicing, knowledge of fiber testing equipment, valid drivers license, ability to work at heights',
   prompt: 'Create a job description for a Fiber Optics Installer. Must understand single-mode and multi-mode fiber installation, fusion splicing techniques, and OTDR testing procedures. Experience with Fujikura fusion splicers, EXFO test equipment, and fiber termination methods required. Must have FOA CFOT certification, OSHA-10, aerial lift certification. Knowledge of fiber loss budgets, proper cable handling, and industry standards essential. Travel to various job sites required. Must be comfortable working at heights and in various weather conditions.'
},
'Audio Visual Technician': {
   minValue: 22,
   maxValue: 30,
   experienceLevel: 'entryLevel',
   category: 'Audio Visual',
   team: 'Commercial',
   yearsExperience: '1-4',
   responsibilities: 'Install AV equipment, terminate AV cables, configure basic systems, maintain documentation, assist with system testing',
   qualifications: 'AVIXA CTS certification preferred, understanding of audio and video systems, knowledge of control systems, good customer service skills',
   prompt: 'Create a job description for an Audio Visual Technician. Must understand audio/video systems, control interfaces, and digital signal processing. Experience with Crestron/Extron systems, video distribution, and audio reinforcement required. AVIXA CTS certification preferred, OSHA-10, lift certification required. Knowledge of display technologies, conferencing systems, and rack building essential. Customer-facing position requires excellent communication skills and professional appearance. Some evening/weekend work for system commissioning.'
},
'Fire Alarm Installer': {
   minValue: 21,
   maxValue: 29,
   experienceLevel: 'entryLevel',
   category: 'Fire Alarm',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install fire alarm devices, pull wire, assist with system testing, maintain documentation, help with troubleshooting',
   qualifications: 'NICET Level I preferred, knowledge of NFPA 72, understanding of fire alarm systems, valid drivers license, clean background check',
   prompt: 'Create a job description for a Fire Alarm Installer. Must understand fire alarm systems, initiating devices, and notification appliances. Experience with Notifier, Simplex, or Edwards systems preferred. NICET Level I preferred, OSHA-10, and First Aid/CPR required. Knowledge of NFPA 72, blueprint reading, and basic electricity essential. Position requires clean driving record and ability to pass background check. Must be willing to participate in on-call rotation after training period.'
},
'Residential Solar Installer': {
   minValue: 17,
   maxValue: 23,
   experienceLevel: 'entryLevel',
   category: 'Apprentice',
   team: 'Solar',
   yearsExperience: '1-4',
   responsibilities: 'Install residential solar systems, mount solar panels, install racking systems, run conduit, pull wire, assist with system commissioning',
   qualifications: 'NABCEP Associate certification preferred, roofing experience helpful, comfortable working at heights, valid drivers license',
   prompt: 'Create a job description for a Residential Solar Installer. Must understand solar PV systems, mounting techniques, and basic electrical. Experience with roof work, power tools, and conduit installation required. NABCEP Associate certification preferred, OSHA-10, fall protection certification required. Knowledge of NEC Article 690, basic electrical theory, and safety protocols essential. Position requires comfort working at heights and ability to lift 50+ lbs regularly. Must be willing to work outdoors in various weather conditions.'
},
'Voice Data Installer': {
   minValue: 20,
   maxValue: 28,
   experienceLevel: 'entryLevel',
   category: 'Voice Data',
   team: 'Commercial',
   yearsExperience: '1-5',
   responsibilities: 'Install voice/data cabling, terminate jacks and panels, test connections, maintain cable management, document installations',
   qualifications: 'BICSI Installer 1 certification preferred, experience with cable testing, knowledge of industry standards, valid drivers license',
   prompt: 'Create a job description for a Voice/Data Installation Technician. Must understand structured cabling standards, termination techniques, and testing procedures. Experience with cable installation, Fluke testing equipment, and proper documentation required. BICSI Installer 1 certification preferred, OSHA-10 required. Knowledge of TIA/EIA standards, cable management, and labeling conventions essential. Position involves working in commercial environments and coordination with other trades. Some local travel between job sites required.'
},
'Electrical Apprentice': {
   minValue: 22,
   maxValue: 32,
   experienceLevel: 'entryLevel',
   category: 'Apprentice',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install commercial electrical systems, assist with lighting installations, run EMT conduit, pull wire, wire devices, help troubleshoot electrical issues, maintain documentation',
   qualifications: 'Electrical Apprentice License, OSHA-10 certification, basic electrical knowledge, ability to read blueprints, experience with power tools',
   prompt: 'Create a job description for a Commercial Electrical Apprentice. Must understand basic electrical theory, lighting systems, and commercial power distribution. Experience with EMT conduit bending, wire pulling, and device termination required. Must have Electrical Apprentice License, OSHA-10, First Aid/CPR, and scissor lift certifications. Knowledge of NEC code requirements, commercial construction practices, and basic lighting controls essential. Position involves working in commercial/retail environments and coordinating with other trades. Some work from heights and ladder usage required. Must be able to lift 50+ lbs regularly and be willing to work overtime when needed. Local travel between job sites expected.'
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
  'HCI Systems': {
    name: 'HCI Systems',
    sameAs: 'https://www.hcisystems.net/',
    logo: 'https://www.hcisystems.net/wp-content/uploads/2019/04/logo.png'
  },
  'Convergint': {
    name: 'Convergint',
    sameAs: 'https://www.convergint.com/',
    logo: 'https://www.convergint.com/wp-content/uploads/2021/06/logo-on-dark-blue.png'
  }
};

const LOCATIONS = [
  { city: 'New Orleans', state: 'LA', zipCode: '70112' },
  { city: 'Tampa', state: 'FL', zipCode: '33602' },
  { city: 'Pittsburgh', state: 'PA', zipCode: '15222' },
  { city: 'Albuquerque', state: 'NM', zipCode: '87102' },
  { city: 'Salt Lake City', state: 'UT', zipCode: '84101' },
  { city: 'Boise', state: 'ID', zipCode: '83702' },
  { city: 'Oklahoma City', state: 'OK', zipCode: '73102' },
  { city: 'Wichita', state: 'KS', zipCode: '67202' },
  { city: 'Hartford', state: 'CT', zipCode: '06103' },
  { city: 'Providence', state: 'RI', zipCode: '02903' },
  { city: 'Lubbock', state: 'TX', zipCode: '79401' },
  { city: 'McAllen', state: 'TX', zipCode: '78501' },
  { city: 'Waco', state: 'TX', zipCode: '76701' },
  { city: 'Huntsville', state: 'AL', zipCode: '35801' },
  { city: 'Greenville', state: 'SC', zipCode: '29601' },
  { city: 'Spokane', state: 'WA', zipCode: '99201' },
  { city: 'Fayetteville', state: 'AR', zipCode: '72701' },
  { city: 'Des Moines', state: 'IA', zipCode: '50309' },
  // Nearby cities added:
  { city: 'Baton Rouge', state: 'LA', zipCode: '70802' },
  { city: 'Lafayette', state: 'LA', zipCode: '70501' },
  { city: 'St. Petersburg', state: 'FL', zipCode: '33701' },
  { city: 'Clearwater', state: 'FL', zipCode: '33755' },
  { city: 'State College', state: 'PA', zipCode: '16801' },
  { city: 'Youngstown', state: 'OH', zipCode: '44503' },
  { city: 'Provo', state: 'UT', zipCode: '84601' },
  { city: 'Ogden', state: 'UT', zipCode: '84401' },
  { city: 'Twin Falls', state: 'ID', zipCode: '83301' },
  { city: 'Nampa', state: 'ID', zipCode: '83651' },
  { city: 'Tulsa', state: 'OK', zipCode: '74103' },
  { city: 'Norman', state: 'OK', zipCode: '73069' },
  { city: 'Topeka', state: 'KS', zipCode: '66603' },
  { city: 'Springfield', state: 'MA', zipCode: '01103' },
  { city: 'New Haven', state: 'CT', zipCode: '06510' },
  { city: 'Savannah', state: 'GA', zipCode: '31401' },
  { city: 'Macon', state: 'GA', zipCode: '31201' },
  { city: 'Athens', state: 'GA', zipCode: '30601' },
  { city: 'Columbus', state: 'GA', zipCode: '31901' },
  { city: 'Marietta', state: 'GA', zipCode: '30060' },

  // North Carolina
  { city: 'Winston-Salem', state: 'NC', zipCode: '27101' },
  { city: 'Durham', state: 'NC', zipCode: '27701' },
  { city: 'Asheville', state: 'NC', zipCode: '28801' },
  { city: 'Wilmington', state: 'NC', zipCode: '28401' },
  { city: 'Greensboro', state: 'NC', zipCode: '27401' },

  // South Carolina
  { city: 'Columbia', state: 'SC', zipCode: '29201' },
  { city: 'Charleston', state: 'SC', zipCode: '29401' },
  { city: 'Myrtle Beach', state: 'SC', zipCode: '29577' },
  { city: 'Rock Hill', state: 'SC', zipCode: '29730' },
  { city: 'Anderson', state: 'SC', zipCode: '29621' },

  // Tennessee
  { city: 'Knoxville', state: 'TN', zipCode: '37902' },
  { city: 'Chattanooga', state: 'TN', zipCode: '37402' },
  { city: 'Murfreesboro', state: 'TN', zipCode: '37130' },
  { city: 'Clarksville', state: 'TN', zipCode: '37040' },
  { city: 'Franklin', state: 'TN', zipCode: '37064' },

  // Virginia
  { city: 'Norfolk', state: 'VA', zipCode: '23510' },
  { city: 'Virginia Beach', state: 'VA', zipCode: '23451' },
  { city: 'Roanoke', state: 'VA', zipCode: '24011' },
  { city: 'Alexandria', state: 'VA', zipCode: '22314' },
  { city: 'Chesapeake', state: 'VA', zipCode: '23320' },

  // Colorado
  { city: 'Fort Collins', state: 'CO', zipCode: '80524' },
  { city: 'Boulder', state: 'CO', zipCode: '80302' },
  { city: 'Aurora', state: 'CO', zipCode: '80012' },
  { city: 'Pueblo', state: 'CO', zipCode: '81003' },
  { city: 'Grand Junction', state: 'CO', zipCode: '81501' }
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

Start with a paragraph about the role in ${location.city}, ${location.state} at ${company.name}. Name surrounding neighboring cities to ${location.city}. Never use h1 tags or headings before this paragraph. After the paragraph intro, go into h2 tags for Qualifications, Responsibilities, and Pay/Benefits, Use the following information to format the job:

## Key Responsibilities
${jobInfo.responsibilities} (add and subtract qualifications as needed)

## Required Qualifications
${jobInfo.qualifications} (add and subtract qualifications as needed)
${jobInfo.yearsExperience} years of experience required for ${jobInfo.category} work in ${jobInfo.team} setting.

## Compensation & Benefits
- Salary Range: $${minValue}-$${maxValue} per hour
- Comprehensive benefits package
- Career advancement opportunities
- Ongoing training and certifications

Format in markdown without h1 tags. Do not include ticks or markdown formatting instructions. just show me the markdown.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
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
      'Michael.Mckeaige@pes123.com'
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
