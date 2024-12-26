const COMPANIES = {
  'Helix Electric': {
    name: 'Helix Electric',
    sameAs: 'https://www.helixelectric.com/',
    logo: 'https://www.helixelectric.com/wp-content/uploads/2022/07/Helping-Hands-Logo_Blue-e1656694113799.jpg'
  },
  'Rogers Electric': {
    name: 'Rogers Electric',
    sameAs: 'https://www.rogerselectric.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbvt0RMRvj6bZdL81Q6HJeRVl_qflQIGgp9w&s'
  },
  'Tri City Electric': {
    name: 'Tri City Electric',
    sameAs: 'https://www.tcelectric.com/',
    logo: 'https://www.tcelectric.com/wp-content/themes/TriCity/images/logo.png'
  },
  'Lyons Electrical': {
    name: 'Lyons Electrical',
    sameAs: 'https://lyonselectricalcontractorsinc.com/',
    logo: 'https://lyonselectrica.wpenginepowered.com/wp-content/uploads/2022/10/cropped-IMG_1061.jpg'
  },
  'Priority Electrical Services': {
    name: 'Priority Electrical Services',
    sameAs: 'https://upstateelectric.com/',
    logo: 'https://upstateelectric.com/wp-content/uploads/2024/01/priority-electrical-logo-dark-300x161.png'
  },
  'Expert Wire': {
    name: 'Expert Wire',
    sameAs: 'https://www.expertwire247.com/',
    logo: 'https://www.expertwire247.com/uplift-data/images/logo.webp'
  },
  'H & A Electric': {
    name: 'H & A Electric',
    sameAs: 'https://www.bestnycelectricianmanhattan.com/',
    logo: 'https://www.bestnycelectricianmanhattan.com/wp-content/uploads/2018/11/HA-NYC-Electrician-copy11.png'
  },
  'Nipper Electric': {
    name: 'Nipper Electric',
    sameAs: 'https://nipperelectric.com/',
    logo: 'https://nipperelectric.com/wp-content/uploads/2019/12/Logo-Nipper-horizontal-primary.png'
  },
  'Jackson Electric': {
    name: 'Jackson Electric',
    sameAs: 'https://www.jacksonelect.com/',
    logo: 'https://www.jacksonelect.com/images/logo.png'
  },
  'HCS Electrical': {
    name: 'HCS Electrical',
    sameAs: 'https://www.hcselectricaltn.com/',
    logo: 'https://static.wixstatic.com/media/29136b_5c8b0c907ae14017a0e0ab8046606ac9~mv2.png/v1/crop/x_63,y_193,w_388,h_118/fill/w_398,h_120,al_c,lg_1,q_85,enc_avif,quality_auto/Android%20Playstore%20Logo.png'
  },
  'McCall Electric': {
    name: 'McCall Electric',
    sameAs: 'https://mccallent.com/',
    logo: 'https://mccallent.com/wp-content/uploads/2018/02/McCall-t-edge-1.png'
  },
  'IES Electric': {
    name: 'IES Electric',
    sameAs: 'https://iesci.net/',
    logo: 'https://iesci.net/wp-content/uploads/2024/08/IES-Electrical-Logo-color.png'
  }
};

