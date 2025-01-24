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
    `Use these points as inspiration but create a warehouse-focused description using only h2 and h3 tags for headings:

Create a COMPREHENSIVE job description (800+ words) for an experienced ${jobType}. Write this as if you are an operations manager overseeing a team of ${jobType}s with 20 years of experience creating a job post for ${company} (expand on company).

## About the ${jobType} Position
Start with a detailed paragraph about working as a ${jobType} at ${company}, the warehouse work involved, and the types of projects our ${jobType}s handle.

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

Create a PRACTICAL job description (400-500 words) that focuses on the daily work life of a ${jobType}. Write it like a supervisor explaining the ${jobType} position to a potential hire at ${company}.

## What You'll Do as a ${jobType}
Quick overview of the ${jobType} role and our current warehouse work in ${city}. Keep it real and straightforward about what a ${jobType} does day-to-day.

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

Create a QUICK job description (200 words). Write it like a busy project manager needs this ${jobType} position filled ASAP at ${company} in ${city}, ${state}.

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
  "Warehouse Associate": {
  "minValue": 18,
  "maxValue": 22,
  "experienceLevel": "entryLevel",
  "category": "General Operations",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Assist with loading and unloading trucks in a high-volume warehouse. Organize and store products in designated areas, maintaining a clean and safe workspace. Use inventory tracking systems to ensure proper stock management. Operate basic warehouse equipment such as pallet jacks and hand trucks. Conduct regular inventory counts and report discrepancies to supervisors.",
  "qualifications": "High school diploma or equivalent. Ability to lift up to 50 pounds and stand for long periods. Strong attention to detail and organizational skills. Experience with inventory systems is a plus but not required.",
  "prompt": "Create a job description for a Warehouse Associate in a large industrial warehouse handling high-volume shipments. Focus on organizational skills, basic equipment use, and maintaining a clean work environment."
},
"Warehouse Loader": {
  "minValue": 19,
  "maxValue": 23,
  "experienceLevel": "entryLevel",
  "category": "Shipping",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Load outgoing trucks efficiently and securely, ensuring product safety during transport. Verify shipment details against manifests to confirm accuracy. Maintain organization of loading docks and staging areas. Operate forklifts or electric pallet jacks to move heavy goods. Collaborate with warehouse and logistics teams to meet shipping deadlines.",
  "qualifications": "High school diploma or equivalent. Previous experience in a shipping/receiving environment preferred. Ability to lift and carry heavy loads. Forklift certification is a plus.",
  "prompt": "Create a job description for a WarehouseLoader working in a high-capacity warehouse. Highlight efficiency in loading processes, adherence to safety standards, and collaboration with logistics teams."
},
"Warehouse Unloader": {
  "minValue": 18,
  "maxValue": 22,
  "experienceLevel": "entryLevel",
  "category": "Receiving",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Unload incoming shipments and inspect for damage or missing items. Ensure goods are stored in designated warehouse locations. Use RF scanners to track inventory as items are received. Assist with organizing incoming shipments on the receiving dock. Maintain a safe and clean workspace.",
  "qualifications": "High school diploma or equivalent. Ability to lift 50 pounds and stand for extended periods. Basic knowledge of warehouse management systems preferred.",
  "prompt": "Create a job description for a Warehouse Unloader in a large warehouse environment. Emphasize attention to detail, physical stamina, and proficiency with inventory systems."
},
"Warehouse Material Handler": {
  "minValue": 20,
  "maxValue": 24,
  "experienceLevel": "midLevel",
  "category": "Inventory Management",
  "team": "Industrial",
  "yearsExperience": "2+",
  "responsibilities": "Move materials throughout the warehouse using forklifts or other industrial equipment. Ensure proper placement and storage of products based on inventory systems. Assist with cycle counts and inventory reconciliation. Prepare raw materials for production or distribution as required. Communicate with supervisors regarding inventory shortages or discrepancies.",
  "qualifications": "High school diploma or equivalent. Forklift certification required. 2+ years of experience in material handling in a warehouse or manufacturing environment.",
  "prompt": "Create a job description for a Warehouse Material Handler in a large warehouse setting. Focus on expertise in inventory movement, equipment operation, and maintaining inventory accuracy."
},
"Warehouse Assembler": {
  "minValue": 21,
  "maxValue": 26,
  "experienceLevel": "midLevel",
  "category": "Assembly",
  "team": "Industrial",
  "yearsExperience": "2+",
  "responsibilities": "Assemble products according to specifications and blueprints in a high-volume warehouse. Inspect components for defects and ensure all assembled items meet quality standards. Maintain a clean and organized assembly area. Collaborate with the quality control team to address any issues in production. Report progress to supervisors and suggest process improvements.",
  "qualifications": "High school diploma or equivalent. Experience in mechanical or electrical assembly is preferred. Strong attention to detail and ability to follow instructions. Must be able to work with hand tools and power tools.",
  "prompt": "Create a job description for a Warehouse Assembler in an industrial warehouse specializing in high-volume product assembly. Emphasize attention to detail, quality control, and teamwork."
},
"Warehouse Picker & Packer": {
  "minValue": 18,
  "maxValue": 21,
  "experienceLevel": "entryLevel",
  "category": "Order Fulfillment",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Pick products from shelves based on order specifications using handheld scanners. Pack items securely for shipment, ensuring accuracy and quality. Maintain organized and clean packing stations. Communicate with inventory teams to replenish stock in picking areas. Meet daily quotas for order processing.",
  "qualifications": "High school diploma or equivalent. Ability to work in a fast-paced environment. Strong attention to detail. Experience with handheld scanners or warehouse management systems is a plus.",
  "prompt": "Create a job description for a Warehouse Picker & Packer in a large-scale industrial warehouse. Focus on accuracy, efficiency, and working in a fast-paced environment."
},
"Assistant Inventory Clerk": {
  "minValue": 25,
  "maxValue": 30,
  "experienceLevel": "entryLevel",
  "category": "Inventory Management",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Assist with maintaining accurate inventory records in a high-capacity warehouse. Conduct daily and weekly cycle counts. Use inventory management software to track stock levels and report discrepancies. Support inventory audits and reconciliations. Collaborate with the receiving and shipping teams to ensure proper inventory flow.",
  "qualifications": "High school diploma or equivalent. Basic proficiency with inventory management software. Strong organizational and problem-solving skills.",
  "prompt": "Create a job description for a Warehouse Assistant Inventory Clerk in a large industrial warehouse. Emphasize inventory accuracy, problem-solving, and organizational skills."
},
"Warehouse Forklift Operator": {
  "minValue": 22,
  "maxValue": 27,
  "experienceLevel": "midLevel",
  "category": "Equipment Operation",
  "team": "Industrial",
  "yearsExperience": "2+",
  "responsibilities": "Operate forklifts to load, unload, and transport materials throughout a high-volume warehouse. Perform regular safety checks on forklifts and report maintenance issues. Ensure proper placement and stacking of goods to maximize space. Assist with organizing pallets for outgoing shipments. Adhere to all safety guidelines and protocols.",
  "qualifications": "High school diploma or equivalent. Valid forklift certification required. At least 2 years of forklift operation experience in a warehouse setting.",
  "prompt": "Create a job description for a Warehouse Forklift Operator in a large industrial warehouse. Highlight safety, equipment operation, and efficiency in material handling."
},
"Assistant Shipping Clerk": {
  "minValue": 22,
  "maxValue": 26,
  "experienceLevel": "entryLevel",
  "category": "Shipping",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Assist in preparing shipping labels and verifying outgoing orders. Organize and stage shipments for pickup. Communicate with logistics partners to confirm shipping schedules. Maintain a clean and organized shipping area. Track and document outgoing shipments in warehouse management systems.",
  "qualifications": "High school diploma or equivalent. Strong organizational and communication skills. Basic computer skills required.",
  "prompt": "Create a job description for a Warehouse Assistant Shipping Clerk in a large warehouse. Focus on organization, shipping accuracy, and communication with logistics partners."
},
"Assistant Receiving Clerk": {
  "minValue": 23,
  "maxValue": 29,
  "experienceLevel": "entryLevel",
  "category": "Receiving",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Support the receiving process by inspecting incoming shipments for accuracy. Assist with unloading trucks and organizing received goods. Use RF scanners to log inventory into the warehouse management system. Communicate with supervisors about damaged or missing items. Maintain the cleanliness of the receiving dock.",
  "qualifications": "High school diploma or equivalent. Ability to lift 50 pounds and work in a fast-paced environment. Basic computer and inventory tracking skills preferred.",
  "prompt": "Create a job description for a Warehouse Assistant Receiving Clerk in a large warehouse. Emphasize accuracy in receiving processes and proficiency with inventory systems."
},
"Pallet Jack Operator": {
  "minValue": 22,
  "maxValue": 29,
  "experienceLevel": "entryLevel",
  "category": "Material Handling",
  "team": "Industrial",
  "yearsExperience": "1+",
  "responsibilities": "Operate manual and electric pallet jacks to transport pallets, products, and materials throughout a large industrial warehouse. Safely load and unload goods onto trucks, trailers, and designated storage areas. Ensure pallets are stacked securely and in compliance with safety regulations to prevent damage or hazards. Assist in staging materials for shipment, following warehouse workflows and schedules. Conduct routine inspections of pallet jacks to ensure they are in good working condition, reporting any malfunctions or issues. Organize and maintain cleanliness of loading docks, storage areas, and workspaces. Collaborate with inventory teams to track and replenish stock in picking and packing areas. Follow established safety guidelines and wear appropriate personal protective equipment (PPE) at all times.",
  "qualifications": "High school diploma or equivalent. Familiarity with operating manual and electric pallet jacks in a warehouse environment. Ability to lift and move items weighing up to 50 pounds and work on your feet for extended periods. Strong attention to detail to ensure accuracy in material handling and inventory tracking. Basic communication skills to coordinate with team members and supervisors. Understanding of warehouse safety standards and best practices. Prior experience in material handling or warehousing is preferred but not required.",
  "prompt": "Create a job description for a Pallet Jack Operator in a large industrial warehouse. Emphasize safe operation of pallet jacks, material handling efficiency, and adherence to warehouse safety standards."
}

};


const COMPANIES = {
  'Lineage Logistics': {
    name: 'Lineage Logistics',
    sameAs: 'https://www.onelineage.com/',
    logo: 'https://www.onelineage.com/themes/custom/lineage_custom_new/assets/lineage_logo.svg'
  },
  'States Logistics': {
    name: 'States Logistics',
    sameAs: 'https://www.stateslogistics.com/',
    logo: 'https://stateslogistics.com/wp-content/uploads/2023/09/StsLogsts-logo-170x170px.png'
  },
  'AP Express': {
    name: 'AP Express',
    sameAs: 'https://www.apexpress.com/',
    logo: 'https://apexpress.com/wp-content/uploads/2024/06/apexpress-logo-270px.png'
  },
  'Amazon': {
    name: 'Amazon',
    sameAs: 'https://www.amazon.com/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'
  },
  'Target': {
    name: 'Target',
    sameAs: 'https://www.target.com/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg'
  },
  'Albertsons': {
    name: 'Albertsons',
    sameAs: 'https://www.albertsons.com/',
    logo: 'https://www.movinglivesforward.org/wp-content/uploads/2018/01/albertsons-logo.png'
  },
  'Boeing': {
    name: 'Boeing',
    sameAs: 'https://www.boeing.com/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Boeing_full_logo.svg/2560px-Boeing_full_logo.svg.png'
  },
  'Lamill Coffee': {
    name: 'Lamill Coffee',
    sameAs: 'https://www.lamillcoffee.com/',
    logo: 'https://www.lamillcoffee.com/cdn/shop/products/GiftCard2-01.jpg?v=1629826157&width=2048'
  },
  'Virgin Galactic': {
    name: 'Virgin Galactic',
    sameAs: 'https://www.virgingalactic.com/',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Virgin_Galactic_logo_%282022%29.svg/1200px-Virgin_Galactic_logo_%282022%29.svg.png'
  },
  'Kroger': {
    name: 'Kroger',
    sameAs: 'https://www.kroger.com/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kroger_logo_%281961-2019%29.svg/1200px-Kroger_logo_%281961-2019%29.svg.png'
  },
  'Ducommon': {
    name: 'Ducommon',
    sameAs: 'https://www.ducommon.com/',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAtvXtN-EAK1yScOaxPIsd280iNakbjxkZlg&s'
  },
  'Aldi': {
    name: 'Aldi',
    sameAs: 'https://www.aldi.us/',
    logo: 'https://corporate.aldi.us/fileadmin/fm-dam/logos/ALDI_2017.png'
  }
};

const LOCATIONS = [
  { city: 'Los Angeles', state: 'CA', zipCode: '90001' },
{ city: 'Culver City', state: 'CA', zipCode: '90230' },
{ city: 'Inglewood', state: 'CA', zipCode: '90301' },
{ city: 'West Hollywood', state: 'CA', zipCode: '90069' },
{ city: 'El Segundo', state: 'CA', zipCode: '90245' },
{ city: 'Torrance', state: 'CA', zipCode: '90501' },
{ city: 'Hawthorne', state: 'CA', zipCode: '90250' },
{ city: 'Gardena', state: 'CA', zipCode: '90247' },
{ city: 'Long Beach', state: 'CA', zipCode: '90802' },
{ city: 'Carson', state: 'CA', zipCode: '90745' },
{ city: 'Compton', state: 'CA', zipCode: '90220' },
{ city: 'South Gate', state: 'CA', zipCode: '90280' },
{ city: 'Downey', state: 'CA', zipCode: '90240' },
{ city: 'Norwalk', state: 'CA', zipCode: '90650' },
{ city: 'Bellflower', state: 'CA', zipCode: '90706' },
{ city: 'Lakewood', state: 'CA', zipCode: '90712' },
{ city: 'Paramount', state: 'CA', zipCode: '90723' },
{ city: 'Cypress', state: 'CA', zipCode: '90630' },
{ city: 'Buena Park', state: 'CA', zipCode: '90620' },
{ city: 'La Mirada', state: 'CA', zipCode: '90638' },
{ city: 'Whittier', state: 'CA', zipCode: '90601' },
{ city: 'Fullerton', state: 'CA', zipCode: '92831' },
{ city: 'Anaheim', state: 'CA', zipCode: '92801' },
{ city: 'Garden Grove', state: 'CA', zipCode: '92840' },
{ city: 'Santa Ana', state: 'CA', zipCode: '92701' },
{ city: 'Orange', state: 'CA', zipCode: '92866' },
{ city: 'Tustin', state: 'CA', zipCode: '92780' },
{ city: 'Irvine', state: 'CA', zipCode: '92602' },
{ city: 'Fountain Valley', state: 'CA', zipCode: '92708' },
{ city: 'Huntington Beach', state: 'CA', zipCode: '92647' },
{ city: 'West Covina', state: 'CA', zipCode: '91790' },
{ city: 'Ontario', state: 'CA', zipCode: '91764' },
{ city: 'Chino', state: 'CA', zipCode: '91710' },
{ city: 'Pomona', state: 'CA', zipCode: '91766' },
{ city: 'Diamond Bar', state: 'CA', zipCode: '91765' },
{ city: 'Brea', state: 'CA', zipCode: '92821' },
{ city: 'La Habra', state: 'CA', zipCode: '90631' },
{ city: 'Placentia', state: 'CA', zipCode: '92870' },
{ city: 'Costa Mesa', state: 'CA', zipCode: '92626' },
{ city: 'Laguna Beach', state: 'CA', zipCode: '92651' },
{ city: 'Mission Viejo', state: 'CA', zipCode: '92691' },
{ city: 'Lake Forest', state: 'CA', zipCode: '92630' },
{ city: 'San Clemente', state: 'CA', zipCode: '92672' },
{ city: 'San Juan Capistrano', state: 'CA', zipCode: '92675' },
{ city: 'Aliso Viejo', state: 'CA', zipCode: '92656' },
{ city: 'Rancho Santa Margarita', state: 'CA', zipCode: '92688' },
{ city: 'Ladera Ranch', state: 'CA', zipCode: '92694' },
{ city: 'Vernon', state: 'CA', zipCode: '90058' },
{ city: 'Commerce', state: 'CA', zipCode: '90040' },
{ city: 'Pico Rivera', state: 'CA', zipCode: '90660' },
{ city: 'Montebello', state: 'CA', zipCode: '90640' },
{ city: 'East Los Angeles', state: 'CA', zipCode: '90022' },
{ city: 'Bell Gardens', state: 'CA', zipCode: '90201' },
{ city: 'Maywood', state: 'CA', zipCode: '90270' },
{ city: 'El Monte', state: 'CA', zipCode: '91731' },
{ city: 'City of Industry', state: 'CA', zipCode: '91744' },
{ city: 'Walnut', state: 'CA', zipCode: '91789' },
{ city: 'Baldwin Park', state: 'CA', zipCode: '91706' },
{ city: 'La Puente', state: 'CA', zipCode: '91746' },
{ city: 'Irwindale', state: 'CA', zipCode: '91702' },
{ city: 'San Dimas', state: 'CA', zipCode: '91773' },
{ city: 'Glendora', state: 'CA', zipCode: '91740' },
{ city: 'Covina', state: 'CA', zipCode: '91722' },
{ city: 'Rowland Heights', state: 'CA', zipCode: '91748' },
{ city: 'Hacienda Heights', state: 'CA', zipCode: '91745' },
{ city: 'Norco', state: 'CA', zipCode: '92860' },
{ city: 'Corona', state: 'CA', zipCode: '92879' },
{ city: 'Perris', state: 'CA', zipCode: '92570' },
{ city: 'Jurupa Valley', state: 'CA', zipCode: '92509' },
{ city: 'Riverside', state: 'CA', zipCode: '92501' },
{ city: 'Fontana', state: 'CA', zipCode: '92335' },
{ city: 'San Bernardino', state: 'CA', zipCode: '92408' },
{ city: 'Redlands', state: 'CA', zipCode: '92373' },
{ city: 'Colton', state: 'CA', zipCode: '92324' },
{ city: 'Chino Hills', state: 'CA', zipCode: '91709' },
{ city: 'Ontario Ranch', state: 'CA', zipCode: '91761' },
{ city: 'Lynwood', state: 'CA', zipCode: '90262' },
{ city: 'Cerritos', state: 'CA', zipCode: '90703' },
{ city: 'Signal Hill', state: 'CA', zipCode: '90755' },
{ city: 'Huntington Park', state: 'CA', zipCode: '90255' },
{ city: 'Bell', state: 'CA', zipCode: '90201' },
{ city: 'Artesia', state: 'CA', zipCode: '90701' },
{ city: 'Rancho Dominguez', state: 'CA', zipCode: '90220' },
{ city: 'La Palma', state: 'CA', zipCode: '90623' },
{ city: 'Sun Valley', state: 'CA', zipCode: '91352' },
{ city: 'Sylmar', state: 'CA', zipCode: '91342' },
{ city: 'Pacoima', state: 'CA', zipCode: '91331' },
{ city: 'North Hills', state: 'CA', zipCode: '91343' },
{ city: 'Canoga Park', state: 'CA', zipCode: '91303' },
{ city: 'Chatsworth', state: 'CA', zipCode: '91311' },
{ city: 'Van Nuys', state: 'CA', zipCode: '91405' },
{ city: 'Reseda', state: 'CA', zipCode: '91335' },
{ city: 'Lake Balboa', state: 'CA', zipCode: '91406' },
{ city: 'Granada Hills', state: 'CA', zipCode: '91344' },
{ city: 'Encino', state: 'CA', zipCode: '91316' },
{ city: 'Westminster', state: 'CA', zipCode: '92683' }

  ];
  

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (5000 - 1000) + 1000);
  return `${number} Industrial Drive`;
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
      'will@bjakesjobs.com'
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