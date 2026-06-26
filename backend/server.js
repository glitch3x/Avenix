const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { executeLegalCheck } = require('./services/legalAgent');
const { executeValuation } = require('./services/valuationAgent');
const { executeArchitect } = require('./services/architectAgent');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/pipeline/execute', async (req, res) => {
  try {
    const { assetData } = req.body;
    if (!assetData || typeof assetData !== 'object') {
      return res.status(400).json({ error: "Missing or invalid assetData in request body." });
    }
    if (!assetData.name || !assetData.value) {
      return res.status(400).json({ error: "assetData must contain at least a 'name' and 'value'." });
    }

    console.log("=== STARTING MULTI-AGENT PIPELINE ===");
    console.log("Input Asset:", assetData.name);

    // Agent 1: Legal & Compliance
    const legalParams = await executeLegalCheck(assetData);
    if (legalParams.status !== "APPROVED") {
      console.log("Pipeline Halted: Legal Compliance Rejected.");
      return res.status(403).json({ 
        success: false, 
        message: "Asset rejected by Legal Agent.",
        data: { legal: legalParams }
      });
    }

    // Agent 2: Risk & Valuation
    const valuationMath = await executeValuation(assetData, legalParams);

    // Agent 3: Smart Contract Architect
    const architectSpecs = await executeArchitect(legalParams, valuationMath, assetData);

    console.log("=== PIPELINE EXECUTION SUCCESSFUL ===");

    // Save to Database
    const dbAsset = await prisma.asset.create({
      data: {
        name: assetData.name,
        type: assetData.type || "Unknown",
        estimatedValue: Number(assetData.value) || 0
      }
    });

    const dbRun = await prisma.tokenizationRun.create({
      data: {
        assetId: dbAsset.id,
        status: legalParams.status,
        jurisdiction: legalParams.jurisdiction,
        riskLevel: legalParams.riskLevel,
        assetValue: valuationMath.assetValue,
        tokenSupply: valuationMath.tokenSupply,
        tokenPrice: valuationMath.tokenPrice,
        network: architectSpecs.network,
        tokenStandard: architectSpecs.tokenStandard,
        contractAddress: architectSpecs.contractAddress
      }
    });

    // Return the aggregated output of all 3 agents
    return res.status(200).json({
      success: true,
      pipeline_id: dbRun.id,
      agents: {
        legal: legalParams,
        valuation: valuationMath,
        architect: architectSpecs
      }
    });

  } catch (error) {
    console.error("Pipeline Error:", error);
    res.status(500).json({ success: false, error: "Multi-Agent Pipeline execution failed." });
  }
});

app.get('/api/assets', async (req, res) => {
  try {
    const runs = await prisma.tokenizationRun.findMany({
      include: { asset: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: runs });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch assets." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Band of Agents Backend running on http://localhost:${PORT}`);
});
