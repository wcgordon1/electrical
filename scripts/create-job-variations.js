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
  "minValue": 28,
  "maxValue": 35,
  "experienceLevel": "midLevel",
  "category": "Journeyman",
  "team": "Commercial",
  "yearsExperience": "5+",
  "responsibilities": "Install and maintain complex electrical systems in new hospital construction projects, including patient rooms, operating theaters, and critical care units. Route, bend, and install conduit (EMT, rigid) to support high-density wiring requirements for medical-grade equipment. Ensure proper grounding and bonding of all systems in compliance with NEC and hospital-specific codes. Collaborate with engineers and medical equipment specialists to ensure power systems meet design specifications and safety standards. Perform load calculations and install service equipment, emergency power systems, and backup generators. Supervise apprentices, ensuring adherence to safety protocols and quality workmanship. Troubleshoot and test critical electrical systems, including fire alarm circuits, nurse call systems, and life safety equipment.",
  "qualifications": "Extensive knowledge of NEC electrical standards. Experience with emergency power systems, backup generators, and life safety circuits. Ability to read and interpret complex blueprints, electrical schematics, and technical manuals. Proficiency with diagnostic tools such as multimeters and megohmmeters. Strong communication skills and ability to collaborate with diverse teams in high-pressure environments.",
  "prompt": "Create a job description for a Certified Journeyman Electrician specializing in new hospital construction. Emphasize the installation and maintenance of critical healthcare systems, compliance with medical-grade standards, and leadership in mentoring apprentices. Must have a valid California Journeyman Certification from the Department of Industrial Relations."
},
"Apprentice Electrician": {
  "minValue": 18,
  "maxValue": 22,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "1-4",
  "responsibilities": "Assist journeymen in the installation and maintenance of electrical systems in commercial buildings, including lighting, power distribution, and control systems. Pull and terminate wires, ensuring proper connections for panels, switches, and outlets. Learn to bend and install conduit (EMT and PVC) to support wiring systems. Perform basic troubleshooting under supervision, using tools like multimeters and voltage testers. Organize and maintain tools, equipment, and materials on-site to ensure smooth workflow. Attend team meetings and safety briefings to learn industry best practices and code compliance.",
  "qualifications": "Basic understanding of electrical systems, tools, and safety protocols. Ability to read and interpret simple electrical diagrams and blueprints. Strong desire to learn and grow within the electrical trade. Ability to follow instructions, work as part of a team, and communicate effectively on-site. Physical capability to lift heavy equipment, work on ladders, and perform tasks in confined spaces. High school diploma or equivalent is preferred.",
  "prompt": "Create a job description for an entry-level Apprentice Electrician working on commercial projects. Focus on assisting with installations, learning basic troubleshooting, and supporting journeymen on-site in California."
},
"Security Alarm Installer": {
  "minValue": 23,
  "maxValue": 28,
  "experienceLevel": "entryLevel",
  "category": "Security",
  "team": "Commercial",
  "yearsExperience": "1-3",
  "responsibilities": "Install and configure security alarm systems, including sensors, control panels, and communication modules, in residential and small business properties. Test system functionality to ensure proper operation and address any installation issues. Program alarm systems to customer specifications, including remote access features and monitoring services. Educate customers on how to use and manage their security systems effectively. Maintain detailed records of installations, tests, and service calls for documentation purposes.",
  "qualifications": "Experience with low-voltage wiring and basic electronics. Ability to work independently and problem-solve during installations and service calls. Strong customer service skills to ensure satisfaction and system understanding. Familiarity with common hand tools and diagnostic equipment. Comfortable working in both indoor and outdoor environments. Valid driver’s license and ability to travel between job sites.",
  "prompt": "Create a job description for a Security Alarm Installer focusing on residential and small business installations. Emphasize configuration, testing, and customer education, with work primarily in California."
},
"Fire Alarm Installer": {
  "minValue": 24,
  "maxValue": 28,
  "experienceLevel": "midLevel",
  "category": "Fire Alarm",
  "team": "Commercial",
  "yearsExperience": "3-5",
  "responsibilities": "Install, test, and maintain fire alarm systems, including control panels, pull stations, and notification devices, in commercial and industrial facilities. Conduct thorough inspections to ensure all components meet California fire code and NFPA standards. Troubleshoot and repair faulty wiring or devices to ensure system reliability. Coordinate with contractors and building managers to plan and execute installations in new and existing structures. Program fire alarm systems to integrate with other safety equipment, such as sprinklers and emergency lighting. Keep detailed service logs and provide documentation for system approvals and inspections.",
  "qualifications": "Experience installing and maintaining fire alarm systems in commercial settings. Strong understanding of NFPA codes and California fire safety regulations. Proficiency with tools and software used for fire alarm programming and diagnostics. Ability to work at heights and in confined spaces, as required by job sites. Strong organizational skills to manage multiple projects and deadlines. Effective communication skills to collaborate with team members and clients.",
  "prompt": "Create a job description for a Fire Alarm Installer specializing in commercial and industrial facilities. Focus on system installation, code compliance, and troubleshooting in California."
},
"Apprentice Electrician": {
  "minValue": 18,
  "maxValue": 22,
  "experienceLevel": "entryLevel",
  "category": "Apprentice",
  "team": "Commercial",
  "yearsExperience": "1-4",
  "responsibilities": "Support the installation of solar panels, battery storage systems, and EV charging stations on residential and commercial properties. Assist in running conduit, pulling wire, and connecting inverters to electrical panels. Learn to interpret system blueprints and layouts for renewable energy projects. Perform routine inspections and maintenance on installed systems to ensure optimal performance. Monitor and troubleshoot system components under the supervision of senior technicians. Ensure all work complies with local building codes and renewable energy guidelines. Maintain a clean and organized work environment, including managing tools and materials on-site.",
  "qualifications": "Familiarity with basic electrical concepts and renewable energy systems. Eagerness to learn solar, battery, and EV charging technology. Ability to work outdoors in various weather conditions and at heights, such as on rooftops. Strong problem-solving skills and attention to detail. Willingness to travel between job sites and work extended hours when necessary. High school diploma or equivalent preferred; technical coursework in renewable energy is a plus.",
  "prompt": "Create a job description for an entry-level Apprentice Electrician focusing on renewable energy installations, including solar panels and EV chargers. Emphasize learning system layouts, troubleshooting, and hands-on fieldwork in California."
},
"Low Voltage Cable Technician": {
  "minValue": 20,
  "maxValue": 24,
  "experienceLevel": "entryLevel",
  "category": "Voice Data",
  "team": "Commercial",
  "yearsExperience": "2+",
  "responsibilities": "Assist in the installation, termination, and testing of low voltage cabling systems for voice, data, and video networks. Support the setup and configuration of structured cabling systems, including fiber optics and Ethernet cables. Learn to read and interpret blueprints, technical drawings, and network schematics. Perform routine maintenance and troubleshooting of cabling systems under the supervision of senior technicians. Adhere to safety guidelines and ensure compliance with local building codes. Keep work areas organized and maintain inventory of tools and materials on-site. Collaborate with team members to ensure timely project completion and quality assurance.",
  "qualifications": "Basic understanding of cabling systems and network components. Ability to use hand and power tools safely and efficiently. Strong attention to detail and problem-solving skills. Physical ability to lift heavy objects, climb ladders, and work in confined spaces. Willingness to learn and adapt to new technologies and industry standards. High school diploma or equivalent required; technical certifications in cabling or networking are a plus. Valid driver's license and reliable transportation preferred.",
  "prompt": "Create a job description for an entry-level Low Voltage Cable Technician, focusing on structured cabling systems for voice, data, and video networks. Emphasize learning installation, troubleshooting, and hands-on fieldwork in commercial and residential settings."
}
};

