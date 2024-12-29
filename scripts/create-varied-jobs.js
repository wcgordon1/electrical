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
  'Electrician': {
    minValue: 22,
    maxValue: 30,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Industrial',
    yearsExperience: '1-3',
    responsibilities: 'Install and maintain industrial electrical systems, assist with motor control installations, perform conduit bending and installation, help troubleshoot electrical issues, follow safety protocols',
    qualifications: 'OSHA-30 certification, ability to read blueprints, knowledge of basic electrical theory, experience with hand and power tools',
    prompt: 'Create a job description for an Industrial Apprentice Electrician. Must understand 3-phase power, motor controls, PLC basics, and conduit installation. Experience with hand/power tools, digital multimeters, meggars required. Must have Electrical Apprentice License, OSHA-30, Arc Flash, First Aid/CPR certifications. Knowledge of industrial safety protocols, blueprint reading, and basic troubleshooting essential.'
  },
  'Industrial Electrician': {
   minValue: 40,
   maxValue: 48,
   experienceLevel: 'midLevel',
   category: 'Journeyman',
   team: 'Industrial',
   yearsExperience: '5+',
   responsibilities: 'Maintain automated manufacturing equipment, troubleshoot PLC systems, perform preventive maintenance, repair industrial machinery, implement equipment upgrades',
   qualifications: 'Experience with Allen Bradley PLCs, knowledge of manufacturing processes, ability to read ladder logic, proven technical troubleshooting skills',
   prompt: 'Create a job description for an Industrial Manufacturing Electrician. Must be expert in automated manufacturing systems, industrial controls, and predictive maintenance. Experience with Allen Bradley PLCs, Siemens drives, and robotic systems required. Must have Journeyman License, OSHA-30, Arc Flash, and forklift certifications. Strong background in 480V 3-phase power, motor controls, and equipment repair essential. Position involves rotating shifts to support 24/7 manufacturing operation. Must be able to respond to emergency calls and perform autonomous troubleshooting of complex systems. Knowledge of NFPA 70E and lockout/tagout procedures required.'
},

'Commercial Electrician': {
   minValue: 38,
   maxValue: 48,
   experienceLevel: 'midLevel',
   category: 'Journeyman', 
   team: 'Commercial',
   yearsExperience: '3-5',
   responsibilities: 'Install electrical systems in new construction, coordinate with other trades, read and interpret blueprints, bend conduit, pull wire, install lighting systems',
   qualifications: 'CA Journeyman License, commercial construction experience, strong blueprint reading skills, proficiency in conduit bending, knowledge of current NEC code',
   prompt: 'Create a job description for a Commercial Construction Electrician. Must understand commercial power distribution, lighting control systems, and fire alarm integration. Experience with EMT/rigid conduit installation, wire pulling techniques, and panel terminations required. Must have Journeyman License, OSHA-30, scissor lift, and powder-actuated tool certifications. Knowledge of current NEC codes, blueprint reading, and construction sequencing essential. Position involves working on active construction sites coordinating with multiple trades. Physical requirements include working from heights, lifting 50+ lbs, and standing for extended periods. Some overtime may be required to meet project deadlines.'
},

