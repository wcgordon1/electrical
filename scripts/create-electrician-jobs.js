const COMPANIES = {
  'Convergint': {
    name: 'Convergint',
    sameAs: 'https://www.convergint.com/',
    logo: 'https://www.convergint.com/wp-content/uploads/2021/06/logo-on-dark-blue.png'
  },
  'West Coast Fire': {
    name: 'West Coast Fire',
    sameAs: 'https://westcoastfireinc.com/',
    logo: 'https://westcoastfireinc.com/wp-content/uploads/2024/04/WCFI_logo_V1_Transparent-1-800x294.png'
  },
  'Staley Technologies': {
    name: 'Staley Technologies',
    sameAs: 'https://staleytechnologies.com/',
    logo: 'https://staleytechnologies.com/wp-content/uploads/2021/02/cropped-Logo_StaleyTechnologies.png'
  },
  'Prime Partners': {
    name: 'Prime Partners',
    sameAs: 'https://www.primepartners.com/',
    logo: 'https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1.png'
  },
  'Valley Alarm': {
    name: 'Valley Alarm',
    sameAs: 'https://valleyalarm.com/',
    logo: 'https://www.valleyalarm.com/wp-content/uploads/2024/07/Valley-Alarm-Logo-web.png'
  },
  'Alert 360': {
    name: 'Alert 360',
    sameAs: 'https://alert360.com/',
    logo: 'https://www.alert360.com/sites/default/files/Alert%20360%20Santa-01%202.png'
  },
  'Safe and Sound': {
    name: 'Safe and Sound',
    sameAs: 'https://getsafeandsound.com/',
    logo: 'https://getsafeandsound.com/wp-content/uploads/2020/08/cropped-safe-and-sound-logo-460.png'
  },
  'Barry Bros Security': {
    name: 'Barry Bros Security',
    sameAs: 'https://barrybros.com/',
    logo: 'https://www.barrybros.com/wp-content/themes/barrybros/img/logo.svg'
  },
  'Koorsen': {
    name: 'Koorsen',
    sameAs: 'https://koorsen.com/',
    logo: 'https://www.koorsen.com/wp-content/uploads/2022/02/Koorsen-Logo.svg'
  }
};

const JOB_TYPES = {
  'Security Project Manager': {
    minValue: 45,
    maxValue: 55,
    experienceLevel: 'entryLevel',
    category: 'Project Management',
    yearsExperience: '3-5',
    prompt: 'Create a detailed job description for an experienced Security Project Manager position. Focus on project management, client interaction, and team leadership overseeing commercial constructuion projects involving cctv, access control, and alarm systems.'
  },
  'Security Alarm Project Manager': {
    minValue: 38,
    maxValue: 45,
    experienceLevel: 'midLevel',
    category: 'Project Management',
    yearsExperience: '3-5',
    prompt: 'Create a job description for an experienced commercial project manager. Include commercial experience, code knowledge, and leadership responsibilities for low voltage security alarm systems including access control.'
  },
  'Junior Project Manager': {
    minValue: 22,
    maxValue: 30,
    experienceLevel: 'entryLevel',
    category: 'Project Management',
    yearsExperience: '0-2',
    prompt: 'Create a job description for an entry level project manager. Include commercial experience, code knowledge, and leadership responsibilities.'
  },
  'Fire Alarm Designer': {
    minValue: 38,
    maxValue: 45,
    experienceLevel: 'midLevel',
    category: 'Fire Alarm',
    yearsExperience: '3-5',
    prompt: 'Create a job description for an experienced fire alarm designer. Include commercial experience, code knowledge, and leadership responsibilities for low voltage fire alarm systems and design systems for fire alarm, sprinkler, and smoke detection.'
  },
  'Fire Alarm Project Manager': {
    minValue: 45,
    maxValue: 55,
    experienceLevel: 'midLevel',
    category: 'Fire Alarm',
    yearsExperience: '3-5',
    prompt: 'Create a job description for an experienced fire alarm project manager. Include commercial experience, code knowledge, and leadership responsibilities for low voltage fire alarm systems and design systems for fire alarm, sprinkler, and smoke detection.'
  },
  'Electrical Project Manager': {
    minValue: 55,
    maxValue: 62,
    experienceLevel: 'midLevel',
    category: 'Project Management',
    yearsExperience: '3-5',
    prompt: 'Create a job description for an experienced electrical project manager. Include commercial experience, code knowledge, and leadership responsibilities for commercial new construction electrical systems and design systems for electrical, lighting, and power.'
  }
};

