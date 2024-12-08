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

// Get job title from command line
const jobTitle = process.argv[2];
if (!jobTitle) {
  console.error('Please provide a job title');
  process.exit(1);
}

const LOCATIONS = [
  // California
  /*
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
  { city: 'Cupertino', state: 'CA', zipCode: '95014' },
  { city: 'Santa Clara', state: 'CA', zipCode: '95050' },
  { city: 'Mountain View', state: 'CA', zipCode: '94041' },
  { city: 'Palo Alto', state: 'CA', zipCode: '94301' },
  { city: 'Sunnyvale', state: 'CA', zipCode: '94086' },
  { city: 'Fremont', state: 'CA', zipCode: '94538' },
  { city: 'Oakland', state: 'CA', zipCode: '94612' },
  { city: 'Berkeley', state: 'CA', zipCode: '94704' },
  { city: 'Santa Monica', state: 'CA', zipCode: '90401' },
  { city: 'Burbank', state: 'CA', zipCode: '91502' },
  { city: 'Fresno', state: 'CA', zipCode: '93721' },
  { city: 'Riverside', state: 'CA', zipCode: '92501' },
  { city: 'Stockton', state: 'CA', zipCode: '95202' },
  { city: 'Bakersfield', state: 'CA', zipCode: '93301' },
  { city: 'Santa Ana', state: 'CA', zipCode: '92701' },
  { city: 'Chula Vista', state: 'CA', zipCode: '91910' },
  { city: 'San Bernardino', state: 'CA', zipCode: '92401' },
  { city: 'Modesto', state: 'CA', zipCode: '95354' },
  { city: 'Oxnard', state: 'CA', zipCode: '93030' },
  { city: 'Fontana', state: 'CA', zipCode: '92335' },
  { city: 'Moreno Valley', state: 'CA', zipCode: '92553' },
  { city: 'Huntington Beach', state: 'CA', zipCode: '92648' },
  { city: 'Ontario', state: 'CA', zipCode: '91764' },
  { city: 'Rancho Cucamonga', state: 'CA', zipCode: '91730' },
  { city: 'Santa Rosa', state: 'CA', zipCode: '95404' },
  { city: 'Garden Grove', state: 'CA', zipCode: '92840' },
  { city: 'Oceanside', state: 'CA', zipCode: '92054' },
  { city: 'Elk Grove', state: 'CA', zipCode: '95624' },
  { city: 'Corona', state: 'CA', zipCode: '92882' },
  { city: 'Lancaster', state: 'CA', zipCode: '93534' },
  { city: 'Palmdale', state: 'CA', zipCode: '93550' },
  { city: 'Salinas', state: 'CA', zipCode: '93901' },
  { city: 'Hayward', state: 'CA', zipCode: '94541' },
  { city: 'Pomona', state: 'CA', zipCode: '91766' },
  { city: 'Escondido', state: 'CA', zipCode: '92025' },
  { city: 'Sunnyvale', state: 'CA', zipCode: '94086' },
  { city: 'Torrance', state: 'CA', zipCode: '90503' },
  { city: 'Roseville', state: 'CA', zipCode: '95661' },
  { city: 'Fullerton', state: 'CA', zipCode: '92832' },
  { city: 'Visalia', state: 'CA', zipCode: '93291' },
  */
 
  // Georgia
  
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Marietta', state: 'GA', zipCode: '30060' },
  { city: 'Alpharetta', state: 'GA', zipCode: '30009' },
  { city: 'Roswell', state: 'GA', zipCode: '30075' },
  { city: 'Sandy Springs', state: 'GA', zipCode: '30328' },
  { city: 'Athens', state: 'GA', zipCode: '30601' },
  { city: 'Lawrenceville', state: 'GA', zipCode: '30046' },
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
  { city: 'Centennial', state: 'CO', zipCode: '80112' },
  /*
  // Arizona
  { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
  { city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
  { city: 'Tempe', state: 'AZ', zipCode: '85281' },
  { city: 'Mesa', state: 'AZ', zipCode: '85201' },
  { city: 'Chandler', state: 'AZ', zipCode: '85225' },
  { city: 'Gilbert', state: 'AZ', zipCode: '85234' },
  { city: 'Glendale', state: 'AZ', zipCode: '85301' },
  { city: 'Peoria', state: 'AZ', zipCode: '85345' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
{ city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
{ city: 'Tempe', state: 'AZ', zipCode: '85281' },
{ city: 'Mesa', state: 'AZ', zipCode: '85201' },
{ city: 'Chandler', state: 'AZ', zipCode: '85225' },
{ city: 'Gilbert', state: 'AZ', zipCode: '85234' },
{ city: 'Glendale', state: 'AZ', zipCode: '85301' },
{ city: 'Peoria', state: 'AZ', zipCode: '85345' },
{ city: 'Tucson', state: 'AZ', zipCode: '85701' },
{ city: 'Surprise', state: 'AZ', zipCode: '85374' },
{ city: 'Yuma', state: 'AZ', zipCode: '85364' },
{ city: 'Avondale', state: 'AZ', zipCode: '85323' },
{ city: 'Goodyear', state: 'AZ', zipCode: '85338' },
{ city: 'Flagstaff', state: 'AZ', zipCode: '86001' },
{ city: 'Buckeye', state: 'AZ', zipCode: '85326' },
{ city: 'Lake Havasu City', state: 'AZ', zipCode: '86403' },
{ city: 'Casa Grande', state: 'AZ', zipCode: '85122' },
{ city: 'Sierra Vista', state: 'AZ', zipCode: '85635' },
{ city: 'Maricopa', state: 'AZ', zipCode: '85138' },
{ city: 'Oro Valley', state: 'AZ', zipCode: '85737' },
{ city: 'Prescott', state: 'AZ', zipCode: '86301' },
{ city: 'Bullhead City', state: 'AZ', zipCode: '86442' },
{ city: 'Prescott Valley', state: 'AZ', zipCode: '86314' },
{ city: 'Apache Junction', state: 'AZ', zipCode: '85120' },
{ city: 'Marana', state: 'AZ', zipCode: '85653' },
{ city: 'El Mirage', state: 'AZ', zipCode: '85335' },
{ city: 'Queen Creek', state: 'AZ', zipCode: '85142' },
{ city: 'Florence', state: 'AZ', zipCode: '85132' }
*/
  
  // North Carolina
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Greensboro', state: 'NC', zipCode: '27401' },
  { city: 'Asheville', state: 'NC', zipCode: '28801' },
  { city: 'Durham', state: 'NC', zipCode: '27701' },
  { city: 'Chapel Hill', state: 'NC', zipCode: '27514' },
  { city: 'Winston-Salem', state: 'NC', zipCode: '27101' },
  { city: 'Cary', state: 'NC', zipCode: '27513' },

  // South Carolina
  { city: 'Columbia', state: 'SC', zipCode: '29201' },
  { city: 'Charleston', state: 'SC', zipCode: '29401' },
  { city: 'North Charleston', state: 'SC', zipCode: '29406' },
  { city: 'Mount Pleasant', state: 'SC', zipCode: '29464' },
  { city: 'Rock Hill', state: 'SC', zipCode: '29730' },
  { city: 'Greenville', state: 'SC', zipCode: '29601' },
  { city: 'Summerville', state: 'SC', zipCode: '29483' },
{ city: 'Sumter', state: 'SC', zipCode: '29150' },
  { city: 'Goose Creek', state: 'SC', zipCode: '29445' },
  { city: 'Hilton Head Island', state: 'SC', zipCode: '29928' }
/*
  // Texas
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  { city: 'Fort Worth', state: 'TX', zipCode: '76102' },
  { city: 'Plano', state: 'TX', zipCode: '75024' },
  { city: 'Irving', state: 'TX', zipCode: '75038' },
  { city: 'Frisco', state: 'TX', zipCode: '75034' }
  */
];

