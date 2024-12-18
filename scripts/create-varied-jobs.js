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

const LOCATIONS = [
{ city: 'Ashburn', state: 'VA', zipCode: '20147' },
{ city: 'Phoenix', state: 'AZ', zipCode: '85034' },
{ city: 'Las Vegas', state: 'NV', zipCode: '89101' },
{ city: 'Dallas', state: 'TX', zipCode: '75201' },
{ city: 'Chicago', state: 'IL', zipCode: '60601' },
{ city: 'Atlanta', state: 'GA', zipCode: '30303' },
{ city: 'Santa Clara', state: 'CA', zipCode: '95054' },
{ city: 'Hillsboro', state: 'OR', zipCode: '97124' },
{ city: 'Columbus', state: 'OH', zipCode: '43215' },
{ city: 'Reston', state: 'VA', zipCode: '22102' },
{ city: 'Mesa', state: 'AZ', zipCode: '85201' },
{ city: 'Prineville', state: 'OR', zipCode: '97754' },
{ city: 'Council Bluffs', state: 'IA', zipCode: '51501' },
{ city: 'Salt Lake City', state: 'UT', zipCode: '84101' },
{ city: 'Richmond', state: 'VA', zipCode: '23219' },
{ city: 'Manassas', state: 'VA', zipCode: '20110' },
{ city: 'Reno', state: 'NV', zipCode: '89501' },
{ city: 'New Albany', state: 'OH', zipCode: '43054' },
{ city: 'Houston', state: 'TX', zipCode: '77002' },
{ city: 'Kansas City', state: 'MO', zipCode: '64101' },
{ city: 'Miami', state: 'FL', zipCode: '33131' },
{ city: 'Denver', state: 'CO', zipCode: '80202' },
{ city: 'Seattle', state: 'WA', zipCode: '98101' },
{ city: 'San Antonio', state: 'TX', zipCode: '78201' },
{ city: 'Austin', state: 'TX', zipCode: '78701' },
{ city: 'Los Angeles', state: 'CA', zipCode: '90012' },
{ city: 'New York', state: 'NY', zipCode: '10001' },
{ city: 'Newark', state: 'NJ', zipCode: '07102' },
{ city: 'Quincy', state: 'WA', zipCode: '98848' },
{ city: 'Des Moines', state: 'IA', zipCode: '50309' },
{ city: 'Altoona', state: 'IA', zipCode: '50009' },
{ city: 'Maiden', state: 'NC', zipCode: '28650' },
{ city: 'Forest City', state: 'NC', zipCode: '28043' },
{ city: 'Richardson', state: 'TX', zipCode: '75080' },
{ city: 'Sacramento', state: 'CA', zipCode: '95814' },
{ city: 'Sterling', state: 'VA', zipCode: '20166' },
{ city: 'Leesburg', state: 'VA', zipCode: '20175' },
{ city: 'Chandler', state: 'AZ', zipCode: '85225' },
{ city: 'Elk Grove Village', state: 'IL', zipCode: '60007' },
{ city: 'Plano', state: 'TX', zipCode: '75023' },
{ city: 'San Jose', state: 'CA', zipCode: '95110' },
{ city: 'Loudoun County', state: 'VA', zipCode: '20176' },
{ city: 'Allen', state: 'TX', zipCode: '75013' },
{ city: 'Cheyenne', state: 'WY', zipCode: '82001' },
{ city: 'Fort Worth', state: 'TX', zipCode: '76177' }
];

const TEAMS = ['Data Center'];

const JOB_TYPES = {
  'Data Center Rack & Stack Technician': {
    minValue: 28,
    maxValue: 38,
    experienceLevel: 'midLevel',
    category: 'Data Center',
    yearsExperience: '2-4',
    prompt: 'Create a detailed job description for a Data Center Rack & Stack Technician. Focus on installing server racks, cable management systems, and power distribution units (PDUs) in enterprise data centers.'
  },
  'Data Center Cable Technician': {
    minValue: 30,
    maxValue: 42,
    experienceLevel: 'midLevel',
    category: 'Data Center',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Data Center Cable Technician focusing on dressing and terminating cables. Include experience with Cat6A, fiber optic cabling, and structured cabling standards in data center environments.'
  },
  'Fiber Optic Splicing Technician': {
    minValue: 34,
    maxValue: 45,
    experienceLevel: 'seniorLevel',
    category: 'Fiber Optics',
    yearsExperience: '4-7',
    prompt: 'Write a job description for a Fiber Optic Splicing Technician specializing in data center environments. Focus on fusion splicing, testing, and troubleshooting fiber optic cables.'
  },
  'Data Center Network Engineer': {
    minValue: 45,
    maxValue: 65,
    experienceLevel: 'seniorLevel',
    category: 'Network Engineering',
    yearsExperience: '5-8',
    prompt: 'Create a description for an onsite Data Center Network Engineer. Focus on network infrastructure support, troubleshooting, and maintenance in enterprise data center environments.'
  }
};