const JOB_TYPES = {
  'Commercial Electrician': {
minValue: 32,
maxValue: 36,
experienceLevel: 'seniorLevel',
category: 'Journeyman',
yearsExperience: '3-5',
prompt: 'Create a detailed job description for a Journeyman Electrician with experience in commercial and industrial installations. Must have experience with conduit bending, pipe threading, motor controls, transformers, panel building, and blueprint reading. Knowledge of NEC codes, ability to troubleshoot complex electrical systems, and experience mentoring apprentices required. Focus on healthcare, data centers, and manufacturing environments.'
},
'Cable Tech': {
minValue: 21,
maxValue: 24,
experienceLevel: 'seniorLevel',
category: 'Voice Data',
yearsExperience: '3-5',
prompt: 'Create a detailed job description for a Voice/Data technician proficient in Cat5e/6/6A installation, fiber optic cabling, and wireless systems. Must have experience with structured cabling design, network certification testing, cable management, and maintaining documentation. Knowledge of TIA/EIA standards and ability to work in active office environments required.'
},
'Data Center Technician': {
minValue: 24,
maxValue: 29,
experienceLevel: 'seniorLevel',
category: 'Data Center',
yearsExperience: '3-5',
prompt: 'Create a detailed job description for a Data Center Technician experienced in high-density environments. Must have experience with power distribution, cooling systems, structured cabling, network infrastructure, and monitoring systems. Knowledge of redundancy requirements, preventive maintenance, and emergency procedures required. Focus on 24/7 uptime and mission-critical operations.'
},
'Apprentice Electrician': {
minValue: 19,
maxValue: 24,
experienceLevel: 'entryLevel',
category: 'Apprentice',
yearsExperience: '1-2',
prompt: 'Create a detailed job description for an Electrical Apprentice with basic knowledge of hand tools, electrical theory, and safety practices. Must be enrolled in or eligible for apprenticeship program, able to read basic blueprints, and assist journeymen with installations. Focus on eagerness to learn, physical capabilities, and communication skills.'
},
'Security Technician': {
minValue: 24,
maxValue: 29,
experienceLevel: 'seniorLevel',
category: 'Security',
yearsExperience: '3-5',
prompt: 'Create a detailed job description for a Low Voltage Security Systems Technician experienced in access control, video surveillance, and intrusion detection systems. Must have experience installing and configuring security platforms (Genetec, Lenel, CCURE), IP cameras, card readers, and door hardware. Knowledge of structured cabling, networking fundamentals, and system integration required. Focus on commercial and enterprise security projects.'
}
};

const TEAMS = [
  'Commercial',
  //'Industrial', 
];

const DESCRIPTION_LENGTHS = {
  short: 400,
  medium: 600,
  long: 800
};

const CERTIFICATIONS = {
  'Apprentice': [
'OSHA 10',
'First Aid/CPR',
'State Trainee Card',
'Basic Electrical Safety',
'Lift Certification',
'Valid Drivers License'
],
'Journeyman': [
'State Electrical License',
'OSHA 30',
'Arc Flash Safety',
'Confined Space',
'Lift Certification',
'First Aid/CPR',
'Valid Drivers License',
'Master Electrician (preferred)'
],
'Voice Data': [
'BICSI Installer 2',
'OSHA 10',
'First Aid/CPR',
'Network+ Certification',
'Lift Certification',
'Valid Drivers License',
'Manufacturer Certifications (Commscope/Panduit)'
],
'Data Center': [
'BICSI DCDC',
'OSHA 30',
'First Aid/CPR',
'Arc Flash Safety',
'Lift Certification',
'CompTIA Server+',
'CDCDP (preferred)'
],
  //'Project Management': ['PMP', 'CAPM', 'PRINCE2', 'IPMA'],
  // 'Fire Alarm': ['NFPA 70', 'NFPA 25', 'NFPA 1041', 'NFPA 1042'],
 'Security': ['Lenel', 'Crestron', 'C-Cure', 'C-More']
  // 'Controls': ['PLC Programming', 'HVAC Controls', 'BMS Certification', 'Industrial Automation']
};

const TOOLS_AND_TECH = {
  'Apprentice': [
'Digital Multimeters (Fluke)',
'Power Tools (Milwaukee, DeWalt)',
'Hand Tools (Klein, Knipex)',
'Conduit Benders (Manual/Electric)',
'Basic First Aid/CPR',
'OSHA 10',
'Basic AutoCAD',
'MS Office'
],
'Journeyman': [
'Advanced Meters (Fluke 87V)',
'Power Tools (Milwaukee, DeWalt)',
'Specialty Tools (Hydraulic Benders, Threaders)',
'Thermal Imaging Cameras',
'Power Quality Analyzers',
'First Aid/CPR',
'OSHA 30',
'Arc Flash Training',
'Lift Certification'
],
'Voice Data': [
'Cable Certifiers (Fluke DSX)',
'Fiber Splicers (Fujikura)',
'OTDR Testing Equipment',
'Cable Management Tools',
'Network Testing Tools',
'BICSI Certifications',
'OSHA 10',
'First Aid/CPR',
'Lift Certification'
],
'Data Center': [
'Power Monitoring Systems',
'Environmental Monitoring Tools',
'Network Testing Equipment',
'Cable Management Systems',
'DCIM Software',
'BICSI DC Certification',
'OSHA 30',
'First Aid/CPR',
'Arc Flash Training',
'lift Certification'
],
  // 'Project Management': ['Project Management Software', 'Estimating Tools', 'Code Analysis', 'Design Software'],
  // 'Fire Alarm': ['Fire Alarm Software', 'Fire Alarm Design Software', 'Fire Alarm Testing Equipment', 'Fire Alarm Installation Tools'],
 'Security': ['Lenel', 'Crestron', 'C-Cure', 'C-More']
  // 'Controls': ['PLC Software', 'SCADA Systems', 'Building Automation', 'Network Tools']
};

