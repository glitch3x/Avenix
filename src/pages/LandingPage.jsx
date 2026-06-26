import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, CheckCircle2, FileText, Scale, Code2, Coins } from 'lucide-react';
import HeroAnimation from '../components/HeroAnimation';
import { ConnectButton } from '@mysten/dapp-kit';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <div className="logo-icon">
              <Cpu size={20} />
            </div>
            <span>Band of <span style={{ color: 'var(--accent)'}}>Agents</span></span>
          </div>
          
          <nav className="nav-links">
            <a href="#features">The Agents</a>
            <a href="#how-it-works">Pipeline</a>
            <a href="#pricing">Pricing</a>
            <a href="#docs">API Docs</a>
          </nav>
          
          <div className="header-actions">
            <ConnectButton />
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-sm">
              Launch Agent Network
            </button>
          </div>
        </div>
      </header>

      <main style={{ position: 'relative' }}>
        <HeroAnimation />
        {/* HERO SECTION */}
        <section className="hero container">
          <div className="hero-badge animate-slide-up">
            <div className="pulsing-dot"></div>
            Autonomous Multi-Agent Enterprise Network
          </div>

          <h1 className="hero-title animate-slide-up delay-100">
            Automated RWA Tokenization.<br />
            Powered by <span className="text-accent">AI Agents.</span>
          </h1>

          <p className="hero-subtitle animate-slide-up delay-200">
            An enterprise multi-agent network that automates the compliance, valuation, and technical issuance of real-world assets into hybrid digital tokens.
          </p>

          <div className="hero-cta animate-slide-up delay-300 mb-8">
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
              Initialize Pipeline
            </button>
            <button className="btn btn-outline">
              View Agent Architecture &rarr;
            </button>
          </div>

          <div className="trusted-by animate-slide-up delay-400">
            <p className="trusted-title">Trusted by institutional teams globally</p>
            <div className="trusted-logos">
              <span>NORTHLINE</span>
              <span>ATLAS</span>
              <span>MERCURY</span>
              <span>BEACON</span>
              <span>SUMMIT</span>
            </div>
          </div>

          {/* DASHBOARD PREVIEW MOCKUP */}
          <div className="dashboard-preview animate-slide-up delay-500 mt-8">
            <div className="preview-grid">
              
              <div className="preview-card main-card">
                <div className="card-header">
                  <div>
                    <span className="card-label">TOKENIZED RWA TVL</span>
                    <div className="card-value">$24,842,050.50</div>
                  </div>
                  <span className="badge-green">NETWORK LIVE</span>
                </div>
                <div className="stats-row mt-8">
                  <div className="stat">
                    <span className="stat-label">REAL ESTATE</span>
                    <span className="stat-val">$18,500,000</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">COMMODITIES</span>
                    <span className="stat-val">$4,342,050</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">EQUITIES</span>
                    <span className="stat-val">$2,000,000</span>
                  </div>
                </div>
              </div>
              
              <div className="preview-column">
                <div className="preview-card card-dark">
                  <span className="card-label">MULTI-AGENT PIPELINE</span>
                  <div className="run-title mt-2">Asset approved & issued — 2.4s</div>
                  <div className="run-desc mt-1">Legal compliance verified, asset valued, and smart contract deployed atomically.</div>
                  <div className="run-status mt-4">
                    <span className="status-dot"></span> Legal Clear · Valuation Set · Contract Live
                  </div>
                </div>
                <div className="preview-card card-dark">
                  <span className="card-label">HYBRID TOKEN</span>
                  <div className="visa-card mt-3">
                    <span className="visa-label">FRACTIONAL ASSET</span>
                    <div className="visa-number mt-6">RWA-0x8F ••• 2408</div>
                    <div className="visa-desc mt-3">Ready for protocol distribution & trading.</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="problem-section container mt-32">
          <div className="section-label text-accent">THE PROBLEM</div>
          <h2 className="section-title">Traditional asset tokenization is slow, expensive, and manual.</h2>
          <p className="section-subtitle">
            Traditional RWA issuance requires expensive legal teams to draft paperwork, manual risk analysts to determine valuation, and disjointed smart contract developers to deploy tokens. The agent network automates this entire flow.
          </p>
          
          <div className="metrics-grid">
            <div className="metric-card error-card">
              <div className="metric-val text-red">$47k+</div>
              <div className="metric-title">Legal & Compliance Overhead</div>
              <div className="metric-desc">Cost of traditional lawyers analyzing jurisdiction and structuring paperwork per asset.</div>
            </div>
            <div className="metric-card error-card">
              <div className="metric-val text-red">2–5 mos</div>
              <div className="metric-title">Time to Structure & Value</div>
              <div className="metric-desc">Months wasted waiting for manual risk and valuation analysts to clear the asset.</div>
            </div>
            <div className="metric-card error-card">
              <div className="metric-val text-red">6.2%</div>
              <div className="metric-title">Intermediary & Dev Fees</div>
              <div className="metric-desc">Hidden spreads from brokers and manual smart contract auditing overhead.</div>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION (Alternating Features - The Agents) */}
        <section className="solution-section container mt-32 mb-32" id="features">
          <div className="section-label text-accent">THE MULTI-AGENT SOLUTION</div>
          <h2 className="section-title">Three specialized agents. One seamless pipeline.</h2>
          <p className="section-subtitle mb-20">
            Our platform replaces manual intervention with a coordinated network of AI agents that handle everything from legal paperwork to smart contract deployment.
          </p>
          
          <div className="features-list">
            
            {/* Agent 1 */}
            <div className="feature-row">
              <div className="feature-content">
                <div className="feature-num text-accent">AGENT 01</div>
                <h3 className="feature-name">Legal & Asset Compliance Agent</h3>
                <p className="feature-text">Analyzes asset legal paperwork, structures problem statements regarding jurisdiction, and verifies compliance metrics before tokenization. It serves as the gateway, only signing off and passing legal parameters if approved.</p>
              </div>
              <div className="feature-visual">
                <div className="comparison-box">
                  <div className="comp-labels">
                    <span>MANUAL REVIEW</span>
                    <span>COMPLIANCE AGENT</span>
                  </div>
                  <div className="comp-cards">
                    <div className="comp-card trad">
                      <div className="comp-val">4-6 Weeks</div>
                      <div className="comp-desc">Human legal review</div>
                    </div>
                    <div className="comp-card modern">
                      <div className="comp-val text-accent">Sub-second</div>
                      <div className="comp-desc">LLM-powered document analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent 2 */}
            <div className="feature-row reverse">
              <div className="feature-content">
                <div className="feature-num text-accent">AGENT 02</div>
                <h3 className="feature-name">Risk & Valuation Analyst Agent</h3>
                <p className="feature-text">Evaluates traditional stock equity, real estate, or commodity market data to determine the hybrid asset's current valuation and fractionalization math. It computes real-time equity pricing and hands the structural requirements to the Architect.</p>
              </div>
              <div className="feature-visual centered">
                <div className="setup-card">
                  <span className="card-label">VALUATION PROCESS</span>
                  <div className="setup-steps mt-5">
                    <div className="setup-step flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent" /> Legal Parameters Received
                    </div>
                    <div className="setup-step flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent" /> Market Data Ingested
                    </div>
                    <div className="setup-step active flex items-center gap-3">
                      Fractionalization Computed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent 3 */}
            <div className="feature-row">
              <div className="feature-content">
                <div className="feature-num text-accent">AGENT 03</div>
                <h3 className="feature-name">Smart Contract & Token Architect</h3>
                <p className="feature-text">Structures the code blocks for the token issuance, mapping out real-time pricing feeds and protocol distributions. It takes the mathematical structure from the Valuation Agent and autonomously deploys the final hybrid token to the blockchain.</p>
              </div>
              <div className="feature-visual centered">
                <div className="setup-card w-full">
                  <span className="card-label">ARCHITECT DEPLOYMENT</span>
                  <div className="setup-steps mt-5">
                    <div className="setup-step flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent" /> Solidity Generated
                    </div>
                    <div className="setup-step flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent" /> Oracle Feeds Mapped
                    </div>
                    <div className="setup-step flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-accent" /> Contract Deployed
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS (Timeline) */}
        <section className="container mt-32 mb-32" id="how-it-works">
          <div className="section-label text-accent" style={{ textAlign: 'center' }}>PIPELINE WORKFLOW</div>
          <h2 className="section-title" style={{ textAlign: 'center', maxWidth: 'none' }}>How the agents coordinate seamlessly.</h2>
          
          <div className="how-it-works-grid">
            <div className="timeline-line"></div>
            
            <div className="step-card">
              <div className="step-icon"><FileText size={24} /></div>
              <div className="step-num">STEP 01</div>
              <div className="step-title">Asset Intake</div>
              <div className="step-desc">User submits traditional asset paperwork, deeds, or equity details into the network.</div>
            </div>
            
            <div className="step-card">
              <div className="step-icon"><Scale size={24} /></div>
              <div className="step-num">STEP 02</div>
              <div className="step-title">Compliance Check</div>
              <div className="step-desc">Compliance Agent reviews documents, verifies jurisdiction, and signs off on legality.</div>
            </div>
            
            <div className="step-card">
              <div className="step-icon"><Coins size={24} /></div>
              <div className="step-num">STEP 03</div>
              <div className="step-title">Valuation Engine</div>
              <div className="step-desc">Valuation Agent pulls market data, determines asset value, and creates the fractional math.</div>
            </div>
            
            <div className="step-card">
              <div className="step-icon"><Code2 size={24} /></div>
              <div className="step-num">STEP 04</div>
              <div className="step-title">Token Architect</div>
              <div className="step-desc">Architect Agent writes the smart contracts, attaches pricing feeds, and issues the tokens.</div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Initialize Tokenization Pipeline &rarr;
            </button>
          </div>
        </section>

        {/* FOR DEVELOPERS */}
        <section className="container mt-32 mb-32">
          <div className="section-label text-accent">DEVELOPER INTEGRATION</div>
          <h2 className="section-title">Integrate the Multi-Agent Network via API.</h2>
          <p className="section-subtitle">
            Interact programmatically with our specialized agents. Submit paperwork, request valuations, or command token deployments directly from your enterprise systems.
          </p>

          <div className="chains-grid">
            <div className="chain-card">
              <div className="chain-header">
                <span className="chain-name">Ethereum</span>
                <span className="chain-tag">ERC-3643</span>
              </div>
              <div className="chain-asset">EVM Compatible</div>
              <div className="chain-desc">Standard compliance tokenization for institutional flows.</div>
            </div>
            <div className="chain-card">
              <div className="chain-header">
                <span className="chain-name">Base</span>
                <span className="chain-tag">L2</span>
              </div>
              <div className="chain-asset">High-Speed EVM</div>
              <div className="chain-desc">Fast, low-cost settlement utilizing Coinbase agent kits.</div>
            </div>
            <div className="chain-card">
              <div className="chain-header">
                <span className="chain-name">Solana</span>
                <span className="chain-tag">SPL</span>
              </div>
              <div className="chain-asset">Ultra-fast Finality</div>
              <div className="chain-desc">For high-frequency trading and rapid fractional transfers.</div>
            </div>
          </div>

          <div className="code-block">
            <div className="code-label">EXAMPLE PIPELINE RESPONSE</div>
            <div className="code-content">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "pipeline_id": "rwa-7a9B-c71D",
  "status": "COMPLETED",
  "agents": {
    "compliance": { "status": "approved", "jurisdiction": "US-SEC" },
    "valuation": { "status": "completed", "asset_value": "$2,400,000" },
    "architect": { "status": "deployed", "contract_address": "0x..." }
  }
}`}
            </div>
          </div>
        </section>

        {/* PRIMITIVES */}
        <section className="container mt-32 mb-32">
          <div className="section-label text-accent">NETWORK ARCHITECTURE</div>
          <h2 className="section-title">Three specialized agent layers.</h2>
          
          <div className="primitives-grid">
            <div className="primitive-card">
              <div className="primitive-title">1. Legal Engine</div>
              <div className="primitive-desc">LLM-driven document analysis capable of parsing hundreds of pages of deeds, equity structures, and local regulations instantly.</div>
            </div>
            <div className="primitive-card">
              <div className="primitive-title">2. Valuation Oracle</div>
              <div className="primitive-desc">Real-time data ingestion from traditional markets (real estate, stocks, commodities) to dynamically price fractional tokens.</div>
            </div>
            <div className="primitive-card">
              <div className="primitive-title">3. Contract Architect</div>
              <div className="primitive-desc">Autonomous Solidity/Rust generation and deployment tailored specifically to the rules extracted by the Compliance agent.</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button className="btn btn-outline" style={{ borderColor: 'var(--accent)', color: 'var(--accent)'}}>Read Whitepaper</button>
            <button className="btn btn-outline border-none" style={{ color: '#fff' }}>Agent OpenAPI &rarr;</button>
          </div>
        </section>

        {/* WAITLIST CTA */}
        <section className="waitlist-section">
          <div className="container">
            <div className="section-label text-accent" style={{ textAlign: 'center' }}>ENTERPRISE ACCESS</div>
            <h2 className="section-title" style={{ textAlign: 'center', margin: '0 auto' }}>Ready to automate your asset tokenization?</h2>
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '24px auto 0 auto' }}>
              The multi-agent network is currently processing billions in simulated RWA volume. Drop your email to join the waitlist for mainnet production access.
            </p>
            
            <div className="waitlist-card">
              <div className="waitlist-title">Join the enterprise waitlist</div>
              <div className="waitlist-desc">Get priority access when we open the agent network to public institutional deployment.</div>
              <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="you@company.com" className="waitlist-input" required />
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '12px' }}>Request Access</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo-bg">BOA</div>
        <div className="container footer-grid">
          <div>
            <div className="footer-logo">
              <div className="logo-icon" style={{ width: '24px', height: '24px' }}>
                <Cpu size={14} />
              </div>
              <span>Band of <span style={{ color: 'var(--accent)'}}>Agents</span></span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.875rem', marginTop: '16px' }}>Automate compliance, valuation, and issuance.</p>
            
            <div style={{ marginTop: '48px' }}>
              <div className="footer-col-title">LEGAL</div>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Compliance Framework</a>
              </div>
            </div>
          </div>
          
          <div>
            <div className="footer-col-title">NETWORK</div>
            <div className="footer-links">
              <a href="#">Compliance Agent</a>
              <a href="#">Valuation Agent</a>
              <a href="#">Architect Agent</a>
              <a href="#">Pipeline Status</a>
            </div>
          </div>
          
          <div>
            <div className="footer-col-title">DEVELOPERS</div>
            <div className="footer-links">
              <a href="#">API Reference</a>
              <a href="#">Agent SDK</a>
              <a href="#">Smart Contracts</a>
              <a href="#">GitHub</a>
            </div>
          </div>
          
          <div>
            <div className="footer-col-title">COMPANY</div>
            <div className="footer-links">
              <a href="#">About Us</a>
              <a href="#">Research</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