const TEAMS = [
  'Commercial',
  //'Industrial', 
  'Project Management',
  'Fire Alarm',
  'Security'
];

const DESCRIPTION_LENGTHS = {
  short: 400,
  medium: 600,
  long: 800
};

const CERTIFICATIONS = {
  'Apprentice': ['OSHA 10', 'First Aid/CPR', 'California ET Card', 'Basic Electrical Safety'],
  'Journeyman': ['CA State Journeyman License', 'OSHA 30', 'Arc Flash Safety', 'Confined Space'],
  'Project Management': ['PMP', 'CAPM', 'PRINCE2', 'IPMA'],
  'Fire Alarm': ['NFPA 70', 'NFPA 25', 'NFPA 1041', 'NFPA 1042'],
  'Security': ['Lenel', 'Crestron', 'C-Cure', 'C-More'],
  // 'Controls': ['PLC Programming', 'HVAC Controls', 'BMS Certification', 'Industrial Automation']
};

const TOOLS_AND_TECH = {
  'Apprentice': ['Hand Tools', 'Power Tools', 'Basic Test Equipment', 'Conduit Bending'],
  'Journeyman': ['Advanced Test Equipment', 'Conduit Bending', 'Blueprint Reading', 'Code Books'],
  'Project Management': ['Project Management Software', 'Estimating Tools', 'Code Analysis', 'Design Software'],
  'Fire Alarm': ['Fire Alarm Software', 'Fire Alarm Design Software', 'Fire Alarm Testing Equipment', 'Fire Alarm Installation Tools'],
  'Security': ['Lenel', 'Crestron', 'C-Cure', 'C-More']
  // 'Controls': ['PLC Software', 'SCADA Systems', 'Building Automation', 'Network Tools']
};