const WORK_ENVIRONMENTS = [
  { 
    type: 'Commercial', 
    clients: ['Office Buildings', 'Retail Centers', 'Hospitals', 'Schools'] 
  },
  { 
    type: 'Fire Alarm', 
    clients: ['Commercial Buildings', 'Healthcare Facilities', 'Educational Institutions'] 
  },
  { 
    type: 'Security', 
    clients: ['Corporate Offices', 'Government Facilities', 'Healthcare Centers'] 
  }
];

const LOCATIONS = [ 
  // Colorado - Data Center & Tech Hub
{ city: 'Denver', state: 'CO', zipCode: '80202' },
{ city: 'Aurora', state: 'CO', zipCode: '80012' },
{ city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
{ city: 'Broomfield', state: 'CO', zipCode: '80020' },
// Texas - Growth Areas
{ city: 'Dallas', state: 'TX', zipCode: '75201' },
{ city: 'Fort Worth', state: 'TX', zipCode: '76102' },
{ city: 'San Antonio', state: 'TX', zipCode: '78205' },
{ city: 'Houston', state: 'TX', zipCode: '77002' },
{ city: 'Plano', state: 'TX', zipCode: '75024' },
{ city: 'Irving', state: 'TX', zipCode: '75038' },
// Florida - Development Hubs
{ city: 'Orlando', state: 'FL', zipCode: '32801' },
{ city: 'Tampa', state: 'FL', zipCode: '33602' },
{ city: 'Jacksonville', state: 'FL', zipCode: '32202' },
{ city: 'Miami', state: 'FL', zipCode: '33131' },
// North Carolina - Tech Corridor
{ city: 'Charlotte', state: 'NC', zipCode: '28202' },
{ city: 'Raleigh', state: 'NC', zipCode: '27601' },
{ city: 'Durham', state: 'NC', zipCode: '27701' },
// Illinois/Midwest
{ city: 'Chicago', state: 'IL', zipCode: '60601' },
{ city: 'Naperville', state: 'IL', zipCode: '60540' },
{ city: 'Indianapolis', state: 'IN', zipCode: '46204' },
{ city: 'Columbus', state: 'OH', zipCode: '43215' },
// Southeast Growth
{ city: 'Birmingham', state: 'AL', zipCode: '35203' },
{ city: 'Huntsville', state: 'AL', zipCode: '35801' },
{ city: 'Louisville', state: 'KY', zipCode: '40202' },
{ city: 'Memphis', state: 'TN', zipCode: '38103' },
{ city: 'Knoxville', state: 'TN', zipCode: '37902' },
{ city: 'Chattanooga', state: 'TN', zipCode: '37402' },
// Mid-Atlantic
{ city: 'Richmond', state: 'VA', zipCode: '23219' },
{ city: 'Charlotte', state: 'NC', zipCode: '28202' },
{ city: 'Atlanta', state: 'GA', zipCode: '30303' }
];

const STREET_TYPES = ['Main St.', 'Industrial Pkwy.', 'Commerce Dr.', 'Tech Blvd.', 'Olive St.', 'Pine St.', 'Broadway', 'Market St.', 'Mission St.', '1st St.', '2nd St.', '3rd St.', '4th St.', '5th St.', '6th St.', '7th St.', '8th St.', '9th St.', '10th St.'];

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
}

// Helper function to generate dynamic job titles
function generateJobTitle(baseTitle, team, location) {
  const specialties = {
    'Commercial': ['Commercial', 'Office', 'Retail', 'Healthcare'],
    'Industrial': ['Industrial', 'Manufacturing', 'Heavy Industrial', 'Plant'],
    'Residential': ['Residential', 'Multi-Family', 'Custom Home'],
    'Project Management': ['Project Management', 'Construction Management', 'Field Operations'],
    'Fire Alarm': ['Fire Alarm', 'Life Safety', 'Fire Protection'],
    'Security': ['Security', 'Access Control', 'CCTV']
  };

  // If team doesn't exist in specialties, use Commercial as default
  const teamSpecialties = specialties[team] || specialties['Commercial'];
  const specialty = teamSpecialties[Math.floor(Math.random() * teamSpecialties.length)];
  
  return `${specialty} ${baseTitle}`;
}

