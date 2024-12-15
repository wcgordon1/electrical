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
  { city: 'Lancaster', state: 'CA', zipCode: '93534' },
  { city: 'Desert Center', state: 'CA', zipCode: '92239' },
  { city: 'Boulder City', state: 'NV', zipCode: '89005' },
  { city: 'Blythe', state: 'CA', zipCode: '92225' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85004' },
  { city: 'Deming', state: 'NM', zipCode: '88030' },
  { city: 'San Antonio', state: 'TX', zipCode: '78201' },
  { city: 'Pueblo', state: 'CO', zipCode: '81001' },
  { city: 'Rosamond', state: 'CA', zipCode: '93560' },
  { city: 'Tonopah', state: 'NV', zipCode: '89049' },
  { city: 'Gila Bend', state: 'AZ', zipCode: '85337' },
  { city: 'Palm Springs', state: 'CA', zipCode: '92262' },
  { city: 'Bakersfield', state: 'CA', zipCode: '93301' },
  { city: 'Las Vegas', state: 'NV', zipCode: '89101' },
  { city: 'El Centro', state: 'CA', zipCode: '92243' },
  { city: 'Casa Grande', state: 'AZ', zipCode: '85122' },
  { city: 'Hatch', state: 'NM', zipCode: '87937' }
];

const TEAMS = ['Solar'];

const JOB_TYPES = {
  'Solar Panel Installer': {
    minValue: 22,
    maxValue: 30,
    experienceLevel: 'seniorLevel',
    category: 'Apprentice',
    prompt: 'Create a detailed job description for a solar panel installer. Focus on general solar panel installation for new construction and solar farms.'
  }
};

async function generateJobDescription(jobType, location) {
  const prompt = `${JOB_TYPES[jobType].prompt}

Position: ${jobType}
Location: ${location.city}, ${location.state}
Company: Greenskies Solar

Create a detailed job description for major solar farm work for solar panel installers of all levels ${jobType}s
- Required qualifications and nice to have certifications
- Service area including ${location.city} and surrounding areas
- Specific tools and equipment knowledge needed
- Important Safety requirements and protocols
- Benefits and growth opportunities

The description should be detailed and focus on solar farm work in ${location.city}, ${location.state}.`;

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
      name: 'Greenskies',
      sameAs: 'https://www.greenskies.com/',
      logo: 'https://res.cloudinary.com/energysage/image/fetch/s--EpTorQai--/b_auto,c_pad,f_auto,h_200,q_auto,w_200/https://es-media-prod.s3.amazonaws.com/media/supplier/logo/source/Greenskies_Clean_Focus_Company.jpg'
    },
    jobLocation: {
      streetAddress: '32000 S. Main St.',
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
      name: 'Greenskies Solar',
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
  const filename = `greenskies-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city
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