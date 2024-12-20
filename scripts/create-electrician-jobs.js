const COMPANIES = {
  'TEC Electric': {
    name: 'TEC Electric',
    sameAs: 'https://tec-electric.com/',
    logo: 'https://tec-electric.com/wp-content/themes/tec-electric/imgs/tec-logo.png'
  },
  'Howell Electric': {
    name: 'Howell Electric',
    sameAs: 'https://www.howellelectric.com/',
    logo: 'https://howellelectric.com/live/wp-content/uploads/2019/04/Howell-logo-img.png'
  },
  'Rex Moore Electric': {
    name: 'Rex Moore Electric',
    sameAs: 'https://www.rexmoore.com/',
    logo: 'https://www.rexmoore.com/wp-content/uploads/2022/03/100-years.png'
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
  }
};

const JOB_TYPES = {
  'Apprentice Electrician': {
    minValue: 22,
    maxValue: 28,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    yearsExperience: '0-2',
    prompt: 'Create a detailed job description for an Apprentice Electrician position. Focus on learning opportunities, safety training, and basic electrical skills.'
  },
  'Journeyman Electrician': {
    minValue: 37,
    maxValue: 44,
    experienceLevel: 'midLevel',
    category: 'Journeyman',
    yearsExperience: '4-8',
    prompt: 'Create a job description for an experienced Journeyman Electrician. Include commercial/industrial experience, code knowledge, and leadership responsibilities.'
  }
};

const TEAMS = ['Commercial', 'Industrial', 'Residential'];

const DESCRIPTION_LENGTHS = {
  short: 400,
  medium: 600,
  long: 800
};

const CERTIFICATIONS = {
  'Apprentice': ['OSHA 10', 'First Aid/CPR', 'California ET Card', 'Basic Electrical Safety'],
  'Journeyman': ['CA State Journeyman License', 'OSHA 30', 'Arc Flash Safety', 'Confined Space'],
  // 'Controls': ['PLC Programming', 'HVAC Controls', 'BMS Certification', 'Industrial Automation']
};

const TOOLS_AND_TECH = {
  'Apprentice': ['Hand Tools', 'Power Tools', 'Basic Test Equipment', 'Conduit Bending'],
  'Journeyman': ['Advanced Test Equipment', 'Conduit Bending', 'Blueprint Reading', 'Code Books'],
  // 'Master': ['Project Management Software', 'Estimating Tools', 'Code Analysis', 'Design Software'],
  // 'Controls': ['PLC Software', 'SCADA Systems', 'Building Automation', 'Network Tools']
};

const WORK_ENVIRONMENTS = [
  { type: 'Commercial', clients: ['Office Buildings', 'Retail Centers', 'Hospitals', 'Schools'] },
  { type: 'Industrial', clients: ['Manufacturing Plants', 'Data Centers', 'Processing Facilities'] },
  { type: 'Residential', clients: ['Custom Homes', 'Multi-Family', 'Remodels'] }
];