// Helper function to generate location-specific content
function getLocationSpecifics(location) {
  // This will be expanded with actual location data
  return {
    marketDetails: `${location.city} is a growing market for electrical contractors...`,
    localRequirements: `State of ${location.state} electrical license required...`,
    regionalFocus: `Strong focus on ${location.city}'s expanding commercial sector...`
  };
}

// Helper function to generate salary with cents
function generateSalaryWithCents(baseMin, baseMax) {
  // Add random amount between 1-3 dollars
  const extraDollars = Math.random() * (3 - 1) + 1;
  // Add random cents
  const minCents = Math.random();
  const maxCents = Math.random();
  
  return {
    minValue: Number((baseMin + extraDollars + minCents).toFixed(2)),
    maxValue: Number((baseMax + extraDollars + maxCents).toFixed(2))
  };
}

// Helper function to generate random date within last 2 days
function generateRecentDate() {
  const now = new Date();
  const twoDaysAgo = new Date(now - (2 * 24 * 60 * 60 * 1000));
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

// Helper function to generate validThrough date
function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const daysToAdd = Math.floor(Math.random() * (45 - 31 + 1) + 31);
  const validThrough = new Date(postedDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

const OpenAI = require('openai');
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Update job ID generation to remove spaces
function generateJobId(company, type) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

// Update filename generation
function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

// Update createJob function to include neighboring cities
async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const team = TEAMS[Math.floor(Math.random() * TEAMS.length)];
  const jobInfo = JOB_TYPES[jobType];
  
  // Generate dynamic title only for description variety
  const descriptionTitle = generateJobTitle(jobType, team, location);
  
  // Use original jobType for actual job title
  const jobTitle = jobType;
  
  const jobId = generateJobId(company, jobType);
  const locationDetail = getLocationSpecifics(location);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  // Get random certifications and tools for this job type
  const requiredCerts = CERTIFICATIONS[jobInfo.category]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  
  const tools = TOOLS_AND_TECH[jobInfo.category]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Get random work environment
  const workEnv = WORK_ENVIRONMENTS.find(env => env.type === team) || WORK_ENVIRONMENTS[0];

  // Get random description length
  const descLength = DESCRIPTION_LENGTHS[
    Object.keys(DESCRIPTION_LENGTHS)[Math.floor(Math.random() * Object.keys(DESCRIPTION_LENGTHS).length)]
  ];

  const prompt = `Create a ${descLength}-word job description for a ${descriptionTitle} position at ${company.name} in ${location.city}, ${location.state}. Format in markdown without h1 tags, do not include ticks to display the markdown, these files are being directly uploaded to the website and it will convert to html for us. thank you.

Brief company introduction focusing on ${team} projects at ${company.name}

Overview of ${descriptionTitle} role in ${team} environment at ${company.name}.

## Requirements for ${descriptionTitle}
- Key responsibilities for ${team} projects
- Required certifications: ${requiredCerts.join(', ')}
- Experience with: ${tools.join(', ')}
- Typical projects: ${workEnv.clients.join(', ')}
- ${jobInfo.yearsExperience} years of electrical experience
- Valid electrical license for ${location.state}
- Experience with ${tools[0]} and ${tools[1]}
- Physical requirements
- Safety knowledge

### Preferred Experience
- Experience with ${tools[2] || tools[0]}
- ${team} project experience

## Location & Schedule
- Primary location: ${location.city}, ${location.state}
- List neightboring cities touching ${location.city} in ${location.state}, actually name the cities.
- Schedule: Full-time

## Compensation & Benefits
- Pay range: $${minValue}-$${maxValue} per hour depending on experience
- Medical, dental, vision insurance
- 401(k) with company match`;

  // Generate unique description with variations
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: prompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  // Create frontmatter data
  const jobData = {
    position: jobTitle,
    description: fullDescription.substring(0, 500) + '...',
    location: `${location.city}, ${location.state}`,
    team: team,
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

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  // Create filename using original title
  const filename = generateFilename(company, jobTitle, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobTitle} for ${company.name} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  const companies = Object.values(COMPANIES);
  const jobTypes = Object.keys(JOB_TYPES);
  
  for (const location of LOCATIONS) {
    // Randomly select a company and job type
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    await createJob(location, jobType, company);
    // Add delay between API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Add this to run the script
createAllJobs().catch(console.error);