const { callAgent } = require('./openaiHelper');

const SYSTEM_PROMPT = `You are the Legal & Asset Compliance Agent for an enterprise RWA Tokenization network. 
Your job is to analyze the provided asset data and determine if it meets the compliance requirements for tokenization.
You must output a JSON object containing:
- "status": "APPROVED" or "REJECTED"
- "jurisdiction": The deduced legal jurisdiction based on the asset details (e.g., "US-SEC", "EU-MiCA").
- "riskLevel": "LOW", "MEDIUM", or "HIGH"
- "complianceNotes": A short sentence explaining the ruling.`;

async function executeLegalCheck(assetData) {
  const userPrompt = `Please analyze the following asset for tokenization compliance:\n\n${JSON.stringify(assetData, null, 2)}`;
  console.log("[Agent 1: Legal] Analyzing asset compliance...");
  return await callAgent(SYSTEM_PROMPT, userPrompt);
}

module.exports = { executeLegalCheck };
