const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set in config/.env.local');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const GLOSSARY_TERMS = [
  {
    term: 'Server Rack',
    icon: 'mdi:lan-pending',
    category: 'Infrastructure',
    vertical: 'Network Infrastructure',
    description: 'Standardized 19-inch frame for mounting servers, network equipment, and accessories. Typically 42U in height with proper airflow management and power distribution.'
  },
  {
    term: 'PDU',
    icon: 'mdi:lan-pending',
    category: 'Power',
    vertical: 'Network Infrastructure',
    description: 'Power Distribution Unit providing managed power distribution to rack equipment, including monitoring, remote control, and surge protection capabilities.'
  },
  {
    term: 'Hot Aisle',
    icon: 'mdi:lan-pending',
    category: 'Cooling',
    vertical: 'Network Infrastructure',
    description: 'Contained aisle in data center where equipment exhaust heat is collected and removed, part of efficient cooling design strategy.'
  },
  {
    term: 'Cold Aisle',
    icon: 'mdi:lan-pending',
    category: 'Cooling',
    vertical: 'Network Infrastructure',
    description: 'Contained aisle where cooled air is supplied to server rack intakes, maintaining optimal operating temperatures for equipment.'
  },
  {
    term: 'CRAH Unit',
    icon: 'mdi:lan-pending',
    category: 'Cooling',
    vertical: 'Network Infrastructure',
    description: 'Computer Room Air Handler providing precise temperature and humidity control for data center environments.'
  },
  {
    term: 'Raised Floor',
    icon: 'mdi:lan-pending',
    category: 'Infrastructure',
    vertical: 'Network Infrastructure',
    description: 'Elevated floor system providing space for power distribution, cooling, and cable management in data centers.'
  },
  {
    term: 'Cable Tray',
    icon: 'mdi:lan-pending',
    category: 'Infrastructure',
    vertical: 'Network Infrastructure',
    description: 'Overhead or under-floor support system for organizing and routing network and power cables throughout the facility.'
  },
  {
    term: 'Fiber Backbone',
    icon: 'mdi:lan-pending',
    category: 'Cabling',
    vertical: 'Network Infrastructure',
    description: 'High-capacity fiber optic cabling connecting different areas of the facility, providing primary data transmission paths.'
  },
  {
    term: 'UPS System',
    icon: 'mdi:lan-pending',
    category: 'Power',
    vertical: 'Network Infrastructure',
    description: 'Uninterruptible Power Supply providing battery backup and power conditioning for critical network equipment.'
  },
  {
    term: 'DCIM',
    icon: 'mdi:lan-pending',
    category: 'Management',
    vertical: 'Network Infrastructure',
    description: 'Data Center Infrastructure Management software monitoring power, cooling, and equipment status in real-time.'
  },
  {
    term: 'Core Switch',
    icon: 'mdi:lan-pending',
    category: 'Network',
    vertical: 'Network Infrastructure',
    description: 'Central network switch handling high-speed traffic between different areas of the network, requiring redundant power and cooling.'
  },
  {
    term: 'MDA',
    icon: 'mdi:lan-pending',
    category: 'Distribution',
    vertical: 'Network Infrastructure',
    description: 'Main Distribution Area housing core networking equipment and primary connections to service provider equipment.'
  },
  {
    term: 'HDA',
    icon: 'mdi:lan-pending',
    category: 'Distribution',
    vertical: 'Network Infrastructure',
    description: 'Horizontal Distribution Area serving as connection point between backbone and horizontal cabling to equipment.'
  },
  {
    term: 'Environmental Monitoring',
    icon: 'mdi:lan-pending',
    category: 'Monitoring',
    vertical: 'Network Infrastructure',
    description: 'System tracking temperature, humidity, and other environmental conditions affecting equipment operation.'
  },
  {
    term: 'Generator Backup',
    icon: 'mdi:lan-pending',
    category: 'Power',
    vertical: 'Network Infrastructure',
    description: 'Emergency power system providing long-term backup power during utility outages, including fuel systems and controls.'
  },
  {
    term: 'Static Transfer Switch',
    icon: 'mdi:lan-pending',
    category: 'Power',
    vertical: 'Network Infrastructure',
    description: 'High-speed switch automatically transferring critical loads between power sources without interruption.'
  },
  {
    term: 'Patch Panel',
    icon: 'mdi:lan-pending',
    category: 'Connectivity',
    vertical: 'Network Infrastructure',
    description: 'Organized termination point for network cables, facilitating connections and changes between network equipment.'
  },
  {
    term: 'Cable Management',
    icon: 'mdi:lan-pending',
    category: 'Infrastructure',
    vertical: 'Network Infrastructure',
    description: 'System of guides, troughs, and accessories organizing cables within racks and pathways for proper airflow and access.'
  },
  {
    term: 'Grounding System',
    icon: 'mdi:lan-pending',
    category: 'Power',
    vertical: 'Network Infrastructure',
    description: 'Common ground reference system for equipment and racks, including mesh bonding network and ground bars.'
  },
  {
    term: 'Power Monitoring',
    icon: 'mdi:lan-pending',
    category: 'Management',
    vertical: 'Network Infrastructure',
    description: 'System tracking power usage, quality, and efficiency throughout the facility, including branch circuit monitoring.'
  },
  {
    term: 'Fiber Enclosure',
    icon: 'mdi:lan-pending',
    category: 'Connectivity',
    vertical: 'Network Infrastructure',
    description: 'Rack-mounted housing protecting fiber optic splices and connections, including splice trays and cable management.'
  },
  {
    term: 'VESDA',
    icon: 'mdi:lan-pending',
    category: 'Safety',
    vertical: 'Network Infrastructure',
    description: 'Very Early Smoke Detection Apparatus providing early warning of potential fire conditions in critical facilities.'
  },
  {
    term: 'EPO System',
    icon: 'mdi:lan-pending',
    category: 'Safety',
    vertical: 'Network Infrastructure',
    description: 'Emergency Power Off system providing rapid shutdown of power systems in emergency situations, required by code.'
  }
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  'Server Rack': ['PDU', 'Cable Management', 'Hot Aisle', 'Cold Aisle', 'Grounding System'],
  'PDU': ['UPS System', 'Power Monitoring', 'Server Rack', 'Static Transfer Switch', 'Generator Backup'],
  'Hot Aisle': ['Cold Aisle', 'CRAH Unit', 'Environmental Monitoring', 'Server Rack', 'Cable Management'],
  'Cold Aisle': ['Hot Aisle', 'CRAH Unit', 'Environmental Monitoring', 'Server Rack', 'Raised Floor'],
  'CRAH Unit': ['Hot Aisle', 'Cold Aisle', 'Environmental Monitoring', 'Raised Floor', 'DCIM'],
  'Raised Floor': ['Cable Tray', 'CRAH Unit', 'Power Distribution', 'Grounding System', 'Fire Suppression'],
  'Cable Tray': ['Fiber Backbone', 'Cable Management', 'Raised Floor', 'Patch Panel', 'Grounding System'],
  'Fiber Backbone': ['Fiber Enclosure', 'MDA', 'HDA', 'Core Switch', 'Cable Tray'],
  'UPS System': ['Generator Backup', 'Static Transfer Switch', 'PDU', 'Power Monitoring', 'EPO System'],
  'DCIM': ['Environmental Monitoring', 'Power Monitoring', 'Access Control', 'Core Switch', 'VESDA'],
  'Core Switch': ['MDA', 'HDA', 'Fiber Backbone', 'Patch Panel', 'DCIM'],
  'MDA': ['HDA', 'Core Switch', 'Fiber Backbone', 'Patch Panel', 'Cable Management'],
  'HDA': ['MDA', 'Patch Panel', 'Fiber Backbone', 'Cable Management', 'Core Switch'],
  'Environmental Monitoring': ['CRAH Unit', 'DCIM', 'VESDA', 'Hot Aisle', 'Cold Aisle'],
  'Generator Backup': ['UPS System', 'Static Transfer Switch', 'PDU', 'Power Monitoring', 'EPO System'],
  'Static Transfer Switch': ['UPS System', 'Generator Backup', 'PDU', 'Power Monitoring', 'EPO System'],
  'Patch Panel': ['Cable Management', 'Fiber Enclosure', 'MDA', 'HDA', 'Core Switch'],
  'Cable Management': ['Server Rack', 'Cable Tray', 'Patch Panel', 'PDU', 'Fiber Enclosure'],
  'Grounding System': ['Server Rack', 'PDU', 'Cable Tray', 'Raised Floor', 'UPS System'],
  'Power Monitoring': ['PDU', 'UPS System', 'Generator Backup', 'DCIM', 'Static Transfer Switch'],
  'Fiber Enclosure': ['Fiber Backbone', 'Patch Panel', 'Cable Management', 'MDA', 'HDA'],
  'VESDA': ['Fire Suppression', 'Environmental Monitoring', 'DCIM', 'Access Control', 'EPO System'],
  'EPO System': ['Fire Suppression', 'UPS System', 'Generator Backup', 'Static Transfer Switch', 'Access Control']
};

