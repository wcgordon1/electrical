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

## About Our ${jobType} Team
Start with a detailed paragraph about working as a ${jobType} at ${company}, our reputation in ${city}, and the types of projects our ${jobType}s handle. Mention surrounding cities we work in.

## The ${jobType} Position
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

## Required Experience & Skills
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
  "minValue": 32,
  "maxValue": 39,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "5+",
  "responsibilities": "Install and maintain complex electrical systems in new hospital construction projects, including patient rooms, operating theaters, and critical care units. Route, bend, and install conduit (EMT, rigid) to support high-density wiring requirements for medical-grade equipment. Ensure proper grounding and bonding of all systems in compliance with NEC and hospital-specific codes. Collaborate with engineers and medical equipment specialists to ensure power systems meet design specifications and safety standards. Perform load calculations and install service equipment, emergency power systems, and backup generators. Supervise apprentices, ensuring adherence to safety protocols and quality workmanship. Troubleshoot and test critical electrical systems, including fire alarm circuits, nurse call systems, and life safety equipment.",
  "qualifications": "Must have a valid California Journeyman Certification from the Department of Industrial Relations. Extensive knowledge of NEC and healthcare-specific electrical standards. Experience with emergency power systems, backup generators, and life safety circuits. Ability to read and interpret complex blueprints, electrical schematics, and technical manuals. Proficiency with diagnostic tools such as multimeters and megohmmeters. Strong communication skills and ability to collaborate with diverse teams in high-pressure environments.",
  "prompt": "Create a job description for a Certified Journeyman Electrician specializing in new hospital construction. Emphasize the installation and maintenance of critical healthcare systems, compliance with medical-grade standards, and leadership in mentoring apprentices. Must have a valid California Journeyman Certification from the Department of Industrial Relations."
},
"Apprentice Electrician": {
  "minValue": 18,
  "maxValue": 25,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "0-4",
  "responsibilities": "Assist journeymen in the installation and maintenance of electrical systems in commercial buildings, including lighting, power distribution, and control systems. Pull and terminate wires, ensuring proper connections for panels, switches, and outlets. Learn to bend and install conduit (EMT and PVC) to support wiring systems. Perform basic troubleshooting under supervision, using tools like multimeters and voltage testers. Organize and maintain tools, equipment, and materials on-site to ensure smooth workflow. Attend team meetings and safety briefings to learn industry best practices and code compliance.",
  "qualifications": "Basic understanding of electrical systems, tools, and safety protocols. Ability to read and interpret simple electrical diagrams and blueprints. Strong desire to learn and grow within the electrical trade. Ability to follow instructions, work as part of a team, and communicate effectively on-site. Physical capability to lift heavy equipment, work on ladders, and perform tasks in confined spaces. High school diploma or equivalent is preferred.",
  "prompt": "Create a job description for an entry-level Apprentice Electrician working on commercial projects. Focus on assisting with installations, learning basic troubleshooting, and supporting journeymen on-site in California."
},
"Security Alarm Installer": {
  "minValue": 26,
  "maxValue": 32,
  "experienceLevel": "entryLevel",
  "category": "Security",
  "team": "Commercial",
  "yearsExperience": "1-3",
  "responsibilities": "Install and configure security alarm systems, including sensors, control panels, and communication modules, in residential and small business properties. Test system functionality to ensure proper operation and address any installation issues. Program alarm systems to customer specifications, including remote access features and monitoring services. Educate customers on how to use and manage their security systems effectively. Maintain detailed records of installations, tests, and service calls for documentation purposes.",
  "qualifications": "Experience with low-voltage wiring and basic electronics. Ability to work independently and problem-solve during installations and service calls. Strong customer service skills to ensure satisfaction and system understanding. Familiarity with common hand tools and diagnostic equipment. Comfortable working in both indoor and outdoor environments. Valid driver’s license and ability to travel between job sites.",
  "prompt": "Create a job description for a Security Alarm Installer focusing on residential and small business installations. Emphasize configuration, testing, and customer education, with work primarily in California."
},
"Fire Alarm Installer": {
  "minValue": 28,
  "maxValue": 33,
  "experienceLevel": "midLevel",
  "category": "Fire Alarm",
  "team": "Commercial",
  "yearsExperience": "3-5",
  "responsibilities": "Install, test, and maintain fire alarm systems, including control panels, pull stations, and notification devices, in commercial and industrial facilities. Conduct thorough inspections to ensure all components meet California fire code and NFPA standards. Troubleshoot and repair faulty wiring or devices to ensure system reliability. Coordinate with contractors and building managers to plan and execute installations in new and existing structures. Program fire alarm systems to integrate with other safety equipment, such as sprinklers and emergency lighting. Keep detailed service logs and provide documentation for system approvals and inspections.",
  "qualifications": "Experience installing and maintaining fire alarm systems in commercial settings. Strong understanding of NFPA codes and California fire safety regulations. Proficiency with tools and software used for fire alarm programming and diagnostics. Ability to work at heights and in confined spaces, as required by job sites. Strong organizational skills to manage multiple projects and deadlines. Effective communication skills to collaborate with team members and clients.",
  "prompt": "Create a job description for a Fire Alarm Installer specializing in commercial and industrial facilities. Focus on system installation, code compliance, and troubleshooting in California."
},
"Apprentice Electrician": {
  "minValue": 20,
  "maxValue": 25,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "1-4",
  "responsibilities": "Support the installation of solar panels, battery storage systems, and EV charging stations on residential and commercial properties. Assist in running conduit, pulling wire, and connecting inverters to electrical panels. Learn to interpret system blueprints and layouts for renewable energy projects. Perform routine inspections and maintenance on installed systems to ensure optimal performance. Monitor and troubleshoot system components under the supervision of senior technicians. Ensure all work complies with local building codes and renewable energy guidelines. Maintain a clean and organized work environment, including managing tools and materials on-site.",
  "qualifications": "Familiarity with basic electrical concepts and renewable energy systems. Eagerness to learn solar, battery, and EV charging technology. Ability to work outdoors in various weather conditions and at heights, such as on rooftops. Strong problem-solving skills and attention to detail. Willingness to travel between job sites and work extended hours when necessary. High school diploma or equivalent preferred; technical coursework in renewable energy is a plus.",
  "prompt": "Create a job description for an entry-level Apprentice Electrician focusing on renewable energy installations, including solar panels and EV chargers. Emphasize learning system layouts, troubleshooting, and hands-on fieldwork in California."
},
};