const COMPANIES = {
  'Kirby Electric': {
    name: 'Kirby Electric',
    sameAs: 'https://kirbyelectric.com/',
    logo: 'https://kirbyelectric.com/wp-content/uploads/2023/03/kirby_logo.png'
  },
  'Myro Electrical': {
    name: 'Myro Electrical',
    sameAs: 'https://myroelectrical.com/',
    logo: 'https://images.squarespace-cdn.com/content/v1/6441d6a8c943293c268b4359/7b2478ca-3514-499f-80c1-3a92bb142f0c/curve__1_-removebg-preview.png?format=1500w'
  },
  'Berks Electrical': {
    name: 'Berks Electrical',
    sameAs: 'https://berkselectrical.com/',
    logo: 'https://berkselectrical.com/wp-content/uploads/2022/03/berk-logo.jpg'
  },
  'Tech Electronics': {
    name: 'Tech Electronics',
    sameAs: 'https://www.techelectronics.com/',
    logo: 'https://www.techelectronics.com/wp-content/uploads/2020/10/tech-electronics-logo.png'
  },
  'Oak Electrical': {
    name: 'Oak Electrical',
    sameAs: 'https://oakelectriccompany.com/',
    logo: 'https://oakelectriccompany.com/wp-content/uploads/2017/04/logoNav-for-web.png'
  },
  'Crosby Electric': {
    name: 'Crosby Electric',
    sameAs: 'https://www.crosbyelectric.com/',
    logo: 'https://www.crosbyelectric.com/images/crosbyelectric_logo_crete.png'
  },
  'Reliable Electric': {
    name: 'Reliable Electric',
    sameAs: 'https://reliable-contractors.com/',
    logo: 'https://reliable-contractors.com/wp-content/uploads/2020/03/Reliable-Electric-Logo.jpg'
  },
  'Granite State Electric': {
    name: 'Granite State Electric',
    sameAs: 'https://granitestateelectricians.com/',
    logo: 'https://granitestateelectricians.com/wp-content/uploads/2018/03/GSE-2c-Logo-4.jpg'
  },
  'EZ Electric': {
    name: 'EZ Electric',
    sameAs: 'https://ezelectric.com/',
    logo: 'https://cdn.prod.website-files.com/62858eb9f95b5ef6ab8256be/66195b93d011344d05b98867_ez-electric-logo.svg'
  },
  'JP Electric': {
    name: 'JP Electric',
    sameAs: 'https://jpelectric.com/',
    logo: 'https://jpelectric.com/wp-content/uploads/2021/05/logo.png'
  },
  'Star Electric': {
    name: 'Star Electric',
    sameAs: 'https://www.starelectricmt.com/',
    logo: 'https://www.starelectricmt.com/wp-content/uploads/2023/11/starelectric-favicon-black-and-white.svg'
  },
  'JD Electric': {
    name: 'JD Electric',
    sameAs: 'https://jdproelectric.com/',
    logo: 'https://img1.wsimg.com/isteam/ip/243bff06-83b1-4928-b792-0338b6394a0b/logo/f2643ee5-278f-40f6-b108-dfc392a3d6fa.png/:/rs=w:662,h:160,cg:true,m/cr=w:662,h:160/qt=q:95'
  },
  'Tully Electric': {
    name: 'Tully Electric',
    sameAs: 'https://www.tully-electric.com/',
    logo: 'https://static.wixstatic.com/media/3a1e46_522696ccd68b4e63b984a72af3fe2da3~mv2.jpg/v1/fill/w_310,h_118,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/tully_logo_name_(640x245).jpg'
  },
  'Marathon Electrical': {
    name: 'Marathon Electrical',
    sameAs: 'https://marathonelectric.com/',
    logo: 'https://static.wixstatic.com/media/619c2c_813b990e8a82413597ed3f144ac0cb67~mv2.png/v1/crop/x_0,y_93,w_2420,h_815/fill/w_820,h_276,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/Marathon_Horizontal_Reversed_RGB.png'
  },
  'Eskew Electric': {
    name: 'Eskew Electric',
    sameAs: 'https://eskewelectric.com/',
    logo: 'https://img1.wsimg.com/isteam/ip/a06397fa-6f72-478f-ae05-6cf10229cbc5/blob-b5037f9.png/:/rs=w:501,h:400,cg:true,m/cr=w:501,h:400/qt=q:95'
  },
  'Colvin Electric': {
    name: 'Colvin Electric',
    sameAs: 'https://colvinelectric.com/',
    logo: 'https://colvinelectric.com/wp-content/uploads/2018/10/colvin-electric_footer-logo-1.png'
  },
  'Passion Electric': {
    name: 'Passion Electric',
    sameAs: 'https://passionelectric.com/',
    logo: 'https://passionelectric.com/wp-content/uploads/Passion-Electric-Logo-web-final-wide-full-color.png.webp'
  },
  'Braco Electrical': {
    name: 'Braco Electrical',
    sameAs: 'https://bracoelectrical.com/',
    logo: 'https://www.bracoelectrical.com/images/logo.png'
  },
  'Safe Electric': {
    name: 'Safe Electric',
    sameAs: 'https://callsafe.com/',
    logo: 'https://callsafe.com/wp-content/uploads/2024/05/Safe-Electric-Plumbing-Logo.png.webp'
  },
  'ESP Electrical': {
    name: 'ESP Electrical',
    sameAs: 'https://www.espelectrical.net/',
    logo: 'https://www.espelectrical.net/images/logo.png'
  },
  'DP Electric': {
    name: 'DP Electric',
    sameAs: 'https://dpelectric.com/',
    logo: 'https://dpelectric.com/wp-content/uploads/2022/03/DPA.png'
  },
  'Simple Electric': {
    name: 'Simple Electric',
    sameAs: 'https://simpleelectricaz.com/',
    logo: 'https://simpleelectricaz.com/wp-content/uploads/2017/10/logo.png'
  },
  'Dodge Electric': {
    name: 'Dodge Electric',
    sameAs: 'https://dodgeelectric.com/',
    logo: 'https://dodgeelectric.com/wp-content/uploads/2016/04/logo.jpg?quality=100.3022012111021'
  },
  'Miller Electric': {
    name: 'Miller Electric',
    sameAs: 'https://millerelect.com/',
    logo: 'https://millerelect.com/wp-content/uploads/2022/04/logo.png'
  },
  'Arc Electric': {
    name: 'Arc Electric',
    sameAs: 'https://www.arcelectric.co/',
    logo: 'https://static.wixstatic.com/media/6fbf59_32ce059a02c943c1a4ca0da76effedcc~mv2.png/v1/fill/w_116,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Arc%20Electric%20Logo.png'
  },
  'Koehler Electric': {
    name: 'Koehler Electric',
    sameAs: 'https://jwkoehler.com/',
    logo: 'https://jwkoehler.com/wp-content/uploads/2022/04/Koehler-Electric-Logo-2022-01.svg'
  }
};