const TEAMS = [
  'Industrial'
];

const SALARY_RANGES = {
  'Apprentice Electrician': {
    minValue: 18,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'Apprentice'
  },
  'Commercial Apprentice Electrician': {
    minValue: 25,
    maxValue: 35,
    experienceLevel: 'midLevel',
    category: 'Apprentice'
  },
  'Security Technician': {
    minValue: 25,
    maxValue: 35,
    experienceLevel: 'midLevel',
    category: 'Security'
  },
  'Voice & Data Technician': {
    minValue: 23,
    maxValue: 35,
    experienceLevel: 'midLevel',
    category: 'Voice & Data'
  },
  'Commercial Journeyman Electrician': {
    minValue: 28,
    maxValue: 38,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman'
  },
  'Commercial Electrician': {
    minValue: 28,
    maxValue: 38,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman'
  },
  'Industrial Electrician': {
    minValue: 25,
    maxValue: 35,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman'
  },
  'Journeyman Electrician': {
    minValue: 40,
    maxValue: 55,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman'
  },
  'Residential Journeyman Electrician': {
    minValue: 40,
    maxValue: 55,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman'
  },
  'Industrial Journeyman Electrician': {
    minValue: 40,
    maxValue: 55,
    experienceLevel: 'seniorLevel',
    category: 'Journeyman'
  },
  'Fire Alarm Technician': {
    minValue: 26,
    maxValue: 38,
    experienceLevel: 'midLevel',
    category: 'Fire Alarm'
  }
};

