#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');

require('dotenv').config({ 
  path: path.join(__dirname, 'config', '.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY not found in scripts/config/.env.local file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const JOB_TYPES = {
  'Electrical Staffing Manager': {
   minValue: 65000,
   maxValue: 75000,
   experienceLevel: 'senior',
   category: 'Commercial',
   team: 'Operations',
   yearsExperience: '5+',
   responsibilities: 'Manage recruitment for electrical contractors nationwide, develop relationships with electrical companies and unions, understand commercial and industrial electrical projects, oversee contractor placement and retention, maintain database of qualified electricians, coordinate licensing requirements across states, manage payroll and benefits for electrical contractors, ensure compliance with electrical safety regulations, analyze market rates for electrical trades, coordinate continuing education requirements, implement contractor evaluation systems, manage worker compensation claims, oversee apprenticeship program placements',
   qualifications: 'Bachelors degree preferred, proven experience in electrical or skilled trades staffing, strong knowledge of electrical industry and trade classifications, understanding of electrical licenses and certifications, experience with skilled trades payroll and benefits, knowledge of electrical safety regulations and requirements, excellent negotiation and relationship building skills, experience with VMS and ATS systems, strong understanding of prevailing wage and union requirements',
   prompt: 'Create a job description for an Electrical Staffing Manager at Premier Electrical Staffing leading recruitment efforts across multiple regions. Position requires strong understanding of electrical trade and contractor staffing. Must understand journeyman and master electrician requirements across states. Role involves developing relationships with electrical contractors and managing skilled trades recruitment. Experience with prevailing wage and union regulations required. Position includes overseeing contractor compliance and managing worker benefits. Must have excellent communication skills and ability to work with various electrical trade classifications.'
},

'Senior Electrical Recruiter': {
   minValue: 55000,
   maxValue: 70000,
   experienceLevel: 'midLevel',
   category: 'Commercial',
   team: 'Operations',
   yearsExperience: '2-5',
   responsibilities: 'Recruit qualified electricians for commercial and industrial projects, screen electrical skills and certifications, maintain candidate pipeline of licensed electricians, coordinate with project managers on electrical staffing needs, verify electrical licenses and certifications, source through trade schools and electrical unions, track placement metrics and retention rates, attend electrical trade events, maintain database of electrical contractors, research prevailing wage rates, coordinate drug testing and background checks, create job descriptions for electrical positions',
   qualifications: 'Bachelors degree preferred, proven electrical trade recruiting experience, understanding of electrical licenses and certifications, experience with skilled trades staffing, proficiency with ATS systems, strong understanding of electrical safety requirements, excellent communication and interpersonal skills, experience with union and non-union staffing, knowledge of electrical trade terminology, demonstrated ability to evaluate electrical qualifications',
   prompt: 'Create a job description for a Senior Electrical Recruiter at Premier Electrical Staffing specializing in commercial and industrial electricians. Position involves full-cycle recruitment for licensed electricians including apprentices, journeymen, and master electricians. Must understand electrical certifications and license requirements. Role includes sourcing through multiple channels, screening electrical qualifications, and managing contractor pipeline. Experience with skilled trades staffing required. Position requires strong networking abilities within electrical industry. Must have excellent communication skills and ability to evaluate electrical experience levels.'
},

'Junior Electrical Recruiter': {
   minValue: 50000,
   maxValue: 60000,
   experienceLevel: 'entryLevel',
   category: 'Commercial',
   team: 'Operations',
   yearsExperience: '0-2',
   responsibilities: 'Support electrical trades recruitment process, screen resumes for electrical experience levels, schedule interviews, maintain electrical staffing database, post electrical job openings across various platforms, coordinate with field supervisors, assist with electrical trade shows and career fairs, conduct reference checks on electrical experience, support contractor onboarding process, maintain placement metrics, assist with timecard processing, help coordinate safety training requirements, support electrical apprenticeship program',
   qualifications: 'Bachelors degree preferred, 0-2 years recruiting or electrical industry experience, proficiency with ATS systems and MS Office, basic understanding of electrical trade classifications, strong organizational and multitasking abilities, excellent written and verbal communication skills, ability to work in fast-paced environment, attention to detail, understanding of electrical safety requirements, ability to maintain confidentiality',
   prompt: 'Create a job description for a Junior Electrical Recruiter at Premier Electrical Staffing supporting skilled trades recruitment team. Entry-level position learning electrical contractor staffing. Must have strong organizational skills and attention to detail. Role involves screening electrical experience, scheduling interviews, and maintaining contractor documentation. Will assist with trade shows and recruiting events. Position requires excellent communication skills and ability to learn electrical trade terminology. Experience with skilled trades helpful but not required. Must be comfortable in fast-paced environment and maintain strict confidentiality. Training provided on electrical industry requirements and recruiting processes.'
}
};

const PROMPT_STYLES = {
  'conversational': 'Make this job description friendly and conversational, using casual language while maintaining professionalism. Use "you" and "we" to speak directly to the candidate.',
  'formal': 'Write this job description in a formal, traditional corporate style with clear sections and bullet points.',
  'detailed': 'Create a comprehensive and detailed job description with specific examples and clear expectations for each responsibility.',
  'concise': 'Write a clear and concise job description focusing on key requirements and essential responsibilities.',
  'engaging': 'Create an engaging and energetic job description that excites potential candidates while highlighting growth opportunities.'
};

const PROMPT_TEMPLATES = [
  `Create a job description that emphasizes the cutting-edge technology aspects of this role. Focus on how this position uses modern tools, software, and equipment. Highlight the technical challenges and innovative solutions. Include specific examples of new technologies being used in {city}, {state}.

Base content:
{baseContent}

Start with a paragraph about working in {city}, {state} at {company}. Include neighboring cities where work may be performed. Do not use h1 tags - only use h2 and h3 for headings. Use ** for bold text, not backticks.

After the intro paragraph, use these sections with h2 tags:

## Key Responsibilities
{responsibilities}
- Add 3-4 technology-focused responsibilities
- Include regional tech requirements for {state}
- Mention upcoming tech projects in {city}

## Required Qualifications
{qualifications}
- {experience} years of experience required
- Add 2-3 tech-specific qualifications

## Compensation & Benefits
{benefits}

Format in markdown using only h2 and h3 headings (## and ###). Use ** for bold text. Do not include backticks or formatting instructions in the output.`,

  `Write a job description that focuses on career growth and development. Emphasize training opportunities, mentorship programs, and advancement paths. Highlight how this role can lead to future career opportunities.

Base content:
{baseContent}

Begin with a paragraph about career opportunities in {city}, {state} at {company}. Name surrounding cities. Do not use h1 tags - only use h2 and h3 for headings. Use ** for bold text, not backticks.

Then use these sections with h2 tags:

## Key Responsibilities
{responsibilities}
- Add 3-4 skill development opportunities
- Include learning opportunities in {state}
- Mention training programs in {city}

## Required Qualifications
{qualifications}
- {experience} years of experience required
- Add 2-3 growth-oriented qualifications

## Compensation & Benefits
{benefits}

Format in markdown using only h2 and h3 headings (## and ###). Use ** for bold text. Do not include backticks or formatting instructions in the output.`,

  `Create a job description that emphasizes work-life balance and company culture. Focus on team environment, flexible scheduling, and workplace benefits. Highlight what makes working here unique.

Base content:
{baseContent}

Start with a paragraph about the work environment in {city}, {state} at {company}. Include nearby cities. Do not use h1 tags - only use h2 and h3 for headings. Use ** for bold text, not backticks.

Follow with these sections using h2 tags:

## Key Responsibilities
{responsibilities}
- Add 3-4 team-oriented responsibilities
- Include work-life balance aspects
- Mention company culture elements

## Required Qualifications
{qualifications}
- {experience} years of experience required
- Add 2-3 team-focused qualifications

## Compensation & Benefits
{benefits}

Format in markdown using only h2 and h3 headings (## and ###). Use ** for bold text. Do not include backticks or formatting instructions in the output.`,

  `Develop a job description that focuses on the impact and importance of this role. Emphasize how this position contributes to critical infrastructure and community development. Highlight the meaningful aspects of the work.

Base content:
{baseContent}

Begin with a paragraph about the impact of this role in {city}, {state} at {company}. Name surrounding cities. Do not use h1 tags - only use h2 and h3 for headings. Use ** for bold text, not backticks.

Then use these sections with h2 tags:

## Key Responsibilities
{responsibilities}
- Add 3-4 impact-focused responsibilities
- Include community benefits in {state}
- Mention significant projects in {city}

## Required Qualifications
{qualifications}
- {experience} years of experience required
- Add 2-3 impact-related qualifications

## Compensation & Benefits
{benefits}

Format in markdown using only h2 and h3 headings (## and ###). Use ** for bold text. Do not include backticks or formatting instructions in the output.`,

  `Write a job description that emphasizes hands-on experience and practical skills. Focus on the day-to-day activities and real-world applications. Highlight the variety of work and practical challenges.

Base content:
{baseContent}

Start with a paragraph about the practical work in {city}, {state} at {company}. Include nearby work locations. Do not use h1 tags - only use h2 and h3 for headings. Use ** for bold text, not backticks.

Follow with these sections with h2 tags:

## Key Responsibilities
{responsibilities}
- Add 3-4 hands-on responsibilities
- Include practical requirements for {state}
- Mention typical projects in {city}

## Required Qualifications
{qualifications}
- {experience} years of experience required
- Add 2-3 practical skill qualifications

## Compensation & Benefits
{benefits}

Format in markdown using only h2 and h3 headings (## and ###). Use ** for bold text. Do not include backticks or formatting instructions in the output.`
];

const DESCRIPTION_LENGTHS = {
  'short': 500,
  'medium': 800,
  'long': 1000
};

const COMPANIES = {
  'Premier Electric': {
    name: 'Premier Electric',
    sameAs: 'https://www.premierelectricalstaffing.com/',
    logo: 'https://www.premierelectricalstaffing.com/wp-content/uploads/2020/05/Premier-Electrical-Staffing-logo.png'
  }
};

const LOCATIONS = [
  { city: 'Concord', state: 'NC', zipCode: '28025' },
{ city: 'Kannapolis', state: 'NC', zipCode: '28081' },
{ city: 'Harrisburg', state: 'NC', zipCode: '28075' },
{ city: 'Davidson', state: 'NC', zipCode: '28036' },
{ city: 'Lawrenceville', state: 'GA', zipCode: '30043' },
{ city: 'Snellville', state: 'GA', zipCode: '30078' },
{ city: 'Duluth', state: 'GA', zipCode: '30096' },
{ city: 'Suwanee', state: 'GA', zipCode: '30024' },
{ city: 'Cornelius', state: 'NC', zipCode: '28031' },
{ city: 'Davidson', state: 'NC', zipCode: '28036' },
{ city: 'Huntersville', state: 'NC', zipCode: '28078' },
{ city: 'Denver', state: 'NC', zipCode: '28037' },
{ city: 'Chester', state: 'VA', zipCode: '23831' },
{ city: 'Colonial Heights', state: 'VA', zipCode: '23834' },
{ city: 'Hopewell', state: 'VA', zipCode: '23860' },
{ city: 'Petersburg', state: 'VA', zipCode: '23803' },
{ city: 'Raleigh', state: 'NC', zipCode: '27601' },
{ city: 'Cary', state: 'NC', zipCode: '27511' },
{ city: 'Garner', state: 'NC', zipCode: '27529' },
{ city: 'Wake Forest', state: 'NC', zipCode: '27587' },
];

const STREET_TYPES = [
  'Main St.', 'Technology Dr.', 'Innovation Way', 'Corporate Blvd.', 
  'Commerce Dr.', 'Industrial Pkwy.', 'Enterprise Ave.', 'Business Center Dr.',
  'Professional Pkwy.', 'Executive Dr.', 'Tech Park Way', 'Trade Center Blvd.'
];

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
}

function generateSalaryWithCents(baseMin, baseMax) {
  const extraDollars = Math.random() * (3 - 1) + 1;
  const minCents = Math.random();
  const maxCents = Math.random();
  
  return {
    minValue: Number((baseMin + extraDollars + minCents).toFixed(2)),
    maxValue: Number((baseMax + extraDollars + maxCents).toFixed(2))
  };
}

function generateRecentDate() {
  const now = new Date();
  const twoDaysAgo = new Date(now - (2 * 24 * 60 * 60 * 1000));
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const daysToAdd = Math.floor(Math.random() * (45 - 31 + 1) + 31);
  const validThrough = new Date(postedDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

function generateJobId(company, type) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  // Create a job-specific prompt that incorporates the job type's unique aspects
  const jobSpecificPrompt = `Create a detailed job description for a ${jobType} position that aligns with the following responsibilities and qualifications. The description should focus specifically on ${jobType} duties and requirements.

Base content:
${jobInfo.prompt}

Key focus areas for ${jobType}:
- ${jobInfo.responsibilities.split(',')[0]}
- ${jobInfo.qualifications.split(',')[0]}
- Experience level: ${jobInfo.experienceLevel}
- Category: ${jobInfo.category}
- Team: ${jobInfo.team}

Start with a paragraph about working as a ${jobType} in {city}, {state} at {company}. Include neighboring cities where work may be performed. Do not use h1 tags - only use h2 and h3 for headings. Use ** for bold text, not backticks.

After the intro paragraph, use these sections with h2 tags:

## Key Responsibilities
{responsibilities}
- Add 3-4 ${jobType.toLowerCase()}-specific responsibilities
- Include regional requirements for {state}
- Mention upcoming ${jobType.toLowerCase()} projects in {city}

## Required Qualifications
{qualifications}
- {experience} years of experience required
- Add 2-3 ${jobType.toLowerCase()}-specific qualifications

## Compensation & Benefits
{benefits}

Format in markdown using only h2 and h3 headings (## and ###). Use ** for bold text. Do not include backticks or formatting instructions in the output.`;

  const selectedPrompt = jobSpecificPrompt
    .replace('{baseContent}', jobInfo.prompt)
    .replace('{responsibilities}', jobInfo.responsibilities)
    .replace('{qualifications}', jobInfo.qualifications)
    .replace('{experience}', jobInfo.yearsExperience)
    .replace('{city}', location.city)
    .replace('{state}', location.state)
    .replace('{company}', company.name)
    .replace('{benefits}', `- Competitive salary range: $${minValue}-$${maxValue} per hour depending on experience
- Comprehensive medical, dental, and vision coverage
- Paid time off and holidays
- Career advancement opportunities
- Ongoing training and certifications`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: selectedPrompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  const jobData = {
    position: jobType,
    description: fullDescription.substring(0, 500) + '...',
    location: `${location.city}, ${location.state}`,
    team: jobInfo.team,
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
      'Michael.Mckeaige@pes123.com',
      'Sarahann.Moody@pes123.com'
    ]
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = generateFilename(company, jobType, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} for ${company.name} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  const companies = Object.values(COMPANIES);
  const jobTypes = Object.keys(JOB_TYPES);
  
  for (const location of LOCATIONS) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    await createJob(location, jobType, company);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

createAllJobs().catch(console.error); 