const LOCATIONS = [
{ city: 'Surprise', state: 'AZ', zipCode: '85374' },
{ city: 'Tucson', state: 'AZ', zipCode: '85701' },
{ city: 'Gilbert', state: 'AZ', zipCode: '85233' },
{ city: 'Yuma', state: 'AZ', zipCode: '85364' },
{ city: 'Flagstaff', state: 'AZ', zipCode: '86001' },
{ city: 'Goodyear', state: 'AZ', zipCode: '85338' },
{ city: 'Buckeye', state: 'AZ', zipCode: '85326' },
{ city: 'Avondale', state: 'AZ', zipCode: '85323' },
{ city: 'Queen Creek', state: 'AZ', zipCode: '85142' },
{ city: 'Maricopa', state: 'AZ', zipCode: '85138' },
{ city: 'Casa Grande', state: 'AZ', zipCode: '85122' },
{ city: 'Sierra Vista', state: 'AZ', zipCode: '85635' },
{ city: 'Lake Havasu City', state: 'AZ', zipCode: '86403' },
{ city: 'Prescott', state: 'AZ', zipCode: '86301' },
{ city: 'Bullhead City', state: 'AZ', zipCode: '86429' },
{ city: 'Apache Junction', state: 'AZ', zipCode: '85120' },
{ city: 'San Tan Valley', state: 'AZ', zipCode: '85140' },
{ city: 'Kingman', state: 'AZ', zipCode: '86401' },
{ city: 'Sun City', state: 'AZ', zipCode: '85351' },
{ city: 'El Mirage', state: 'AZ', zipCode: '85335' },
{ city: 'Fountain Hills', state: 'AZ', zipCode: '85268' },
{ city: 'Oro Valley', state: 'AZ', zipCode: '85737' },
{ city: 'Nogales', state: 'AZ', zipCode: '85621' },
{ city: 'Chino Valley', state: 'AZ', zipCode: '86323' },
{ city: 'Sedona', state: 'AZ', zipCode: '86336' },
{ city: 'Winslow', state: 'AZ', zipCode: '86047' },
{ city: 'Phoenix West Valley', state: 'AZ', zipCode: '85305' },
{ city: 'Miami Lakes', state: 'FL', zipCode: '33014' },
{ city: 'Coral Gables', state: 'FL', zipCode: '33134' },
{ city: 'Doral', state: 'FL', zipCode: '33166' },
{ city: 'Homestead', state: 'FL', zipCode: '33030' },
{ city: 'Plantation', state: 'FL', zipCode: '33317' },
{ city: 'Davie', state: 'FL', zipCode: '33324' },
{ city: 'Weston', state: 'FL', zipCode: '33326' },
{ city: 'Pompano Beach', state: 'FL', zipCode: '33060' },
{ city: 'Deerfield Beach', state: 'FL', zipCode: '33441' },
{ city: 'Boynton Beach', state: 'FL', zipCode: '33426' },
{ city: 'Delray Beach', state: 'FL', zipCode: '33444' },
{ city: 'Winter Park', state: 'FL', zipCode: '32789' },
{ city: 'Oviedo', state: 'FL', zipCode: '32765' },
{ city: 'Clermont', state: 'FL', zipCode: '34711' },
{ city: 'Winter Garden', state: 'FL', zipCode: '34787' },
{ city: 'Riverview', state: 'FL', zipCode: '33578' },
{ city: 'Brandon', state: 'FL', zipCode: '33511' },
{ city: 'Palm Harbor', state: 'FL', zipCode: '34683' },
{ city: 'Dunedin', state: 'FL', zipCode: '34698' },
{ city: 'Ocala', state: 'FL', zipCode: '34470' },
{ city: 'Port St. Lucie', state: 'FL', zipCode: '34952' },
{ city: 'Melbourne', state: 'FL', zipCode: '32901' },
{ city: 'Vero Beach', state: 'FL', zipCode: '32960' },
{ city: 'Fort Myers', state: 'FL', zipCode: '33901' },
{ city: 'Cape Coral', state: 'FL', zipCode: '33904' },
{ city: 'Naples', state: 'FL', zipCode: '34102' }
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