const COMPANIES = {
  'Rex Moore Electric': {
    name: 'Rex Moore Electric',
    sameAs: 'https://www.rexmoore.com/',
    logo: 'https://www.rexmoore.com/wp-content/uploads/2022/03/100-years.png'
  },
  'Helix Electric': {
    name: 'Helix Electric',
    sameAs: 'https://www.helixelectric.com/',
    logo: 'https://www.helixelectric.com/wp-content/uploads/2022/07/Helping-Hands-Logo_Blue-e1656694113799.jpg'
  },
  'IES Electric': {
    name: 'IES Electric',
    sameAs: 'https://iesci.net/',
    logo: 'https://iesci.net/wp-content/uploads/2024/08/IES-Electrical-Logo-color.png'
  },
  'FSG': {
    name: 'FSG',
    sameAs: 'https://www.fsg.com/',
    logo: 'https://fsg.com/wp-content/uploads/2020/10/fsgLogoUpdated@2x-1-2.png'
  },
  'Royal Electric': {
    name: 'Royal Electric',
    sameAs: 'https://www.royalelect.com/',
    logo: 'https://www.royalelect.com/wp-content/uploads/2021/04/royal-electric-logo-full-color-rgb.svg'
  },
  'Primoris': {
    name: 'Primoris',
    sameAs: 'https://www.prim.com/',
    logo: 'https://www.prim.com/~/media/Images/P/Primoris-V4/logo/primoris-black.png?h=62&iar=0&w=138'
  },
  'Berg Electric': {
    name: 'Berg Electric',
    sameAs: 'https://www.berg-electric.com/',
    logo: 'https://pbs.twimg.com/profile_images/1433515221495123981/lN1y0hEr_400x400.png'
  },
  'Alessandro Electric': {
    name: 'Alessandro Electric',
    sameAs: 'https://www.alessandroelectric.com/',
    logo: 'https://static.wixstatic.com/media/d6a234_4090f87bd5714dd4989b7e178087d534~mv2.png/v1/crop/x_5,y_0,w_953,h_187/fill/w_810,h_158,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/AEI_Font_gif-color_edited.png'
  },
  'Cal State Electric': {
    name: 'Cal State Electric',
    sameAs: 'https://www.calstateelectrical.com/',
    logo: 'https://www.goweca.com/WECAContent/companylogos/Company101070Image.png'
  },
  'Foshay Electric': {
    name: 'Foshay Electric',
    sameAs: 'https://foshayelectric.com/',
    logo: 'https://www.goweca.com/WECAContent/companylogos/Company96Image.png'
  },
  'Fredericks Electric': {
    name: 'Fredericks Electric',
    sameAs: 'https://www.fredrickselectric.com/',
    logo: 'https://www.goweca.com/WECAContent/companylogos/Company101078Image.png'
  },
  'ProTech Security': {
    name: 'ProTech Security',
    sameAs: 'https://protechsecurity.us/',
    logo: 'https://www.goweca.com/WECAContent/companylogos/Company100660Image.png'
  },
  'Tri Signal': {
    name: 'Tri Signal',
    sameAs: 'https://www.tri-signal.com/',
    logo: 'https://www.goweca.com/WECAContent/companylogos/Company289Image.jpg'
  },
  'Summit Electric': {
    name: 'Summit Electric',
    sameAs: 'https://summit-e.com/',
    logo: 'https://www.goweca.com/WECAContent/companylogos/Company130Image.png'
  }
};

