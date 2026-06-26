const { callAgent } = require('./openaiHelper');

const SYSTEM_PROMPT = `You are the Risk & Valuation Analyst Agent for an enterprise RWA Tokenization network. 
Your job is to take the legally approved asset parameters and determine its total market valuation and fractional token math.
You must output a JSON object containing:
- "assetValue": Total estimated valuation as an integer.
- "tokenSupply": The optimal number of fractional tokens to issue as an integer.
- "tokenPrice": The initial price per token as a float.
- "valuationMethod": A short phrase explaining the valuation method used.`;

async function fetchLiveMarketData() {
  try {
    const ethRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
    const ethData = await ethRes.json();
    const btcRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
    const btcData = await btcRes.json();
    return { ETH: parseFloat(ethData.price), BTC: parseFloat(btcData.price) };
  } catch (error) {
    console.error("Oracle fetch failed, using fallbacks.");
    return { ETH: 3500, BTC: 65000 };
  }
}

async function executeValuation(assetData, legalParams) {
  const liveMarkets = await fetchLiveMarketData();
  
  const userPrompt = `Live Market Benchmark Oracles:\nETH/USD: $${liveMarkets.ETH}\nBTC/USD: $${liveMarkets.BTC}\n\nAsset Details:\n${JSON.stringify(assetData, null, 2)}\n\nLegal Parameters:\n${JSON.stringify(legalParams, null, 2)}\n\nPlease provide the valuation and token fractionalization math. Use the Live Market Benchmarks to inform your current market sentiment.`;
  console.log("[Agent 2: Valuation] Ingesting Live Oracle Feeds...");
  return await callAgent(SYSTEM_PROMPT, userPrompt);
}

module.exports = { executeValuation };
