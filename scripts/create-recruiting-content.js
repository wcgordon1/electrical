const { config } = require('dotenv');
const OpenAI = require('openai');
const fs = require('node:fs');
const path = require('node:path');

// Load environment variables
config({ path: 'scripts/config/.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Position templates with role-specific data
const POSITIONS = {
  'Electrician': {
    certifications: ['State Electrical License', 'OSHA 30-Hour Construction', 'NEC Certification'],
    skills: ['Circuit Installation', 'Troubleshooting', 'Blueprint Reading', 'Code Compliance'],
    tooling: ['Multimeters', 'Wire Strippers', 'Conduit Benders', 'Power Tools'],
    salaryRange: { min: 65000, max: 120000, experience: '3-5 years commercial experience' }
  },
  'Fire Alarm Technician': {
    certifications: ['NICET Fire Alarm Systems', 'Fire Life Safety Certification', 'OSHA 10-Hour'],
    skills: ['Fire Code Compliance', 'System Programming', 'Testing and Inspection', 'Documentation'],
    tooling: ['Voltage Meters', 'Programming Tools', 'Testing Equipment'],
    salaryRange: { min: 60000, max: 95000, experience: '2-4 years fire alarm experience' }
  },
  'Controls Technician': {
    certifications: ['BMS Certification', 'HVAC Controls', 'Energy Management'],
    skills: ['PLC Programming', 'HVAC Systems', 'Network Configuration', 'Troubleshooting'],
    tooling: ['Programming Software', 'Network Tools', 'Diagnostic Equipment'],
    salaryRange: { min: 70000, max: 110000, experience: '3-5 years controls experience' }
  },
  'Security Technician': {
    certifications: ['Security Systems License', 'Low Voltage License', 'OSHA 10-Hour'],
    skills: ['Access Control', 'CCTV Systems', 'Network Security', 'System Programming'],
    tooling: ['Network Tools', 'Programming Equipment', 'Testing Devices'],
    salaryRange: { min: 55000, max: 90000, experience: '2-4 years security systems experience' }
  },
  'Solar Installer': {
    certifications: ['NABCEP Certification', 'Electrical License', 'OSHA 30-Hour'],
    skills: ['Solar PV Installation', 'Electrical Systems', 'Roofing', 'System Design'],
    tooling: ['Solar Tools', 'Safety Equipment', 'Power Tools'],
    salaryRange: { min: 50000, max: 85000, experience: '1-3 years solar installation experience' }
  },
  'Cable Technician': {
    certifications: ['Low Voltage License', 'Network+ Certification', 'BICSI Certification'],
    skills: ['Cable Installation', 'Network Testing', 'Troubleshooting', 'Documentation'],
    tooling: ['Cable Tools', 'Testing Equipment', 'Network Analyzers'],
    salaryRange: { min: 45000, max: 85000, experience: '1-3 years cable installation experience' }
  },
  'Data Center Technician': {
    certifications: ['Data Center Certification', 'Network+', 'Electrical License'],
    skills: ['Power Distribution', 'Cooling Systems', 'Network Infrastructure', 'Monitoring'],
    tooling: ['Power Tools', 'Testing Equipment', 'Monitoring Software'],
    salaryRange: { min: 55000, max: 105000, experience: '3-5 years data center experience' }
  },
  'Audio Visual Technician': {
    certifications: ['CTS Certification', 'Low Voltage License', 'Network+'],
    skills: ['AV Systems', 'Control Systems', 'Network Configuration', 'Programming'],
    tooling: ['AV Equipment', 'Programming Tools', 'Testing Devices'],
    salaryRange: { min: 55000, max: 105000, experience: '2-4 years AV experience' }
  }
};

async function generateCityData(city, state) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: `Create market data for the electrical industry in ${city}, ${state}.` 
    }],
    functions: [{
      name: "get_city_data",
      description: `Get market data for ${city}, ${state} electrical industry`,
      parameters: {
        type: "object",
        properties: {
          averageSalary: {
            type: "integer",
            description: "Average electrical industry salary in this area"
          },
          salaryRange: {
            type: "object",
            properties: {
              min: {
                type: "integer",
                description: "Minimum typical salary"
              },
              max: {
                type: "integer",
                description: "Maximum typical salary"
              }
            },
            required: ["min", "max"]
          },
          growthRate: {
            type: "string",
            description: "Growth rate as percentage with % symbol",
            pattern: "^[0-9]+%$"
          },
          employmentStats: {
            type: "object",
            properties: {
              totalJobs: {
                type: "integer",
                description: "Total electrical jobs in the area"
              },
              projectedGrowth: {
                type: "string",
                description: "Growth projection with timeframe"
              }
            },
            required: ["totalJobs", "projectedGrowth"]
          },
          description: {
            type: "string",
            description: "One sentence about the market"
          },
          metropolitanArea: {
            type: "string",
            description: "Full metropolitan area name"
          },
          majorProjects: {
            type: "array",
            items: { type: "string" },
            description: `Current or planned major projects in ${city}, ${state}`,
            minItems: 4,
            maxItems: 6
          },
          topEmployers: {
            type: "array",
            items: { type: "string" },
            description: "Major Construction, Electrical, low voltagge, and data center employers in the area",
            minItems: 4,
            maxItems: 6
          }
        },
        required: [
          "averageSalary",
          "salaryRange",
          "growthRate",
          "employmentStats",
          "description",
          "metropolitanArea",
          "majorProjects",
          "topEmployers"
        ]
      }
    }],
    function_call: { name: "get_city_data" }
  });

  const cityData = JSON.parse(completion.choices[0].message.function_call.arguments);
  return {
    ...cityData,
    demandLevel: "High" // Ensure this stays constant
  };
}