const LOCATIONS = [

{ city: 'Sacramento', state: 'CA', zipCode: '95814' },
{ city: 'Elk Grove', state: 'CA', zipCode: '95757' },
{ city: 'Roseville', state: 'CA', zipCode: '95678' },
{ city: 'Riverside', state: 'CA', zipCode: '92501' },
{ city: 'San Bernardino', state: 'CA', zipCode: '92401' },
{ city: 'Ontario', state: 'CA', zipCode: '91761' },
{ city: 'Rancho Cucamonga', state: 'CA', zipCode: '91730' },
{ city: 'Palm Springs', state: 'CA', zipCode: '92262' },
{ city: 'Santa Rosa', state: 'CA', zipCode: '95401' },
{ city: 'Redding', state: 'CA', zipCode: '96001' },
{ city: 'Modesto', state: 'CA', zipCode: '95354' },
{ city: 'Stockton', state: 'CA', zipCode: '95202' },
{ city: 'Chico', state: 'CA', zipCode: '95928' },
{ city: 'Visalia', state: 'CA', zipCode: '93277' },
{ city: 'San Luis Obispo', state: 'CA', zipCode: '93401' },
{ city: 'Alameda', state: 'CA', zipCode: '94501' },
{ city: 'Albany', state: 'CA', zipCode: '94706' },
{ city: 'Antioch', state: 'CA', zipCode: '94509' },
{ city: 'Arcadia', state: 'CA', zipCode: '91006' },
{ city: 'Baldwin Park', state: 'CA', zipCode: '91706' },
{ city: 'Barstow', state: 'CA', zipCode: '92311' },
{ city: 'Beaumont', state: 'CA', zipCode: '92223' },
{ city: 'Bell', state: 'CA', zipCode: '90201' },
{ city: 'Bellflower', state: 'CA', zipCode: '90706' },
{ city: 'Blythe', state: 'CA', zipCode: '92225' },
{ city: 'Camarillo', state: 'CA', zipCode: '93010' },
{ city: 'Campbell', state: 'CA', zipCode: '95008' },
{ city: 'Cerritos', state: 'CA', zipCode: '90703' },
{ city: 'Ceres', state: 'CA', zipCode: '95307' },
{ city: 'Chino', state: 'CA', zipCode: '91710' },
{ city: 'Chino Hills', state: 'CA', zipCode: '91709' },
{ city: 'Compton', state: 'CA', zipCode: '90220' },
{ city: 'Concord', state: 'CA', zipCode: '94520' },
{ city: 'Corona', state: 'CA', zipCode: '92879' },
{ city: 'Cupertino', state: 'CA', zipCode: '95014' },
{ city: 'Davis', state: 'CA', zipCode: '95616' },
{ city: 'Downey', state: 'CA', zipCode: '90242' },
{ city: 'Duarte', state: 'CA', zipCode: '91010' },
{ city: 'Fairfield', state: 'CA', zipCode: '94533' },
{ city: 'Fontana', state: 'CA', zipCode: '92335' },
{ city: 'Fountain Valley', state: 'CA', zipCode: '92708' },
{ city: 'Gilroy', state: 'CA', zipCode: '95020' },
{ city: 'Hemet', state: 'CA', zipCode: '92543' },
{ city: 'Hesperia', state: 'CA', zipCode: '92345' },
{ city: 'Highland', state: 'CA', zipCode: '92346' },
{ city: 'La Habra', state: 'CA', zipCode: '90631' },
{ city: 'La Mesa', state: 'CA', zipCode: '91942' },
{ city: 'La Mirada', state: 'CA', zipCode: '90638' },
{ city: 'Laguna Niguel', state: 'CA', zipCode: '92677' },
{ city: 'Lake Elsinore', state: 'CA', zipCode: '92530' },
{ city: 'Lancaster', state: 'CA', zipCode: '93534' },
{ city: 'Livermore', state: 'CA', zipCode: '94550' },
{ city: 'Lodi', state: 'CA', zipCode: '95240' },
{ city: 'Manteca', state: 'CA', zipCode: '95336' },
{ city: 'Merced', state: 'CA', zipCode: '95340' },
{ city: 'Milpitas', state: 'CA', zipCode: '95035' },
{ city: 'Monterey', state: 'CA', zipCode: '93940' },
{ city: 'Morgan Hill', state: 'CA', zipCode: '95037' },
{ city: 'Mountain View', state: 'CA', zipCode: '94040' },
{ city: 'Napa', state: 'CA', zipCode: '94559' },
{ city: 'Norwalk', state: 'CA', zipCode: '90650' },
{ city: 'Pittsburg', state: 'CA', zipCode: '94565' },
{ city: 'Redwood City', state: 'CA', zipCode: '94063' },
{ city: 'Simi Valley', state: 'CA', zipCode: '93063' },
{ city: 'Tulare', state: 'CA', zipCode: '93274' },
{ city: 'Victorville', state: 'CA', zipCode: '92392' }
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