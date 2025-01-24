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
    term: 'Pallet Jack',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Warehouse Operations',
    description: 'A manual or electric tool used to lift and move pallets within a warehouse. Designed for short-distance material handling and equipped with forks to fit under standard pallets.'
},
  {
    term: 'Loading Dock',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Loading and Unloading',
    description: 'A designated area where trucks are loaded and unloaded with goods, equipped with dock levelers to bridge the gap between the truck and warehouse floor.'
},
{
    term: 'Dock Leveler',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Loading and Unloading',
    description: 'A device used to bridge the height difference between a loading dock and a truck bed, ensuring safe and efficient loading and unloading.'
},
{
    term: 'Loading Ramp',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Loading and Unloading',
    description: 'An inclined plane used to load or unload goods from trucks when a dock is not available.'
},
{
    term: 'Material Handler',
    icon: 'mdi:forklift',
    category: 'Position',
    vertical: 'Material Movement',
    description: 'A warehouse worker responsible for moving, organizing, and staging materials for shipping or storage.'
},
{
    term: 'Freight Elevator',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Material Movement',
    description: 'A heavy-duty elevator designed to carry goods and pallets between different floors of a warehouse.'
},
{
    term: 'Hand Truck',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Material Handling',
    description: 'A two-wheeled cart used to manually transport heavy or bulky items in short distances within a warehouse.'
},
{
    term: 'Conveyor Belt',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Material Movement',
    description: 'A mechanical system that moves goods along a continuous belt for sorting, packing, or transportation.'
},
{
    term: 'Lift Gate',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Truck Loading',
    description: 'A hydraulic platform attached to the back of a truck to lift goods from the ground to the truck bed or vice versa.'
},
{
    term: 'Pallet Rack',
    icon: 'mdi:forklift',
    category: 'Storage',
    vertical: 'Warehouse Infrastructure',
    description: 'A storage system designed to hold pallets in an organized manner, often allowing for vertical stacking to maximize warehouse space.'
},
{
    term: 'Roller Conveyor',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Material Handling',
    description: 'A system of rollers that transports goods or materials, often used for assembly lines or sorting processes.'
},
{
    term: 'Shrink Wrap Machine',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Packaging',
    description: 'A device used to wrap products or pallets in plastic film to secure them during transportation or storage.'
},
{
    term: 'Loading Dock Bumper',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Dock Safety',
    description: 'A protective device mounted on the loading dock to prevent damage to the dock and trucks during loading and unloading.'
},
{
    term: 'Box Clamp',
    icon: 'mdi:forklift',
    category: 'Attachment',
    vertical: 'Forklift Operations',
    description: 'A forklift attachment designed to lift and move boxes or crates without the need for a pallet.'
},
{
    term: 'Dock Shelter',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Dock Safety',
    description: 'A structure that seals the gap between a truck and a loading dock, protecting goods and workers from external elements.'
},
{
    term: 'Order Picker',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Order Fulfillment',
    description: 'A specialized lift truck used to raise operators to access goods stored on high racks for picking orders.'
},
{
    term: 'Strapping Machine',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Packaging',
    description: 'A machine used to secure goods or pallets with straps for stability during storage or transit.'
},
{
    term: 'Receiving Bay',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Receiving Operations',
    description: 'A designated area in the warehouse where incoming goods are unloaded, inspected, and sorted before being stored.'
},
{
    term: 'Floor Scale',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Weighing and Measuring',
    description: 'A heavy-duty scale embedded in the warehouse floor used to weigh large pallets or bulk materials.'
},
{
    term: 'Pick-to-Light System',
    icon: 'mdi:forklift',
    category: 'Technology',
    vertical: 'Order Fulfillment',
    description: 'A system that uses LED lights to guide warehouse workers to the correct picking locations, increasing efficiency and accuracy.'
},
{
    term: 'Parcel Scanner',
    icon: 'mdi:forklift',
    category: 'Technology',
    vertical: 'Shipping and Receiving',
    description: 'A handheld device used to scan barcodes on parcels and track inventory or shipments in real-time.'
},
{
    term: 'Bulk Storage Bin',
    icon: 'mdi:forklift',
    category: 'Storage',
    vertical: 'Warehouse Storage',
    description: 'A large container used to store bulk materials or loose products in an organized manner within the warehouse.'
},
{
    term: 'Dock Plate',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Loading and Unloading',
    description: 'A portable platform used to bridge the gap between the dock and the truck for smooth loading and unloading of goods.'
},
{
    term: 'Stretch Wrap Dispenser',
    icon: 'mdi:forklift',
    category: 'Equipment',
    vertical: 'Packaging',
    description: 'A handheld device used to efficiently apply stretch wrap to pallets for securing goods during shipment.'
},
{
    term: 'Shipping Bay',
    icon: 'mdi:forklift',
    category: 'Infrastructure',
    vertical: 'Shipping Operations',
    description: 'A designated area where goods are staged and loaded for shipment, ensuring efficient outbound logistics.'
},
{
    term: 'Warehouse Safety Barrier',
    icon: 'mdi:forklift',
    category: 'Safety',
    vertical: 'Warehouse Infrastructure',
    description: 'A protective barrier used to separate pedestrian and vehicle traffic, reducing the risk of accidents in busy warehouse areas.'
}
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  "Pallet Jack": ["Forklift", "Pallet Truck", "Pallet Stacker", "Conveyor Belt", "Dock Leveler"],
  "Forklift": ["Pallet Jack", "Box Clamp", "Order Picker", "Pallet Stacker", "Dock Plate"],
  "Pallet Truck": ["Pallet Jack", "Hand Truck", "Pallet Stacker", "Dock Plate", "Loading Dock"],
  "Pallet Stacker": ["Forklift", "Pallet Truck", "Conveyor Belt", "Dock Leveler", "Loading Ramp"],
  "Loading Dock": ["Dock Leveler", "Dock Plate", "Dock Shelter", "Receiving Bay", "Shipping Bay"],
  "Dock Leveler": ["Loading Dock", "Dock Plate", "Forklift", "Pallet Jack", "Loading Ramp"],
  "Loading Ramp": ["Dock Leveler", "Pallet Stacker", "Conveyor Belt", "Forklift", "Receiving Bay"],
  "Material Handler": ["Pallet Jack", "Forklift", "Pallet Stacker", "Order Picker", "Roller Conveyor"],
  "Freight Elevator": ["Pallet Jack", "Dock Plate", "Loading Dock", "Hand Truck", "Roller Conveyor"],
  "Hand Truck": ["Pallet Jack", "Pallet Truck", "Freight Elevator", "Roller Conveyor", "Box Clamp"],
  "Conveyor Belt": ["Roller Conveyor", "Pick-to-Light System", "Parcel Scanner", "Material Handler", "Stretch Wrap Dispenser"],
  "Lift Gate": ["Pallet Jack", "Loading Dock", "Dock Plate", "Box Clamp", "Dock Shelter"],
  "Pallet Rack": ["Pallet Stacker", "Forklift", "Order Picker", "Material Handler", "Bulk Storage Bin"],
  "Roller Conveyor": ["Conveyor Belt", "Material Handler", "Pick-to-Light System", "Parcel Scanner", "Stretch Wrap Dispenser"],
  "Shrink Wrap Machine": ["Stretch Wrap Dispenser", "Pallet Jack", "Pallet Rack", "Order Picker", "Conveyor Belt"],
  "Loading Dock Bumper": ["Dock Plate", "Dock Shelter", "Loading Ramp", "Shipping Bay", "Warehouse Safety Barrier"],
  "Box Clamp": ["Forklift", "Pallet Truck", "Order Picker", "Loading Dock", "Dock Plate"],
  "Dock Shelter": ["Loading Dock", "Dock Leveler", "Dock Plate", "Loading Ramp", "Lift Gate"],
  "Order Picker": ["Forklift", "Pallet Stacker", "Pallet Rack", "Conveyor Belt", "Roller Conveyor"],
  "Strapping Machine": ["Shrink Wrap Machine", "Stretch Wrap Dispenser", "Shipping Bay", "Parcel Scanner", "Pick-to-Light System"],
  "Receiving Bay": ["Loading Dock", "Freight Elevator", "Conveyor Belt", "Roller Conveyor", "Dock Plate"],
  "Floor Scale": ["Pallet Jack", "Pallet Truck", "Material Handler", "Dock Plate", "Receiving Bay"],
  "Pick-to-Light System": ["Conveyor Belt", "Parcel Scanner", "Stretch Wrap Dispenser", "Roller Conveyor", "Order Picker"],
  "Parcel Scanner": ["Pick-to-Light System", "Stretch Wrap Dispenser", "Conveyor Belt", "Freight Elevator", "Receiving Bay"],
  "Bulk Storage Bin": ["Pallet Rack", "Material Handler", "Freight Elevator", "Pallet Stacker", "Warehouse Safety Barrier"]
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