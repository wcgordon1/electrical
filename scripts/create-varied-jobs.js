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
  'Residential Electrician': {
    minValue: 20,
    maxValue: 28,
    experienceLevel: 'seniorLevel',
    category: 'Apprentice',
    team: 'Residential',
    yearsExperience: '1-5',
    prompt: 'Create a job description for a Residential Apprentice Electrician. Must have knowledge of basic electrical theory, residential wiring methods (NM cable/Romex), load calculations, and panel installations. Experience with hand tools (Klein, Knipex), power tools (Milwaukee, DeWalt), digital multimeters (Fluke), and basic test equipment required. Must possess valid Electrical Apprentice License/Trainee Card, OSHA-10, First Aid/CPR certification, and valid drivers license. Experience with residential rough-in, service upgrades, fixture/device installation, and basic troubleshooting preferred. Must be enrolled in or eligible for state-approved apprenticeship program.'
  },
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
  'Commercial Electrician': {
    minValue: 36,
    maxValue: 43,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman',
    team: 'Commercial',
    yearsExperience: '5+',
    prompt: 'Create a job description for a Commercial Journeyman Electrician. Expert in commercial electrical systems, lighting controls, fire alarm, and power distribution. Proficient in conduit bending, wire pulling, panel building. Must have State Electrical License, OSHA-30, Arc Flash certifications. Experience with blueprint reading, crew leadership, and project coordination required.'
  },
  'Cable Technician': {
    minValue: 24,
    maxValue: 32,
    experienceLevel: 'seniorLevel',
    category: 'Voice Data',
    team: 'Commercial',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Commercial Cable Technician. Expert in Cat5e/6/6A installation, fiber optics, cable certification testing. Experience with Fluke testing equipment, cable management systems required. Must have BICSI Installer 2, OSHA-10, Network+ certifications. Knowledge of structured cabling standards, blueprint reading, and documentation practices essential.'
  },
  'Controls Technician': {
    minValue: 28,
    maxValue: 38,
    experienceLevel: 'seniorLevel',
    category: 'Controls',
    team: 'Industrial',
    yearsExperience: '5+',
    prompt: 'Create a job description for a Controls Technician. Expert in PLC programming (Allen Bradley, Siemens), HMI development, industrial networking protocols. Experience with VFDs, instrumentation, SCADA systems required. Must have Associates/Technical degree, vendor certifications (Rockwell, Siemens), OSHA-30. Knowledge of AutoCAD, troubleshooting control systems, and documentation essential.'
  },
  'Data Center Technician': {
    minValue: 26,
    maxValue: 34,
    experienceLevel: 'seniorLevel',
    category: 'Data Center',
    team: 'Data Center',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Data Center Technician. Expert in power distribution, cooling systems, network infrastructure. Experience with UPS systems, generators, CRAC units required. Must have BICSI DCDC, OSHA-30, CompTIA Server+. Knowledge of monitoring systems, preventive maintenance, emergency procedures essential.'
  },
  'Security Technician': {
    minValue: 24,
    maxValue: 32,
    experienceLevel: 'seniorLevel',
    category: 'Security',
    team: 'Commercial',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Security Systems Technician. Expert in access control systems, video surveillance, and intrusion detection. Experience with Genetec, Lenel, AMAG platforms required. Must have ESA/NTS certification, OSHA-10, and low voltage license. Knowledge of IP networking, system programming, and client training essential.'
  },
  'Commercial Apprentice': {
    minValue: 20,
    maxValue: 28,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '1-3',
    prompt: 'Create a job description for a Commercial Apprentice Electrician. Must understand commercial wiring methods, conduit installation, and power distribution basics. Experience with conduit bending, wire pulling, and tool operation required. Must have Electrical Apprentice License, OSHA-10, First Aid/CPR certifications. Knowledge of blueprint reading and basic troubleshooting essential.'
  },
  'Fire Alarm Technician': {
    minValue: 26,
    maxValue: 34,
    experienceLevel: 'seniorLevel',
    category: 'Fire Alarm',
    team: 'Commercial',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Fire Alarm Technician. Expert in fire alarm system installation, programming, and testing. Experience with Notifier, Simplex, Edwards systems required. Must have NICET Level II, low voltage license, and OSHA-30. Knowledge of NFPA 72, inspection procedures, and documentation essential.'
  },
  'Service Electrician': {
    minValue: 32,
    maxValue: 40,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman',
    team: 'Commercial',
    yearsExperience: '5+',
    prompt: 'Create a job description for a Commercial Service Electrician. Expert in troubleshooting electrical systems, emergency repairs, and preventive maintenance. Experience with testing equipment, power quality analysis required. Must have State Electrical License, OSHA-30. Strong customer service and problem-solving skills essential.'
  },
  'AV Technician': {
    minValue: 24,
    maxValue: 32,
    experienceLevel: 'seniorLevel',
    category: 'Audio Visual',
    team: 'Commercial',
    yearsExperience: '3-5',
    prompt: 'Create a job description for an Audio Visual Technician. Expert in audiovisual system installation, configuration, and programming. Experience with Crestron, Extron, QSC platforms required. Must have CTS certification, low voltage license. Knowledge of digital audio/video, control systems, and user training essential.'
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
  // West Coast
  { city: 'San Francisco', state: 'CA', zipCode: '94105' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Seattle', state: 'WA', zipCode: '98101' },
  // East Coast
  { city: 'New York', state: 'NY', zipCode: '10007' },
  { city: 'Boston', state: 'MA', zipCode: '02110' },
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  // Central
  { city: 'Chicago', state: 'IL', zipCode: '60601' },
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'New York City', state: 'NY', zipCode: '10001' },
  { city: 'Buffalo', state: 'NY', zipCode: '14201' },
  { city: 'Boston', state: 'MA', zipCode: '02108' },
  { city: 'Worcester', state: 'MA', zipCode: '01608' },
  { city: 'Philadelphia', state: 'PA', zipCode: '19103' },
  { city: 'Pittsburgh', state: 'PA', zipCode: '15222' },
  // South/Southeast
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  { city: 'Jacksonville', state: 'FL', zipCode: '32202' },
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Augusta', state: 'GA', zipCode: '30901' },
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  // Midwest
  { city: 'Chicago', state: 'IL', zipCode: '60601' },
  { city: 'Aurora', state: 'IL', zipCode: '60505' },
  { city: 'Detroit', state: 'MI', zipCode: '48201' },
  { city: 'Grand Rapids', state: 'MI', zipCode: '49503' },
  { city: 'Columbus', state: 'OH', zipCode: '43215' },
  { city: 'Cleveland', state: 'OH', zipCode: '44113' },
  // Texas
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  // Mountain Region
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
  { city: 'Tucson', state: 'AZ', zipCode: '85701' },
  // Other Regions
  { city: 'Nashville', state: 'TN', zipCode: '37203' },
  { city: 'Memphis', state: 'TN', zipCode: '38103' },
  { city: 'Baltimore', state: 'MD', zipCode: '21202' },
  { city: 'Annapolis', state: 'MD', zipCode: '21401' },
  { city: 'Kansas City', state: 'MO', zipCode: '64105' },
  { city: 'St. Louis', state: 'MO', zipCode: '63101' },
  { city: 'New York City', state: 'NY', zipCode: '10001' },
{ city: 'Buffalo', state: 'NY', zipCode: '14201' },
{ city: 'Boston', state: 'MA', zipCode: '02108' },
{ city: 'Worcester', state: 'MA', zipCode: '01608' },
{ city: 'Philadelphia', state: 'PA', zipCode: '19103' },
{ city: 'Pittsburgh', state: 'PA', zipCode: '15222' },
// South/Southeast
{ city: 'Miami', state: 'FL', zipCode: '33131' },
{ city: 'Jacksonville', state: 'FL', zipCode: '32202' },
{ city: 'Atlanta', state: 'GA', zipCode: '30303' },
{ city: 'Augusta', state: 'GA', zipCode: '30901' },
{ city: 'Charlotte', state: 'NC', zipCode: '28202' },
{ city: 'Raleigh', state: 'NC', zipCode: '27601' },
// Midwest
{ city: 'Chicago', state: 'IL', zipCode: '60601' },
{ city: 'Aurora', state: 'IL', zipCode: '60505' },
{ city: 'Detroit', state: 'MI', zipCode: '48201' },
{ city: 'Grand Rapids', state: 'MI', zipCode: '49503' },
{ city: 'Columbus', state: 'OH', zipCode: '43215' },
{ city: 'Cleveland', state: 'OH', zipCode: '44113' },
// Texas
{ city: 'Houston', state: 'TX', zipCode: '77002' },
{ city: 'Dallas', state: 'TX', zipCode: '75201' },
// Mountain Region
{ city: 'Denver', state: 'CO', zipCode: '80202' },
{ city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
{ city: 'Phoenix', state: 'AZ', zipCode: '85003' },
{ city: 'Tucson', state: 'AZ', zipCode: '85701' },
// Other Regions
{ city: 'Nashville', state: 'TN', zipCode: '37203' },
{ city: 'Memphis', state: 'TN', zipCode: '38103' },
{ city: 'Baltimore', state: 'MD', zipCode: '21202' },
{ city: 'Annapolis', state: 'MD', zipCode: '21401' },
{ city: 'Kansas City', state: 'MO', zipCode: '64105' },
{ city: 'St. Louis', state: 'MO', zipCode: '63101' }
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
