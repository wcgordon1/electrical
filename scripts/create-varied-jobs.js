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
  'Electrician': {
minValue: 22,
maxValue: 30,
experienceLevel: 'entryLevel',
category: 'Apprentice',
team: 'Industrial',
yearsExperience: '1-3',
responsibilities: 'Install and terminate 480V 3-phase power distribution systems, perform precise conduit bending for complex industrial applications, assist with VFD and motor control installations, conduct preventive maintenance on manufacturing equipment, use digital multimeters and meggars for testing, maintain detailed maintenance logs, assist with PLC cabinet assembly, follow confined space and elevated work procedures, support production equipment installations',
qualifications: 'OSHA-30 certification, ability to read and interpret industrial electrical blueprints and P&IDs, demonstrated knowledge of motor control circuits, experience with conduit bending machines up to 2", proficiency with digital testing equipment, strong mathematical skills for load calculations, ability to use hand and power tools safely, understanding of industrial network infrastructure',
prompt: 'Create a job description for an Industrial Apprentice Electrician focused on automated manufacturing systems. Must understand 3-phase power distribution, VFD programming basics, and industrial control systems. Experience with Fluke meters, conduit bending equipment, and cable termination tools required. Must have Electrical Apprentice License, OSHA-30, Arc Flash awareness, confined space, and First Aid/CPR certifications. Knowledge of industrial safety protocols, P&ID interpretation, and control panel layout essential. Position involves working in active manufacturing environments, understanding automated systems, and maintaining detailed documentation. Physical requirements include lifting 75+ lbs, working from heights, and maneuvering in tight spaces. Must be able to work rotating shifts and respond to emergency maintenance calls.'
},
'Industrial Electrician': {
minValue: 38,
    maxValue: 42,
    experienceLevel: 'midLevel',
category: 'Journeyman',
team: 'Industrial',
yearsExperience: '5+',
responsibilities: 'Program and troubleshoot Allen Bradley and Siemens PLCs, commission automated production lines, perform root cause analysis on system failures, implement predictive maintenance programs using vibration analysis and thermal imaging, design and install complex motor control circuits, manage electrical spare parts inventory, train apprentices on industrial systems, coordinate with equipment manufacturers for complex repairs, develop standard operating procedures for maintenance tasks, perform power quality analysis and harmonic mitigation',
qualifications: 'Advanced certification in Allen Bradley and Siemens PLC programming, demonstrated experience with industrial networking protocols (EtherNet/IP, Profibus), expertise in VFD programming and troubleshooting, proficiency with thermal imaging and vibration analysis equipment, ability to read and create AutoCAD electrical drawings, experience with SCADA systems and HMI programming, proven leadership skills in maintenance environment, understanding of IEEE standards for industrial power quality',
prompt: 'Create a job description for an Industrial Manufacturing Electrician specializing in automation and process control. Must be expert in PLC programming, SCADA systems, and predictive maintenance technologies. Experience with multiple industrial networking protocols, servo systems, and robotics required. Must have Journeyman License, OSHA-30, Arc Flash, forklift, and aerial lift certifications. Strong background in power quality analysis, harmonic mitigation, and industrial network architecture essential. Position involves leading maintenance teams, developing training programs, and implementing reliability improvements. Must understand FDA/OSHA/EPA compliance requirements for manufacturing facilities. Experience with predictive maintenance technologies including thermal imaging and vibration analysis required. Role includes managing critical spare parts inventory and vendor relationships. On-call rotation for 24/7 manufacturing support required.'
},
'Commercial Electrician': {
minValue: 34,
maxValue: 38,
experienceLevel: 'midLevel',
category: 'Journeyman',
team: 'Commercial',
    yearsExperience: '3-5',
responsibilities: 'Design and install complete electrical systems for commercial construction, calculate voltage drop and load requirements, coordinate with BIM modeling teams for conflict resolution, supervise prefabrication of electrical assemblies, implement complex lighting control systems, install and program fire alarm systems, manage material logistics for large projects, coordinate overhead rough-in with mechanical trades, perform startup and commissioning of building systems, mentor apprentices in commercial installation techniques',
qualifications: 'Journeyman License, extensive experience with lighting control systems (DALI, DMX), proven expertise in fire alarm installation and programming, demonstrated ability with BIM software for coordination, advanced knowledge of emergency power systems, certification in multiple lift equipment types, strong project management and leadership skills, experience with green building requirements and energy codes',
prompt: 'Create a job description for a Commercial Construction Electrician specializing in large-scale new construction. Must understand complete building electrical systems including emergency power, lighting controls, and building automation integration. Experience with BIM coordination, prefabrication techniques, and project management required. Must have Journeyman License, OSHA-30, multiple equipment certifications including boom lift, scissor lift, and powder-actuated tools. Knowledge of current energy codes, DALI/DMX lighting controls, and fire alarm programming essential. Position involves managing complex installations, coordinating with multiple trades, and mentoring apprentices. Must understand green building requirements, power monitoring systems, and emergency power design. Role includes material management, crew leadership, and quality control. Some travel between project sites required. Physical requirements include working at heights, coordinating overhead installation, and operating material handling equipment.'
},
'Service Electrician': {
minValue: 35,
maxValue: 40,
    experienceLevel: 'seniorLevel',
category: 'Journeyman',
team: 'Commercial',
yearsExperience: '7+',
responsibilities: 'Perform advanced electrical system diagnostics using power quality analyzers, thermal imaging, and oscilloscopes, troubleshoot building automation system integration issues, design and implement power factor correction solutions, diagnose and repair complex lighting control systems, manage emergency power system testing and maintenance, develop maintenance programs for critical facilities, provide detailed repair documentation and recommendations, train facility staff on proper electrical system operation, coordinate with utilities on service upgrades, perform arc flash assessments and labeling',
qualifications: 'Journeyman License with master electrician preferred, advanced certifications in power quality analysis, extensive experience with thermal imaging and diagnostic equipment, proven expertise in critical power systems, demonstrated ability in customer relationship management, advanced troubleshooting skills across multiple systems and manufacturers, certification in building automation systems, experience with arc flash studies and safety program development',
prompt: 'Create a job description for a Senior Service Electrician specializing in critical facilities and power quality. Expert in advanced diagnostics, power monitoring systems, and building automation integration. Must have Journeyman License, advanced power quality certification, and proven experience with diagnostic equipment including power analyzers, thermal cameras, and oscilloscopes. Experience managing critical facility maintenance, performing arc flash studies, and developing site-specific safety procedures required. Position involves being primary technical resource for complex electrical issues, developing maintenance programs, and training facility personnel. Must understand backup power systems, power factor correction, and harmonic mitigation. Role includes managing service contracts, performing power quality surveys, and documenting system improvements. Territory covers major metropolitan area with focus on critical facilities including data centers and healthcare. Emergency response required for critical systems.'
},
'Security Technician': {
minValue: 24,
maxValue: 32,
experienceLevel: 'entryLevel',
category: 'Security',
team: 'Commercial',
yearsExperience: '1-3',
responsibilities: 'Design and implement enterprise-level security systems, configure IP camera networks including VLANs and QoS settings, program access control databases and credential management systems, install biometric security devices, configure cloud-based security platforms, perform system health monitoring and maintenance, integrate security systems with building automation, implement cybersecurity best practices for security networks, maintain detailed system documentation and drawings, provide end-user training on system operation',
qualifications: 'ESA Level 1 certification, CompTIA Security+ preferred, demonstrated experience with enterprise video management systems, strong understanding of IP networking and cybersecurity, proficiency in access control database management, experience with biometric security systems, knowledge of structured cabling standards, proven customer service skills, clean background check with ability to obtain government clearance',
prompt: 'Create a job description for an Enterprise Security Systems Technician specializing in integrated security solutions. Must understand enterprise security architecture including video surveillance, access control, and intrusion detection systems. Experience with major VMS platforms, IP networking, and cybersecurity best practices required. Must have ESA Level 1, Security+, OSHA-10, and clean background check. Knowledge of IT security, cloud platforms, and system health monitoring essential. Position involves designing and implementing complete security solutions including cameras, access control, and visitor management systems. Must understand network architecture, VLANs, and QoS for security applications. Role includes maintaining enterprise security databases, performing system health checks, and providing detailed documentation. Some projects may require government security clearance. After-hours support for system maintenance required.'
},
'Cable Installer': {
minValue: 20,
maxValue: 28,
experienceLevel: 'entryLevel',
category: 'Voice Data',
team: 'Commercial',
yearsExperience: '1-5',
responsibilities: 'Design and install structured cabling systems for data centers and enterprise networks, perform high-density fiber optic cable installations, certify cabling systems using advanced test equipment, implement proper cable management in network rooms, terminate and test high-speed copper and fiber connections, maintain detailed testing documentation and warranties, coordinate pathway installation with other trades, perform data center hot aisle/cold aisle separation, install overhead cable tray and ladder rack systems, maintain clean room protocols for sensitive environments',
qualifications: 'BICSI Installer 1 certification required, Installer 2 preferred, demonstrated experience with fiber optic installation and testing, proficiency with multiple certification testers, understanding of data center design principles, experience with cable management systems and pathways, knowledge of clean room procedures, ability to read and create cable installation drawings, understanding of network hardware requirements',
prompt: 'Create a job description for a Data Center Cable Installation Technician specializing in mission-critical facilities. Must understand data center infrastructure including structured cabling, fiber optics, and cooling separation. Experience with high-density cable installation, advanced testing equipment, and documentation systems required. BICSI Installer 1 required, Installer 2 preferred, plus OSHA-10 certification. Knowledge of TIA-942 data center standards, cable testing procedures, and clean room protocols essential. Position involves installing and certifying high-performance cabling systems in critical environments. Must understand fiber optic installation, proper cable management, and pathway requirements. Role includes maintaining detailed test results, warranty documentation, and as-built drawings. Some projects require off-hours work in active data centers. Physical requirements include working in confined spaces and hot/cold aisle environments.'
},
'Residential Apprentice': {
minValue: 20,
maxValue: 24,
experienceLevel: 'entryLevel',
category: 'Apprentice',
team: 'Residential',
yearsExperience: '0-1',
responsibilities: 'Learn residential electrical installation techniques including load calculations and circuit design, assist with smart home technology installation, install structured wiring systems for modern homes, learn energy efficient lighting design, assist with solar system installation and energy storage systems, install whole-house surge protection, learn proper crimping and termination techniques, assist with troubleshooting using digital meters, maintain material inventory and job site organization, document installation progress and changes',
qualifications: 'High school diploma/GED with strong math skills, enrolled in approved apprenticeship program, basic understanding of construction methods, ability to read and interpret residential blueprints, basic computer skills for documentation, valid drivers license with clean record, physical ability to work in confined spaces, good color vision for wire identification, basic hand tools required',
prompt: 'Create a job description for a Modern Residential Apprentice Electrician focusing on smart home technology and energy efficiency. Entry-level position learning advanced residential electrical systems including smart home integration, renewable energy, and structured wiring. Must be enrolled in or eligible for state-approved apprenticeship program. Basic understanding of technology and building construction preferred. Must have reliable transportation and basic hand tools. Position involves learning modern home electrical systems including smart devices, home networks, and energy management. Will work directly with experienced electricians learning proper installation methods, system programming, and energy efficient design. Physical requirements include working in confined spaces, attics, and crawl spaces. Must be able to work full-time while attending required apprenticeship classes. Weekend work may be required for system programming and testing.'
},
'Residential Electrician': {
minValue: 18,
maxValue: 24,
experienceLevel: 'entryLevel',
category: 'Apprentice',
team: 'Residential',
yearsExperience: '1-2',
responsibilities: 'Install and program sophisticated home automation systems, integrate lighting control with voice activation and mobile apps, configure whole-house audio/video systems, implement automated shade control, program security and access control integration, install energy monitoring systems, configure home network infrastructure, install and maintain backup power systems, document system configurations and user settings, provide client training on system operation, maintain detailed service records for luxury properties',
qualifications: 'Strong technology aptitude with home automation experience, certification in major control systems (Lutron, Control4, etc.), understanding of residential networking and Wi-Fi systems, proven experience with high-end finishes and materials, excellent customer service skills, professional appearance and communication ability, experience with energy management systems, clean background check and drug screening required, valid drivers license with clean record',
prompt: 'Create a job description for a Luxury Home Technology Specialist focusing on complete home automation and energy management. Must have extensive knowledge of smart home systems including lighting control, automated shading, and whole-house integration. Experience with major automation platforms, energy monitoring, and backup power systems required. Position involves programming and maintaining sophisticated control systems in luxury residences. Must maintain highest level of professionalism when working in multi-million dollar homes. Knowledge of residential networks, Wi-Fi systems, and cybersecurity essential. Role includes system programming, client training, and maintaining detailed documentation. Must be comfortable working around expensive furnishings and maintaining client confidentiality. After-hours and weekend work required for system maintenance and updates. Career path leads to home automation system designer and project manager. Clean background check, drug screening, and professional appearance required.'
},
'Commercial Apprentice': {
minValue: 18,
maxValue: 24,
experienceLevel: 'entryLevel',
category: 'Apprentice',
team: 'Commercial',
yearsExperience: '0-3',
responsibilities: 'Assist with installation of commercial electrical systems including power distribution, lighting controls, and fire alarm systems, learn conduit bending and installation techniques for EMT and rigid conduit, help with wire pulling and termination in electrical rooms, support panel installation and circuit identification, assist with lighting fixture installation and controls programming, learn building automation system basics, help with emergency lighting installation and testing, maintain material inventory and job site organization, document daily work progress, operate aerial lifts and scaffolding under supervision, assist with blueprint reading and layout',
qualifications: 'High school diploma/GED with strong math skills, enrolled in state-approved electrical apprenticeship program, basic understanding of electrical theory, ability to read basic blueprints and construction drawings, proficiency with hand tools and power tools, valid drivers license with clean record, ability to lift 50+ pounds regularly, good communication skills for job site coordination, basic computer skills for documentation, willingness to attend required training classes',
prompt: 'Create a job description for a Commercial Construction Apprentice Electrician focusing on new construction and tenant improvement projects. Entry-level position learning commercial electrical installation including power distribution, lighting systems, and life safety. Must be enrolled in or eligible for state-approved apprenticeship program. Basic construction experience preferred but not required. Position involves learning commercial construction methods including conduit installation, wire pulling, and equipment mounting. Will work directly with journeyman electricians learning proper installation techniques, blueprint reading, and safety procedures. Must have basic hand tools and transportation. Role includes material handling, learning layout techniques, and maintaining documentation. Physical requirements include climbing ladders, working from lifts, and moving heavy materials. Must be able to work full-time while attending required apprenticeship classes. Position offers exposure to various aspects of commercial construction including office buildings, retail spaces, and industrial facilities. Opportunity for advancement to commercial journeyman role. Weekend work may be required during critical project phases. Clean background check and drug screening required.'
}
};

