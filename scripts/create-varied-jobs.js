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
  'Commercial Electrician': {
    minValue: 35,
    maxValue: 40,
    experienceLevel: 'midLevel',
    category: 'Journeyman',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Install and maintain commercial security systems, program access control and surveillance equipment, configure IP camera networks and VLANs, implement cybersecurity measures for security networks, manage credential databases, coordinate with IT teams for network integration, supervise installation of biometric devices, perform system health monitoring, document system configurations, train end users on security platforms, maintain detailed testing records, integrate with building automation systems',
    qualifications: 'Security+ certification preferred, extensive experience with VMS platforms, proven expertise in access control systems, demonstrated ability with IP networking, advanced knowledge of cybersecurity protocols, certification in security system programming, strong IT and database management skills, experience with enterprise security architecture, clean background check required',
    prompt: 'Create a job description for a Commercial Security Systems Specialist focusing on enterprise-level integrated security solutions. Must understand complete security infrastructure including surveillance, access control, and intrusion detection. Experience with network architecture, cybersecurity, and system programming required. Must have Security+, ESA Level 1, and government clearance eligibility. Knowledge of IT security, cloud platforms, and database management essential. Position involves designing and implementing comprehensive security solutions, managing enterprise databases, and coordinating with IT teams. Must understand VLANs, QoS, and network protocols for security applications. Role includes system health monitoring, documentation maintenance, and end-user training. Some projects require after-hours support and maintenance windows. Physical requirements include ladder work, cable installation, and equipment mounting.'
},
'Security Technician': {
    minValue: 28,
    maxValue: 36,
    experienceLevel: 'entryLevel',
    category: 'Security',
    team: 'Commercial',
    yearsExperience: '1-3',
    responsibilities: 'Install and certify structured cabling systems, perform fiber optic terminations and testing, implement data center cable management, coordinate pathway installations, maintain clean room protocols, operate cable certification equipment, install overhead cable tray systems, document testing results and warranties, perform high-density rack cabling, maintain separation in hot aisle/cold aisle environments, ensure compliance with data center standards',
    qualifications: 'BICSI Installer 1 certification required, demonstrated experience with structured cabling systems, proficiency in fiber optic installation, expertise with cable testing equipment, knowledge of data center infrastructure, experience with documentation systems, understanding of TIA standards, proven technical documentation skills, ability to read and create cable drawings',
    prompt: 'Create a job description for a Data Center Infrastructure Technician specializing in critical facility cabling. Must understand structured cabling systems, fiber optics, and data center standards. Experience with high-density installations, testing procedures, and documentation required. BICSI Installer 1 certification, OSHA-10, and clean room experience required. Knowledge of cable testing, pathway requirements, and infrastructure design essential. Position involves installing and certifying enterprise cabling systems in mission-critical environments. Must understand fiber optic technologies, cable management best practices, and testing protocols. Role includes maintaining detailed documentation, warranty records, and test results. Some projects require off-hours work in active facilities. Physical requirements include working in confined spaces and managing hot/cold aisle environments.'
},
'Cable Installer': {
    minValue: 20,
    maxValue: 30,
    experienceLevel: 'entryLevel',
    category: 'Voice Data',
    team: 'Commercial',
    yearsExperience: '1-5',
    responsibilities: 'Assist with electrical system installations, learn commercial wiring methods, support power distribution projects, help with lighting control programming, install conduit and cable pathways, maintain material inventory, operate lift equipment under supervision, assist with fire alarm installation, document daily work activities, support panel installation and testing, learn building automation basics, coordinate with other trades',
    qualifications: 'High school diploma/GED required, enrollment in apprenticeship program, basic electrical knowledge, ability to read construction drawings, proficiency with hand tools, valid driver license, physical ability to lift heavy materials, good communication skills, basic computer proficiency, commitment to ongoing education',
    prompt: 'Create a job description for an Electrical Construction Apprentice focusing on commercial projects. Entry-level position learning electrical installation including distribution systems, lighting controls, and life safety. Must be enrolled in state-approved apprenticeship program. Basic construction experience helpful but not required. Position involves learning commercial electrical methods including conduit installation, wire pulling, and equipment mounting. Will work under journeyman supervision learning proper techniques, blueprint reading, and safety procedures. Must have basic hand tools and reliable transportation. Role includes material handling, documentation, and coordination with other trades. Physical requirements include ladder work, lift operation, and material movement. Must balance full-time work with required apprenticeship classes. Position offers exposure to various commercial projects and advancement opportunities. Weekend work possible during critical phases. Clean background check and drug test required.'
},
'Commercial Apprentice': {
    minValue: 18,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'Apprentice',
    team: 'Commercial',
    yearsExperience: '0-3',
    responsibilities: 'Design and install complete electrical systems, calculate load requirements, coordinate with BIM teams, supervise installation crews, implement lighting control systems, manage project material logistics, perform system commissioning, install emergency power systems, coordinate with mechanical trades, program building automation interfaces, mentor junior technicians',
    qualifications: 'Journeyman electrical license, experience with BIM coordination, expertise in lighting controls, proven project management skills, certification for multiple lift types, strong leadership abilities, knowledge of energy codes, proficiency with building automation systems, demonstrated safety management skills',
    prompt: 'Create a job description for a Lead Commercial Electrician specializing in large-scale construction projects. Must understand complete building systems including power distribution, controls, and automation. Experience with project management, BIM coordination, and crew supervision required. Must have Journeyman License, OSHA-30, and equipment certifications. Knowledge of energy codes, control systems, and emergency power essential. Position involves managing complex installations, coordinating multiple trades, and mentoring team members. Must understand green building requirements, system integration, and commissioning procedures. Role includes material management, quality control, and project documentation. Travel between sites required. Physical requirements include working at heights, coordinating installations, and operating equipment.'
},
'Data Center Technician': {
    minValue: 28,
    maxValue: 36,
    experienceLevel: 'midLevel',
    category: 'DataCenter',
    team: 'Commercial',
    yearsExperience: '3-5',
    responsibilities: 'Monitor and maintain critical data center infrastructure, perform server installations and decommissions, manage cable plant documentation, implement hot/cold aisle containment, coordinate maintenance windows, perform power circuit installations, maintain battery backup systems, monitor environmental controls, execute change management procedures, manage equipment lifecycle, perform network hardware installations, maintain security protocols',
    qualifications: 'BICSI Data Center Technician certification preferred, experience with critical infrastructure management, experience dressing and terminating cables, demonstrated ability with DCIM systems, strong documentation skills, experience with change management procedures, clean background check required',
    prompt: 'Create a job description for a Data Center Operations Technician specializing in critical facility management. Must understand complete data center infrastructure including power, cooling, and monitoring systems. Experience with server deployment, maintenance procedures, and documentation required. Must have CDCMP, OSHA-30, and ability to obtain security clearance. Knowledge of DCIM platforms, environmental monitoring, and maintenance procedures essential. Position involves managing critical systems, coordinating maintenance activities, and maintaining facility documentation. Must understand power distribution, cooling dynamics, and security protocols. Role includes equipment lifecycle management, change control, and procedure documentation. Position requires 24/7 on-call rotation. Physical requirements include lifting server equipment, working in confined spaces, and managing critical infrastructure.'
},
'Rack Stack Installer': {
    minValue: 19,
    maxValue: 25,
    experienceLevel: 'entryLevel',
    category: 'DataCenter',
    team: 'Commercial',
    yearsExperience: '1-3',
    responsibilities: 'Install and configure server rack infrastructure, perform structured cabling installations, implement cable management systems, mount network equipment, install power distribution units, coordinate equipment deployments, maintain rack documentation, perform hardware inventory management, execute rack and stack procedures, implement labeling systems, maintain clean room protocols, coordinate with network teams',
    qualifications: 'Experience with rack and stack procedures, proficiency in structured cabling, expertise with mounting systems, knowledge of power distribution, experience with inventory systems, understanding of network hardware, proven attention to detail, ability to read technical documentation',
    prompt: 'Create a job description for a Data Center Rack Infrastructure Specialist focusing on equipment deployment. Must understand rack systems, power distribution, and cable management. Experience with hardware installation, structured cabling, and documentation required. BICSI certification and clean room experience preferred. Knowledge of mounting systems, inventory management, and deployment procedures essential. Position involves installing and configuring rack infrastructure in critical environments. Must understand power distribution, cable management best practices, and equipment specifications. Role includes maintaining detailed documentation, coordinating deliveries, and managing inventory. Work requires off-hours maintenance windows. Physical requirements include heavy lifting, detailed mechanical work, and extended periods in data center environments.'
},
'Fiber Optic Technician': {
    minValue: 32,
    maxValue: 46,
    experienceLevel: 'midLevel',
    category: 'Fiber',
    team: 'Commercial',
    yearsExperience: '2-5',
    responsibilities: 'Design and implement fiber optic networks, perform fusion splicing operations, test and certify fiber installations, maintain splice documentation, install fiber distribution systems, configure DWDM systems, perform OTDR testing, implement fiber management systems, coordinate pathway installations, maintain clean work environment, perform emergency restoration, train junior technicians',
    qualifications: 'FOA certification required, extensive experience with fusion splicing, proven expertise in OTDR testing, demonstrated ability with fiber management systems, advanced knowledge of fiber types, certification in multiple splice platforms, strong troubleshooting skills, experience with documentation systems, proven emergency response experience',
    prompt: 'Create a job description for a Fiber Optic Network Specialist specializing in enterprise fiber systems. Must understand complete fiber infrastructure including single-mode, multi-mode, and DWDM systems. Experience with fusion splicing, OTDR testing, and emergency restoration required. Must have FOA certification, OSHA-10, and splice platform certifications. Knowledge of fiber types, testing procedures, and documentation essential. Position involves designing and implementing fiber networks, performing precision splicing, and maintaining detailed records. Must understand loss budgets, fiber management, and testing protocols. Role includes emergency response, system certification, and mentoring junior technicians. Some projects require after-hours emergency response. Physical requirements include performing precise hand work, climbing ladders, and working in confined spaces.'
},
'Data Center Cable Tech': {
   minValue: 25,
   maxValue: 33,
   experienceLevel: 'entryLevel',
   category: 'Voice Data',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install and dress Category 6/6A cabling systems, terminate copper and fiber connections, maintain proper cable management in server racks, install overhead cable tray and ladder rack, perform cable testing and certification, document test results and warranties, maintain clean room protocols, organize patch panel layouts, implement proper cable routing and separation, assist with fiber trunk installation, maintain detailed labeling systems',
   qualifications: 'BICSI Installer 1 preferred, experience with structured cabling systems, proficiency in cable termination techniques, knowledge of testing procedures, understanding of cable management best practices, ability to read network drawings, experience with labeling systems, attention to detail, basic understanding of network hardware',
   prompt: 'Create a job description for a Data Center Cable Technician focusing on structured cabling installation. Must understand cable management, termination standards, and testing procedures. Experience with Cat 6/6A installation, rack management, and documentation required. BICSI certification preferred but not required. Knowledge of cable testing, proper dressing techniques, and labeling standards essential. Position involves installing and certifying copper/fiber cabling in data center environments. Must understand proper routing, separation requirements, and rack management. Role includes maintaining test documentation, as-built records, and warranty information. Some projects require off-hours maintenance windows. Physical requirements include ladder work, extended periods of cable termination, and working in active data centers. Must follow clean room protocols and maintain organized work areas. Position offers exposure to enterprise data center environments and advancement opportunities. Weekend work possible during maintenance windows. Clean background check required.'
},
'Fire Alarm Installer': {
   minValue: 22,
   maxValue: 30,
   experienceLevel: 'entryLevel',
   category: 'Fire Alarm',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install fire alarm control panels and devices, pull and terminate fire alarm cable, mount notification appliances and initiation devices, assist with system programming and testing, maintain detailed point-to-point wiring documentation, coordinate with other trades for device placement, perform pre-wire and trim-out phases, install conduit and cable pathways, troubleshoot system wiring issues, maintain proper color coding and labeling, assist with final testing and inspections',
   qualifications: 'Experience with commercial fire alarm systems, proficiency in blueprint reading, knowledge of NFPA 72 requirements, understanding of fire alarm circuit types, experience with basic programming, ability to use multimeter and testing equipment, attention to detail for documentation, understanding of voltage drop calculations, good communication skills for coordination',
   prompt: 'Create a job description for a Fire Alarm Installation Technician focusing on commercial new construction projects. Must understand fire alarm system installation including control panels, initiating devices, and notification appliances. Experience with fire alarm cable installation, device mounting, and basic programming preferred. NICET certification helpful but not required. Knowledge of NFPA 72, circuit types, and testing procedures essential. Position involves installing complete fire alarm systems in commercial buildings. Must understand proper wiring methods, device placement, and documentation requirements. Role includes maintaining detailed wiring records, coordinating with inspectors, and performing system testing. Some projects require working around other trades in active construction sites. Physical requirements include ladder work, cable pulling, and device mounting. Must be able to read blueprints and understand sequence of operations. Position offers exposure to various system types and advancement opportunities. Weekend work possible during critical testing phases. Clean background check and drug screening required.'
},
'Apprentice Electrician': {
   minValue: 18,
   maxValue: 25,
   experienceLevel: 'entry',
   category: 'Apprentice',
   team: 'Commercial',
   yearsExperience: '0-4',
   responsibilities: 'Assist journeyman electricians with installation and maintenance of electrical systems, learn to read electrical blueprints and diagrams, help install conduit and raceways, pull wire through conduit systems, assist with device and fixture installation, learn proper use of hand and power tools, maintain clean and safe work areas, organize materials and tools, assist with basic troubleshooting, document work performed, follow safety protocols, learn electrical code requirements, help with material handling and logistics, maintain tool inventory, learn proper testing procedures',
   qualifications: 'High school diploma or equivalent, enrollment in or acceptance to approved electrical apprenticeship program, basic math skills, ability to read and follow instructions, willingness to learn, reliable transportation, ability to lift 50+ pounds regularly, comfort working at heights and in confined spaces, basic computer skills, good communication abilities, strong work ethic, ability to work in various weather conditions, valid driver license, ability to pass drug test and background check',
   prompt: 'Create a job description for an Apprentice Electrician starting their career in the electrical trade. Position involves learning electrical installation and maintenance while assisting experienced electricians. Must be enrolled in or accepted to an approved apprenticeship program. Role includes helping with conduit installation, wire pulling, and basic electrical work under direct supervision. Will learn blueprint reading, electrical theory, and proper installation techniques. Physical requirements include lifting, climbing ladders, and working in various positions. Schedule includes both on-the-job training and required classroom instruction. Must demonstrate commitment to learning the trade and following safety protocols.'
},
'Security Alarm Installer': {
   minValue: 22,
   maxValue: 32,
   experienceLevel: 'entryLevel',
   category: 'Voice Data',
   team: 'Commercial',
   yearsExperience: '1-3',
   responsibilities: 'Install and service security systems including intrusion detection, access control, and video surveillance, mount and wire security panels and devices, program alarm systems and test functionality, run and terminate low voltage cabling, configure wireless security components, install motion sensors and glass break detectors, mount and aim security cameras, pull cable through existing structures, program user codes and explain system operation to customers, troubleshoot system issues, document installation details, maintain tool and equipment inventory, coordinate with sales team on installation requirements',
   qualifications: 'High school diploma or equivalent, basic low voltage experience preferred, ability to read system diagrams and floor plans, proficiency with hand tools and power tools, comfort working at heights on ladders, valid driver license and clean driving record, ability to lift 50+ pounds regularly, good customer service skills, basic computer proficiency, ability to pass background check and drug test, comfortable working in various weather conditions, willingness to be on call rotation',
   prompt: 'Create a job description for a Security Alarm Installer focused on residential and light commercial security systems. Position involves installing and servicing intrusion detection, cameras, and access control systems. Must understand low voltage wiring methods and basic networking concepts. Role includes mounting equipment, pulling cable, programming systems, and explaining operation to customers. Experience with wireless security components and IP cameras helpful but not required. Physical requirements include ladder work, crawl space access, and attic work. Must have reliable transportation and tools. Position requires good customer service skills and professional appearance. Some on-call rotation required for emergency service. Background check and drug test mandatory. Training provided on specific systems and installation methods.'
},
'Journeyman Electrician': {
   minValue: 32,
   maxValue: 40,
   experienceLevel: 'skilled',
   category: 'Journeyman',
   team: 'Commercial',
   yearsExperience: '4-8',
   responsibilities: 'Install, maintain and repair electrical systems in commercial and industrial settings, interpret and execute plans from electrical blueprints, perform complex conduit bending and installation, supervise apprentice electricians, troubleshoot electrical problems using diagnostic equipment, install switchgear and transformers, perform load calculations and voltage drop calculations, maintain power distribution systems, install and program lighting control systems, ensure NEC code compliance, coordinate with general contractors and other trades, maintain detailed documentation of all work performed, implement lockout/tagout procedures, perform emergency repairs, conduct system testing and commissioning',
   qualifications: 'Valid Journeyman Electrician license, comprehensive knowledge of NEC code requirements, proven experience in commercial electrical installation, advanced blueprint reading ability, expertise in power distribution systems, demonstrated leadership experience, proficiency with electrical test equipment, strong mathematical skills, thorough understanding of OSHA regulations, experience with various voltage systems up to 480V, valid driver license with clean record, complete tool set for commercial work, ability to work flexible hours when needed, physical ability to lift 50+ pounds',
   prompt: 'Create a job description for a Journeyman Electrician specializing in commercial and industrial installations. Must have comprehensive understanding of electrical systems and NEC requirements. Position involves installing and maintaining complex electrical systems including service equipment, distribution, and motor controls. Leadership role includes supervising apprentices and coordinating with other trades. Must be proficient in conduit installation, wire pulling, and termination techniques. Role requires advanced troubleshooting abilities and thorough documentation practices. Physical requirements include lifting heavy equipment, working at heights, and operating power tools. Position may require occasional overtime and emergency response. Must have complete tool set and reliable transportation. Drug test and background check required.'
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
  { city: 'Phoenix', state: 'AZ', zipCode: '85001' },
  { city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
  { city: 'Mesa', state: 'AZ', zipCode: '85201' },
  { city: 'Tempe', state: 'AZ', zipCode: '85281' },
  { city: 'Glendale', state: 'AZ', zipCode: '85301' },
  { city: 'Chandler', state: 'AZ', zipCode: '85225' },

  // Denver Area
  { city: 'Denver', state: 'CO', zipCode: '80201' },
  { city: 'Aurora', state: 'CO', zipCode: '80010' },
  { city: 'Lakewood', state: 'CO', zipCode: '80226' },
  { city: 'Centennial', state: 'CO', zipCode: '80112' },
  { city: 'Boulder', state: 'CO', zipCode: '80301' },

  // Fort Lauderdale Area
  { city: 'Fort Lauderdale', state: 'FL', zipCode: '33301' },
  { city: 'Hollywood', state: 'FL', zipCode: '33020' },
  { city: 'Pompano Beach', state: 'FL', zipCode: '33060' },
  { city: 'Coral Springs', state: 'FL', zipCode: '33065' },
  { city: 'Plantation', state: 'FL', zipCode: '33324' },

  // Orlando Area
  { city: 'Orlando', state: 'FL', zipCode: '32801' },
  { city: 'Kissimmee', state: 'FL', zipCode: '34741' },
  { city: 'Winter Park', state: 'FL', zipCode: '32789' },
  { city: 'Sanford', state: 'FL', zipCode: '32771' },
  { city: 'Altamonte Springs', state: 'FL', zipCode: '32701' },

  // Tampa Area
  { city: 'Tampa', state: 'FL', zipCode: '33601' },
  { city: 'St. Petersburg', state: 'FL', zipCode: '33701' },
  { city: 'Clearwater', state: 'FL', zipCode: '33755' },
  { city: 'Brandon', state: 'FL', zipCode: '33510' },
  { city: 'Largo', state: 'FL', zipCode: '33770' },

  // DC Area
  { city: 'Washington', state: 'DC', zipCode: '20001' },
  { city: 'Arlington', state: 'VA', zipCode: '22201' },
  { city: 'Alexandria', state: 'VA', zipCode: '22301' },
  { city: 'Bethesda', state: 'MD', zipCode: '20814' },
  { city: 'Silver Spring', state: 'MD', zipCode: '20910' },

  // Richmond Area
  { city: 'Richmond', state: 'VA', zipCode: '23219' },
  { city: 'Mechanicsville', state: 'VA', zipCode: '23111' },
  { city: 'Glen Allen', state: 'VA', zipCode: '23059' },
  { city: 'Chester', state: 'VA', zipCode: '23831' },
  { city: 'Midlothian', state: 'VA', zipCode: '23112' },

  // Virginia Beach Area
  { city: 'Virginia Beach', state: 'VA', zipCode: '23451' },
  { city: 'Norfolk', state: 'VA', zipCode: '23501' },
  { city: 'Chesapeake', state: 'VA', zipCode: '23320' },
  { city: 'Newport News', state: 'VA', zipCode: '23601' },
  { city: 'Hampton', state: 'VA', zipCode: '23666' },

  // Wilmington Area
  { city: 'Wilmington', state: 'NC', zipCode: '28401' },
  { city: 'Wrightsville Beach', state: 'NC', zipCode: '28480' },
  { city: 'Carolina Beach', state: 'NC', zipCode: '28428' },
  { city: 'Leland', state: 'NC', zipCode: '28451' },
  { city: 'Hampstead', state: 'NC', zipCode: '28443' },

  // Raleigh Area
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Durham', state: 'NC', zipCode: '27701' },
  { city: 'Cary', state: 'NC', zipCode: '27511' },
  { city: 'Chapel Hill', state: 'NC', zipCode: '27514' },
  { city: 'Wake Forest', state: 'NC', zipCode: '27587' },

  // Fayetteville Area
  { city: 'Fayetteville', state: 'NC', zipCode: '28301' },
  { city: 'Spring Lake', state: 'NC', zipCode: '28390' },
  { city: 'Hope Mills', state: 'NC', zipCode: '28348' },
  { city: 'Fort Bragg', state: 'NC', zipCode: '28307' },
  { city: 'Raeford', state: 'NC', zipCode: '28376' },

  // Charlotte Area
  { city: 'Charlotte', state: 'NC', zipCode: '28201' },
  { city: 'Concord', state: 'NC', zipCode: '28025' },
  { city: 'Gastonia', state: 'NC', zipCode: '28052' },
  { city: 'Rock Hill', state: 'SC', zipCode: '29730' },
  { city: 'Matthews', state: 'NC', zipCode: '28105' },

  // Greensboro Area
  { city: 'Greensboro', state: 'NC', zipCode: '27401' },
  { city: 'Winston-Salem', state: 'NC', zipCode: '27101' },
  { city: 'High Point', state: 'NC', zipCode: '27260' },
  { city: 'Burlington', state: 'NC', zipCode: '27215' },
  { city: 'Kernersville', state: 'NC', zipCode: '27284' },

  // Charleston Area
  { city: 'Charleston', state: 'SC', zipCode: '29401' },
  { city: 'Mount Pleasant', state: 'SC', zipCode: '29464' },
  { city: 'North Charleston', state: 'SC', zipCode: '29405' },
  { city: 'Summerville', state: 'SC', zipCode: '29483' },
  { city: 'Goose Creek', state: 'SC', zipCode: '29445' },

  // Greenville Area
  { city: 'Greenville', state: 'SC', zipCode: '29601' },
  { city: 'Spartanburg', state: 'SC', zipCode: '29301' },
  { city: 'Anderson', state: 'SC', zipCode: '29621' },
  { city: 'Greer', state: 'SC', zipCode: '29650' },
  { city: 'Mauldin', state: 'SC', zipCode: '29662' },

  // Atlanta Area
  { city: 'Atlanta', state: 'GA', zipCode: '30301' },
  { city: 'Marietta', state: 'GA', zipCode: '30060' },
  { city: 'Alpharetta', state: 'GA', zipCode: '30004' },
  { city: 'Decatur', state: 'GA', zipCode: '30030' },
  { city: 'Sandy Springs', state: 'GA', zipCode: '30328' },
  { city: 'Roswell', state: 'GA', zipCode: '30075' },
  { city: 'Johns Creek', state: 'GA', zipCode: '30097' },
  { city: 'Duluth', state: 'GA', zipCode: '30096' },
  { city: 'Kennesaw', state: 'GA', zipCode: '30144' },

  // Nashville Area
  { city: 'Nashville', state: 'TN', zipCode: '37201' },
  { city: 'Franklin', state: 'TN', zipCode: '37064' },
  { city: 'Murfreesboro', state: 'TN', zipCode: '37127' },
  { city: 'Hendersonville', state: 'TN', zipCode: '37075' },
  { city: 'Lebanon', state: 'TN', zipCode: '37087' },
  { city: 'Mount Juliet', state: 'TN', zipCode: '37122' }
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

  const selectedPrompt = PROMPT_TEMPLATES[Math.floor(Math.random() * PROMPT_TEMPLATES.length)]
    .replace('{baseContent}', jobInfo.prompt )
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
