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
}
};

const PROMPT_STYLES = {
  'conversational': 'Make this job description friendly and conversational, using casual language while maintaining professionalism. Use "you" and "we" to speak directly to the candidate.',
  'formal': 'Write this job description in a formal, traditional corporate style with clear sections and bullet points.',
  'detailed': 'Create a comprehensive and detailed job description with specific examples and clear expectations for each responsibility. Make up more responsibilites than the job description already has.',
  'concise': 'Write a clear and concise job description focusing on key requirements and essential responsibilities. Remove some of the qualifications from the job description.',
  'engaging': 'Create an engaging and energetic job description that excites potential candidates while highlighting growth opportunities.'
};

const DESCRIPTION_LENGTHS = {
  'short': 500,
  'medium': 800,
  'long': 1000
};

const COMPANIES = {
  'Staley Technologies': {
    name: 'Staley Technologies',
    sameAs: 'https://staleytechnologies.com/',
    logo: 'https://staleytechnologies.com/wp-content/uploads/2021/02/cropped-Logo_StaleyTechnologies.png'
  },
  'M3 Technology': {
    name: 'M3 Technology',
    sameAs: 'https://m3tc.com/',
    logo: 'https://m3tc.com/wp-content/uploads/2020/09/m3svg2.svg'
  },
  'TR Group': {
    name: 'TR Group',
    sameAs: 'https://www.trgroup.com/',
    logo: 'https://www.trgroup.com/wp-content/uploads/2022/04/TR-Group-Logo.png'
  },
  'Mirapath': {
    name: 'Mirapath',
    sameAs: 'https://www.mirapath.com/',
    logo: 'https://mirapath.com/wp-content/uploads/2016/12/s5_logo-cropped.png'
  },
  'InScope': {
    name: 'InScope',
    sameAs: 'https://www.inscopecom.com/',
    logo: 'https://lirp.cdn-website.com/413e02695b2643da8d26d40ae7573b8d/dms3rep/multi/opt/Inscope+logo+for+website-a85d3781-1920w.png'
  },
  'Integra Electrical': {
    name: 'Integra Electrical',
    sameAs: 'https://www.integraelectrical.co/',
    logo: 'https://www.integraelectrical.co/images/logos/Logo2.2403050635216.png'
  },
  'Enhanced Voice & Data': {
    name: 'Enhanced Voice & Data',
    sameAs: 'https://www.evdnetworks.com/',
    logo: 'https://le-cdn.hibuwebsites.com/96e0889d6ad24d76868742b04ea19ca4/dms3rep/multi/opt/enhanced-voice-and-data-networks-logo-530w.jpg'
  },
  'Inc Installs': {
    name: 'Inc Installs',
    sameAs: 'https://www.inc-installs.com/',
    logo: 'https://www.inc-installs.com/wp-content/uploads/2019/12/INC-Installs-Web-Logo.png'
  },
  'T&D Communications': {
    name: 'T&D Communications',
    sameAs: 'https://www.tanddcomm.com/',
    logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHzkB3k7eQoSQ/company-logo_200_200/company-logo_200_200/0/1631320385872?e=2147483647&v=beta&t=nuFy5lrwqoCuQ6_2P8hO_EwhwJlnndzcbM7ZPSfdKlM'
  },
  'Direct Line': {
    name: 'Direct Connect',
    sameAs: 'https://www.dlci.net/',
    logo: 'https://cdn.freebiesupply.com/logos/thumbs/2x/direct-line-2-logo.png'
  },
  'Atek Communications': {
    name: 'Atek Communications',
    sameAs: 'https://www.atekcommunications.com/',
    logo: 'https://www.atekcommunications.com/images/gif/icclogo2000.gif'
  },
  'Shelby Communications': {
    name: 'Shelby Communications',
    sameAs: 'https://www.shelbycommunications.com/',
    logo: 'https://shelbycommunications.com/wp-content/uploads/2022/02/eQkSUiEUF9h03zP_TRYxMq9BEwyVxvd6tiQOkA.png'
  },
  'Texas Voice & Data': {
    name: 'Texas Voice & Data',
    sameAs: 'http://www.texasvoicedata.com/',
    logo: 'https://nebula.wsimg.com/3d01291556c12048b98053e61436463c?AccessKeyId=1694F521AED933792FFF&disposition=0&alloworigin=1'
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
};

const LOCATIONS = [
  { city: 'Sterling', state: 'VA', zipCode: '20164' },
  { city: 'Herndon', state: 'VA', zipCode: '20170' },
  { city: 'Gainesville', state: 'VA', zipCode: '20155' },
  { city: 'Centreville', state: 'VA', zipCode: '20120' },
  { city: 'Purcellville', state: 'VA', zipCode: '20132' },
  { city: 'Oak Park', state: 'IL', zipCode: '60302' },
  { city: 'Schaumburg', state: 'IL', zipCode: '60193' },
  { city: 'Naperville', state: 'IL', zipCode: '60540' },
  { city: 'Decatur', state: 'GA', zipCode: '30030' },
  { city: 'Roswell', state: 'GA', zipCode: '30075' },
  { city: 'Smyrna', state: 'GA', zipCode: '30080' },
  { city: 'Tempe', state: 'AZ', zipCode: '85281' },
  { city: 'Gilbert', state: 'AZ', zipCode: '85234' },
  { city: 'Scottsdale', state: 'AZ', zipCode: '85251' },
  { city: 'Beaverton', state: 'OR', zipCode: '97005' },
  { city: 'Gresham', state: 'OR', zipCode: '97030' },
  { city: 'Redmond', state: 'OR', zipCode: '97756' },
  { city: 'Henderson', state: 'NV', zipCode: '89002' },
  { city: 'Sparks', state: 'NV', zipCode: '89431' },
  { city: 'Paradise', state: 'NV', zipCode: '89109' },
  { city: 'West Valley City', state: 'UT', zipCode: '84119' },
  { city: 'Sandy', state: 'UT', zipCode: '84070' },
  { city: 'Layton', state: 'UT', zipCode: '84041' },
  { city: 'Dublin', state: 'OH', zipCode: '43016' },
  { city: 'Westerville', state: 'OH', zipCode: '43081' },
  { city: 'Grove City', state: 'OH', zipCode: '43123' },
  { city: 'Council Bluffs', state: 'IA', zipCode: '51501' },
  { city: 'La Vista', state: 'NE', zipCode: '68128' },
  { city: 'Bellevue', state: 'NE', zipCode: '68005' },
  { city: 'West Des Moines', state: 'IA', zipCode: '50265' },
  { city: 'Ankeny', state: 'IA', zipCode: '50023' },
  { city: 'Johnston', state: 'IA', zipCode: '50131' },
  { city: 'Overland Park', state: 'KS', zipCode: '66210' },
  { city: 'Independence', state: 'MO', zipCode: '64050' },
  { city: 'St. Charles', state: 'MO', zipCode: '63301' },
  { city: 'Aurora', state: 'CO', zipCode: '80012' },
  { city: 'Littleton', state: 'CO', zipCode: '80120' },
  { city: 'Westminster', state: 'CO', zipCode: '80031' },
  { city: 'St. Paul', state: 'MN', zipCode: '55101' },
  { city: 'Burnsville', state: 'MN', zipCode: '55337' },
  { city: 'Bloomington', state: 'MN', zipCode: '55420' },
  { city: 'Bellevue', state: 'WA', zipCode: '98004' },
  { city: 'Kirkland', state: 'WA', zipCode: '98033' },
  { city: 'Wenatchee', state: 'WA', zipCode: '98801' },
  { city: 'Jersey City', state: 'NJ', zipCode: '07302' },
  { city: 'Union City', state: 'NJ', zipCode: '07087' },
  { city: 'Edison', state: 'NJ', zipCode: '08817' },
  { city: 'Cambridge', state: 'MA', zipCode: '02138' },
  { city: 'Newton', state: 'MA', zipCode: '02458' },
  { city: 'Medford', state: 'MA', zipCode: '02155' },
  { city: 'Hialeah', state: 'FL', zipCode: '33012' },
  { city: 'Miami Springs', state: 'FL', zipCode: '33166' },
  { city: 'Hollywood', state: 'FL', zipCode: '33020' },
  { city: 'Concord', state: 'NC', zipCode: '28025' },
  { city: 'Durham', state: 'NC', zipCode: '27701' },
  { city: 'Apex', state: 'NC', zipCode: '27502' },
  { city: 'Kissimmee', state: 'FL', zipCode: '34741' },
  { city: 'St. Petersburg', state: 'FL', zipCode: '33701' },
  { city: 'Orange Park', state: 'FL', zipCode: '32073' },
  { city: 'Dearborn', state: 'MI', zipCode: '48124' },
  { city: 'Farmington Hills', state: 'MI', zipCode: '48334' },
  { city: 'Wyoming', state: 'MI', zipCode: '49509' },
  { city: 'Carmel', state: 'IN', zipCode: '46032' },
  { city: 'New Haven', state: 'IN', zipCode: '46774' },
  { city: 'Mishawaka', state: 'IN', zipCode: '46544' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  { city: 'Fort Worth', state: 'TX', zipCode: '76102' },
  { city: 'Plano', state: 'TX', zipCode: '75074' },
  { city: 'Irving', state: 'TX', zipCode: '75061' },
  { city: 'Richardson', state: 'TX', zipCode: '75080' },
  { city: 'Carrollton', state: 'TX', zipCode: '75006' },
  { city: 'Garland', state: 'TX', zipCode: '75040' },
  { city: 'Frisco', state: 'TX', zipCode: '75034' },
  { city: 'McKinney', state: 'TX', zipCode: '75069' },
  { city: 'Arlington', state: 'TX', zipCode: '76010' },
  { city: 'Sugar Land', state: 'TX', zipCode: '77478' },
  { city: 'The Woodlands', state: 'TX', zipCode: '77380' },
  { city: 'Round Rock', state: 'TX', zipCode: '78664' },
  { city: 'Corpus Christi', state: 'TX', zipCode: '78401' },
  { city: 'Lubbock', state: 'TX', zipCode: '79401' },
  { city: 'El Paso', state: 'TX', zipCode: '79901' },
  { city: 'Midland', state: 'TX', zipCode: '79701' },
  { city: 'Odessa', state: 'TX', zipCode: '79761' },
  { city: 'Katy', state: 'TX', zipCode: '77449' },
  { city: 'Pearland', state: 'TX', zipCode: '77581' },
  { city: 'College Station', state: 'TX', zipCode: '77840' },
  { city: 'Denton', state: 'TX', zipCode: '76201' },
  { city: 'Tyler', state: 'TX', zipCode: '75701' },
  { city: 'Beaumont', state: 'TX', zipCode: '77701' },
  { city: 'Waco', state: 'TX', zipCode: '76701' },
  { city: 'Abilene', state: 'TX', zipCode: '79601' },
  { city: 'Amarillo', state: 'TX', zipCode: '79101' }
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

  const promptStyles = Object.entries(PROMPT_STYLES);
  const selectedStyle = promptStyles[Math.floor(Math.random() * promptStyles.length)];
  
  const descLengths = Object.entries(DESCRIPTION_LENGTHS);
  const selectedLength = descLengths[Math.floor(Math.random() * descLengths.length)];

  const prompt = `${selectedStyle[1]} 

Create a ${selectedLength[0]} word job description for a ${jobType} position at ${company.name} in ${location.city}, ${location.state}. 

Base content:
${jobInfo.prompt}

Start with a paragraph about the role in ${location.city}, ${location.state} at ${company.name}. Name surrounding neighboring cities to ${location.city} for work to be performed. Never use h1 tags or headings before this paragraph. 

After the paragraph intro, use these sections with h2 tags:

## Key Responsibilities
${jobInfo.responsibilities} 
- Add 3-4 more responsibilities specific to ${location.city} area
- Include any regional requirements for ${location.state}
- Talk about and name a large upcoming project in ${location.city}, ${location.state} area

## Required Qualifications 
${jobInfo.qualifications}
- ${jobInfo.yearsExperience} years of experience required for ${jobInfo.category} work in ${jobInfo.team} setting
- Add 2-3 location-specific qualifications for ${location.city}

## Compensation & Benefits
- Competitive salary range: $${minValue}-$${maxValue} per hour depending on experience
- Comprehensive medical, dental, and vision coverage
- Paid time off and holidays
- Career advancement opportunities
- Ongoing training and certifications

Format in markdown without h1 tags. Do not include ticks or markdown formatting instructions. Keep the total length to ${selectedLength[0]} words while maintaining the ${selectedStyle[0]} style.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: prompt
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
      'Michael.Mckeaige@pes123.com'
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
