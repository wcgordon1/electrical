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
  'Teleco': {
    name: 'Teleco',
    sameAs: 'https://www.teleco.com/',
    logo: 'https://www.teleco.com/wp-content/uploads/2019/10/telecologo-2023.png'
  },
  'Wisetel': {
    name: 'Wisetel',
    sameAs: 'https://www.wisetel.net/',
    logo: 'https://wisetel.net/wp-content/uploads/2020/02/home-logo.png'
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
  },
  'Tech Electronics': {
    name: 'Tech Electronics',
    sameAs: 'https://www.techelectronics.com/',
    logo: 'https://www.techelectronics.com/wp-content/uploads/2020/10/tech-electronics-logo.png'
  },
  'High Point Networks': {
    name: 'High Point Networks',
    sameAs: 'https://www.highpointnetworks.com/',
    logo: 'https://highpointnetworks.com/wp-content/uploads/2023/11/HPN-logo-fullColor-rgb.svg'
  }
};
  
  const JOB_TYPES = {
    'Low Voltage Cable Technician': {
      minValue: 25,
      maxValue: 31,
      experienceLevel: 'midLevel',
      category: 'Voice Data',
      yearsExperience: '2-4',
      prompt: 'Write a job description for a Low Voltage Cable Technician responsible for installing and servicing low voltage voice and data cabling, including fiber optic and copper cabling, in a commercial construction environment, mainly hospitals and office buildings.'
    },
    'Cable Technician': {
      minValue: 25,
      maxValue: 30,
      experienceLevel: 'midLevel',
      category: 'Voice Data',
      yearsExperience: '2-5',
      prompt: 'Craft a job description for a cable technician specializing in the installation, configuration, and maintenance of voice and data cabling, including fiber optic and copper cabling, in a commercial construction environment. terminating patch panels and running cable to the patch panel. terminating 110 and 66 blocks. '
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
    { city: 'Pinedale', state: 'WY', zipCode: '82941' },
  { city: 'Jackson', state: 'WY', zipCode: '83001' },          // Near Pinedale
  { city: 'Rock Springs', state: 'WY', zipCode: '82901' },     // Near Pinedale
  
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Durham', state: 'NC', zipCode: '27701' },           // Near Raleigh
  { city: 'Cary', state: 'NC', zipCode: '27511' },            // Near Raleigh
  
  { city: 'Athens', state: 'GA', zipCode: '30601' },
  { city: 'Watkinsville', state: 'GA', zipCode: '30677' },     // Near Athens
  { city: 'Commerce', state: 'GA', zipCode: '30529' },         // Near Athens
  
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Sandy Springs', state: 'GA', zipCode: '30328' },    // Near Atlanta
  { city: 'Smyrna', state: 'GA', zipCode: '30080' },          // Near Atlanta
  
  { city: 'Marietta', state: 'GA', zipCode: '30060' },
  { city: 'Kennesaw', state: 'GA', zipCode: '30144' },        // Near Marietta
  { city: 'Woodstock', state: 'GA', zipCode: '30188' },       // Near Marietta
  
  { city: 'Gainesville', state: 'GA', zipCode: '30501' },
  { city: 'Flowery Branch', state: 'GA', zipCode: '30542' },   // Near Gainesville
  { city: 'Oakwood', state: 'GA', zipCode: '30566' },
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Lakewood', state: 'CO', zipCode: '80226' },        // Near Denver
  { city: 'Aurora', state: 'CO', zipCode: '80012' },          // Near Denver
 
  { city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
  { city: 'Fountain', state: 'CO', zipCode: '80817' },        // Near CO Springs
  { city: 'Monument', state: 'CO', zipCode: '80132' },        // Near CO Springs
 
  { city: 'Fort Collins', state: 'CO', zipCode: '80524' },
  { city: 'Loveland', state: 'CO', zipCode: '80538' },        // Near Fort Collins
  { city: 'Greeley', state: 'CO', zipCode: '80631' },         // Near Fort Collins
 
  { city: 'Boulder', state: 'CO', zipCode: '80302' },
  { city: 'Louisville', state: 'CO', zipCode: '80027' },      // Near Boulder
  { city: 'Longmont', state: 'CO', zipCode: '80501' },        // Near Boulder
 
  // Virginia Groupings
  { city: 'Richmond', state: 'VA', zipCode: '23219' },
  { city: 'Glen Allen', state: 'VA', zipCode: '23060' },      // Near Richmond
  { city: 'Midlothian', state: 'VA', zipCode: '23113' },      // Near Richmond
 
  { city: 'Virginia Beach', state: 'VA', zipCode: '23452' },
  { city: 'Norfolk', state: 'VA', zipCode: '23510' },         // Near VA Beach
  { city: 'Chesapeake', state: 'VA', zipCode: '23320' },      // Near VA Beach
 
  { city: 'Arlington', state: 'VA', zipCode: '22201' },
  { city: 'Alexandria', state: 'VA', zipCode: '22314' },      // Near Arlington
  { city: 'Falls Church', state: 'VA', zipCode: '22046' },    // Near Arlington
 
  { city: 'Roanoke', state: 'VA', zipCode: '24011' },
  { city: 'Salem', state: 'VA', zipCode: '24153' },           // Near Roanoke
  { city: 'Vinton', state: 'VA', zipCode: '24179' }  

  ];
  
  const STREET_TYPES = ['Main St.', 'Industrial Pkwy.', 'Commerce Dr.', 'Tech Blvd.'];
  
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
    'Industrial': ['Manufacturing Plants', 'Distribution Centers', 'Processing Facilities'],
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

Brief paragraph on company introduction for ${company.name} 

## Position Overview at ${company.name}
Brief overview of the role and responsibilities in ${location.city}, ${location.state} and the neighboring cities.

## Essential Functions for ${jobTitle}
- [Key responsibilities]
- [Daily tasks]
- [Project involvement]

## Required Qualifications for ${jobTitle} at ${company.name}
- ${jobInfo.yearsExperience} years of experience
- Required certification: ${certifications[0]}
- Experience with: ${tools.slice(0, 2).join(', ')}
- Physical requirements

## Preferred Qualifications
- Additional certification: ${certifications[1]}
- Experience with: ${tools[2] || tools[0]}
- Specialized experience
- Tool proficiency

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