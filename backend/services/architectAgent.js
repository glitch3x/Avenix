const { callAgent } = require('./openaiHelper');
const { execSync } = require('child_process');
const path = require('path');

const SYSTEM_PROMPT = `You are the Smart Contract & Token Architect Agent for an enterprise RWA Tokenization network on Sui. 
Your job is to take the valuation math and legal parameters and construct the technical blueprint for the smart contract deployment.
You must output a JSON object containing:
- "network": The recommended blockchain (must be "Sui").
- "tokenStandard": The recommended token standard (must be "sui::coin::Coin").
- "contractAddress": Leave blank.
- "oracleFeeds": An array of strings representing data feeds attached to the contract.
- "soliditySnippet": A short 3-line Move code snippet demonstrating the contract initialization.`;

async function executeArchitect(legalParams, valuationMath, assetData) {
  const userPrompt = `Legal Parameters:\n${JSON.stringify(legalParams, null, 2)}\n\nValuation Math:\n${JSON.stringify(valuationMath, null, 2)}\n\nPlease provide the smart contract deployment architecture.`;
  console.log("[Agent 3: Architect] Structuring smart contracts...");
  
  const aiSpecs = await callAgent(SYSTEM_PROMPT, userPrompt);
  
  try {
    console.log(`[Architect] Broadcasting deployment transaction to Sui...`);
    const contractDir = path.join(__dirname, '../contracts/rwa_token');
    const output = execSync('sui client publish --gas-budget 100000000 --json', { cwd: contractDir, encoding: 'utf-8' });
    const result = JSON.parse(output);
    
    const packageId = result.objectChanges?.find(c => c.type === 'published')?.packageId;
    
    if (packageId) {
      aiSpecs.contractAddress = packageId;
      console.log(`[Architect] Live Contract Deployed at Package ID: ${aiSpecs.contractAddress}`);
    } else {
      throw new Error("Could not find package ID in transaction output");
    }
  } catch (e) {
    console.error("[Architect] Deployment Error:", e.message);
    throw new Error("Sui deployment failed. Make sure you have a funded active address.");
  }

  return aiSpecs;
}

module.exports = { executeArchitect };
