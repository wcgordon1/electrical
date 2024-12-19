const COMPANIES = {
  'TEC Electric': {
    name: 'TEC Electric',
    sameAs: 'https://tec-electric.com/',
    logo: 'https://tec-electric.com/wp-content/themes/tec-electric/imgs/tec-logo.png'
  },
  'Faith Technologies': {
    name: 'Faith Technologies',
    sameAs: 'https://www.faithtechinc.com/',
    logo: 'https://www.faithtechinc.com/wp-content/themes/fti-merger/assets/images/logos/logo-fti.svg'
  },
  'MMR Group': {
    name: 'MMR Group',
    sameAs: 'https://www.mmrgrp.com/',
    logo: 'https://www.mmrgrp.com/assets/images/mmrlogo.svg'
  }
};

const JOB_TYPES = {
  'Apprentice Electrician': {
    minValue: 18,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    yearsExperience: '0-2',
    prompt: 'Create a detailed job description for an Apprentice Electrician position. Focus on learning opportunities, safety training, and basic electrical skills.'
  },
  'Journeyman Electrician': {
    minValue: 34,
    maxValue: 49,
    experienceLevel: 'midLevel',
    category: 'Journeyman',
    yearsExperience: '4-8',
    prompt: 'Create a job description for an experienced Journeyman Electrician. Include commercial/industrial experience, code knowledge, and leadership responsibilities.'
  },
  'Master Electrician': {
    minValue: 36,
    maxValue: 41,
    experienceLevel: 'seniorLevel',
    category: 'Master',
    yearsExperience: '8+',
    prompt: 'Write a job description for a Master Electrician position focusing on project leadership, code compliance, and mentoring responsibilities.'
  },
  'Controls Electrician': {
    minValue: 34,
    maxValue: 43,
    experienceLevel: 'midLevel',
    category: 'Controls',
    yearsExperience: '5-10',
    prompt: 'Create a description for a Controls Electrician specializing in industrial automation, PLC programming, and control system troubleshooting.'
  }
};

const TEAMS = ['Commercial', 'Industrial', 'Residential', 'Solar', 'Service'];

const CERTIFICATIONS = {
  'Apprentice': ['OSHA 10', 'First Aid/CPR', 'Basic Electrical Safety'],
  'Journeyman': ['State Journeyman License', 'OSHA 30', 'Arc Flash Safety', 'Confined Space'],
  'Controls': ['PLC Programming', 'HVAC Controls', 'BMS Certification', 'Industrial Automation']
};

const TOOLS_AND_TECH = {
  'Apprentice': ['Hand Tools', 'Power Tools', 'Basic Test Equipment', 'Conduit Bending'],
  'Journeyman': ['Advanced Test Equipment', 'Conduit Bending', 'Blueprint Reading', 'Code Books'],
  'Master': ['Project Management Software', 'Estimating Tools', 'Code Analysis', 'Design Software'],
  'Controls': ['PLC Software', 'SCADA Systems', 'Building Automation', 'Network Tools']
};

const WORK_ENVIRONMENTS = [
  { type: 'Commercial', clients: ['Office Buildings', 'Retail Centers', 'Hospitals', 'Schools'] },
  { type: 'Industrial', clients: ['Manufacturing Plants', 'Data Centers', 'Processing Facilities'] },
  { type: 'Residential', clients: ['Custom Homes', 'Multi-Family', 'Remodels'] }
];