async function generatePositionData(position, city, state) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: `Create market data for ${position} roles in ${city}, ${state}.` 
    }],
    functions: [{
      name: "get_position_data",
      description: `Get market data for ${position} roles in ${city}, ${state}`,
      parameters: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "One sentence about the position in this market"
          },
          averageSalary: {
            type: "integer",
            description: "Average salary for this specific role"
          },
          salaryRange: {
            type: "object",
            properties: {
              min: {
                type: "integer",
                description: "Minimum salary"
              },
              max: {
                type: "integer",
                description: "Maximum salary"
              }
            },
            required: ["min", "max"]
          },
          certifications: {
            type: "array",
            items: { type: "string" },
            description: "Required certifications",
            minItems: 3,
            maxItems: 6
          },
          skills: {
            type: "array",
            items: { type: "string" },
            description: "Required skills",
            minItems: 4,
            maxItems: 8
          },
          experience: {
            type: "string",
            description: "Required experience range"
          }
        },
        required: [
          "description",
          "averageSalary",
          "salaryRange",
          "certifications",
          "skills",
          "experience"
        ]
      }
    }],
    function_call: { name: "get_position_data" }
  });

  return JSON.parse(completion.choices[0].message.function_call.arguments);
}

async function generateMarkdown(position, city, state) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: `Create content for a ${position} recruiting agency page in ${city}, ${state}. Format using only h3, h4, and bold text (no h1 or h2).` 
    }],
    functions: [{
      name: "get_markdown_content",
      description: "Generate structured markdown content for the recruiting page",
      parameters: {
        type: "object",
        properties: {
          marketOverview: {
            type: "string",
            description: `2-3 sentences about local market conditions for ${position} in ${city}, ${state}`
          },
          criticalRole: {
            type: "string",
            description: `2-3 sentences about why this position is vital to ${city}`
          },
          hiringChallenges: {
            type: "string",
            description: `2-3 sentences about specific challenges recruiting ${position}s in ${city}, ${state}`
          },
          ourProcess: {
            type: "string",
            description: `2-3 sentences about the recruiting process for ${position}s in ${city}, ${state}`
          },
          successMetrics: {
            type: "string",
            description: `2-3 sentences about success metrics for ${position} in ${city}, ${state}`
          }
        },
        required: [
          "marketOverview",
          "criticalRole",
          "hiringChallenges",
          "ourProcess",
          "successMetrics"
        ]
      }
    }],
    function_call: { name: "get_markdown_content" }
  });

  const content = JSON.parse(completion.choices[0].message.function_call.arguments);
  return `### Market Overview
${content.marketOverview}

### Critical Role for ${position}s
${content.criticalRole}

### Hiring Challenges for ${position}s in ${city}
${content.hiringChallenges}

### Our Process
${content.ourProcess}

### Success Metrics for ${position}s in ${city}
${content.successMetrics}`;
}

