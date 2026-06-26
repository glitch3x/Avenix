import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle2, ShieldAlert, BarChart3, Code2, Link as LinkIcon, Database, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AgentPipeline from '../components/AgentPipeline';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [assetType, setAssetType] = useState('Real Estate');
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    if (assetName && assetValue) {
      setIsStarted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-12">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/vault')} className="btn btn-outline text-xs py-2 px-4 border-border-light hover:border-accent">
            <Database size={14} className="inline mr-2" />
            Asset Vault
          </button>
          <button onClick={() => navigate('/settings')} className="btn btn-outline text-xs py-2 px-4 border-border-light hover:border-accent">
            <Settings size={14} className="inline mr-2" />
            Settings
          </button>
          <ConnectButton />
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* Left Col: Setup Form */}
        <div className="lg:col-span-4 animate-slide-in-right">
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold mb-2">New Issuance</h2>
            <p className="text-text-secondary text-sm mb-8">Configure asset parameters for the agent network.</p>
            
            <form onSubmit={handleStart} className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Asset Type</label>
                <div className="flex gap-2">
                  {['Real Estate', 'Equity', 'Commodity'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAssetType(type)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors flex-1 ${
                        assetType === type 
                        ? 'bg-accent/20 border-accent text-accent' 
                        : 'bg-background-secondary border-border-light text-text-secondary hover:border-accent/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Asset Identifier</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. 123 Main St Commercial"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  disabled={isStarted}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Estimated Value (USD)</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="2500000"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  disabled={isStarted}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Legal Paperwork</label>
                <div className="border-2 border-dashed border-border-light rounded-xl p-6 flex flex-col items-center justify-center text-center bg-background-secondary/50 transition-colors hover:border-accent/50 cursor-pointer">
                  <Upload className="text-accent mb-2" size={24} />
                  <span className="text-sm font-medium">Upload PDF Documents</span>
                  <span className="text-xs text-text-secondary mt-1">Deeds, LLC structure, appraisals</span>
                </div>
              </div>

              {!isStarted ? (
                <button type="submit" className="btn btn-accent w-full py-4 mt-2">
                  Initialize Tokenization
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => setIsStarted(false)}
                  className="btn btn-outline w-full py-4 mt-2"
                >
                  Reset Pipeline
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Right Col: Agent Pipeline */}
        <div className="lg:col-span-8 animate-slide-up delay-200">
          <div className="glass-panel p-8 h-full min-h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-border-light pb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    {isStarted && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isStarted ? 'bg-accent' : 'bg-text-secondary'}`}></span>
                  </span>
                  Agent Network Status
                </h2>
                <p className="text-text-secondary text-sm mt-1">Multi-agent consensus and generation</p>
              </div>
              {isStarted && (
                <div className="badge animate-pulse-glow">Processing...</div>
              )}
            </div>

            <div className="flex-1">
              {!isStarted ? (
                <div className="h-full flex flex-col items-center justify-center text-text-secondary opacity-50">
                  <Cpu size={64} className="mb-4 text-border-light" />
                  <p>Awaiting initialization...</p>
                </div>
              ) : (
                <AgentPipeline asset={{ type: assetType, name: assetName, value: assetValue }} />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
