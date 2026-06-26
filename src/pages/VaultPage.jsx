import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Database, Loader2, Link as LinkIcon, Building2 } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const VaultPage = () => {
  const navigate = useNavigate();
  const [runs, setRuns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/assets')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRuns(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-12">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <ConnectButton />
      </div>

      <div className="max-w-6xl w-full mx-auto animate-slide-up">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Asset Vault</h1>
            <p className="text-text-secondary">All historical agent network tokenization runs.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="glass-panel p-20 flex flex-col items-center justify-center text-text-secondary">
            <Loader2 size={32} className="animate-spin mb-4" />
            <p>Fetching vault data...</p>
          </div>
        ) : runs.length === 0 ? (
          <div className="glass-panel p-20 text-center text-text-secondary border-dashed">
            <Building2 size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg text-white mb-2">Your vault is empty</p>
            <p>Initialize a new tokenization run from the dashboard.</p>
            <button onClick={() => navigate('/dashboard')} className="btn btn-outline mt-6">
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {runs.map((run) => (
              <div key={run.id} className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-accent/50 transition-colors cursor-pointer group">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded bg-green-500/20 text-green-400 border border-green-500/30`}>
                      {run.status}
                    </span>
                    <span className="text-text-secondary text-xs">{new Date(run.createdAt).toLocaleString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{run.asset.name}</h3>
                  <p className="text-sm text-text-secondary">{run.asset.type} • {run.jurisdiction || 'Global'}</p>
                </div>
                
                <div className="flex gap-8">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">Valuation</span>
                    <span className="font-mono text-accent">${run.assetValue?.toLocaleString() || '---'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">Tokens Issued</span>
                    <span className="font-mono">{run.tokenSupply?.toLocaleString() || '---'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">Network</span>
                    <span className="font-medium flex items-center gap-1">
                      <LinkIcon size={12} /> {run.network || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultPage;
