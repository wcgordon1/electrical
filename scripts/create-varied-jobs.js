const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

// Load environment variables
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const LOCATIONS = [
    { city: 'Los Angeles', state: 'CA', zipCode: '90001' },
    { city: 'San Francisco', state: 'CA', zipCode: '94105' },
    { city: 'San Diego', state: 'CA', zipCode: '92101' },
    { city: 'San Jose', state: 'CA', zipCode: '95113' },
    { city: 'Irvine', state: 'CA', zipCode: '92618' },
    { city: 'Sacramento', state: 'CA', zipCode: '95814' },
    { city: 'Anaheim', state: 'CA', zipCode: '92805' },
    { city: 'Long Beach', state: 'CA', zipCode: '90802' },
    { city: 'Pasadena', state: 'CA', zipCode: '91101' },
    { city: 'Glendale', state: 'CA', zipCode: '91205' },
    { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
    { city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
    { city: 'Tempe', state: 'AZ', zipCode: '85281' },
    { city: 'Mesa', state: 'AZ', zipCode: '85201' },
    { city: 'Chandler', state: 'AZ', zipCode: '85225' },
];

const TEAMS = ['Commercial'];

const JOB_TYPES = {
  'Electrician': {
    minValue: 35,
    maxValue: 52,
    experienceLevel: 'seniorLevel',
    category: 'Apprentice',
    prompt: 'Create a detailed job description for a commercial Electrician. Include both experienced Apprentice level skillsets and Journeyman level skillsets. Focus on general electrical work for new construction office buildings and hospitals.'
  },
  'Fire Alarm Technician': {
    minValue: 28,
    maxValue: 45,
    experienceLevel: 'seniorLevel',
    category: 'Fire Alarm',
    prompt: 'Create a detailed job description for a Fire Alarm Technician with a minimum of 2 years of experience. Focus on job skills for new construction office buildings and hospitals as well as maintenance of existing fire alarm systems. More experienced technicians should have experience with troubleshooting and maintenance of existing fire alarm systems.'
  },
  'Fire Alarm Installer': {
    minValue: 25,
    maxValue: 38,
    experienceLevel: 'seniorLevel',
    category: 'Fire Alarm',
    prompt: 'Create a detailed job description for a Fire Alarm Installer with a minimum of 2 years of experience. Focus on installing fire alarm systems in new construction office buildings, hospitals, big box retail stores, and other commercial properties.'
  },
  'Security Technician': {
    minValue: 28,
    maxValue: 40,
    experienceLevel: 'seniorLevel',
    category: 'Security',
    prompt: 'Create a detailed job description for a Security Technician with a minimum of 2 years of experience. Focus on installing security systems in new construction office buildings, hospitals, big box retail stores, and other commercial properties. Name specific skills, tools, and preferred certifications needed for the job.'
  },
  'Commercial Journeyman Electrician': {
    minValue: 41,
    maxValue: 56,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman',
    prompt: 'Create a detailed job description for a Commercial Journeyman Electrician with a minimum of 4 years of electrical experience. Focus on installing electrical systems in new construction office buildings, hospitals, big box retail stores, and other commercial properties. Offer a $300 sign on bonus after their first pay check.'
  }
};

async function generateJobDescription(jobType, location) {
  const prompt = `${JOB_TYPES[jobType].prompt}

Position: ${jobType}
Location: ${location.city}, ${location.state}
Company: Prime Partners

Create a detailed job description that includes:
- Key responsibilities specific to ${jobType}
- Required qualifications and certifications
- Service area including ${location.city} and surrounding cities
- Specific tools and equipment knowledge needed
- Safety requirements and protocols
- Benefits and growth opportunities

The description should be detailed and focus on commercial electrical work in ${location.city}, ${location.state} and nearby areas.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function createJob(jobType, location) {
  const today = new Date();
  const validThrough = new Date(today);
  validThrough.setDate(validThrough.getDate() + 60);

  const jobInfo = JOB_TYPES[jobType];
  const team = TEAMS[Math.floor(Math.random() * TEAMS.length)];
  const jobId = `${jobType
    .substring(0, 4)
    .toUpperCase()
    .replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 8)}`.replace(/\s+/g, '-');

  // Generate full description
  const fullDescription = await generateJobDescription(jobType, location);
  
  // Create frontmatter data
  const jobData = {
    position: jobType,
    description: `${fullDescription.substring(0, 500)}...`,
    location: `${location.city}, ${location.state}`,
    team,
    datePosted: today.toISOString(),
    validThrough: validThrough.toISOString(),
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'Prime Partners',
      sameAs: 'https://primepartners.info',
      logo: 'https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1-1.png'
    },
    jobLocation: {
      streetAddress: '123 Main Street',
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: 'USA'
    },
    baseSalary: {
      currency: 'USD',
      value: Math.floor((jobInfo.minValue + jobInfo.maxValue) / 2),
      minValue: jobInfo.minValue,
      maxValue: jobInfo.maxValue,
      unitText: 'HOUR'
    },
    experienceRequirements: jobInfo.experienceLevel,
    occupationalCategory: jobInfo.category,
    identifier: {
      name: 'Prime Partners',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'support@primepartners.info',
      'resumes@bestelectricianjobs.zohorecruitmail.com',
      'prime.partners+candidate+jl6y59w7r@mail.manatal.com'
    ]
  };

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  // Write to file
  const filename = `prime-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city
    .toLowerCase()
    .replace(/\s+/g, '-')}-${jobId.toLowerCase().replace(/\s+/g, '-')}`.replace(/\s+/g, '-') + '.md';

  if (filename.includes(' ')) {
    console.error('Error: Filename contains spaces:', filename);
    process.exit(1);
  }

  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  fs.writeFileSync(filePath, finalContent);

  console.log(`Created ${jobType} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  console.log('Job Types to create:', Object.keys(JOB_TYPES));
  
  for (const jobType of Object.keys(JOB_TYPES)) {
    console.log(`Starting jobs for: ${jobType}`);
    for (const location of LOCATIONS) {
      console.log(`Creating in ${location.city}...`);
      await createJob(jobType, location);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log(`Completed all locations for: ${jobType}`);
  }
  
  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

createAllJobs().catch(console.error); 