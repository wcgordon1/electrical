const { config } = require('dotenv');
const OpenAI = require('openai');
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');

// Load environment variables
config({ path: 'scripts/config/.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateStateContent(state, stateData) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ 
      role: "user", 
      content: `Create highly detailed, unique content about current electrical and low voltage industry in ${state}. Include specific companies, ongoing and upcoming projects, actual statistics, and named locations. Focus on active developments, data centers, renewable energy projects, and infrastructure upgrades. Reference actual companies and developments without mentioning specific dates.` 
    }],
    functions: [{
      name: "get_state_content",
      description: "Generate structured content about state electrical industry opportunities with specific details and examples",
      parameters: {
        type: "object",
        properties: {
          marketOverview: {
            type: "string",
            description: `2-3 sentences with current statistics about construction spending and electrical workforce demand in ${state}. Include real growth percentages, actual project values, and named regions or cities where growth is happening. Focus on ongoing developments.`
          },
          upcomingProjects: {
            type: "string",
            description: `Create a detailed list of 3-4 major ongoing or upcoming electrical projects in ${state}. Include real company names, specific locations, and project values. Format as bullet points with project details. Do not include completion dates.`
          },
          staffingNeeds: {
            type: "string",
            description: `List 4-5 specific electrical and low voltage roles currently in high demand in ${state}. Include actual salary ranges, certification requirements, and growth projections. Format as bullet points with role descriptions.`
          },
          growthAreas: {
            type: "string",
            description: `2-3 sentences about specific cities or regions in ${state} currently experiencing growth. Name actual development zones, industrial parks, or economic corridors. Include details about types of projects driving growth.`
          },
          recruitingValue: {
            type: "string",
            description: `2-3 sentences about Best Electrician Jobs' current expertise in ${state}'s market. Reference local partnerships, placement success rates, or unique market knowledge. Use first person 'we' perspective and make it compelling.`
          }
        },
        required: [
          "marketOverview",
          "upcomingProjects",
          "staffingNeeds",
          "growthAreas",
          "recruitingValue"
        ]
      }
    }],
    function_call: { name: "get_state_content" }
  });

  const content = JSON.parse(completion.choices[0].message.function_call.arguments);
  
  return `### ${state} Electrical Industry Market Overview
${content.marketOverview}

### Major Electrical Projects and Developments in ${state}
${content.upcomingProjects}

### Electrical and Low Voltage Staffing Needs in ${state}
${content.staffingNeeds}

### Electrical Industry Growth Areas in ${state}
${content.growthAreas}

### ${state} Electrical Staffing & Best Electrician Jobs
${content.recruitingValue}`;
}

async function updateStateContent(statePath) {
  try {
    // Read the existing file
    const fileContent = fs.readFileSync(statePath, 'utf8');
    const { data: frontMatter } = matter(fileContent);
    
    // Generate new content
    const stateName = frontMatter.name;
    console.log(`Generating content for ${stateName}...`);
    
    const newContent = await generateStateContent(stateName, frontMatter);
    
    // Combine frontmatter with new content, effectively clearing any existing content
    const updatedContent = matter.stringify(newContent, frontMatter);
    
    // Write back to file
    fs.writeFileSync(statePath, updatedContent);
    console.log(`Updated content for ${stateName}`);
    
  } catch (error) {
    console.error('Error updating state content:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw error;
  }
}

async function processAllStates() {
  const recruitingDir = path.join(process.cwd(), 'src/content/recruiting');
  const states = fs.readdirSync(recruitingDir)
    .filter(item => {
      const statePath = path.join(recruitingDir, item);
      return fs.statSync(statePath).isDirectory();
    });

  for (const state of states) {
    const indexPath = path.join(recruitingDir, state, 'index.md');
    if (fs.existsSync(indexPath)) {
      await updateStateContent(indexPath);
      // Add a small delay between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Get command line arguments
const args = process.argv.slice(2);
const specificState = args[0];

if (specificState) {
  // Format state name: convert to lowercase and replace spaces with hyphens
  const formattedState = specificState.toLowerCase().replace(/\s+/g, '-');
  
  // Update specific state
  const statePath = path.join(process.cwd(), 'src/content/recruiting', formattedState, 'index.md');
  if (fs.existsSync(statePath)) {
    updateStateContent(statePath)
      .then(() => console.log('State content updated successfully!'))
      .catch(console.error);
  } else {
    console.error(`State index file not found: ${statePath}`);
  }
} else {
  // Update all states
  processAllStates()
    .then(() => console.log('All state content updated successfully!'))
    .catch(console.error);
} 