'Service Electrician': {
   minValue: 40,
   maxValue: 45,
   experienceLevel: 'seniorLevel',
   category: 'Journeyman',
   team: 'Commercial',
   yearsExperience: '7+',
   responsibilities: 'Diagnose electrical issues, respond to service calls, perform repairs and upgrades, maintain client relationships, document service history',
   qualifications: 'CA Journeyman License, extensive troubleshooting experience, strong customer service skills, clean driving record, ability to work independently',
   prompt: 'Create a job description for a Service & Maintenance Electrician specializing in emergency response and repairs. Expert in troubleshooting both commercial and residential systems, lighting repairs, and power quality issues. Must have Journeyman License, OSHA-30, and clean driving record. Experience with service work, customer relations, and proper documentation required. Position involves being on-call, responding to emergency situations, and managing service routes efficiently. Must maintain company vehicle and professional appearance. Strong diagnostic skills and ability to explain technical issues to clients essential. Knowledge of various brands and legacy systems required to support diverse client base. Territory covers metropolitan area with potential for overtime during emergency calls.'
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
'Cable Installer': {
   minValue: 20,
   maxValue: 28,
   experienceLevel: 'entryLevel',
   category: 'Voice Data',
   team: 'Commercial',
   yearsExperience: '1-5',
   responsibilities: 'Install voice/data cabling, terminate jacks and panels, test connections, maintain cable management, document installations',
   qualifications: 'BICSI Installer 1 certification preferred, experience with cable testing, knowledge of industry standards, valid drivers license',
   prompt: 'Create a job description for a Voice/Data Cable Installation Technician. Must understand structured cabling standards, termination techniques, and testing procedures. Experience with cable installation, Fluke testing equipment, and proper documentation required. BICSI Installer 1 certification preferred, OSHA-10 required. Knowledge of TIA/EIA standards, cable management, and labeling conventions essential. Position involves working in commercial environments and coordination with other trades. Pulling cable, terminating jacks, and testing connections required. Should have basic hand tools and knowledge of cable management systems. Some local travel between job sites required.'
},
'Residential Apprentice': {
   minValue: 20,
   maxValue: 24,
   experienceLevel: 'entryLevel',
   category: 'Apprentice',
   team: 'Residential',
   yearsExperience: '0-1',
   responsibilities: 'Assist with rough-in wiring, install boxes and panels, pull wire through new construction, drill holes and mount devices, learn proper wiring techniques',
   qualifications: 'High school diploma/GED, valid drivers license, Valid CA ET Card, basic math skills, ability to lift 50+ lbs, willingness to learn',
   prompt: 'Create a job description for a New Construction Residential Apprentice Electrician. Entry-level position learning residential electrical installation in new home construction. Must be enrolled in or eligible for state-approved apprenticeship program. No experience required but basic math and mechanical aptitude essential. Must have reliable transportation and basic hand tools. Position involves learning rough-in techniques, device installation, and basic electrical theory. Will work directly with journeyman electrician learning proper installation methods, tool usage, and safety procedures. Physical requirements include climbing ladders, working in attics/crawl spaces, and lifting heavy materials. Must be able to work full-time while attending required apprenticeship classes. Weekend work may be required during busy construction periods.'
},

'Residential Electrician': {
   minValue: 20,
   maxValue: 26,
   experienceLevel: 'entryLevel',
   category: 'Apprentice',
   team: 'Residential',
   yearsExperience: '1-2',
   responsibilities: 'Support service calls in luxury homes, assist with smart home installations, learn troubleshooting techniques, help with lighting control systems, maintain client properties',
   qualifications: 'Valid CA Electrical Trainee License, clean professional appearance, excellent communication skills, basic electrical knowledge, technology-oriented mindset',
   prompt: 'Create a job description for a Custom Home Service Apprentice Electrician focusing on high-end residential service and automation. Must have 1+ years electrical experience and strong technology aptitude. Position involves learning home automation systems, lighting controls, and advanced troubleshooting while working with experienced technicians. Must maintain professional appearance and communication skills for working in luxury homes. Experience with basic hand tools and electrical meters required. Will learn Lutron lighting, Crestron systems, and whole-house integration. Position requires attention to detail, clean background check, and drug screening. Must be comfortable working around expensive furnishings and maintaining client confidentiality. Some evening work required for system programming and testing. Career path leads to home automation specialist.'
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
  'short': 500,
  'medium': 700,
  'long': 900
};

const COMPANIES = {
  'Kirby Electric': {
    name: 'Kirby Electric',
    sameAs: 'https://kirbyelectric.com/',
    logo: 'https://kirbyelectric.com/wp-content/uploads/2023/03/kirby_logo.png'
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
  'HCI Systems': {
    name: 'HCI Systems',
    sameAs: 'https://www.hcisystems.net/',
    logo: 'https://www.hcisystems.net/wp-content/uploads/2019/04/logo.png'
  },
  'Howell Electric': {
    name: 'Howell Electric',
    sameAs: 'https://www.howellelectric.com/',
    logo: 'https://howellelectric.com/live/wp-content/uploads/2019/04/Howell-logo-img.png'
  },
  'ASL Electric': {
    name: 'ASL Electric',
    sameAs: 'https://www.aslelectric.com/',
    logo: 'https://aslelectric.com/wp-content/uploads/2022/02/ASL-vector-logo-1.png.webp'
  },
  'Myro Electrical': {
    name: 'Myro Electrical',
    sameAs: 'https://myroelectrical.com/',
    logo: 'https://images.squarespace-cdn.com/content/v1/6441d6a8c943293c268b4359/7b2478ca-3514-499f-80c1-3a92bb142f0c/curve__1_-removebg-preview.png?format=1500w'
  },
  'Access Cabling': {
    name: 'Access Cabling',
    sameAs: 'https://accesscabling.com/',
    logo: 'https://lirp.cdn-website.com/9add30a7/dms3rep/multi/opt/access-fresh-logo-removebg-preview-1920w.png'
  },
  'Advanced Alarm & Fire': {
    name: 'Advanced Alarm & Fire',
    sameAs: 'https://advancedalarmandfireinc.com/',
    logo: 'https://advancedalarmandfireinc.com/wp-content/uploads/2021/07/Fire-Safety-System-Orange-County-Los-Angeles-CA.png'
  },
  'Data Net Communications': {
    name: 'Data Net Communications',
    sameAs: 'https://dncommunications.com/',
    logo: 'https://img1.wsimg.com/isteam/ip/fb1fb3df-dff6-4c25-87cf-d86cb49834bd/logo/6a33dad7-451e-4204-ae39-ec25122c905e.jpg/:/rs=h:125'
  },
  'Berks Electrical': {
    name: 'Berks Electrical',
    sameAs: 'https://berkselectrical.com/',
    logo: 'https://berkselectrical.com/wp-content/uploads/2022/03/berk-logo.jpg'
  }
};

const LOCATIONS = [
  { city: 'Palm Springs', state: 'CA', zipCode: '92262' },
 { city: 'Temecula', state: 'CA', zipCode: '92590' },
 { city: 'Murrieta', state: 'CA', zipCode: '92562' },
 { city: 'San Luis Obispo', state: 'CA', zipCode: '93401' },
 { city: 'Santa Cruz', state: 'CA', zipCode: '95060' },
 { city: 'Redding', state: 'CA', zipCode: '96001' },
 { city: 'Chico', state: 'CA', zipCode: '95928' },
 { city: 'Modesto', state: 'CA', zipCode: '95354' },
 { city: 'Folsom', state: 'CA', zipCode: '95630' },
 { city: 'Davis', state: 'CA', zipCode: '95616' },
 { city: 'Fairfield', state: 'CA', zipCode: '94533' },
 { city: 'Vallejo', state: 'CA', zipCode: '94590' },
 { city: 'Santa Barbara', state: 'CA', zipCode: '93101' },
 { city: 'Anaheim', state: 'CA', zipCode: '92805' },
 { city: 'Burbank', state: 'CA', zipCode: '91502' },
 { city: 'Ontario', state: 'CA', zipCode: '91761' },
 { city: 'Oceanside', state: 'CA', zipCode: '92054' },
 { city: 'Oxnard', state: 'CA', zipCode: '93030' },
 { city: 'San Diego', state: 'CA', zipCode: '92101' },
 { city: 'Stockton', state: 'CA', zipCode: '95202' },

 // Additional 30 larger CA cities
 { city: 'Bakersfield', state: 'CA', zipCode: '93301' },
 { city: 'Fresno', state: 'CA', zipCode: '93721' },
 { city: 'Riverside', state: 'CA', zipCode: '92501' },
 { city: 'Santa Rosa', state: 'CA', zipCode: '95401' },
 { city: 'Elk Grove', state: 'CA', zipCode: '95624' },
 { city: 'Roseville', state: 'CA', zipCode: '95678' },
 { city: 'Thousand Oaks', state: 'CA', zipCode: '91360' },
 { city: 'Visalia', state: 'CA', zipCode: '93291' },
 { city: 'Concord', state: 'CA', zipCode: '94520' },
 { city: 'Santa Clara', state: 'CA', zipCode: '95050' },
 { city: 'Victorville', state: 'CA', zipCode: '92392' },
 { city: 'Berkeley', state: 'CA', zipCode: '94704' },
 { city: 'Antioch', state: 'CA', zipCode: '94509' },
 { city: 'Richmond', state: 'CA', zipCode: '94804' },
 { city: 'Vacaville', state: 'CA', zipCode: '95688' },
 { city: 'Merced', state: 'CA', zipCode: '95340' },
 { city: 'Carlsbad', state: 'CA', zipCode: '92008' },
 { city: 'Pleasanton', state: 'CA', zipCode: '94566' },
 { city: 'Tustin', state: 'CA', zipCode: '92780' },
 { city: 'Livermore', state: 'CA', zipCode: '94550' },
 { city: 'Mountain View', state: 'CA', zipCode: '94041' },
 { city: 'Napa', state: 'CA', zipCode: '94559' },
 { city: 'Redwood City', state: 'CA', zipCode: '94063' },
 { city: 'Newport Beach', state: 'CA', zipCode: '92660' },
 { city: 'San Rafael', state: 'CA', zipCode: '94901' },
 { city: 'San Marcos', state: 'CA', zipCode: '92069' },
 { city: 'Palo Alto', state: 'CA', zipCode: '94301' },
 { city: 'Walnut Creek', state: 'CA', zipCode: '94596' },
 { city: 'Camarillo', state: 'CA', zipCode: '93010' },
 { city: 'Mission Viejo', state: 'CA', zipCode: '92691' }
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
