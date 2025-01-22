#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');

// Load environment variables
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

function generatePrompt(jobType, company, city, state, responsibilities, qualifications, experience, benefits) {
  const prompts = [
    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a COMPREHENSIVE job description (800+ words) for an experienced ${jobType}. Write this as if you are a Senior ${jobType} with 20 years of experience creating a job post for ${company} for a multi-year project in ${city}, ${state} with additional projects near ${city} (list neighboring cities to ${city}).

## About the ${jobType} Position
Start with a detailed paragraph about working as a ${jobType} at ${company}, our reputation in ${city}, and the types of projects our ${jobType}s handle. Mention surrounding cities we work in.

## ${jobType} Position Overview
Write a thorough overview of being a ${jobType} on our team, focusing on:
- Day-to-day responsibilities of a ${jobType}
- Types of projects and environments you'll work in
- Team structure and supervision
- Growth potential within ${company}

## Core ${jobType} Responsibilities
${responsibilities}
- Add 3-4 advanced technical duties specific to a ${jobType}
- Include regional project specifics
- Detail safety protocols

## Qualifications
${qualifications}
- ${experience} years minimum experience as a ${jobType}
- List essential certifications
- Detail required technical knowledge

## Tools & Equipment
- List specific tools used daily by our ${jobType}s
- Detail required personal tools
- Explain company-provided equipment

## Physical Requirements
- Detail lifting requirements for a ${jobType}
- Explain working conditions
- List safety gear needed

## Training & Development
- Describe ${jobType} mentorship program
- List available certifications
- Detail career advancement path

## Compensation Package
${benefits}
- Explain overtime policies
- Detail tool allowances
- List additional perks`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a PRACTICAL job description (400-500 words) that focuses on the daily work life of a ${jobType}. Write it like a foreman explaining the ${jobType} position to a potential hire at ${company} for a multi-year project in ${city}, ${state} with additional projects near ${city} (list neighboring cities to ${city})..

## What You'll Do as a ${jobType}
Quick overview of the ${jobType} role and our current projects in ${city}. Keep it real and straightforward about what a ${jobType} does day-to-day.

## Your Daily Tasks as a ${jobType}
${responsibilities}
- Add 2-3 common daily ${jobType} activities
- Focus on practical work examples

## What You Need to Be a ${jobType}
${qualifications}
- ${experience} years in the field as a ${jobType}
- List must-have skills
- Focus on hands-on abilities

## Compensation
${benefits}
- Highlight key benefits for ${jobType}s
- Mention training opportunities`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a QUICK job description (200 words). Write it like a busy project manager needs this ${jobType} position filled ASAP at ${company} in ${city}, ${state} for long term projects.

## ${jobType} Position Overview
One paragraph about what we need in a ${jobType} and what you'll do.

## Qualifications for ${jobType}
- ${experience} years experience as a ${jobType}
${qualifications}
- List top 3 requirements

## Responsibilities for ${jobType}
${responsibilities}
- Focus on main tasks only

## What We Offer Our ${jobType}s
${benefits}`
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}

const JOB_TYPES = {
  "Journeyman Electrician": {
    "minValue": 28,
    "maxValue": 34,
    "experienceLevel": "midLevel",
    "category": "Journeyman",
    "team": "Commercial",
    "yearsExperience": "5+",
    "responsibilities": "Install and maintain advanced electrical systems in high-rise office buildings and large-scale commercial projects. Perform precise routing, bending, and securing of conduit (EMT, rigid, and PVC) to support complex wiring layouts. Assemble and install switchgear, distribution panels, and motor control centers. Read and interpret blueprints and specifications to ensure proper placement of electrical components. Conduct on-site load calculations for lighting and power systems. Supervise apprentices during wiring and panel installations, ensuring adherence to project timelines and safety standards. Troubleshoot and resolve electrical issues in newly installed systems, including power distribution and lighting controls.",
    "qualifications": "Proficient in advanced conduit bending techniques, including offsets and saddles. Skilled in the use of hand and power tools for installing electrical systems. Strong ability to read and apply electrical blueprints and technical documentation. Experienced in installing and maintaining lighting controls, motor controls, and distribution equipment. Capable of leading teams and managing job site workflows to meet deadlines.",
    "prompt": "Create a job description for a Journeyman Electrician specializing in large commercial projects, focusing on advanced conduit work, distribution systems, and team supervision in California."
  },
  "Apprentice Electrician": {
    "minValue": 18,
    "maxValue": 24,
    "experienceLevel": "entryLevel",
    "category": "Apprentice",
    "team": "Commercial",
    "yearsExperience": "1-4",
    "responsibilities": "Assist in installing electrical systems for large-scale retail and warehouse facilities. Run and secure conduit (EMT and PVC) under the guidance of journeymen. Pull, terminate, and label wiring for lighting and power circuits. Help install and test control systems for HVAC, security, and automated doors. Prepare work areas by organizing tools, equipment, and materials for efficient operations. Follow blueprints and detailed instructions to assist with lighting installations and equipment wiring. Learn to troubleshoot basic issues in electrical circuits and control systems.",
    "qualifications": "Ability to handle and install conduit and wiring in a structured environment. Comfortable working at heights on ladders and lifts. Strong organizational skills to manage tools and job site materials. Eager to learn the basics of control systems and power distribution. Capable of following detailed instructions while adhering to safety standards.",
    "prompt": "Create a job description for an entry-level Apprentice Electrician working on retail and warehouse projects. Focus on assisting with conduit, wiring, and control system installations in California."
  },
  "Security Alarm Installer": {
    "minValue": 23,
    "maxValue": 28,
    "experienceLevel": "entryLevel",
    "category": "Security",
    "team": "Commercial",
    "yearsExperience": "1-3",
    "responsibilities": "Install and integrate security alarm systems for large commercial properties and multi-unit residential buildings. Mount and configure motion sensors, glass break detectors, and door/window contacts. Program security systems to integrate with building access control systems. Test alarm systems for functionality, ensuring all zones and devices operate correctly. Conduct system walk-throughs with clients, explaining operational features and settings. Repair or replace damaged components, including wiring and sensors. Maintain accurate records of installation work, including device locations and programming details.",
    "qualifications": "Hands-on experience with low-voltage wiring, including terminations and splicing. Strong technical skills in configuring alarm panels and access control systems. Proficient in using diagnostic tools to troubleshoot wiring and device issues. Able to follow technical diagrams and blueprints to place and connect devices. Strong customer communication skills for client walk-throughs and education.",
    "prompt": "Create a job description for a Security Alarm Installer specializing in large commercial and multi-unit residential installations. Emphasize system integration, testing, and troubleshooting in California."
  },
  "Fire Alarm Installer": {
    "minValue": 23,
    "maxValue": 28,
    "experienceLevel": "midLevel",
    "category": "Fire Alarm",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install fire alarm systems in high-density commercial and industrial buildings. Run conduit and pull fire-rated cables to support system installations. Mount and connect control panels, notification devices, smoke detectors, and heat sensors. Conduct functional testing of fire alarm systems to verify compliance with California building codes. Coordinate with HVAC and sprinkler contractors to integrate fire alarm systems into building safety networks. Repair or replace faulty components to maintain system reliability. Document installation details and system configurations for inspection and customer records.",
    "qualifications": "Expertise in installing and maintaining fire alarm control panels and field devices. Skilled in pulling fire-rated wiring and connecting notification devices. Familiar with testing and troubleshooting tools for fire alarm systems. Strong ability to interpret building plans and system schematics for integration. Able to manage multiple installation projects with tight deadlines.",
    "prompt": "Create a job description for a Fire Alarm Installer specializing in high-density commercial and industrial installations. Focus on system integration, code compliance, and troubleshooting in California."
  },
  "Apprentice Electrician ": {
    "minValue": 18,
    "maxValue": 24,
    "experienceLevel": "entryLevel",
    "category": "Apprentice",
    "team": "Renewable Energy",
    "yearsExperience": "1-4",
    "responsibilities": "Support the installation of rooftop solar arrays, battery systems, and EV chargers on commercial properties. Assist in running and securing conduit for DC wiring from solar modules to inverters. Perform basic wiring tasks, such as terminating PV modules and connecting battery storage systems. Learn to test and troubleshoot solar inverters and monitoring systems under supervision. Coordinate material preparation, including pre-assembling racking systems and ensuring tools are organized. Follow safety procedures for rooftop work and use of fall protection equipment.",
    "qualifications": "Understanding of basic electrical principles, including DC power systems. Willingness to work outdoors on rooftops in varying weather conditions. Ability to follow technical instructions for assembling and wiring renewable energy systems. Strong organizational skills for material handling and job site preparation. Comfortable working with hand tools and basic testing equipment.",
    "prompt": "Create a job description for an entry-level Apprentice Electrician focusing on renewable energy installations, including solar and EV chargers. Emphasize system assembly, wiring, and safety procedures in California."
  },
  "Cable Puller": {
    "minValue": 17,
    "maxValue": 25,
    "experienceLevel": "entryLevel",
    "category": "Voice Data",
    "team": "Commercial",
    "yearsExperience": "2+",
    "responsibilities": "Assist in installing low voltage cabling for data centers and office networks, including Ethernet and fiber optic cables. Terminate cables with jacks and patch panels to ensure a reliable connection. Install cable pathways, including trays and raceways, for structured cabling systems. Perform testing and certification of installed cables using network testing equipment. Work with project managers to document cable runs and labeling for system maps. Troubleshoot network connectivity issues during installation and final commissioning.",
    "qualifications": "Proficiency in handling and terminating Cat5e, Cat6, and fiber optic cables. Skilled in using hand tools and cable testing devices. Knowledge of cable management techniques for professional installations. Strong problem-solving skills for addressing connectivity issues. Physical ability to work in confined spaces and elevated environments.",
    "prompt": "Create a job description for an entry-level Low Voltage Cable Technician focusing on data center and office network installations. Emphasize structured cabling, troubleshooting, and system documentation in California."
  },
  "Electrician Helper": {
  "minValue": 16,
  "maxValue": 20,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "0-2",
  "responsibilities": "Assist electricians in installing and maintaining electrical systems in residential and light commercial construction projects. Carry materials, tools, and equipment to work areas and ensure job sites remain organized and clean. Help pull wires and cables through conduits and walls under supervision. Support the installation of lighting fixtures, outlets, and switchgear. Perform basic tasks such as drilling holes, mounting boxes, and labeling wires. Follow instructions to prepare tools and materials needed for each task. Learn to identify electrical components and read basic diagrams to assist in system assembly.",
  "qualifications": "Willingness to learn electrical trade practices and safety protocols. Basic understanding of tools used in electrical work, including drills, saws, and voltage testers. Physical ability to lift and carry heavy materials, work on ladders, and perform repetitive tasks. Attention to detail and ability to follow instructions precisely. Strong work ethic and reliability in a fast-paced construction environment.",
  "prompt": "Create a job description for an entry-level Electrician Helper working on residential and light commercial construction projects. Focus on assisting electricians with material handling, basic tasks, and learning foundational skills on the job in California."
},
"Low Voltage Project Manager": {
  "minValue": 48,
  "maxValue": 60,
  "experienceLevel": "midLevel",
  "category": "Voice Data",
  "team": "Project Management",
  "yearsExperience": "5-7",
  "responsibilities": "Oversee the planning, execution, and completion of low voltage system installations, including voice/data cabling, fire alarms, security systems, card access controls, and CCTV, for large commercial new construction projects. Coordinate with general contractors, subcontractors, and clients to ensure project timelines and specifications are met. Develop and manage project budgets, schedules, and material procurement plans. Review and interpret blueprints and technical drawings to provide guidance to installation teams. Conduct on-site inspections to monitor work progress, verify quality standards, and resolve any issues that arise. Ensure compliance with local building codes, safety regulations, and industry standards. Prepare progress reports, maintain project documentation, and communicate updates to stakeholders. Train and mentor field technicians to improve team performance and project efficiency.",
  "qualifications": "Extensive knowledge of low voltage systems, including structured cabling, fire alarm panels, access control systems, and CCTV. Strong understanding of project management principles, including budgeting, scheduling, and resource allocation. Ability to read and interpret complex blueprints and technical specifications. Excellent communication and leadership skills to effectively coordinate with multiple teams and stakeholders. Proficiency with project management software and tools. Strong problem-solving skills to address on-site challenges and ensure project success. Physical ability to visit job sites and inspect installations as required.",
  "prompt": "Create a job description for a Low Voltage Project Manager overseeing voice/data, fire alarm, and security system installations in commercial new construction. Emphasize project coordination, budgeting, and leadership in California."
},
"Building Automation Technician": {
  "minValue": 44,
  "maxValue": 58,
  "experienceLevel": "midLevel",
  "category": "HVAC",
  "team": "Commercial",
  "yearsExperience": "2-7",
  "responsibilities": "Program, commission, and troubleshoot building automation systems, including network configuration and equipment integration. Configure DDC controls for HVAC and related mechanical systems. Collaborate with project managers to ensure projects are completed on time and within budget. Conduct on-site troubleshooting for control systems and mechanical integration. Document installation processes and maintain accurate project records. Communicate effectively with supervisors, team members, and clients. Adhere to safety protocols and ensure compliance with all relevant codes and regulations.",
  "qualifications": "Experience with Niagara, Tridium, Distech, Alerton, or JCI Metasys systems. Proficiency in troubleshooting electrical and networking systems. Familiarity with HVAC operations and DDC systems. Ability to read and interpret electrical diagrams. Strong verbal and written communication skills. Physical ability to lift up to 50 lbs. and work on construction sites.",
  "prompt": "Create a job description for a Building Automation Systems Technician with expertise in programming and maintaining DDC and building automation systems. Highlight project collaboration, troubleshooting, and adherence to safety standards."
},
"Electrical Project Manager": {
  "minValue": 48,
  "maxValue": 60,
  "experienceLevel": "midLevel",
  "category": "Industrial",
  "team": "Project Management",
  "yearsExperience": "5+",
  "responsibilities": "Oversee all aspects of industrial electrical projects, including timelines, budgets, and resource allocation. Analyze project outlines to develop clear schedules and staffing plans. Manage financial aspects such as payroll, equipment costs, and material expenses. Coordinate purchasing efforts and negotiate sub-contracts. Collaborate with construction superintendents on daily operational tasks. Maintain accurate records, including RFIs, project submissions, and updates. Ensure projects remain on schedule and within budget by proactively addressing risks and challenges.",
  "qualifications": "5+ years of electrical project management experience in industrial settings, such as water recycling or power plants. Proficiency with Microsoft Office Suite and Bluebeam software. Strong leadership, communication, and interpersonal skills. Familiarity with construction engineering codes and practices. Ability to create detailed project timelines and ensure team efficiency. Knowledge of industry standards and innovative management strategies.",
  "prompt": "Create a job description for an Electrical Project Manager specializing in industrial projects like water recycling and power plants. Emphasize project leadership, financial management, and collaboration with diverse teams."
}

};


const COMPANIES = {
  'Prime Partners': {
    name: 'Prime Partners',
    sameAs: 'https://www.primepartners.com/',
    logo: 'https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1.png'
  }
};

const LOCATIONS = [
  { city: 'San Francisco', state: 'CA', zipCode: '94103' },
{ city: 'San Jose', state: 'CA', zipCode: '95112' },
{ city: 'Oakland', state: 'CA', zipCode: '94612' },
{ city: 'Los Angeles', state: 'CA', zipCode: '90001' },
{ city: 'Seattle', state: 'WA', zipCode: '98101' },
{ city: 'Bellevue', state: 'WA', zipCode: '98004' },
{ city: 'Redmond', state: 'WA', zipCode: '98052' },
{ city: 'Portland', state: 'OR', zipCode: '97201' },
{ city: 'Bend', state: 'OR', zipCode: '97701' },
{ city: 'Eugene', state: 'OR', zipCode: '97401' },
{ city: 'New York', state: 'NY', zipCode: '10001' },
{ city: 'White Plains', state: 'NY', zipCode: '10601' },
{ city: 'Buffalo', state: 'NY', zipCode: '14201' },
{ city: 'Boston', state: 'MA', zipCode: '02108' },
{ city: 'Cambridge', state: 'MA', zipCode: '02138' },
{ city: 'Newton', state: 'MA', zipCode: '02458' },
{ city: 'Denver', state: 'CO', zipCode: '80202' },
{ city: 'Boulder', state: 'CO', zipCode: '80301' },
{ city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
{ city: 'Fort Collins', state: 'CO', zipCode: '80521' },
{ city: 'Aurora', state: 'CO', zipCode: '80012' },
{ city: 'Pueblo', state: 'CO', zipCode: '81003' },
{ city: 'Austin', state: 'TX', zipCode: '73301' },
{ city: 'Dallas', state: 'TX', zipCode: '75201' },
{ city: 'Houston', state: 'TX', zipCode: '77002' },
{ city: 'San Antonio', state: 'TX', zipCode: '78205' },
{ city: 'Minneapolis', state: 'MN', zipCode: '55401' },
{ city: 'Saint Paul', state: 'MN', zipCode: '55101' },
{ city: 'Rochester', state: 'MN', zipCode: '55901' },
{ city: 'Chicago', state: 'IL', zipCode: '60601' },
{ city: 'Naperville', state: 'IL', zipCode: '60540' },
{ city: 'Evanston', state: 'IL', zipCode: '60201' },
{ city: 'Ann Arbor', state: 'MI', zipCode: '48104' },
{ city: 'Grand Rapids', state: 'MI', zipCode: '49503' },
{ city: 'Detroit', state: 'MI', zipCode: '48201' },
{ city: 'Madison', state: 'WI', zipCode: '53703' },
{ city: 'Milwaukee', state: 'WI', zipCode: '53202' },
{ city: 'Green Bay', state: 'WI', zipCode: '54301' },
{ city: 'Philadelphia', state: 'PA', zipCode: '19103' },
{ city: 'Pittsburgh', state: 'PA', zipCode: '15222' },
{ city: 'Allentown', state: 'PA', zipCode: '18101' },
{ city: 'Arlington', state: 'VA', zipCode: '22201' },
{ city: 'Richmond', state: 'VA', zipCode: '23219' },
{ city: 'Alexandria', state: 'VA', zipCode: '22314' },
{ city: 'Charlotte', state: 'NC', zipCode: '28202' },
{ city: 'Raleigh', state: 'NC', zipCode: '27601' },
{ city: 'Durham', state: 'NC', zipCode: '27701' },
{ city: 'Atlanta', state: 'GA', zipCode: '30303' },
{ city: 'Savannah', state: 'GA', zipCode: '31401' },
{ city: 'Augusta', state: 'GA', zipCode: '30901' },
{ city: 'Nashville', state: 'TN', zipCode: '37203' },
{ city: 'Memphis', state: 'TN', zipCode: '38103' },
{ city: 'Knoxville', state: 'TN', zipCode: '37902' },
{ city: 'Salt Lake City', state: 'UT', zipCode: '84101' },
{ city: 'Provo', state: 'UT', zipCode: '84601' },
{ city: 'Ogden', state: 'UT', zipCode: '84401' },
{ city: 'Albuquerque', state: 'NM', zipCode: '87101' },
{ city: 'Santa Fe', state: 'NM', zipCode: '87501' },
{ city: 'Las Cruces', state: 'NM', zipCode: '88001' },
{ city: 'Portland', state: 'ME', zipCode: '04101' },
{ city: 'Bangor', state: 'ME', zipCode: '04401' },
{ city: 'Lewiston', state: 'ME', zipCode: '04240' },
{ city: 'Manchester', state: 'NH', zipCode: '03101' },
{ city: 'Nashua', state: 'NH', zipCode: '03060' },
{ city: 'Concord', state: 'NH', zipCode: '03301' },
{ city: 'Providence', state: 'RI', zipCode: '02903' },
{ city: 'Warwick', state: 'RI', zipCode: '02886' },
{ city: 'Cranston', state: 'RI', zipCode: '02910' },
{ city: 'Baltimore', state: 'MD', zipCode: '21202' },
{ city: 'Annapolis', state: 'MD', zipCode: '21401' },
{ city: 'Frederick', state: 'MD', zipCode: '21701' },
{ city: 'Cheyenne', state: 'WY', zipCode: '82001' },
{ city: 'Casper', state: 'WY', zipCode: '82601' },
{ city: 'Laramie', state: 'WY', zipCode: '82070' },
{ city: 'Fargo', state: 'ND', zipCode: '58102' },
{ city: 'Bismarck', state: 'ND', zipCode: '58501' },
{ city: 'Grand Forks', state: 'ND', zipCode: '58201' },
{ city: 'Billings', state: 'MT', zipCode: '59101' },
{ city: 'Missoula', state: 'MT', zipCode: '59801' },
{ city: 'Bozeman', state: 'MT', zipCode: '59715' },
{ city: 'Sioux Falls', state: 'SD', zipCode: '57101' },
{ city: 'Rapid City', state: 'SD', zipCode: '57701' },
{ city: 'Watertown', state: 'SD', zipCode: '57201' },
  ];
  

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (5000 - 1000) + 1000);
  return `${number} Technology Drive`;
}

function generateRecentDate() {
  const now = new Date();
  const threeHoursAgo = new Date(now - (3 * 60 * 60 * 1000));
  const randomTime = threeHoursAgo.getTime() + Math.random() * (now.getTime() - threeHoursAgo.getTime());
  return new Date(randomTime).toISOString();
}

function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const validThrough = new Date(postedDate.getTime() + (30 * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
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

function generateJobId(company, type, variant) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s?/g, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/`{1,3}/g, '') // Remove code blocks
    .replace(/\[|\]/g, '') // Remove link brackets
    .replace(/\(.*?\)/g, '') // Remove link URLs
    .replace(/^\s*[-*+]\s/gm, '') // Remove list markers
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  const benefits = `- Competitive salary range: $${minValue}-$${maxValue} per hour depending on experience
- Career advancement opportunities
- Ongoing training and certifications`;

  // Generate the prompt using our new function
  const selectedPrompt = generatePrompt(
    jobType,
    company.name,
    location.city,
    location.state,
    jobInfo.responsibilities,
    jobInfo.qualifications,
    jobInfo.yearsExperience,
    benefits
  );

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: selectedPrompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  const jobData = {
    position: jobType,
    description: `${fullDescription.substring(0, 500)}...`,
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
      'support@primepartners.info'
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
  let jobTypeIndex = 0;
  let companyIndex = 0;
  let totalJobs = 0;
  
  for (const location of LOCATIONS) {
    try {
      // Cycle through companies and job types
      const company = companies[companyIndex];
      const jobType = jobTypes[jobTypeIndex];
      
      console.log(`\nCreating job #${totalJobs + 1}/${LOCATIONS.length}`);
      console.log(`Location: ${location.city}, ${location.state}`);
      console.log(`Company: ${company.name}`);
      console.log(`Position: ${jobType}`);
      
      await createJob(location, jobType, company);
      
      // Update indexes for next iteration
      jobTypeIndex = (jobTypeIndex + 1) % jobTypes.length;
      if (jobTypeIndex === 0) {
        companyIndex = (companyIndex + 1) % companies.length;
      }
      
      totalJobs++;
      
      // Add delay between API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error creating job in ${location.city}:`, error);
    }
  }
  
  console.log('\nJob creation complete!');
  console.log(`Created ${totalJobs} jobs across ${LOCATIONS.length} locations`);
}

createAllJobs().catch(console.error); 