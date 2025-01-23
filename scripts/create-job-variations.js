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
  "Quality Control Technician": {
  "minValue": 20,
  "maxValue": 25,
  "experienceLevel": "midLevel",
  "category": "Quality Control",
  "team": "Industrial",
  "yearsExperience": "3+",
  "responsibilities": "Perform dimensional and visual inspections of disassembled electric motors and parts to determine necessary repairs. Verify new and repaired parts against engineering drawings and specifications. Conduct in-process surveillance and perform final inspections to release motors for shipment. Ensure all paperwork and documentation is completed accurately and legibly. Collaborate with machinists and repair technicians to ensure quality standards are met.",
  "qualifications": "High school diploma or equivalent. At least 3 years of experience with precision measurement tools such as micrometers, calipers, and dial indicators. Ability to safely lift 50 pounds and work in physically demanding environments. Flexibility to work overtime, weekends, and holidays as required. Military mechanical technician background preferred.",
  "prompt": "Create a job description for a Mechanical Quality Control Technician specializing in electric motor inspections, verifying repairs, and ensuring compliance with engineering standards. Emphasize precision, technical skills, and flexibility to meet customer needs in an industrial environment."
},

"Coatings Engineer": {
  "minValue": 45,
  "maxValue": 50,
  "experienceLevel": "senior",
  "category": "Engineering",
  "team": "Industrial",
  "yearsExperience": "5+",
  "responsibilities": "Perform and oversee Nuclear Service Level 1 coatings inspections and certifications. Supervise and qualify Level 1 and Level 2 coatings inspectors. Train applicators for coatings application and ensure compliance with regulatory standards. Review and improve coating methods and recommend equipment to enhance quality. Collaborate with customers to select coatings and develop application strategies. Maintain up-to-date knowledge of coatings regulations and standards. Write and revise coatings application and inspection procedures.",
  "qualifications": "NACE/SSPC/AMPP Level 1 certification required; Level 2, Level 3, or Nuclear Coatings Inspection Specialty preferred. Bachelor’s degree in a related field. Minimum 5 years of coatings inspection experience, with at least 2 years in commercial nuclear coatings. Ability to qualify as a Level 3 Nuclear Grade Coatings Inspector. Strong understanding of industry standards and customer collaboration.",
  "prompt": "Create a job description for a Coatings Engineer focused on nuclear coatings inspections, training, and quality improvement. Highlight expertise in NACE/SSPC standards, leadership skills, and technical proficiency in an industrial setting."
},

"Motor Mechanic": {
  "minValue": 28,
  "maxValue": 30,
  "experienceLevel": "midLevel",
  "category": "Mechanical",
  "team": "Industrial",
  "yearsExperience": "5+",
  "responsibilities": "Disassemble, inspect, troubleshoot, and reassemble motors, pumps, and generators up to 12,000 HP. Diagnose issues such as oil leaks and vibrations, and determine necessary repairs. Perform test runs on rebuilt motors to ensure proper functionality. Collaborate with machinists and quality control technicians to meet specifications. Maintain accurate records of all work completed.",
  "qualifications": "High school diploma or equivalent. At least 5 years of experience in disassembling and repairing motors and generators. Ability to read and interpret technical drawings. Must provide own tools and possess excellent communication skills. Physically able to lift 50 pounds and work extended hours, including weekends and holidays.",
  "prompt": "Create a job description for an Electric Motor Mechanic responsible for diagnosing, repairing, and testing industrial motors and generators. Focus on technical skills, problem-solving, and attention to detail."
},

"RCP Motor Mechanic": {
  "minValue": 28,
  "maxValue": 34,
  "experienceLevel": "midLevel",
  "category": "Mechanical",
  "team": "Industrial",
  "yearsExperience": "5+",
  "responsibilities": "Disassemble and reassemble vertical motors up to 12,000 HP operating at 13.2 kV. Perform incoming and outgoing inspections and test runs. Troubleshoot issues such as oil leaks and vibrations. Work with and around radioactive materials while adhering to safety protocols. Operate forklifts, cranes, and rigging equipment to safely handle motor components. Maintain accurate documentation and comply with written work instructions.",
  "qualifications": "High school diploma or equivalent. At least 5 years of experience with motors and pumps. Familiarity with rigging practices, M&TE tools (micrometers, calipers, torque wrenches, etc.), and basic electrical knowledge. Ability to complete Radiological Worker Training. Strong attention to detail and adherence to safety standards.",
  "prompt": "Create a job description for an RCP Motor Mechanic specializing in vertical motor repairs, radioactive material handling, and troubleshooting. Emphasize safety, technical skills, and adherence to industrial protocols."
},