const LOCATIONS = [      // Research triangle
    { city: 'Los Angeles', state: 'CA', zipCode: '90012' },      // ~3.9 million
    { city: 'San Diego', state: 'CA', zipCode: '92101' },        // ~1.4 million
    { city: 'San Jose', state: 'CA', zipCode: '95113' },         // ~1 million
    { city: 'San Francisco', state: 'CA', zipCode: '94102' },    // ~875,000
    { city: 'Fresno', state: 'CA', zipCode: '93721' },           // ~540,000
    { city: 'Sacramento', state: 'CA', zipCode: '95814' },       // ~525,000
    { city: 'Long Beach', state: 'CA', zipCode: '90802' },       // ~466,000
    { city: 'Oakland', state: 'CA', zipCode: '94612' },          // ~440,000
    { city: 'Bakersfield', state: 'CA', zipCode: '93301' },      // ~407,000
    { city: 'Anaheim', state: 'CA', zipCode: '92805' },          // ~350,000
    { city: 'Santa Ana', state: 'CA', zipCode: '92701' },        // ~332,000
    { city: 'Riverside', state: 'CA', zipCode: '92501' },        // ~330,000
    { city: 'Stockton', state: 'CA', zipCode: '95202' },         // ~320,000
    { city: 'Irvine', state: 'CA', zipCode: '92618' },          // ~310,000
    { city: 'Chula Vista', state: 'CA', zipCode: '91910' },     // ~275,000
    { city: 'Fremont', state: 'CA', zipCode: '94538' },         // ~240,000
    { city: 'San Bernardino', state: 'CA', zipCode: '92401' },  // ~222,000
    { city: 'Modesto', state: 'CA', zipCode: '95354' },         // ~218,000
    { city: 'Fontana', state: 'CA', zipCode: '92335' },         // ~215,000
    { city: 'Oxnard', state: 'CA', zipCode: '93030' },          // ~208,000
    { city: 'Moreno Valley', state: 'CA', zipCode: '92553' },   // ~208,000
    { city: 'Glendale', state: 'CA', zipCode: '91206' },        // ~200,000
    { city: 'Huntington Beach', state: 'CA', zipCode: '92648' }, // ~198,000
    { city: 'Santa Clarita', state: 'CA', zipCode: '91355' },   // ~195,000
    { city: 'Garden Grove', state: 'CA', zipCode: '92840' },    // ~172,000
    { city: 'Santa Rosa', state: 'CA', zipCode: '95401' },      // ~178,000
    { city: 'Oceanside', state: 'CA', zipCode: '92054' },       // ~175,000
    { city: 'Rancho Cucamonga', state: 'CA', zipCode: '91730' }, // ~175,000
    { city: 'Ontario', state: 'CA', zipCode: '91764' },         // ~175,000
    { city: 'Lancaster', state: 'CA', zipCode: '93534' }  
];

const STREET_TYPES = ['Main St.', 'Industrial Pkwy.', 'Commerce Dr.', 'Tech Blvd.'];

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
    'Solar': ['Solar', 'Renewable Energy', 'PV System'],
    'Service': ['Service', 'Maintenance', 'Repair']
  };

  const specialty = specialties[team][Math.floor(Math.random() * specialties[team].length)];
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
  const workEnv = WORK_ENVIRONMENTS.find(env => env.type === team);

  // Get random description length
  const descLength = DESCRIPTION_LENGTHS[
    Object.keys(DESCRIPTION_LENGTHS)[Math.floor(Math.random() * Object.keys(DESCRIPTION_LENGTHS).length)]
  ];

  const prompt = `Create a ${descLength}-word job description for a ${descriptionTitle} position at ${company.name} in ${location.city}, ${location.state}. Format in markdown without h1 tags, do not include ticks to display the markdown, these files are being directly uploaded to the website and it will convert to html for us. thank you.

Brief company introduction focusing on ${team} projects at ${company.name}

Overview of ${descriptionTitle} role in ${team} environment at ${company.name}.

## Essential Functions
- Key responsibilities for ${team} projects
- Required certifications: ${requiredCerts.join(', ')}
- Experience with: ${tools.join(', ')}
- Typical projects: ${workEnv.clients.join(', ')}

## Required Qualifications
- ${jobInfo.yearsExperience} years of electrical experience
- Valid electrical license for ${location.state}
- Experience with ${tools[0]} and ${tools[1]}
- Physical requirements
- Safety knowledge

## Preferred Qualifications
- ${requiredCerts[1]} certification
- Experience with ${tools[2] || tools[0]}
- ${team} project experience

## Location & Schedule
- Primary location: ${location.city}, ${location.state}
- List neightboring cities touching ${location.city} in ${location.state}, actually name the cities.
- Schedule: Full-time

## Compensation & Benefits
- Pay range: $${minValue}-$${maxValue} per hour
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