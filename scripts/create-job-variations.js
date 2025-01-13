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
${benefits}`,

    `Use these points as inspiration but create a construction-focused description using only h2 and h3 tags for headings:

Create a BRIEF job description (200 words max) that's perfect for job boards. Seeking a ${jobType} at ${company} in ${city}, ${state} for ongoing work.

## Role Overview
- Position: ${jobType}
- Experience: ${experience} years as a ${jobType}
- Location: ${city}, ${state}

## Qualifications
${qualifications}

## Responsibilities
${responsibilities}`
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
}

const JOB_TYPES = {
  "PLC Technician": {
    "minValue": 55,
    "maxValue": 70,
    "experienceLevel": "midLevel",
    "category": "Controls",
    "team": "Industrial",
    "yearsExperience": "2+",
    "responsibilities": "Lead the commissioning and startup of PLC and DDC control systems, ensuring seamless integration and reliable performance. Collaborate with engineers, clients, and electrical teams to solve automation challenges and deliver high-quality outcomes. Maintain detailed records of system modifications and operations, ensuring all project documentation aligns with current statuses. Provide technical leadership on-site, guiding subcontractors, enforcing quality control standards, and resolving issues efficiently. Travel to client sites as needed (up to 30%) to oversee project implementation and ensure operational success.",
    "qualifications": "2+ years of experience with Siemens TIA Portal, Allen Bradley Studio 5000, or similar platforms such as Inductive Automation Ignition or ICONICS. Proficiency in PLC installation, commissioning, and troubleshooting. Strong understanding of HVAC control theory, electronics, and electrical circuits. Excellent communication skills, the ability to work independently, and a proactive approach to problem-solving.",
    "prompt": "Create a job description for a PLC Technician specializing in the commissioning, troubleshooting, and integration of automation systems for data centers and industrial facilities."
  },
    "Security Technician": {
      "minValue": 22,
      "maxValue": 32,
      "experienceLevel": "entryLevel",
      "category": "Security",
      "team": "Commercial",
      "yearsExperience": "1-3",
      "responsibilities": "Install, configure, and troubleshoot security systems, including IP cameras, access control systems, motion detectors, and alarm systems at commercial job sites. Pull, terminate, and label low-voltage cables, ensuring proper routing and compliance with site specifications. Perform comprehensive on-site testing to verify system functionality, connectivity, and power reliability. Collaborate with project managers and general contractors to align installations with project timelines. Maintain accurate installation records and documentation, ensuring all systems meet customer and industry standards. Provide training to clients on basic system operation and troubleshooting. Adhere to safety protocols and maintain cleanliness and organization on job sites.",
      "qualifications": "Experience with security systems installation, knowledge of cable routing and termination, familiarity with IP networking and camera systems, proficiency in troubleshooting hardware and software issues, and strong communication and organizational skills.",
      "prompt": "Create a job description for a Security Technician focusing on advanced installations, system configuration, and maintenance for commercial environments."
    },
    "Journeyman Electrician": {
      "minValue": 29,
      "maxValue": 35,
      "experienceLevel": "midLevel",
      "category": "Journeyman",
      "team": "Commercial",
      "yearsExperience": "3-5",
      "responsibilities": "Install and maintain commercial electrical systems, including switchgear, transformers, lighting fixtures, and power circuits. Accurately measure, cut, and bend conduit (EMT, rigid) for system installations. Perform wire pulling, labeling, and termination, ensuring neat and secure connections. Troubleshoot electrical issues using tools like multimeters and ensure circuits meet NEC code requirements. Work collaboratively with other trades to plan and execute electrical installations within construction schedules. Supervise apprentices and provide guidance on proper techniques and safety practices. Maintain organized and clean job sites, adhering to all safety and operational standards.",
      "qualifications": "Valid journeyman electrician license, in-depth knowledge of NEC codes, proficiency with conduit bending and electrical tools, strong troubleshooting skills, and leadership abilities to manage apprentices and teams.",
      "prompt": "Create a job description for a Commercial Journeyman Electrician focusing on large-scale installations, maintenance, and troubleshooting in construction environments."
    },
    "Apprentice Electrician": {
      "minValue": 18,
      "maxValue": 23,
      "experienceLevel": "entryLevel",
      "category": "Apprentice",
      "team": "Residential",
      "yearsExperience": "0-2",
      "responsibilities": "Assist licensed electricians with the installation of residential and commercial electrical systems, including wiring for outlets, switches, and lighting fixtures. Pull and route electrical cables through walls, ceilings, and conduits. Prepare conduit and assist in mounting electrical boxes and panels. Maintain job site organization, including inventory management and tool preparation. Perform basic tasks like wire labeling and clean-up to support project progress. Shadow experienced electricians to gain hands-on knowledge and develop skills in electrical installations and safety practices.",
      "qualifications": "Basic understanding of electrical systems and hand tools, eagerness to learn, strong physical stamina, attention to detail, and ability to follow safety guidelines and instructions.",
      "prompt": "Create a job description for an Apprentice Electrician focusing on learning and assisting with electrical installations in residential and commercial projects."
    },
    "Cable Installer": {
      "minValue": 19,
      "maxValue": 25,
      "experienceLevel": "seniorLevel",
      "category": "Voice Data",
      "team": "Commercial",
      "yearsExperience": "3-5",
      "responsibilities": "Install structured cabling systems, including Cat5e, Cat6, and fiber optics, in commercial and industrial environments. Terminate and test copper and fiber optic cables using precision tools and advanced testers. Mount, secure, and organize network racks, patch panels, and cable trays. Dress and bundle cables neatly to meet site-specific and industry standards. Troubleshoot and resolve connectivity issues during and after installations. Read and interpret blueprints and construction diagrams to ensure accurate installations. Coordinate with project teams to integrate cabling systems into larger infrastructure projects. Maintain detailed installation records and ensure adherence to quality and safety protocols.",
      "qualifications": "Extensive experience with structured cabling, expertise in terminating and testing fiber optics, knowledge of TIA/EIA cabling standards, strong troubleshooting skills, and organizational ability to manage tools and inventory.",
      "prompt": "Create a job description for a Structured Voice and Data Cable Installer focusing on advanced cabling installations, terminating cat 5 and 6, patch panels, cable trays, and infrastructure setup for commercial environments."
    },
    "Data Center Technician": {
      "minValue": 25,
      "maxValue": 33,
      "experienceLevel": "seniorLevel",
      "category": "Data Center",
      "team": "Commercial",
      "yearsExperience": "3-5",
      "responsibilities": "Install server racks, cabinets, and power distribution units (PDUs) in large-scale data centers, ensuring proper alignment and anchoring. Route, secure, and label high-density cabling within overhead trays, underfloor systems, and racks, maintaining a clean and organized setup. Perform cable testing and troubleshooting using advanced diagnostic tools. Collaborate with project managers, engineers, and other trades to meet strict installation schedules and technical requirements. Maintain adherence to cleanliness, safety, and operational standards in sensitive data center environments. Manage materials and inventory to support ongoing projects and provide detailed documentation of completed work.",
      "qualifications": "Extensive experience in data center environments, knowledge of power and cooling systems, proficiency in cable management and testing tools, understanding of network configurations, and strong documentation skills.",
      "prompt": "Create a job description for a Data Center Technician focusing on advanced infrastructure installations, cable management, and system integration for enterprise-level data centers."
    },
    "Electrician Helper": {
    "minValue": 15,
    "maxValue": 18,
    "experienceLevel": "entryLevel",
    "category": "Apprentice",
    "team": "Commercial",
    "yearsExperience": "0-2",
    "responsibilities": "Assist electricians by pulling and securing wires through conduit systems, cutting and preparing conduit, and mounting electrical boxes. Organize tools and materials to ensure efficient daily operations. Perform basic tasks such as assembling light fixtures and preparing panels for wiring. Keep job sites clean, organized, and compliant with safety standards. Remove debris and assist with inventory management. Provide general support for measuring, marking, and layout tasks under the direction of licensed electricians.",
    "qualifications": "Basic understanding of electrical tools and safety protocols, willingness to learn and follow instructions, strong physical stamina for handling materials, and a reliable work ethic.",
    "prompt": "Create a job description for an Electrician Helper focusing on providing support for commercial electrical installations and maintenance."
  },
  "Alarm Installer": {
    "minValue": 23,
    "maxValue": 30,
    "experienceLevel": "entryLevel",
    "category": "Fire Alarm",
    "team": "Commercial",
    "yearsExperience": "0-2",
    "responsibilities": "Assist in the installation of fire alarm systems by pulling and terminating low-voltage wiring. Mount devices such as smoke detectors, pull stations, and notification appliances according to detailed layout plans. Perform system labeling, basic testing, and adjustments under supervision. Prepare materials and tools for daily tasks while maintaining a clean and organized work environment. Collaborate with senior installers to meet project schedules and maintain compliance with fire safety codes.",
    "qualifications": "Basic knowledge of low-voltage wiring and tools, ability to follow installation instructions and safety guidelines, attention to detail, and physical ability to lift equipment and work on ladders.",
    "prompt": "Create a job description for a Fire Alarm Installer focusing on assisting with the installation and basic testing of fire alarm systems in commercial environments."
  },
  "Fire Alarm Technician": {
    "minValue": 25,
    "maxValue": 30,
    "experienceLevel": "midLevel",
    "category": "Fire Alarm",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install, inspect, and maintain fire alarm systems, ensuring all components, including control panels, smoke detectors, and pull stations, meet design specifications and safety standards. Perform system testing and troubleshooting to resolve functionality issues and ensure compliance with local fire codes. Route and secure low-voltage wiring in walls and ceilings, maintaining an organized and professional installation. Coordinate with general contractors and electricians to integrate fire alarm systems with other building systems. Document installation and maintenance details, providing clear records for compliance and client use. Train end-users on the operation of fire alarm systems and respond to service calls as needed.",
    "qualifications": "Proficiency with fire alarm control panels and programming, strong understanding of local fire codes and NFPA standards, experience with troubleshooting and maintaining fire alarm systems, and excellent communication and problem-solving skills.",
    "prompt": "Create a job description for a Fire Alarm Technician focusing on installation, testing, and maintenance of fire alarm systems for large commercial properties."
  },
  "Audio Visual Technician": {
    "minValue": 25,
    "maxValue": 30,
    "experienceLevel": "midLevel",
    "category": "Audio Visual",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install, configure, and test audio-visual systems, including projectors, displays, speakers, and microphones, for corporate and commercial clients. Route, terminate, and label low-voltage cables, ensuring secure and neat installations. Mount and align AV equipment such as wall displays and ceiling speakers, adhering to site plans and standards. Perform system troubleshooting and calibration to optimize audio and video quality. Collaborate with IT teams and construction crews to integrate AV systems with larger infrastructure projects. Maintain detailed documentation of equipment configurations, wiring diagrams, and installation notes. Provide basic training to clients on operating installed systems and address post-installation issues.",
    "qualifications": "Experience in audio-visual installations, strong knowledge of AV components and connectivity, proficiency in cable termination and routing, attention to detail for mounting and alignment, and excellent troubleshooting skills.",
    "prompt": "Create a job description for an Audio Visual Technician focusing on professional installation, configuration, and testing of AV systems in commercial environments."
  },
  "Fiber Optics Technician": {
    "minValue": 28,
    "maxValue": 38,
    "experienceLevel": "midLevel",
    "category": "Fiber Optics",
    "team": "Commercial",
    "yearsExperience": "3-5",
    "responsibilities": "Install, terminate, and test fiber optic cables in commercial and industrial environments. Perform splicing of single-mode and multi-mode fibers using fusion splicers. Route and secure fiber optic cables within conduits, trays, and overhead systems, ensuring compliance with site standards. Conduct OTDR testing and troubleshooting to ensure signal integrity and performance. Collaborate with project managers, engineers, and other trades to integrate fiber optic systems with network infrastructure. Maintain detailed documentation of splicing, testing, and installation activities for client records and compliance. Ensure installations are clean, organized, and meet industry best practices.",
    "qualifications": "Experience in fiber optic installations and splicing, proficiency with OTDR testing and troubleshooting, strong knowledge of industry standards (e.g., TIA/EIA), attention to detail for cable routing and termination, and effective communication skills for team collaboration.",
    "prompt": "Create a job description for a Fiber Optics Technician focusing on professional installation, splicing, and testing of fiber optic systems in commercial environments."
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
  },
  'Convergint': {
    name: 'Convergint',
    sameAs: 'https://www.convergint.com/',
    logo: 'https://www.convergint.com/wp-content/uploads/2021/06/logo-on-dark-blue.png'
  },
  'Prime Partners': {
    name: 'Prime Partners',
    sameAs: 'https://www.primepartners.com/',
    logo: 'https://primepartners.info/wp-content/uploads/2020/05/cropped-Prime-Partners-Logo-NO-BG-1.png'
  },
  'Valley Alarm': {
    name: 'Valley Alarm',
    sameAs: 'https://valleyalarm.com/',
    logo: 'https://www.valleyalarm.com/wp-content/uploads/2024/07/Valley-Alarm-Logo-web.png'
  },
  'Alert 360': {
    name: 'Alert 360',
    sameAs: 'https://alert360.com/',
    logo: 'https://www.alert360.com/sites/default/files/Alert%20360%20Santa-01%202.png'
  },
  'Safe and Sound': {
    name: 'Safe and Sound',
    sameAs: 'https://getsafeandsound.com/',
    logo: 'https://getsafeandsound.com/wp-content/uploads/2020/08/cropped-safe-and-sound-logo-460.png'
  },
  'Barry Bros Security': {
    name: 'Barry Bros Security',
    sameAs: 'https://barrybros.com/',
    logo: 'https://www.barrybros.com/wp-content/themes/barrybros/img/logo.svg'
  },
  'Koorsen': {
    name: 'Koorsen',
    sameAs: 'https://koorsen.com/',
    logo: 'https://www.koorsen.com/wp-content/uploads/2022/02/Koorsen-Logo.svg'
  }
};

const LOCATIONS = [
  { "city": "Phoenix", "state": "AZ", "zipCode": "85001" },
  { "city": "Glendale", "state": "AZ", "zipCode": "85301" },
  { "city": "Scottsdale", "state": "AZ", "zipCode": "85250" },
  { "city": "Tempe", "state": "AZ", "zipCode": "85280" },
  { "city": "Mesa", "state": "AZ", "zipCode": "85201" },
  { "city": "Chandler", "state": "AZ", "zipCode": "85224" },
  { "city": "Gilbert", "state": "AZ", "zipCode": "85233" },
  { "city": "Peoria", "state": "AZ", "zipCode": "85345" },
  { "city": "Surprise", "state": "AZ", "zipCode": "85374" },
  { "city": "Avondale", "state": "AZ", "zipCode": "85323" },
  { "city": "Denver", "state": "CO", "zipCode": "80201" },
  { "city": "Aurora", "state": "CO", "zipCode": "80010" },
  { "city": "Lakewood", "state": "CO", "zipCode": "80226" },
  { "city": "Thornton", "state": "CO", "zipCode": "80229" },
  { "city": "Arvada", "state": "CO", "zipCode": "80002" },
  { "city": "Westminster", "state": "CO", "zipCode": "80030" },
  { "city": "Centennial", "state": "CO", "zipCode": "80112" },
  { "city": "Boulder", "state": "CO", "zipCode": "80301" },
  { "city": "Fort Collins", "state": "CO", "zipCode": "80521" },
  { "city": "Greeley", "state": "CO", "zipCode": "80631" },
  { "city": "Fort Lauderdale", "state": "FL", "zipCode": "33301" },
  { "city": "Hollywood", "state": "FL", "zipCode": "33019" },
  { "city": "Pompano Beach", "state": "FL", "zipCode": "33060" },
  { "city": "Davie", "state": "FL", "zipCode": "33314" },
  { "city": "Plantation", "state": "FL", "zipCode": "33324" },
  { "city": "Sunrise", "state": "FL", "zipCode": "33313" },
  { "city": "Miramar", "state": "FL", "zipCode": "33023" },
  { "city": "Coral Springs", "state": "FL", "zipCode": "33065" },
  { "city": "Weston", "state": "FL", "zipCode": "33326" },
  { "city": "Deerfield Beach", "state": "FL", "zipCode": "33441" },
  { "city": "Orlando", "state": "FL", "zipCode": "32801" },
  { "city": "Kissimmee", "state": "FL", "zipCode": "34741" },
  { "city": "Sanford", "state": "FL", "zipCode": "32771" },
  { "city": "Altamonte Springs", "state": "FL", "zipCode": "32701" },
  { "city": "Oviedo", "state": "FL", "zipCode": "32765" },
  { "city": "Winter Park", "state": "FL", "zipCode": "32789" },
  { "city": "Apopka", "state": "FL", "zipCode": "32703" },
  { "city": "Ocoee", "state": "FL", "zipCode": "34761" },
  { "city": "Clermont", "state": "FL", "zipCode": "34711" },
  { "city": "Winter Garden", "state": "FL", "zipCode": "34787" },
  { "city": "Tampa", "state": "FL", "zipCode": "33601" },
  { "city": "St. Petersburg", "state": "FL", "zipCode": "33701" },
  { "city": "Clearwater", "state": "FL", "zipCode": "33755" },
  { "city": "Brandon", "state": "FL", "zipCode": "33510" },
  { "city": "Largo", "state": "FL", "zipCode": "33770" },
  { "city": "Riverview", "state": "FL", "zipCode": "33578" },
  { "city": "Palm Harbor", "state": "FL", "zipCode": "34682" },
  { "city": "Pinellas Park", "state": "FL", "zipCode": "33781" },
  { "city": "Wesley Chapel", "state": "FL", "zipCode": "33543" },
  { "city": "Plant City", "state": "FL", "zipCode": "33563" },
  { "city": "Washington", "state": "DC", "zipCode": "20001" },
  { "city": "Arlington", "state": "VA", "zipCode": "22201" },
  { "city": "Alexandria", "state": "VA", "zipCode": "22301" },
  { "city": "Silver Spring", "state": "MD", "zipCode": "20901" },
  { "city": "Bethesda", "state": "MD", "zipCode": "20814" },
  { "city": "Falls Church", "state": "VA", "zipCode": "22046" },
  // { "city": "Rockville", "state": "MD", "zipCode": "20850" },
  // { "city": "Reston", "state": "VA", "zipCode": "20190" },
  // { "city": "Gaithersburg", "state": "MD", "zipCode": "20877" },
  // { "city": "Bowie", "state": "MD", "zipCode": "20715" },
  // { "city": "Richmond", "state": "VA", "zipCode": "23218" },
  // { "city": "Henrico", "state": "VA", "zipCode": "23228" },
  // { "city": "Henrico", "state": "VA", "zipCode": "23228" },
  // { "city": "Chesterfield", "state": "VA", "zipCode": "23832" },
  // { "city": "Petersburg", "state": "VA", "zipCode": "23803" },
  // { "city": "Hopewell", "state": "VA", "zipCode": "23860" },
  // { "city": "Mechanicsville", "state": "VA", "zipCode": "23111" },
  // { "city": "Virginia Beach", "state": "VA", "zipCode": "23450" },
  // { "city": "Norfolk", "state": "VA", "zipCode": "23510" },
  // { "city": "Chesapeake", "state": "VA", "zipCode": "23320" },
  // { "city": "Newport News", "state": "VA", "zipCode": "23606" },
  // { "city": "Hampton", "state": "VA", "zipCode": "23661" },
  // { "city": "Suffolk", "state": "VA", "zipCode": "23434" },
  // { "city": "Portsmouth", "state": "VA", "zipCode": "23704" },
  // { "city": "Wilmington", "state": "NC", "zipCode": "28401" },
  // { "city": "Leland", "state": "NC", "zipCode": "28451" },
  // { "city": "Southport", "state": "NC", "zipCode": "28461" },
  // { "city": "Raleigh", "state": "NC", "zipCode": "27601" },
  // { "city": "Cary", "state": "NC", "zipCode": "27511" },
  // { "city": "Durham", "state": "NC", "zipCode": "27701" },
  // { "city": "Chapel Hill", "state": "NC", "zipCode": "27514" },
  // { "city": "Wake Forest", "state": "NC", "zipCode": "27587" },
  // { "city": "Fayetteville", "state": "NC", "zipCode": "28301" },
  // { "city": "Hope Mills", "state": "NC", "zipCode": "28348" },
  // { "city": "Spring Lake", "state": "NC", "zipCode": "28390" },
  // { "city": "Charlotte", "state": "NC", "zipCode": "28202" },
  // { "city": "Concord", "state": "NC", "zipCode": "28025" },
  // { "city": "Huntersville", "state": "NC", "zipCode": "28078" },
  // { "city": "Gastonia", "state": "NC", "zipCode": "28052" },
  // { "city": "Matthews", "state": "NC", "zipCode": "28105" },
  // { "city": "Greensboro", "state": "NC", "zipCode": "27401" },
  // { "city": "High Point", "state": "NC", "zipCode": "27260" },
  // { "city": "Burlington", "state": "NC", "zipCode": "27215" },
  // { "city": "Winston-Salem", "state": "NC", "zipCode": "27101" },
  // { "city": "Charleston", "state": "SC", "zipCode": "29401" },
  // { "city": "Mount Pleasant", "state": "SC", "zipCode": "29464" },
  // { "city": "North Charleston", "state": "SC", "zipCode": "29405" },
  // { "city": "Summerville", "state": "SC", "zipCode": "29483" },
  // { "city": "Goose Creek", "state": "SC", "zipCode": "29445" },
  // { "city": "Greenville", "state": "SC", "zipCode": "29601" },
  // { "city": "Spartanburg", "state": "SC", "zipCode": "29301" },
  // { "city": "Anderson", "state": "SC", "zipCode": "29621" },
  // { "city": "Simpsonville", "state": "SC", "zipCode": "29681" },
  // { "city": "Atlanta", "state": "GA", "zipCode": "30301" },
  // { "city": "Marietta", "state": "GA", "zipCode": "30060" },
  // { "city": "Smyrna", "state": "GA", "zipCode": "30080" },
  // { "city": "Roswell", "state": "GA", "zipCode": "30075" },
  // { "city": "Alpharetta", "state": "GA", "zipCode": "30004" },
  // { "city": "Nashville", "state": "TN", "zipCode": "37201" },
  // { "city": "Franklin", "state": "TN", "zipCode": "37064" },
  // { "city": "Hendersonville", "state": "TN", "zipCode": "37075" },
  // { "city": "Murfreesboro", "state": "TN", "zipCode": "37130" },
  // { "city": "Miami", "state": "FL", "zipCode": "33101" },
  // { "city": "Hialeah", "state": "FL", "zipCode": "33010" },
  // { "city": "Miami Gardens", "state": "FL", "zipCode": "33056" },
  // { "city": "Homestead", "state": "FL", "zipCode": "33030" },
  // { "city": "North Miami Beach", "state": "FL", "zipCode": "33160" }
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