"Motor Winder": {
  "minValue": 20,
  "maxValue": 28,
  "experienceLevel": "entryLevel",
  "category": "Electrical",
  "team": "Industrial",
  "yearsExperience": "2+",
  "responsibilities": "Rewind 3-phase form coil and random wound stators, as well as DC armatures and fields. Conduct electrical tests, including surge testing and resistance checks. Utilize electrical test equipment such as megohmeters, multimeters, and surge testers to ensure functionality. Maintain a clean and organized workspace and assist with troubleshooting as needed.",
  "qualifications": "High school diploma or equivalent. Familiarity with electrical testing equipment and tests. Ability to lift 50 pounds and work extended hours. Strong communication skills and attention to detail. Must provide basic hand tools.",
  "prompt": "Create a job description for an Electric Motor Winder focused on rewinding industrial motors and conducting electrical tests. Highlight technical skills, attention to detail, and ability to work in an industrial environment."
},

"Machinist": {
  "minValue": 24,
  "maxValue": 30,
  "experienceLevel": "midLevel",
  "category": "Machining",
  "team": "Industrial",
  "yearsExperience": "5+",
  "responsibilities": "Manufacture and repair parts per specifications and drawings. Operate precision machining equipment, including milling machines, lathes, boring mills, and grinders. Perform inspections on manufactured components to ensure tolerances within .0005” to .001”. Handle rigging and overhead crane operations safely. Complete all required paperwork accurately.",
  "qualifications": "High school diploma or equivalent. Minimum 5 years of machining experience with close tolerances. Strong verbal and written communication skills. Ability to lift 50 pounds and work overtime, weekends, and holidays as needed.",
  "prompt": "Create a job description for a Manual Machinist specializing in precision manufacturing and repair, with expertise in machining equipment and industrial processes."
},

"Switchgear Technician": {
  "minValue": 30,
  "maxValue": 32,
  "experienceLevel": "senior",
  "category": "Electrical",
  "team": "Industrial",
  "yearsExperience": "5+",
  "responsibilities": "Install, maintain, and test low and medium voltage switchgear systems. Troubleshoot and resolve technical problems in the shop and field. Train personnel on power distribution equipment maintenance and testing. Collaborate with customers to identify solutions and provide technical support. Ensure compliance with NETA, IEEE, and NEMA standards. Prepare detailed reports on completed work.",
  "qualifications": "High school diploma or equivalent; technical training preferred. Hands-on experience with switchgear systems. NETA or NICET certifications preferred. Ability to travel frequently and work at heights. Strong organizational and communication skills.",
  "prompt": "Create a job description for a Power Systems/Switchgear Technician focusing on installation, maintenance, and troubleshooting of industrial switchgear systems. Highlight expertise in NETA standards and customer collaboration."
},

"Field Service Technician": {
  "minValue": 28,
  "maxValue": 32,
  "experienceLevel": "midLevel",
  "category": "Mechanical",
  "team": "Industrial",
  "yearsExperience": "2+",
  "responsibilities": "Install, troubleshoot, and repair industrial equipment, including motors, pumps, and gearboxes. Use rigging and alignment tools for equipment installation. Perform diagnostics using vibration analysis and visual inspections. Collaborate with customers to identify and resolve mechanical issues. Maintain detailed reports and ensure compliance with safety standards.",
  "qualifications": "High school diploma or equivalent. Minimum 2 years in mechanical environments. Knowledge of industrial safety and rigging practices. Valid driver’s license required. Training in vibration analysis and laser alignment preferred.",
  "prompt": "Create a job description for a Mechanical Field Service Technician specializing in industrial equipment installation and repair, emphasizing diagnostics, customer service, and safety."
}
};


const COMPANIES = {
  'Burdett Hill': {
    name: 'Burdett Hill',
    sameAs: 'https://www.burdetthill.com/',
    logo: 'https://burdetthill.com/uploads/4/4/8/2/44827321/a7f6619e-ecee-45db-ac13-7b1bffe6602c-4-5005-c.jpeg'
  }
};