const PROMPT_STYLES = {
  'conversational': 'Make this job description friendly and conversational, using casual language while maintaining professionalism. Use "you" and "we" to speak directly to the candidate. Randomly select which requirement and certs are necessary for the role.',
  'formal': 'Write this job description in a formal, traditional corporate style with clear sections and bullet points. Randomly select which requirement and certs are necessary for the role.',
  'detailed': 'Create a comprehensive and detailed job description with specific examples and clear expectations for each responsibility. Randomly select which requirement and certs are necessary for the role.',
  'concise': 'Write a clear and concise job description focusing on key requirements and essential responsibilities. Randomly select which requirement and certs are necessary for the role.',
  'engaging': 'Create an engaging and energetic job description that excites potential candidates while highlighting growth opportunities. Randomly select which requirement and certs are necessary for the role.'
};

const DESCRIPTION_LENGTHS = {
  'short': 500,
  'medium': 800,
  'long': 1000
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
  'Advantage Electric': {
    name: 'Advantage Electric',
    sameAs: 'https://advantageelectricmn.com/',
    logo: 'https://advantageelectricmn.com/wp-content/uploads/Advantage-Electric-Logo-text.png'
  }
};

const LOCATIONS = [
  { city: 'Birmingham', state: 'AL', zipCode: '35203' },
  { city: 'Mobile', state: 'AL', zipCode: '36602' },
  { city: 'Huntsville', state: 'AL', zipCode: '35801' },
  { city: 'Phoenix', state: 'AZ', zipCode: '85003' },
  { city: 'Tucson', state: 'AZ', zipCode: '85701' },
  { city: 'Flagstaff', state: 'AZ', zipCode: '86001' },
  { city: 'Little Rock', state: 'AR', zipCode: '72201' },
  { city: 'Fayetteville', state: 'AR', zipCode: '72701' },
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
  { city: 'Boulder', state: 'CO', zipCode: '80302' },
  { city: 'Hartford', state: 'CT', zipCode: '06103' },
  { city: 'New Haven', state: 'CT', zipCode: '06510' },
  { city: 'Wilmington', state: 'DE', zipCode: '19801' },
  { city: 'Dover', state: 'DE', zipCode: '19901' },
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  { city: 'Orlando', state: 'FL', zipCode: '32801' },
  { city: 'Tampa', state: 'FL', zipCode: '33602' },
  { city: 'Jacksonville', state: 'FL', zipCode: '32202' },
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Savannah', state: 'GA', zipCode: '31401' },
  { city: 'Augusta', state: 'GA', zipCode: '30901' },
  { city: 'Boise', state: 'ID', zipCode: '83702' },
  { city: 'Idaho Falls', state: 'ID', zipCode: '83402' },
  { city: 'Chicago', state: 'IL', zipCode: '60601' },
  { city: 'Springfield', state: 'IL', zipCode: '62701' },
  { city: 'Peoria', state: 'IL', zipCode: '61602' },
  { city: 'Indianapolis', state: 'IN', zipCode: '46204' },
  { city: 'Fort Wayne', state: 'IN', zipCode: '46802' },
  { city: 'Des Moines', state: 'IA', zipCode: '50309' },
  { city: 'Cedar Rapids', state: 'IA', zipCode: '52401' },
  { city: 'Kansas City', state: 'KS', zipCode: '66101' },
  { city: 'Wichita', state: 'KS', zipCode: '67202' },
  { city: 'Louisville', state: 'KY', zipCode: '40202' },
  { city: 'Lexington', state: 'KY', zipCode: '40507' },
  { city: 'New Orleans', state: 'LA', zipCode: '70112' },
  { city: 'Baton Rouge', state: 'LA', zipCode: '70801' },
  { city: 'Portland', state: 'ME', zipCode: '04101' },
  { city: 'Bangor', state: 'ME', zipCode: '04401' },
  { city: 'Baltimore', state: 'MD', zipCode: '21202' },
  { city: 'Annapolis', state: 'MD', zipCode: '21401' },
  { city: 'Boston', state: 'MA', zipCode: '02108' },
  { city: 'Worcester', state: 'MA', zipCode: '01608' },
  { city: 'Detroit', state: 'MI', zipCode: '48226' },
  { city: 'Grand Rapids', state: 'MI', zipCode: '49503' },
  { city: 'Ann Arbor', state: 'MI', zipCode: '48104' },
  { city: 'Minneapolis', state: 'MN', zipCode: '55401' },
  { city: 'Saint Paul', state: 'MN', zipCode: '55102' },
  { city: 'Duluth', state: 'MN', zipCode: '55802' },
  { city: 'Jackson', state: 'MS', zipCode: '39201' },
  { city: 'Biloxi', state: 'MS', zipCode: '39530' },
  { city: 'Kansas City', state: 'MO', zipCode: '64106' },
  { city: 'St. Louis', state: 'MO', zipCode: '63101' },
  { city: 'Springfield', state: 'MO', zipCode: '65806' },
  { city: 'Billings', state: 'MT', zipCode: '59101' },
  { city: 'Missoula', state: 'MT', zipCode: '59801' },
  { city: 'Omaha', state: 'NE', zipCode: '68102' },
  { city: 'Lincoln', state: 'NE', zipCode: '68508' },
  { city: 'Manchester', state: 'NH', zipCode: '03101' },
  { city: 'Concord', state: 'NH', zipCode: '03301' },
  { city: 'Newark', state: 'NJ', zipCode: '07102' },
  { city: 'Atlantic City', state: 'NJ', zipCode: '08401' },
  { city: 'Jersey City', state: 'NJ', zipCode: '07302' },
  { city: 'New York', state: 'NY', zipCode: '10007' },
  { city: 'Buffalo', state: 'NY', zipCode: '14202' },
  { city: 'Rochester', state: 'NY', zipCode: '14604' },
  { city: 'Albany', state: 'NY', zipCode: '12207' },
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Asheville', state: 'NC', zipCode: '28801' },
  { city: 'Fargo', state: 'ND', zipCode: '58102' },
  { city: 'Bismarck', state: 'ND', zipCode: '58501' },
  { city: 'Columbus', state: 'OH', zipCode: '43215' },
  { city: 'Cleveland', state: 'OH', zipCode: '44114' },
  { city: 'Cincinnati', state: 'OH', zipCode: '45202' },
  { city: 'Oklahoma City', state: 'OK', zipCode: '73102' },
  { city: 'Tulsa', state: 'OK', zipCode: '74103' },
  { city: 'Philadelphia', state: 'PA', zipCode: '19102' },
  { city: 'Pittsburgh', state: 'PA', zipCode: '15222' },
  { city: 'Providence', state: 'RI', zipCode: '02903' },
  { city: 'Newport', state: 'RI', zipCode: '02840' },
  { city: 'Charleston', state: 'SC', zipCode: '29401' },
  { city: 'Columbia', state: 'SC', zipCode: '29201' },
  { city: 'Sioux Falls', state: 'SD', zipCode: '57104' },
  { city: 'Rapid City', state: 'SD', zipCode: '57701' },
  { city: 'Nashville', state: 'TN', zipCode: '37203' },
  { city: 'Memphis', state: 'TN', zipCode: '38103' },
  { city: 'Knoxville', state: 'TN', zipCode: '37902' },
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  { city: 'Salt Lake City', state: 'UT', zipCode: '84101' },
  { city: 'Park City', state: 'UT', zipCode: '84060' },
  { city: 'Burlington', state: 'VT', zipCode: '05401' },
  { city: 'Montpelier', state: 'VT', zipCode: '05602' },
  { city: 'Richmond', state: 'VA', zipCode: '23219' },
  { city: 'Virginia Beach', state: 'VA', zipCode: '23451' },
  { city: 'Norfolk', state: 'VA', zipCode: '23510' },
  { city: 'Charleston', state: 'WV', zipCode: '25301' },
  { city: 'Morgantown', state: 'WV', zipCode: '26501' },
  { city: 'Milwaukee', state: 'WI', zipCode: '53202' },
  { city: 'Madison', state: 'WI', zipCode: '53703' },
  { city: 'Green Bay', state: 'WI', zipCode: '54301' },
  { city: 'Cheyenne', state: 'WY', zipCode: '82001' },
  { city: 'Jackson', state: 'WY', zipCode: '83001' }
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
${jobInfo.responsibilities} (choose at random which ones to emphasize)
- Add 3-4 more responsibilities specific to ${location.city} area
- Include any regional requirements for ${location.state}

## Required Qualifications (choose at random which ones to emphasize)
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