const WORK_ENVIRONMENTS = [
  { 
    type: 'Commercial', 
    clients: ['Office Buildings', 'Retail Centers', 'Hospitals', 'Schools'] 
  },
  { 
    type: 'Project Management', 
    clients: ['New Construction', 'Tenant Improvements', 'Renovations'] 
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

const LOCATIONS = [      // Research triangle
 { city: 'Los Angeles', state: 'CA', zipCode: '90012' },    // ~3.9M
 { city: 'San Diego', state: 'CA', zipCode: '92101' },      // ~1.4M
 { city: 'San Jose', state: 'CA', zipCode: '95113' },       // ~1M
 { city: 'San Francisco', state: 'CA', zipCode: '94102' },  // ~875K
 { city: 'Fresno', state: 'CA', zipCode: '93721' },         // ~540K
 { city: 'Sacramento', state: 'CA', zipCode: '95814' },     // ~525K
 { city: 'Long Beach', state: 'CA', zipCode: '90802' },     // ~466K
 { city: 'Oakland', state: 'CA', zipCode: '94612' },        // ~440K
 { city: 'Bakersfield', state: 'CA', zipCode: '93301' },    // ~407K
 { city: 'Anaheim', state: 'CA', zipCode: '92805' },        // ~350K

 // Washington
 { city: 'Seattle', state: 'WA', zipCode: '98104' },        // ~737K
 { city: 'Spokane', state: 'WA', zipCode: '99201' },        // ~228K
 { city: 'Tacoma', state: 'WA', zipCode: '98402' },         // ~217K
 { city: 'Vancouver', state: 'WA', zipCode: '98660' },      // ~190K
 { city: 'Bellevue', state: 'WA', zipCode: '98004' },       // ~150K

 // Arizona
 { city: 'Phoenix', state: 'AZ', zipCode: '85004' },        // ~1.6M
 { city: 'Tucson', state: 'AZ', zipCode: '85701' },         // ~545K
 { city: 'Mesa', state: 'AZ', zipCode: '85201' },           // ~504K
 { city: 'Chandler', state: 'AZ', zipCode: '85225' },       // ~275K
 { city: 'Scottsdale', state: 'AZ', zipCode: '85251' },     // ~241K
 { city: 'Gilbert', state: 'AZ', zipCode: '85234' },        // ~267K
 { city: 'Glendale', state: 'AZ', zipCode: '85301' },       // ~248K
 { city: 'Tempe', state: 'AZ', zipCode: '85281' },          // ~195K
 { city: 'Peoria', state: 'AZ', zipCode: '85345' },         // ~190K

 // Oregon
 { city: 'Portland', state: 'OR', zipCode: '97204' },       // ~653K
 { city: 'Salem', state: 'OR', zipCode: '97301' },          // ~175K
 { city: 'Eugene', state: 'OR', zipCode: '97401' },         // ~170K
 { city: 'Gresham', state: 'OR', zipCode: '97030' },        // ~114K
 { city: 'Hillsboro', state: 'OR', zipCode: '97123' },      // ~106K

 // Nevada
 { city: 'Las Vegas', state: 'NV', zipCode: '89101' },      // ~640K
 { city: 'Henderson', state: 'NV', zipCode: '89002' },      // ~320K
 { city: 'Reno', state: 'NV', zipCode: '89501' },           // ~264K
 { city: 'North Las Vegas', state: 'NV', zipCode: '89030' }, // ~251K
 { city: 'Sparks', state: 'NV', zipCode: '89431' },         // ~105K

 // Utah
 { city: 'Salt Lake City', state: 'UT', zipCode: '84101' }, // ~200K
 { city: 'West Valley City', state: 'UT', zipCode: '84119' }, // ~140K
 { city: 'Provo', state: 'UT', zipCode: '84601' },          // ~117K
 { city: 'West Jordan', state: 'UT', zipCode: '84084' },    // ~116K
 { city: 'Orem', state: 'UT', zipCode: '84057' },           // ~98K

 // More California (completing largest cities)
 { city: 'Santa Ana', state: 'CA', zipCode: '92701' },      // ~332K
 { city: 'Riverside', state: 'CA', zipCode: '92501' },      // ~330K
 { city: 'Stockton', state: 'CA', zipCode: '95202' },       // ~320K
 { city: 'Irvine', state: 'CA', zipCode: '92618' },         // ~310K
 { city: 'Chula Vista', state: 'CA', zipCode: '91910' },    // ~275K
 { city: 'Fremont', state: 'CA', zipCode: '94538' },        // ~240K
 { city: 'San Bernardino', state: 'CA', zipCode: '92401' }, // ~222K
 { city: 'Modesto', state: 'CA', zipCode: '95354' },        // ~218K
 { city: 'Fontana', state: 'CA', zipCode: '92335' },        // ~215K
 { city: 'Oxnard', state: 'CA', zipCode: '93030' },         // ~208K
 { city: 'Moreno Valley', state: 'CA', zipCode: '92553' },  // ~208K
 { city: 'Glendale', state: 'CA', zipCode: '91206' },       // ~200K
 { city: 'Huntington Beach', state: 'CA', zipCode: '92648' }, // ~198K
 { city: 'Santa Clarita', state: 'CA', zipCode: '91355' },  // ~195K
 { city: 'Garden Grove', state: 'CA', zipCode: '92840' }
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
      'support@primepartners.info'
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