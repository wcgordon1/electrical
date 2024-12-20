const COMPANIES = {
  'Mirapath': {
    name: 'Mirapath',
    sameAs: 'https://www.mirapath.com/',
    logo: 'https://mirapath.com/wp-content/uploads/2016/12/s5_logo-cropped.png'
  },
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
    'Fire Alarm Tech': {
      minValue: 25,
      maxValue: 31,
      experienceLevel: 'midLevel',
      category: 'Fire Alarm',
      yearsExperience: '2-4',
      prompt: 'Write a job description for a Fire Alarm Technician responsible for installing and servicing fire alarm systems, including programming and testing of control panels, smoke detectors, and notification devices.'
    },
    'Security Systems Tech': {
      minValue: 28,
      maxValue: 33,
      experienceLevel: 'midLevel',
      category: 'Security',
      yearsExperience: '2-5',
      prompt: 'Craft a job description for a Security Systems Technician specializing in the installation, configuration, and maintenance of security systems, including access control, CCTV, and intrusion detection systems in a commercial construction environment, mainly hospitals and office buildings.'
    },
    'Data Center Cable Tech': {
      minValue: 27,
      maxValue: 33,
      experienceLevel: 'midLevel',
      category: 'Data Center',
      yearsExperience: '3-6',
      prompt: 'Create a job description for a Data Center Cable Technician responsible for planning, installing, and managing high-density cable infrastructures, including rack and stack work and dressing and terminating cabling, in data center environments.'
    },
    'AV Systems Tech': {
      minValue: 28,
      maxValue: 34,
      experienceLevel: 'midLevel',
      category: 'Audio Visual',
      yearsExperience: '3-5',
      prompt: 'Develop a job description for an AV Systems Technician specializing in the design, installation, and integration of audio/visual systems, including sound reinforcement, video conferencing, and control systems.'
    }
  };
  
  const TEAMS = [
    'Commercial'
  ];
  
  const CERTIFICATIONS = {
    'Fire Alarm': [
      'NICET Level II Fire Alarm Systems',
      'Edwards EST Certification',
      'Notifier Certification',
      'Simplex 4100 Certification',
      'OSHA 10'
    ],
    'Security': [
      'BICSI Technician',
      'Axis Certification',
      'Genetec Certification',
      'Lenel Certification',
      'AMAG Certification'
    ],
    'Data Center': [
      'BICSI Data Center Design',
      'CDCDP/CDCP',
      'Fiber Optic Certification',
      'Corning Certification',
      'Panduit Certification'
    ],
    'Network': [
      'BICSI Installer 2',
      'CommScope Certification',
      'Siemon Certified Installer',
      'Belden Certification',
      'Systimax Certification'
    ],
    'Audio Visual': [
      'CTS Installation',
      'Crestron Certification',
      'Extron Certification',
      'Biamp Certification',
      'QSC Certification'
    ]
  };
  
  const TOOLS_AND_TECH = {
    'Fire Alarm': [
      'Edwards EST Systems',
      'Notifier Systems',
      'Simplex Systems',
      'Fire-Lite Systems',
      'Silent Knight Systems'
    ],
    'Security': [
      'Genetec Security Center',
      'Lenel OnGuard',
      'AMAG Symmetry',
      'Milestone XProtect',
      'Axis Camera Station'
    ],
    'Data Center': [
      'Panduit Cable Management',
      'Corning Fiber Systems',
      'CommScope Infrastructure',
      'Chatsworth Products',
      'Fluke Testing Equipment'
    ],
    'Network': [
      'CommScope/Systimax',
      'Panduit Systems',
      'Belden/CDT',
      'Siemon Systems',
      'Leviton Systems'
    ],
    'Audio Visual': [
      'Crestron Control Systems',
      'Extron Electronics',
      'Biamp Audio Systems',
      'QSC Q-SYS',
      'AMX Control Systems'
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
    { city: 'Culver City', state: 'CA', zipCode: '90232' },      // LA tech hub
    { city: 'Torrance', state: 'CA', zipCode: '90501' },         // LA South Bay
    { city: 'Rancho Santa Margarita', state: 'CA', zipCode: '92688' }, // OC
    { city: 'Aliso Viejo', state: 'CA', zipCode: '92656' },      // South OC
    { city: 'Foothill Ranch', state: 'CA', zipCode: '92610' },    // OC commercial
    { city: 'Lake Forest', state: 'CA', zipCode: '92630' },       // OC business
    { city: 'Ladera Ranch', state: 'CA', zipCode: '92694' },      // South OC
    { city: 'Mission Viejo', state: 'CA', zipCode: '92691' },     // OC planned
    { city: 'Laguna Hills', state: 'CA', zipCode: '92653' },      // OC business
    { city: 'Costa Mesa', state: 'CA', zipCode: '92626' },        // OC commercial
    { city: 'Tustin', state: 'CA', zipCode: '92780' },            // OC tech
    { city: 'Fountain Valley', state: 'CA', zipCode: '92708' },    // OC business
    { city: 'Placentia', state: 'CA', zipCode: '92870' },         // North OC
    { city: 'Yorba Linda', state: 'CA', zipCode: '92886' },       // OC planned
    { city: 'Cypress', state: 'CA', zipCode: '90630' },           // OC business
    { city: 'Los Alamitos', state: 'CA', zipCode: '90720' },      // OC commercial
    { city: 'La Palma', state: 'CA', zipCode: '90623' },          // OC business
    { city: 'Foster City', state: 'CA', zipCode: '94404' },       // SF Peninsula
    { city: 'San Carlos', state: 'CA', zipCode: '94070' },        // SF tech
    { city: 'Menlo Park', state: 'CA', zipCode: '94025' },        // Silicon Valley
    { city: 'Mountain View', state: 'CA', zipCode: '94043' },     // Silicon Valley
    { city: 'Cupertino', state: 'CA', zipCode: '95014' },         // Silicon Valley
    { city: 'Campbell', state: 'CA', zipCode: '95008' },          // San Jose area
    { city: 'Sunnyvale', state: 'CA', zipCode: '94089' },         // Silicon Valley
    { city: 'Santa Clara', state: 'CA', zipCode: '95054' },       // Silicon Valley
    { city: 'Milpitas', state: 'CA', zipCode: '95035' },          // San Jose area
    { city: 'Union City', state: 'CA', zipCode: '94587' },        // East Bay
    { city: 'San Ramon', state: 'CA', zipCode: '94583' },         // East Bay
    { city: 'Pleasant Hill', state: 'CA', zipCode: '94523' },     // East Bay
    { city: 'Walnut Creek', state: 'CA', zipCode: '94598' },      // East Bay
    { city: 'Emeryville', state: 'CA', zipCode: '94608' },        // East Bay tech
    { city: 'San Rafael', state: 'CA', zipCode: '94901' },        // North Bay
    { city: 'Larkspur', state: 'CA', zipCode: '94939' },          // North Bay
    { city: 'Corte Madera', state: 'CA', zipCode: '94925' },      // North Bay
    { city: 'Mill Valley', state: 'CA', zipCode: '94941' },       // North Bay
    { city: 'Sausalito', state: 'CA', zipCode: '94965' },         // North Bay
    { city: 'Tiburon', state: 'CA', zipCode: '94920' },
    { city: 'Los Angeles', state: 'CA', zipCode: '90012' },    // ~3.9 million
    { city: 'Houston', state: 'TX', zipCode: '77002' },        // ~2.3 million
    { city: 'Phoenix', state: 'AZ', zipCode: '85004' },        // ~1.6 million
    { city: 'San Antonio', state: 'TX', zipCode: '78205' },    // ~1.5 million
    { city: 'San Diego', state: 'CA', zipCode: '92101' },      // ~1.4 million
    { city: 'Dallas', state: 'TX', zipCode: '75201' },         // ~1.3 million
    { city: 'San Jose', state: 'CA', zipCode: '95113' },       // ~1 million
    { city: 'Austin', state: 'TX', zipCode: '78701' },         // ~960,000
    { city: 'Fort Worth', state: 'TX', zipCode: '76102' },     // ~920,000
    { city: 'Denver', state: 'CO', zipCode: '80202' },         // ~730,000
    { city: 'El Paso', state: 'TX', zipCode: '79901' },        // ~680,000
    { city: 'Seattle', state: 'WA', zipCode: '98104' },        // ~730,000
    { city: 'Portland', state: 'OR', zipCode: '97204' },       // ~650,000
    { city: 'Las Vegas', state: 'NV', zipCode: '89101' },      // ~640,000
    { city: 'Oklahoma City', state: 'OK', zipCode: '73102' },
    { city: 'Indianapolis', state: 'IN', zipCode: '46204' },  // State capital, logistics
    { city: 'Columbus', state: 'OH', zipCode: '43215' },      // State capital, tech growth
    { city: 'Detroit', state: 'MI', zipCode: '48226' },       // Auto industry hub
    { city: 'Milwaukee', state: 'WI', zipCode: '53202' },     // Manufacturing center
    { city: 'Kansas City', state: 'MO', zipCode: '64106' },   // Transportation hub
    { city: 'Omaha', state: 'NE', zipCode: '68102' },         // Insurance/finance center
    { city: 'Minneapolis', state: 'MN', zipCode: '55401' },   // Corporate headquarters
    { city: 'St. Louis', state: 'MO', zipCode: '63101' },     // Major river port
    { city: 'Cincinnati', state: 'OH', zipCode: '45202' },    // Manufacturing/retail
    { city: 'Cleveland', state: 'OH', zipCode: '44113' }     
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