const LOCATIONS = [
    { city: 'Detroit', state: 'MI', zipCode: '48201' },     // Traditionally industrial
    { city: 'Cleveland', state: 'OH', zipCode: '44113' },   // Rust belt city
    { city: 'Buffalo', state: 'NY', zipCode: '14201' },     // Post-industrial
    { city: 'Baltimore', state: 'MD', zipCode: '21202' },   // Urban challenges
    { city: 'Memphis', state: 'TN', zipCode: '38103' },     // Lower cost of living
    { city: 'Birmingham', state: 'AL', zipCode: '35203' },  // Industrial heritage
    { city: 'Jackson', state: 'MS', zipCode: '39201' },     // Lower median income
    { city: 'Augusta', state: 'GA', zipCode: '30901' },     // Lower wage region
    { city: 'Flint', state: 'MI', zipCode: '48502' },       // Economic challenges
    { city: 'Toledo', state: 'OH', zipCode: '43604' },      // Industrial decline
    { city: 'Youngstown', state: 'OH', zipCode: '44503' },  // Post-steel industry
    { city: 'Syracuse', state: 'NY', zipCode: '13202' },    // Upstate economy
    { city: 'Newark', state: 'NJ', zipCode: '07102' },      // Urban challenges
    { city: 'Rochester', state: 'NY', zipCode: '14604' },   // Post-Kodak decline
    { city: 'Akron', state: 'OH', zipCode: '44308' },       // Post-rubber industry
    { city: 'Dayton', state: 'OH', zipCode: '45402' },      // Manufacturing decline
    { city: 'Gary', state: 'IN', zipCode: '46402' },        // Steel city decline
    { city: 'Camden', state: 'NJ', zipCode: '08102' },      // Urban poverty
    { city: 'Bridgeport', state: 'CT', zipCode: '06604' },  // Industrial past
    { city: 'Albany', state: 'GA', zipCode: '31701' },      // Rural economy
    { city: 'Macon', state: 'GA', zipCode: '31201' },       // Lower wage market
    { city: 'Chattanooga', state: 'TN', zipCode: '37402' }, // Industrial heritage
    { city: 'Montgomery', state: 'AL', zipCode: '36104' },   // Lower cost market
    { city: 'Columbus', state: 'GA', zipCode: '31901' },    // Military economy
    { city: 'Huntsville', state: 'AL', zipCode: '35801' },  // Government dependent
    { city: 'Mobile', state: 'AL', zipCode: '36602' },      // Port city challenges
    { city: 'Knoxville', state: 'TN', zipCode: '37902' },   // Lower wage region
    { city: 'Erie', state: 'PA', zipCode: '16501' },        // Industrial decline
    { city: 'Utica', state: 'NY', zipCode: '13501' },       // Manufacturing loss
    { city: 'Springfield', state: 'MA', zipCode: '01103' }, // Post-industrial
    { city: 'Allentown', state: 'PA', zipCode: '18101' },   // Manufacturing past
    { city: 'Wilmington', state: 'DE', zipCode: '19801' },  // Urban challenges
    { city: 'Scranton', state: 'PA', zipCode: '18503' },    // Coal region decline
    { city: 'Reading', state: 'PA', zipCode: '19601' },     // Manufacturing loss
    { city: 'Harrisburg', state: 'PA', zipCode: '17101' },  // Government town
    { city: 'Roanoke', state: 'VA', zipCode: '24011' },     // Railroad decline
    { city: 'Binghamton', state: 'NY', zipCode: '13901' },  // Industrial past
    { city: 'Saginaw', state: 'MI', zipCode: '48602' },     // Auto industry decline
    { city: 'Canton', state: 'OH', zipCode: '44702' },      // Manufacturing loss
    { city: 'Wheeling', state: 'WV', zipCode: '26003' } 
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
  const minCents = Math.random();
  const maxCents = Math.random();
  return {
    minValue: Number((baseMin + minCents).toFixed(2)),
    maxValue: Number((baseMax + maxCents).toFixed(2))
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
  const dynamicTitle = generateJobTitle(jobType, team, location);
  const jobId = generateJobId(company, jobType);
  const locationDetail = getLocationSpecifics(location);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  // Generate unique description with variations
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: `Create a unique job description for a ${dynamicTitle} position at ${company.name} in ${location.city}, ${location.state}. Format the response in markdown with clear sections and bullet points. Only use h2, h3, and h4 tags for headings, do not use h1. Do not use ticks to dispaly the markdown, just write the job description as is since this is going directly to the websites file which displays markdown. thank you!

      Start off the description with paragraph text introducing the company, then use h2 - h4 tags after. I have an h1 on the page already. thank you!

Key Details:
- Experience Required: ${jobInfo.yearsExperience} years
- Team: ${team}
- Location: ${location.city}, ${location.state}

Include specific details about:
- Local market conditions and growth in ${location.city}
- Major neighboring cities and service area
- Regional industry focus and development
- State-specific license requirements for ${location.state}
- Company-specific benefits and culture
- Local commercial and industrial projects`
    }],
    temperature: 0.8,
  });

  const fullDescription = completion.choices[0].message.content;

  // Create frontmatter data
  const jobData = {
    position: dynamicTitle,
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

  // Create filename using company name
  const filename = generateFilename(company, dynamicTitle, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${dynamicTitle} for ${company.name} in ${location.city}: ${filename}`);
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