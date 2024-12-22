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
        term: 'Ladder Logic',
        icon: 'mdi:gate-xnor',
        category: 'Programming',
        vertical: 'PLC',
        description: 'Graphical programming language for PLCs that resembles electrical relay logic diagrams, using contacts, coils, and function blocks to create control logic.'
      },
      {
        term: 'Input Module',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Hardware component that receives signals from field devices like sensors, switches, and transmitters, converting them to digital signals for the PLC processor.'
      },
      {
        term: 'Output Module',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Hardware component that sends control signals from the PLC to field devices like motors, valves, and indicators based on program logic.'
      },
      {
        term: 'HMI',
        icon: 'mdi:gate-xnor',
        category: 'Interface',
        vertical: 'PLC',
        description: 'Human Machine Interface - touchscreen or display panel providing operator control and monitoring of PLC-controlled processes.'
      },
      {
        term: 'CPU Module',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Central Processing Unit of the PLC system that executes the control program and manages communication between modules.'
      },
      {
        term: 'Function Block',
        icon: 'mdi:gate-xnor',
        category: 'Programming',
        vertical: 'PLC',
        description: 'Pre-programmed routine performing specific control functions like timers, counters, or PID control, used in PLC programming.'
      },
      {
        term: 'Analog Input',
        icon: 'mdi:gate-xnor',
        category: 'Signals',
        vertical: 'PLC',
        description: 'Continuous variable signal (typically 4-20mA or 0-10V) from field devices measuring parameters like temperature, pressure, or flow.'
      },
      {
        term: 'Digital Input',
        icon: 'mdi:gate-xnor',
        category: 'Signals',
        vertical: 'PLC',
        description: 'Binary (on/off) signal from field devices like limit switches, pushbuttons, or proximity sensors.'
      },
      {
        term: 'PID Control',
        icon: 'mdi:gate-xnor',
        category: 'Control',
        vertical: 'PLC',
        description: 'Proportional-Integral-Derivative control algorithm used for precise process control of variables like temperature, pressure, or flow.'
      },
      {
        term: 'Motor Starter',
        icon: 'mdi:gate-xnor',
        category: 'Field Devices',
        vertical: 'PLC',
        description: 'Electromechanical device controlled by PLC outputs to start/stop motors, including overload protection and control circuits.'
      },
      {
        term: 'VFD',
        icon: 'mdi:gate-xnor',
        category: 'Field Devices',
        vertical: 'PLC',
        description: 'Variable Frequency Drive - electronic device controlled by PLC to adjust motor speed and torque by varying frequency and voltage.'
      },
      {
        term: 'Ethernet/IP',
        icon: 'mdi:gate-xnor',
        category: 'Communication',
        vertical: 'PLC',
        description: 'Industrial network protocol using standard Ethernet hardware for communication between PLCs, HMIs, and other industrial devices.'
      },
      {
        term: 'Data Table',
        icon: 'mdi:gate-xnor',
        category: 'Programming',
        vertical: 'PLC',
        description: 'Memory organization structure in PLCs storing I/O states, timer/counter values, and program variables.'
      },
      {
        term: 'Remote I/O',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Input/Output modules located away from the main PLC, connected via network communication to reduce wiring costs.'
      },
      {
        term: 'Modbus',
        icon: 'mdi:gate-xnor',
        category: 'Communication',
        vertical: 'PLC',
        description: 'Standard industrial communication protocol allowing PLCs to communicate with various devices and systems.'
      },
      {
        term: 'Structured Text',
        icon: 'mdi:gate-xnor',
        category: 'Programming',
        vertical: 'PLC',
        description: 'High-level text-based programming language for PLCs, similar to Pascal, used for complex mathematical operations.'
      },
      {
        term: 'Backplane',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Physical rack providing power and communication pathways between PLC modules through a built-in circuit board.'
      },
      {
        term: 'Safety PLC',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Specialized PLC designed for safety-critical applications, featuring redundant processing and fail-safe operations.'
      },
      {
        term: 'SCADA',
        icon: 'mdi:gate-xnor',
        category: 'Software',
        vertical: 'PLC',
        description: 'Supervisory Control and Data Acquisition - system for monitoring and controlling multiple PLCs and processes from a central location.'
      },
      {
        term: 'Power Supply',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Module providing regulated DC power to the PLC system, often including battery backup for memory retention.'
      },
      {
        term: 'OPC Server',
        icon: 'mdi:gate-xnor',
        category: 'Software',
        vertical: 'PLC',
        description: 'Software interface providing standardized data exchange between PLCs and other industrial software applications.'
      },
      {
        term: 'Rung',
        icon: 'mdi:gate-xnor',
        category: 'Programming',
        vertical: 'PLC',
        description: 'Single line of ladder logic programming containing input conditions and output instructions, similar to a circuit in relay logic.'
      },
      {
        term: 'Sensor Input',
        icon: 'mdi:gate-xnor',
        category: 'Field Devices',
        vertical: 'PLC',
        description: 'Devices providing process feedback to PLC inputs, including temperature sensors, pressure transmitters, and proximity switches.'
      },
      {
        term: 'Profibus',
        icon: 'mdi:gate-xnor',
        category: 'Communication',
        vertical: 'PLC',
        description: 'Fieldbus communication protocol for high-speed data exchange between PLCs and field devices in industrial automation.'
      },
      {
        term: 'Memory Module',
        icon: 'mdi:gate-xnor',
        category: 'Hardware',
        vertical: 'PLC',
        description: 'Removable storage device for PLC programs and data, allowing program backup and transfer between systems.'
      }
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  'Ladder Logic': ['Function Block', 'Structured Text', 'Rung', 'Data Table', 'CPU Module'],
  'Input Module': ['Digital Input', 'Analog Input', 'Remote I/O', 'Sensor Input', 'Backplane'],
  'Output Module': ['Motor Starter', 'VFD', 'Remote I/O', 'Backplane', 'Digital Input'],
  'HMI': ['SCADA', 'OPC Server', 'Ethernet/IP', 'CPU Module', 'Data Table'],
  'CPU Module': ['Power Supply', 'Memory Module', 'Backplane', 'Data Table', 'Ethernet/IP'],
  'Function Block': ['Ladder Logic', 'Structured Text', 'PID Control', 'Data Table', 'Rung'],
  'Analog Input': ['Input Module', 'Sensor Input', 'PID Control', 'Data Table', 'Remote I/O'],
  'Digital Input': ['Input Module', 'Sensor Input', 'Remote I/O', 'Data Table', 'Motor Starter'],
  'PID Control': ['Function Block', 'Analog Input', 'VFD', 'HMI', 'SCADA'],
  'Motor Starter': ['Output Module', 'VFD', 'Digital Input', 'Safety PLC', 'Remote I/O'],
  'VFD': ['Motor Starter', 'PID Control', 'Output Module', 'Analog Input', 'Profibus'],
  'Ethernet/IP': ['Modbus', 'Profibus', 'Remote I/O', 'SCADA', 'OPC Server'],
  'Data Table': ['CPU Module', 'Memory Module', 'Ladder Logic', 'Function Block', 'HMI'],
  'Remote I/O': ['Input Module', 'Output Module', 'Ethernet/IP', 'Profibus', 'Backplane'],
  'Modbus': ['Ethernet/IP', 'Profibus', 'Remote I/O', 'SCADA', 'OPC Server'],
  'Structured Text': ['Ladder Logic', 'Function Block', 'Rung', 'Data Table', 'CPU Module'],
  'Backplane': ['CPU Module', 'Power Supply', 'Input Module', 'Output Module', 'Memory Module'],
  'Safety PLC': ['CPU Module', 'Input Module', 'Output Module', 'Motor Starter', 'Emergency Stop'],
  'SCADA': ['HMI', 'OPC Server', 'Ethernet/IP', 'Data Table', 'PID Control'],
  'Power Supply': ['CPU Module', 'Backplane', 'Memory Module', 'Safety PLC', 'Remote I/O'],
  'OPC Server': ['SCADA', 'HMI', 'Ethernet/IP', 'Modbus', 'Data Table'],
  'Rung': ['Ladder Logic', 'Function Block', 'Structured Text', 'Data Table', 'CPU Module'],
  'Sensor Input': ['Input Module', 'Analog Input', 'Digital Input', 'Remote I/O', 'PID Control'],
  'Profibus': ['Ethernet/IP', 'Modbus', 'Remote I/O', 'VFD', 'Sensor Input'],
  'Memory Module': ['CPU Module', 'Data Table', 'Power Supply', 'Backplane', 'Ladder Logic']
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