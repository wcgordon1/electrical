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
 { city: 'Duluth', state: 'GA', zipCode: '30096' },
  { city: 'Kennesaw', state: 'GA', zipCode: '30144' },
  { city: 'Smyrna', state: 'GA', zipCode: '30080' },
  { city: 'Dunwoody', state: 'GA', zipCode: '30338' },
  { city: 'Johns Creek', state: 'GA', zipCode: '30097' },
  // Colorado
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
  { city: 'Aurora', state: 'CO', zipCode: '80012' },
  { city: 'Fort Collins', state: 'CO', zipCode: '80525' },
  { city: 'Lakewood', state: 'CO', zipCode: '80226' },
  { city: 'Thornton', state: 'CO', zipCode: '80229' },
  { city: 'Arvada', state: 'CO', zipCode: '80002' },
  { city: 'Westminster', state: 'CO', zipCode: '80031' },
  { city: 'Pueblo', state: 'CO', zipCode: '81003' },
  { city: 'Centennial', state: 'CO', zipCode: '80112' }
];

const TEAMS = ['Commercial'];

const JOB_TYPES = {
  'Electrician': {
    minValue: 20,
    maxValue: 30,
    experienceLevel: 'seniorLevel',
    category: 'Apprentice',
    prompt: 'Create a detailed job description for a commercial Electrician. Include both Apprentice and Journeyman level skillsets. Focus on general electrical work for new construction office buildings and hospitals.'
  },
  'Apprentice Electrician': {
    minValue: 18,
    maxValue: 32,
    experienceLevel: 'seniorLevel',
    category: 'Apprentice',
    prompt: 'Create a detailed job description for an Apprentice Commercial Electrician. Focus on general electrical work for new construction office buildings and hospitals. Apprentice should have at least 1 year of experience as an electrician.'
  }
};

async function generateJobDescription(jobType, location) {
  const prompt = `Create a detailed job description for a ${jobType} position in ${location.city}, ${location.state}. Include key responsibilities, qualifications, and requirements. Focus on industry specifics for ${jobType} work. The company name is Premier Electric, include surrounding cities that border ${location.city}. Include specific job functions and skills required for ${jobType}s.`;

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
      name: 'Premier Electric',
      sameAs: 'https://www.premierelectricalstaffing.com/',
      logo: 'https://www.premierelectricalstaffing.com/wp-content/uploads/2020/05/Premier-Electrical-Staffing-logo.png'
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
      name: 'Premier Electric',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'Michael.Mckeaige@pes123.com',
      'resumes@bestelectricianjobs.zohorecruitmail.com'
    ]
  };

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  // Write to file
  const filename = `premier-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city
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