async function createGlossaryEntry(term, icon, category, vertical, description) {
  const filename = term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filePath = path.join(__dirname, '..', 'src', 'content', 'glossary', `${filename}.md`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Create a detailed glossary entry for the ${vertical} industry term "${term}". 
                 Use this description as a starting point: "${description}"
                 Include:
                 1. Start with a Detailed explanation of the term, no headings before this.
                 2. Display the rest of the content separated into h2 - h4 headings.
                 3. Common applications
                 4. Safety considerations if applicable
                 5. Related terms or concepts
                 6. Only use h2, h3, and h4 headings, do not use h1.
                 Format in markdown so i can copy and paste into the file, do not reiterate any of your instructions, do not diplay ticks around the markdown either.`
      }
    ],
    temperature: 0.7
  });

  const content = completion.choices[0].message.content;

  // Create frontmatter with vertical included
  const frontmatter = {
    term,
    icon,
    category,
    vertical,
    description,
    details: [
      {
        title: "Category",
        value: category
      },
      {
        title: "Industry",
        value: vertical
      },
      {
        title: "Related Terms",
        value: RELATED_TERMS[term] ? RELATED_TERMS[term].join(', ') : 'None'
      }
    ]
  };

  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created glossary entry: ${filename}.md (${vertical} - ${category})`);
}

async function createAllEntries() {
  // Group entries by vertical for logging
  const entriesByVertical = {};
  
  for (const entry of GLOSSARY_TERMS) {
    await createGlossaryEntry(entry.term, entry.icon, entry.category, entry.vertical, entry.description);
    
    // Track entries by vertical
    entriesByVertical[entry.vertical] = entriesByVertical[entry.vertical] || [];
    entriesByVertical[entry.vertical].push(entry.term);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Log summary by vertical
  console.log('\nCreated entries by vertical:');
  Object.entries(entriesByVertical).forEach(([vertical, terms]) => {
    console.log(`\n${vertical}:`);
    terms.forEach(term => console.log(`  - ${term}`));
  });
}

createAllEntries().catch(console.error); 