const BENEFITS = [
  {
    tier: 'Advanced',
    items: ['Premium Health Insurance', '4 Weeks PTO', '401k Match', 'Quarterly Bonuses', 'Vehicle Allowance'],
    description: 'Comprehensive benefits package'
  },
  {
    tier: 'Standard Plus',
    items: ['Full Health Insurance', '3 Weeks PTO', '401k Match', 'Performance Bonuses', 'Tool Allowance'],
    description: 'Competitive benefits package'
  }
];

const CERTIFICATIONS = {
  'Data Center': ['CDCDP', 'CDCP', 'DCCA', 'CompTIA Server+'],
  'Fiber Optics': ['FOA CFOT', 'ETA Fiber Optics', 'BICSI Technician', 'OFC Specialist'],
  'Network Engineering': ['CCNA', 'CCNP', 'CompTIA Network+', 'DCDC']
};

const TOOLS_AND_TECH = {
  'Data Center': ['Cable Management Systems', 'PDUs', 'Environmental Monitoring', 'DCIM Software'],
  'Fiber Optics': ['Fusion Splicers', 'OTDR', 'Power Meters', 'Visual Fault Locators'],
  'Network Engineering': ['Cisco IOS', 'Network Analyzers', 'Monitoring Tools', 'Configuration Management'],
  'Project Management': ['DCIM', 'BMS Systems', 'Project Planning Software', 'Documentation Tools']
};

const WORK_ENVIRONMENTS = [
  { type: 'Enterprise Data Center', clients: ['Cloud Providers', 'Financial Institutions', 'Technology Companies'] },
  { type: 'Colocation Facility', clients: ['Managed Service Providers', 'Enterprise Clients', 'Cloud Services'] },
  { type: 'Edge Data Center', clients: ['Telecom Providers', 'Content Delivery Networks', 'IoT Services'] }
];

const TEAM_STRUCTURES = [
  { size: 'Small', structure: 'Part of a 3-5 person specialized team' },
  { size: 'Medium', structure: 'Leading a team of 4-6 technicians' },
  { size: 'Large', structure: 'Member of a 10+ person regional team' },
  { size: 'Matrix', structure: 'Working across multiple project teams' }
];

const TRAVEL_REQUIREMENTS = [
  { range: 'Local', description: 'Within 30 miles of home base' },
  { range: 'Regional', description: 'Up to 50 mile radius' },
  { range: 'Multi-City', description: 'Regular travel to nearby major cities' }
];

const TRAINING_PROGRAMS = [
  { type: 'Manufacturer', programs: ['Factory Training', 'Product Certification', 'Hands-on Labs'] },
  { type: 'Technical', programs: ['Online Courses', 'Industry Certifications', 'Skills Workshops'] },
  { type: 'Safety', programs: ['OSHA Training', 'First Aid/CPR', 'Safety Protocols'] }
];

const DESCRIPTION_LENGTHS = {
  short: 300,
  medium: 500,
  long: 800
};

const STREET_TYPES = ['Main St.', 'Maple Ave.', 'Sierra Pkwy.'];