async function generateJobDescription(title, location) {
  const prompt = `Create a detailed job description for a ${title} position in ${location.city}, ${location.state}. Include key responsibilities, qualifications, and requirements. Focus on electrical industry specifics for ${title} work. The company name is Premier Electric, include surrounding cities that border ${location.city}. Applicants should have a minimum of 1 year of ${title} experience. Include specific job funtions and skills required for ${title}s.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function createJob(title, index) {
  const location = LOCATIONS[index % LOCATIONS.length];
  const team = TEAMS[index % TEAMS.length];
  const today = new Date();
  const validThrough = new Date(today);
  validThrough.setDate(validThrough.getDate() + 60);

  // Get salary range and experience level
  const salaryInfo = SALARY_RANGES[title] || {
    minValue: 25,
    maxValue: 35,
    experienceLevel: 'midLevel',
    category: 'Industrial'
  };

  // Generate unique job ID
  const jobId = `${title.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`;

  // Generate full description
  const fullDescription = await generateJobDescription(title, location);
  
  // Create frontmatter data
  const jobData = {
    position: title,
    description: `${fullDescription.substring(0, 500)}...`, // Short version for meta
    location: `${location.city}, ${location.state}`,
    team,
    datePosted: today.toISOString(),
    validThrough: validThrough.toISOString(),
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'Premier Electric',
      sameAs: 'https://www.premierelectricalstaffing.com/',
      logo: ' https://www.premierelectricalstaffing.com/wp-content/uploads/2020/05/Premier-Electrical-Staffing-logo.png'
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
      value: Math.floor((salaryInfo.minValue + salaryInfo.maxValue) / 2),
      minValue: salaryInfo.minValue,
      maxValue: salaryInfo.maxValue,
      unitText: 'HOUR'
    },
    experienceRequirements: salaryInfo.experienceLevel,
    occupationalCategory: salaryInfo.category,
    identifier: {
      name: 'Premier Electric',
      value: jobId
    },
    featured: Math.random() < 0.2, // 20% chance of being featured
    email: [
      'will@bestelectricianjobs.com',
      'Michael.Mckeaige@pes123.com',
      'resumes@bestelectricianjobs.zohorecruitmail.com'
    ]
  };

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`; // Add full description after frontmatter

  // Write to file
  const filename = `premier-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase()}-${jobId.toLowerCase()}.md`;
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  fs.writeFileSync(filePath, finalContent);

  console.log(`Created job: ${filename}`);
}

async function createJobs() {
  console.log(`Creating 25 ${jobTitle} positions...`);
  
  for (let i = 0; i < 40; i++) {
    await createJob(jobTitle, i);
  }

  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

createJobs().catch(console.error); 