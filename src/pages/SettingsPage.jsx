import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Shield, Cpu, Key } from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('************************');
  const [aggressiveness, setAggressiveness] = useState('Balanced');

  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-12">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="max-w-4xl w-full mx-auto animate-slide-up">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Network Settings</h1>
            <p className="text-text-secondary">Configure agent behavior and API integrations.</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Agent Configuration */}
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Cpu size={20} className="text-accent" /> Agent Execution Parameters
            </h2>
            
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Valuation Aggressiveness</label>
              <div className="flex gap-2">
                {['Conservative', 'Balanced', 'Aggressive'].map(level => (
                  <button
                    key={level}
                    onClick={() => setAggressiveness(level)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-colors flex-1 ${
                      aggressiveness === level 
                      ? 'bg-accent/20 border-accent text-accent' 
                      : 'bg-background-secondary border-border-light text-text-secondary hover:border-accent/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-2">Determines the risk tolerance used by the Valuation Agent when parsing market data.</p>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2 flex items-center justify-between">
                <span>Compliance Sanctions Check</span>
                <span className="text-green-400">ENABLED</span>
              </label>
              <p className="text-xs text-text-secondary">Agent 1 will cross-reference OFAC and standard PEP lists before approval.</p>
            </div>
          </div>

          {/* API Keys */}
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Key size={20} className="text-accent" /> External Integrations
            </h2>
            
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">OpenAI API Key</label>
              <input 
                type="password" 
                className="input-field" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-text-secondary mt-2">Used for LLM inference across all three agents.</p>
            </div>

            <button className="btn btn-primary w-full sm:w-auto px-8">Save Configuration</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
