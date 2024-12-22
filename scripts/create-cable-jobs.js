const COMPANIES = {
  'T&D Communications': {
    name: 'T&D Communications',
    sameAs: 'https://www.tanddcomm.com/',
    logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHzkB3k7eQoSQ/company-logo_200_200/company-logo_200_200/0/1631320385872?e=2147483647&v=beta&t=nuFy5lrwqoCuQ6_2P8hO_EwhwJlnndzcbM7ZPSfdKlM'
  },
  '3D Communications': {
    name: '3D Communications',
    sameAs: 'https://www.3dtsi.com/',
    logo: 'https://threedtsistage.wpenginepowered.com/wp-content/uploads/2021/01/logo-default.png'
  },
  'WiLine': {
    name: 'WiLine',
    sameAs: 'https://www.wiline.com/',
    logo: 'https://www.wiline.com/img/logo_blue.png'
  },
  'HCI Systems': {
    name: 'HCI Systems',
    sameAs: 'https://www.hcisystems.net/',
    logo: 'https://www.hcisystems.net/wp-content/uploads/2019/04/logo.png'
  },
  'MMR Group': {
    name: 'MMR Group',
    sameAs: 'https://www.mmrgrp.com/',
    logo: 'https://www.mmrgrp.com/assets/images/mmrlogo.svg'
  },
  'Convergint': {
    name: 'Convergint',
    sameAs: 'https://www.convergint.com/',
    logo: 'https://www.convergint.com/wp-content/uploads/2021/06/logo-on-dark-blue.png'
  },
  'Vision Technologies': {
    name: 'Vision Technologies',
    sameAs: 'https://www.visiontechnologies.com/',
    logo: 'https://www.visiontechnologies.com/themes/custom/vt/logo.svg'
  }
};
  
  const JOB_TYPES = {
    'Cable Tech': {
      minValue: 21,
      maxValue: 26,
      experienceLevel: 'midLevel',
      category: 'Voice Data',
      yearsExperience: '2-4',
      prompt: 'Write a job description for a junior Low Voltage Cable Technician responsible for installing and servicing low voltage voice and data cabling, including fiber optic and copper cabling, in a commercial construction environment, mainly hospitals and office buildings.'
    },
    'Cable Technician': {
      minValue: 28,
      maxValue: 34,
      experienceLevel: 'midLevel',
      category: 'Voice Data',
      yearsExperience: '2-5',
      prompt: 'Craft a job description for an experienced cable technician specializing in the installation, configuration, and maintenance of voice and data cabling, including fiber optic and copper cabling, in a commercial construction environment. terminating patch panels and running cable to the patch panel. terminating 110 and 66 blocks, and network infrastructure. '
    },
    'Security Technician': {
      minValue: 28,
      maxValue: 35,
      experienceLevel: 'midLevel',
      category: 'Security',
      yearsExperience: '2-4',
      prompt: 'Write a job description for a Security Technician responsible for installing and servicing security systems, including cameras, alarms, and access control, in a commercial construction environment, mainly hospitals and office buildings.'
    }
  };
  
  const TEAMS = [
    'Commercial'
  ];
  
  const CERTIFICATIONS = {
    'Voice Data': [
      'BICSI Technician',
      'BICSI Installer 2',
      'Fiber Optic Certification',
      'Network+ Certification',
      'OSHA 10'
    ],
    'Security': [
      'Security+ Certification',
      'ASIS PSP Certification',
      'ESA Level 1 Certification',
      'OSHA 10'
    ]
  };
  
  const TOOLS_AND_TECH = {
    'Voice Data': [
      'Cable Testers',
      'Fiber Optic Tools',
      'Punch Down Tools',
      'Wire Mapping Tools',
      'Termination Equipment',
      'Cable Management Systems'
    ],
    'Security': [
      'CCTV Systems',
      'Access Control Systems',
      'Intrusion Detection Systems',
      'Network Security Tools',
      'Security Management Software',
      'Video Surveillance Equipment'
    ]
  };
  
  const WORK_ENVIRONMENTS = [
    { 
      type: 'Commercial', 
      clients: [
        'New Construction',
        'Healthcare',
        'Education'
      ]
    }
  ];
  
  const LOCATIONS = [      

  { city: 'Manhattan Beach', state: 'CA', zipCode: '90266' },
  { city: 'Calabasas', state: 'CA', zipCode: '91302' },
  { city: 'Malibu', state: 'CA', zipCode: '90265' },
  { city: 'Pasadena', state: 'CA', zipCode: '91101' },
  { city: 'Burbank', state: 'CA', zipCode: '91502' },
  { city: 'Marina del Rey', state: 'CA', zipCode: '90292' },

  
  // Central California
  { city: 'Fresno', state: 'CA', zipCode: '93721' },
  { city: 'Bakersfield', state: 'CA', zipCode: '93301' },
  { city: 'Modesto', state: 'CA', zipCode: '95354' },
  { city: 'Visalia', state: 'CA', zipCode: '93291' },
  { city: 'San Luis Obispo', state: 'CA', zipCode: '93401' },
  
  // Bay Area
  { city: 'San Francisco', state: 'CA', zipCode: '94102' },
  { city: 'San Jose', state: 'CA', zipCode: '95113' },
  { city: 'Oakland', state: 'CA', zipCode: '94612' },
  { city: 'Berkeley', state: 'CA', zipCode: '94704' },
  { city: 'Santa Rosa', state: 'CA', zipCode: '95404' },
  
  // Northern California
  { city: 'Sacramento', state: 'CA', zipCode: '95814' },
  { city: 'Redding', state: 'CA', zipCode: '96001' },
  { city: 'Eureka', state: 'CA', zipCode: '95501' },
  { city: 'Chico', state: 'CA', zipCode: '95926' },
  { city: 'South Lake Tahoe', state: 'CA', zipCode: '96150' },
  
  // Inland/Desert
  { city: 'Victorville', state: 'CA', zipCode: '92392' },
  { city: 'El Centro', state: 'CA', zipCode: '92243' },
  { city: 'Barstow', state: 'CA', zipCode: '92311' },
  { city: 'Mammoth Lakes', state: 'CA', zipCode: '93546' },
  { city: 'Ridgecrest', state: 'CA', zipCode: '93555' }  

  ];
  
  const STREET_TYPES = ['Main St.', 'Industrial Pkwy.', 'First St.', 'Third St.', 'Second St.', 'Commerce Dr.', 'Tech Blvd.'];
  
  function generateStreetAddress() {
    const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
    const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
    return `${number} ${streetType}`;
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
    const extraDollars = Math.random() * (3 - 1) + 1;
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
  
  // Update the specialties to be used in the description instead
  const WORK_TYPES = {
    'Commercial': ['Office Buildings', 'Healthcare Facilities', 'Educational Institutions'],
    // 'Industrial': ['Manufacturing Plants', 'Distribution Centers', 'Processing Facilities'],
    'Healthcare': ['Hospitals', 'Medical Centers', 'Outpatient Facilities'],
    'Education': ['Universities', 'K-12 Schools', 'Training Centers'],
    'Technology': ['Data Centers', 'Tech Campuses', 'Research Facilities']
  };
  
  // In createJob function, update how we handle the title and description:
  async function createJob(location, jobType, company) {
    const datePosted = generateRecentDate();
    const validThrough = generateValidThrough(datePosted);
    const team = TEAMS[Math.floor(Math.random() * TEAMS.length)];
    const workType = WORK_TYPES[team][Math.floor(Math.random() * WORK_TYPES[team].length)];
    
    // Get job info first
    const jobInfo = JOB_TYPES[jobType];
    
    // Use original job title
    const jobTitle = jobType;
    
    // Generate salary before using it
    const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);
    
    // Get random certifications for this job type
    const certifications = CERTIFICATIONS[jobInfo.category]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    // Get random tools/tech for this job type
    const tools = TOOLS_AND_TECH[jobInfo.category]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 2);

    const jobId = generateJobId(company, jobType);
    
    // Update the prompt to include both certifications and tools
    const prompt = `Create a traditional job description for a ${jobTitle} position at ${company.name} in ${location.city}, ${location.state}, focusing on ${workType} projects. Format in markdown without h1 tags and do not include instructions, only show the job description. 

Brief paragraph on company introduction for ${company.name}. Do not include headings yet.

After this, proceed with h2, h3, and h4 headings. Do not include h1 headings.

## Position Overview at ${company.name}
Brief overview of the role and responsibilities in ${location.city}, ${location.state} and the neighboring cities.

## Requirements for ${jobTitle}
- [Key responsibilities for ${jobTitle} at ${company.name}]
- 3 bullet points on low voltage cabling installation for ${jobTitle}
- Tool proficiency for daily tasks for ${jobTitle} 
- [Daily tasks]
- [Project involvement]

## Qualifications for ${jobTitle} at ${company.name}
- ${jobInfo.yearsExperience} years of experience
- Required certification: ${certifications[0]}
- Experience with: ${tools.slice(0, 2).join(', ')}
- Physical requirements

## Preferred Qualifications
- Additional certification: ${certifications[1]}
- Experience with: ${tools[2] || tools[0]}

## Location & Schedule
- Primary location: ${location.city}, ${location.state}
- Additional locations: [List of neighboring cities to ${location.city}, ${location.state}]
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
  
    // Create filename using company name
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