async function createRecruitingContent(state, city) {
  const stateFolder = path.join(process.cwd(), 'src/content/recruiting', state.toLowerCase());
  const cityFolder = path.join(stateFolder, city.toLowerCase().replace(/\s+/g, '-'));

  // Create folders if they don't exist
  if (!fs.existsSync(cityFolder)) {
    fs.mkdirSync(cityFolder, { recursive: true });
  }

  try {
    // Generate unique city data
    console.log('Generating city data...');
    const cityData = await generateCityData(city, state);

    // Create city index.md
    const cityIndexContent = `---
name: "${city}"
state: "${state}"
marketData:
  averageSalary: ${cityData.averageSalary}
  salaryRange:
    min: ${cityData.salaryRange.min}
    max: ${cityData.salaryRange.max}
  growthRate: "${cityData.growthRate}"
  demandLevel: "High"
  employmentStats:
    totalJobs: ${cityData.employmentStats.totalJobs}
    projectedGrowth: "${cityData.employmentStats.projectedGrowth}"
description: "${cityData.description}"
metropolitanArea: "${cityData.metropolitanArea}"
majorProjects:
${cityData.majorProjects.map(project => `  - "${project}"`).join('\n')}
topEmployers:
${cityData.topEmployers.map(employer => `  - "${employer}"`).join('\n')}
---

${await generateMarkdown('General Electrical', city, state)}`;

    fs.writeFileSync(path.join(cityFolder, 'index.md'), cityIndexContent);
    console.log('Created city index file');

    // Create position files
    for (const [position, baseData] of Object.entries(POSITIONS)) {
      console.log(`Generating data for ${position}...`);
      const positionData = await generatePositionData(position, city, state);
      
      const slug = position.toLowerCase().replace(/\s+/g, '-');
      const fileName = `${slug}-recruiting-agency-in-${city.toLowerCase().replace(/\s+/g, '-')}.md`;
      
      const positionContent = `---
name: "${position} Recruiting Agency in ${city}"
title: "${position} Recruiting"
position: "${position}"
city: "${city}"
state: "${state}"
description: "${positionData.description}"
marketData:
  averageSalary: ${positionData.averageSalary}
  salaryRange:
    min: ${positionData.salaryRange.min}
    max: ${positionData.salaryRange.max}
  growthRate: "${cityData.growthRate}"
  demandLevel: "High"
  employmentStats:
    totalJobs: ${Math.floor(cityData.employmentStats.totalJobs / Object.keys(POSITIONS).length)}
    projectedGrowth: "${cityData.employmentStats.projectedGrowth}"
certifications:
${positionData.certifications.map(cert => `  - "${cert}"`).join('\n')}
skills:
${positionData.skills.map(skill => `  - "${skill}"`).join('\n')}
tooling:
${baseData.tooling.map(tool => `  - "${tool}"`).join('\n')}
salaryRange:
  min: ${positionData.salaryRange.min}
  max: ${positionData.salaryRange.max}
  experience: "${positionData.experience}"
benefits:
  - "Competitive Pay"
  - "Health Insurance"
  - "401(k) with Match"
  - "Paid Time Off"
  - "Training Programs"
  - "Career Advancement"
---

${await generateMarkdown(position, city, state)}`;

      fs.writeFileSync(path.join(cityFolder, fileName), positionContent);
      console.log(`Created ${position} file`);
    }
  } catch (error) {
    console.error('Error generating content:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw error;
  }
}

// Get command line arguments
const args = process.argv.slice(2);
const state = args[0];
const city = args[1];

if (!state || !city) {
  console.error('Please provide state and city arguments');
  process.exit(1);
}

createRecruitingContent(state, city)
  .then(() => console.log('Content created successfully!'))
  .catch(console.error); 