const LOCATIONS = [
  { city: 'Chesapeake', state: 'VA', zipCode: '23320' },
{ city: 'Norfolk', state: 'VA', zipCode: '23510' },
{ city: 'Virginia Beach', state: 'VA', zipCode: '23451' },
{ city: 'Portsmouth', state: 'VA', zipCode: '23704' },
{ city: 'Suffolk', state: 'VA', zipCode: '23434' },
{ city: 'Hampton', state: 'VA', zipCode: '23669' },
{ city: 'Newport News', state: 'VA', zipCode: '23607' },
{ city: 'Poquoson', state: 'VA', zipCode: '23662' },
{ city: 'Smithfield', state: 'VA', zipCode: '23430' },
{ city: 'Carrollton', state: 'VA', zipCode: '23314' },
{ city: 'Yorktown', state: 'VA', zipCode: '23690' },
{ city: 'Windsor', state: 'VA', zipCode: '23487' },
{ city: 'Moyock', state: 'NC', zipCode: '27958' },
{ city: 'Corolla', state: 'NC', zipCode: '27927' },
{ city: 'Elizabeth City', state: 'NC', zipCode: '27909' },
{ city: 'Camden', state: 'NC', zipCode: '27921' },
{ city: 'Currituck', state: 'NC', zipCode: '27929' },
{ city: 'Hertford', state: 'NC', zipCode: '27944' },
{ city: 'Edenton', state: 'NC', zipCode: '27932' },
{ city: 'Gatesville', state: 'NC', zipCode: '27938' },
{ city: 'Sunbury', state: 'NC', zipCode: '27979' },
{ city: 'Ahoskie', state: 'NC', zipCode: '27910' },
{ city: 'Franklin', state: 'VA', zipCode: '23851' },
{ city: 'Courtland', state: 'VA', zipCode: '23837' },
{ city: 'Capron', state: 'VA', zipCode: '23829' },
{ city: 'Boykins', state: 'VA', zipCode: '23827' },
{ city: 'Newsoms', state: 'VA', zipCode: '23874' },
{ city: 'Ivor', state: 'VA', zipCode: '23866' },
{ city: 'Zuni', state: 'VA', zipCode: '23898' },
{ city: 'Carrsville', state: 'VA', zipCode: '23315' },
{ city: 'Sedley', state: 'VA', zipCode: '23878' },
{ city: 'Wakefield', state: 'VA', zipCode: '23888' },
{ city: 'Waverly', state: 'VA', zipCode: '23890' },
{ city: 'Dendron', state: 'VA', zipCode: '23839' },
{ city: 'Surry', state: 'VA', zipCode: '23883' },
{ city: 'Claremont', state: 'VA', zipCode: '23899' },
{ city: 'Jamestown', state: 'VA', zipCode: '23081' },
{ city: 'Williamsburg', state: 'VA', zipCode: '23185' },
{ city: 'Toano', state: 'VA', zipCode: '23168' },
{ city: 'Lanexa', state: 'VA', zipCode: '23089' },
{ city: 'Barhamsville', state: 'VA', zipCode: '23011' },
{ city: 'Gloucester Point', state: 'VA', zipCode: '23062' },
{ city: 'Hayes', state: 'VA', zipCode: '23072' },
{ city: 'Ordinary', state: 'VA', zipCode: '23131' },
{ city: 'Seaford', state: 'VA', zipCode: '23696' },
{ city: 'Grafton', state: 'VA', zipCode: '23692' },
{ city: 'Fort Eustis', state: 'VA', zipCode: '23604' },
{ city: 'Lackey', state: 'VA', zipCode: '23694' },
{ city: 'Benns Church', state: 'VA', zipCode: '23314' },
{ city: 'Rushmere', state: 'VA', zipCode: '23430' },
{ city: 'Battery Park', state: 'VA', zipCode: '23304' },
{ city: 'Rescue', state: 'VA', zipCode: '23424' },
{ city: 'Chuckatuck', state: 'VA', zipCode: '23432' },
{ city: 'Whaleyville', state: 'VA', zipCode: '23438' },
{ city: 'Holland', state: 'VA', zipCode: '23437' },
{ city: 'Gates', state: 'NC', zipCode: '27937' },
{ city: 'Eure', state: 'NC', zipCode: '27935' },
{ city: 'Belvidere', state: 'NC', zipCode: '27919' },
{ city: 'Tyner', state: 'NC', zipCode: '27980' },
{ city: 'Winfall', state: 'NC', zipCode: '27985' },
{ city: 'Shiloh', state: 'NC', zipCode: '27974' },
{ city: 'South Mills', state: 'NC', zipCode: '27976' },
{ city: 'Coinjock', state: 'NC', zipCode: '27923' },
{ city: 'Barco', state: 'NC', zipCode: '27917' },
{ city: 'Grandy', state: 'NC', zipCode: '27939' },
{ city: 'Poplar Branch', state: 'NC', zipCode: '27965' },
{ city: 'Jarvisburg', state: 'NC', zipCode: '27947' },
{ city: 'Powells Point', state: 'NC', zipCode: '27966' },
{ city: 'Harbinger', state: 'NC', zipCode: '27941' },
{ city: 'Point Harbor', state: 'NC', zipCode: '27964' },
{ city: 'Knotts Island', state: 'NC', zipCode: '27950' },
{ city: 'Currituck', state: 'NC', zipCode: '27929' },
{ city: 'Maple', state: 'NC', zipCode: '27956' }
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
      'vicki@burdetthill.com'
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