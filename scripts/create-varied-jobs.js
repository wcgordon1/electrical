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
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'Nashville', state: 'TN', zipCode: '37203' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85004' },
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Salt Lake City', state: 'UT', zipCode: '84101' },
  { city: 'Bellevue', state: 'WA', zipCode: '98004' },
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Frisco', state: 'TX', zipCode: '75034' },
  { city: 'Boise', state: 'ID', zipCode: '83702' },
  { city: 'Orlando', state: 'FL', zipCode: '32801' },
  { city: 'Las Vegas', state: 'NV', zipCode: '89101' },
  { city: 'Columbus', state: 'OH', zipCode: '43215' },
  { city: 'Nashville', state: 'TN', zipCode: '37201' }
];

const TEAMS = ['Commercial'];

const JOB_TYPES = {
  'Voice & Data Cable Technician': {
    minValue: 32,
    maxValue: 40,
    experienceLevel: 'seniorLevel',
    category: 'Voice Data',
    yearsExperience: '5-8',
    prompt: 'Create a detailed job description for a voice and data cable technician team leader. Focus on managing crews, quality control, and project oversight for the installation of commercial voice and data cabling.'
  },
  'Security Alarm Installer': {
    minValue: 24,
    maxValue: 34,
    experienceLevel: 'midLevel',
    category: 'Security',
    yearsExperience: '2-4',
    prompt: 'Create a job description for a low voltage security alarm installer. Focus on installing and maintaining commercial security systems, including cameras, access control, and intrusion detection.'
  },
  'Fire Alarm Installer': {
    minValue: 28,
    maxValue: 36,
    experienceLevel: 'seniorLevel',
    category: 'Fire Alarm',
    yearsExperience: '4-7',
    prompt: 'Write a job description for a fire alarm installer for low voltage commercial properties. Focus on installing and maintaining commercial fire alarm systems, including smoke detectors, sprinklers, and alarm systems in new construction and retrofits.'
  },
  'Audio Visual Technician': {
    minValue: 33,
    maxValue: 41,
    experienceLevel: 'midLevel',
    category: 'Audio Visual',
    yearsExperience: '3-5',
    prompt: 'Create a description for an AV technician specializing in commercial audio visual systems, including conference rooms, video conferencing, and digital signage.'
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
  'Voice Data': ['BICSI Technician', 'RCDD', 'Network+', 'Cisco CCNA'],
  'Security': ['ESA Level 2', 'NICET Level II', 'Security+', 'ASIS PSP'],
  'Fire Alarm': ['NICET Level III', 'NFPA Certified', 'OSHA 30', 'Factory Certifications'],
  'Audio Visual': ['CTS-I', 'Extron Certified', 'Crestron Certified', 'Biamp Certified'],
  'Project Management': ['PMP', 'RCDD', 'NICET Level IV', 'Six Sigma Green Belt']
};

const TOOLS_AND_TECH = {
  'Voice Data': ['Fluke Networks', 'OTDR Testing', 'Cable Certification', 'Network Analysis'],
  'Security': ['Access Control Systems', 'CCTV', 'Intrusion Detection', 'IP Camera Systems'],
  'Fire Alarm': ['Fire Alarm Panels', 'Smoke Detection', 'Mass Notification', 'Emergency Communication'],
  'Audio Visual': ['Digital Signal Processors', 'Video Walls', 'Control Systems', 'Sound Reinforcement'],
  'Project Management': ['AutoCAD', 'Bluebeam', 'MS Project', 'Procore']
};

const WORK_ENVIRONMENTS = [
  { type: 'Corporate', clients: ['Fortune 500 Companies', 'Tech Startups', 'Financial Institutions'] },
  { type: 'Healthcare', clients: ['Hospitals', 'Medical Centers', 'Clinics'] },
  { type: 'Education', clients: ['Universities', 'K-12 Schools', 'Training Centers'] },
  { type: 'Government', clients: ['Federal Agencies', 'State Offices', 'Military Facilities'] },
  { type: 'Entertainment', clients: ['Hotels', 'Convention Centers', 'Sports Venues'] }
];

const TEAM_STRUCTURES = [
  { size: 'Small', structure: 'Part of a 3-5 person specialized team' },
  { size: 'Medium', structure: 'Leading a team of 4-6 technicians' },
  { size: 'Large', structure: 'Member of a 10+ person regional team' },
  { size: 'Matrix', structure: 'Working across multiple project teams' }
];

const TRAVEL_REQUIREMENTS = [
  { range: 'Local', description: 'Within 30 miles of home base' },
  { range: 'Regional', description: 'Up to 100 mile radius' },
  { range: 'Multi-City', description: 'Regular travel to nearby major cities' }
];

const TRAINING_PROGRAMS = [
  { type: 'Manufacturer', programs: ['Factory Training', 'Product Certification', 'Hands-on Labs'] },
  { type: 'Technical', programs: ['Online Courses', 'Industry Certifications', 'Skills Workshops'] },
  { type: 'Safety', programs: ['OSHA Training', 'First Aid/CPR', 'Safety Protocols'] },
  { type: 'Leadership', programs: ['Project Management', 'Team Leading', 'Communication Skills'] }
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

  const prompt = `Create a unique job description for a ${jobType} position at Black Box Voice & Datain ${location.city}, ${location.state}. Format the response in markdown with clear sections and bullet points.

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
      name: 'Black Box',
      sameAs: 'https://www.blackbox.com/',
      logo: 'https://bbnscdn.azureedge.net/cms/images/default-images/logo_dark.png'
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
      name: 'Black Box',
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
      type: 'Commercial',
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

  const filename = `blackbox-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase().replace(/\s+/g, '-')}.md`;
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