async function generateJobDescription(jobType, location, jobInfo) {
  const workEnv = WORK_ENVIRONMENTS[Math.floor(Math.random() * WORK_ENVIRONMENTS.length)];
  const teamStructure = TEAM_STRUCTURES[Math.floor(Math.random() * TEAM_STRUCTURES.length)];
  const travel = TRAVEL_REQUIREMENTS[Math.floor(Math.random() * TRAVEL_REQUIREMENTS.length)];
  const training = TRAINING_PROGRAMS[Math.floor(Math.random() * TRAINING_PROGRAMS.length)];
  
  const benefits = BENEFITS[Math.floor(Math.random() * BENEFITS.length)];
  const requiredCerts = CERTIFICATIONS[jobInfo.category]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const preferredCerts = CERTIFICATIONS[jobInfo.category]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const tools = TOOLS_AND_TECH[jobInfo.category]
    .sort(() => 0.5 - Math.random());

  const scheduleTypes = [
    'First Shift (6:00 AM - 2:30 PM)',
    'Second Shift (2:00 PM - 10:30 PM)',
    'Flexible Hours',
    'Standard Business Hours'
  ];
  const schedule = scheduleTypes[Math.floor(Math.random() * scheduleTypes.length)];

  const prompt = `Create a unique job description for a ${jobType} position at Staley Technologies in ${location.city}, ${location.state}. Format the response in markdown with clear sections and bullet points. Only use h2, h3, and h4 tags for headings, do not use h1. Do not repeat any of these instructions in the prompt or say you are using markdown, I just need it formatted in markdown to go on my job board website please.

Key Details:
- Experience Required: ${jobInfo.yearsExperience} years
- Schedule: ${schedule}
- Work Environment: ${workEnv.type} (${workEnv.clients.join(', ')})
- Team Structure: ${teamStructure.structure}
- Travel: ${travel.description}
- Training: ${training.type} focused

Required Skills & Certifications:
- Required Certifications: ${requiredCerts.join(', ')}
- Preferred Certifications: ${preferredCerts.join(', ')}
- Tools & Technology: ${tools.join(', ')}
- Benefits Tier: ${benefits.tier}

Please structure the response in markdown format like this:

## Position Overview
[Overview paragraph]

## Key Responsibilities
- [Bullet points]

## Required Qualifications
- [Bullet points]

## Preferred Qualifications
- [Bullet points]

## Local Market Details
- [Specific details about ${location.city} market]
- [Local client types]
- [Regional considerations]

## Benefits Package
- ${benefits.items.join('\n- ')}

## Training & Development
- [Training opportunities]
- [Career growth]

Make every aspect location-specific and unique to this role. Include market-specific challenges and opportunities. Use markdown formatting for clear, professional presentation.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
  });

  return {
    fullDescription: completion.choices[0].message.content,
    benefits,
    schedule,
    requiredCerts,
    preferredCerts,
    workEnvironment: workEnv,
    teamStructure: teamStructure.structure,
    travelRequirement: travel.description,
    trainingProgram: {
      focus: training.type,
      programs: training.programs
    }
  };
}

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
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
  const daysToAdd = Math.floor(Math.random() * (45 - 31 + 1) + 31); // Random between 31-45 days
  const validThrough = new Date(postedDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

async function createJob(location, jobType) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);

  const jobInfo = JOB_TYPES[jobType];
  const jobId = `${jobType.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`;

  // Generate unique description with variations
  const { 
    fullDescription, 
    benefits, 
    schedule, 
    requiredCerts, 
    preferredCerts,
    workEnvironment,
    teamStructure,
    travelRequirement,
    trainingProgram
  } = await generateJobDescription(jobType, location, jobInfo);
  
  // Add salary variation based on location and experience
  const locationMultiplier = Math.random() * (1.15 - 0.85) + 0.85;
  const experienceMultiplier = 1 + (parseInt(jobInfo.yearsExperience.split('-')[0]) * 0.02);
  
  const adjustedMinValue = Math.round(jobInfo.minValue * locationMultiplier * experienceMultiplier);
  const adjustedMaxValue = Math.round(jobInfo.maxValue * locationMultiplier * experienceMultiplier);

  // Create frontmatter data with variations - ensure all properties are defined
  const jobData = {
    position: jobType || 'Untitled Position',
    description: fullDescription ? 
      `${fullDescription.substring(0, DESCRIPTION_LENGTHS[
        Object.keys(DESCRIPTION_LENGTHS)[Math.floor(Math.random() * Object.keys(DESCRIPTION_LENGTHS).length)]
      ])}...` : 
      'No description available',
    location: `${location.city}, ${location.state}`,
    team: 'Commercial',
    schedule: schedule || 'Full Time',
    requiredCertifications: requiredCerts || [],
    preferredCertifications: preferredCerts || [],
    benefits: benefits?.items || [],
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'Staley Technologies',
      sameAs: 'https://staleytechnologies.com/',
      logo: 'https://staleytechnologies.com/wp-content/uploads/2021/02/cropped-Logo_StaleyTechnologies.png'
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
      value: Math.floor((adjustedMinValue + adjustedMaxValue) / 2),
      minValue: adjustedMinValue,
      maxValue: adjustedMaxValue,
      unitText: 'HOUR'
    },
    experienceRequirements: jobInfo.experienceLevel || 'midLevel',
    occupationalCategory: jobInfo.category || 'General',
    identifier: {
      name: 'Staley Technologies',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'Michael.Mckeaige@pes123.com'
    ],
    workEnvironment: workEnvironment ? {
      type: workEnvironment.type || 'Commercial',
      clients: workEnvironment.clients || []
    } : {
      type: 'Data Center',
      clients: []
    },
    teamStructure: teamStructure || 'Standard Team',
    travelRequirements: travelRequirement || 'Local Area',
    trainingProgram: trainingProgram ? {
      focus: trainingProgram.focus || 'General',
      programs: trainingProgram.programs || []
    } : {
      focus: 'General',
      programs: []
    }
  };

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription || 'No description available'}`;

  const filename = `staley-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase().replace(/\s+/g, '-')}.md`;
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  fs.writeFileSync(filePath, finalContent);

  console.log(`Created ${jobType} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  // Create a pool of job types
  const jobTypes = Object.keys(JOB_TYPES);
  
  // Process each location with a random job type
  for (const location of LOCATIONS) {
    // Select a random job type for this location
    const randomJobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    console.log(`Creating ${randomJobType} in ${location.city}...`);
    await createJob(location, randomJobType);
    
    // Add delay between API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

createAllJobs().catch(console.error); 