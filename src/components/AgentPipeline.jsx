import React, { useState, useEffect } from 'react';
import { ShieldCheck, TrendingUp, Code2, CheckCircle2, Circle, Loader2, FileJson, FileCode2 } from 'lucide-react';

const AgentPipeline = ({ asset }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [logs, setLogs] = useState([]);
  const [outputs, setOutputs] = useState({
    compliance: null,
    valuation: null,
    contract: null
  });

  const addLog = (agent, message, delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), agent, message }]);
        resolve();
      }, delay);
    });
  };

  useEffect(() => {
    let isMounted = true;
    
    const runPipeline = async () => {
      try {
        setCurrentStage(1);
        await addLog('System', `Connecting to agent network for ${asset.name}...`, 500);
        setCurrentStage(2);
        await addLog('Pipeline', 'Executing Legal, Valuation, and Architect agents on the backend...', 500);
        
        const response = await fetch('/api/pipeline/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assetData: asset })
        });
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        if (data.success) {
          await addLog('Compliance', `Status: ${data.agents.legal.status}`, 100);
          await addLog('Valuation', `Computed value: $${data.agents.valuation.assetValue?.toLocaleString()}`, 100);
          await addLog('Architect', `Structured for ${data.agents.architect.network}`, 100);
          
          setOutputs({
            compliance: data.agents.legal,
            valuation: data.agents.valuation,
            contract: data.agents.architect
          });
          setCurrentStage(4);
        } else {
          await addLog('System', `Pipeline error: ${data.message || data.error}`, 100);
          if (data.data?.legal) {
            setOutputs(prev => ({ ...prev, compliance: data.data.legal }));
          }
          setCurrentStage(4);
        }
      } catch (err) {
        if (!isMounted) return;
        await addLog('System', `Network error: Failed to reach backend API.`, 100);
        setCurrentStage(4);
      }
    };

    runPipeline();
    
    return () => { isMounted = false; };
  }, [asset]);

  return (
    <div className="flex flex-col h-full gap-8">
      
      {/* Network Visualization */}
      <div className="flex items-center justify-between px-8 py-4 bg-background-glass rounded-xl border border-border-light relative overflow-hidden">
        
        <AgentNode 
          icon={<ShieldCheck size={24} />}
          name="Compliance"
          isActive={currentStage === 1}
          isDone={currentStage > 1}
        />
        
        <Connector isActive={currentStage >= 1} isDone={currentStage > 1} />

        <AgentNode 
          icon={<TrendingUp size={24} />}
          name="Valuation"
          isActive={currentStage === 2}
          isDone={currentStage > 2}
        />
        
        <Connector isActive={currentStage >= 2} isDone={currentStage > 2} />

        <AgentNode 
          icon={<Code2 size={24} />}
          name="Token Architect"
          isActive={currentStage === 3}
          isDone={currentStage > 3}
        />

      </div>

      {/* Split View: Logs & Outputs */}
      <div className="flex-1 grid md:grid-cols-2 gap-6">
        
        {/* Terminal Logs */}
        <div className="bg-[#0a0f1c] rounded-xl border border-border-light p-4 font-mono text-xs flex flex-col relative overflow-hidden shadow-inner">
          <div className="flex items-center gap-2 mb-4 border-b border-border-light pb-2 text-text-secondary uppercase tracking-widest font-sans font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="ml-2 text-[10px]">Agent Execution Logs</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {logs.map((log, i) => (
              <div key={i} className="animate-fade-in text-white/80">
                <span className="text-text-secondary">[{log.time}]</span>{' '}
                <span className="text-accent">{log.agent}:</span>{' '}
                {log.message}
              </div>
            ))}
            {currentStage < 4 && (
              <div className="flex items-center gap-2 text-text-secondary mt-4 animate-pulse">
                <Loader2 size={12} className="animate-spin" /> processing...
              </div>
            )}
            <div className="h-4"></div>
          </div>
        </div>

        {/* Structured Outputs */}
        <div className="flex flex-col gap-4">
          
          <OutputCard 
            title="Legal Parameters" 
            data={outputs.compliance} 
            icon={<FileText size={16} />}
            isVisible={currentStage > 1}
            delay="delay-100"
          />
          
          <OutputCard 
            title="Valuation Model" 
            data={outputs.valuation} 
            icon={<BarChart3 size={16} />}
            isVisible={currentStage > 2}
            delay="delay-200"
          />
          
          <OutputCard 
            title="Smart Contract Schema" 
            data={outputs.contract} 
            icon={<FileCode2 size={16} />}
            isVisible={currentStage > 3}
            delay="delay-300"
            isCode={true}
          />
          
          {currentStage === 4 && (
            <div className="mt-auto pt-4 animate-slide-up delay-500">
              <button className="btn btn-accent w-full py-3 text-sm shadow-lg shadow-accent/20">
                Sign & Execute Mainnet Deployment
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const AgentNode = ({ icon, name, isActive, isDone }) => (
  <div className="flex flex-col items-center gap-3 relative z-10">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
      isActive ? 'bg-accent border border-accent text-background shadow-[0_0_30px_rgba(56,189,248,0.5)] scale-110' :
      isDone ? 'bg-[#0d1b2a] border border-accent/50 text-accent shadow-[0_0_15px_rgba(56,189,248,0.2)]' :
      'bg-background border border-border-light text-text-secondary opacity-50'
    }`}>
      {icon}
      {isDone && !isActive && (
        <div className="absolute -top-2 -right-2 bg-background rounded-full">
          <CheckCircle2 size={18} className="text-accent" />
        </div>
      )}
    </div>
    <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${
      isActive ? 'text-white' : isDone ? 'text-accent' : 'text-text-secondary'
    }`}>
      {name}
    </span>
  </div>
);

const Connector = ({ isActive, isDone }) => (
  <div className="flex-1 h-[2px] mx-4 relative overflow-hidden bg-border-light/50">
    <div className={`absolute top-0 left-0 h-full w-full transition-transform duration-1000 ${
      isDone ? 'bg-accent/50 translate-x-0' : '-translate-x-full'
    }`} />
    {isActive && !isDone && (
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-accent to-transparent animate-[data-flow_1.5s_linear_infinite]" />
    )}
  </div>
);

const OutputCard = ({ title, data, icon, isVisible, delay, isCode }) => {
  if (!isVisible) return (
    <div className="bg-background-secondary border border-border-light/50 rounded-xl p-4 opacity-30 flex items-center justify-center h-[100px]">
      <Loader2 size={16} className="text-text-secondary animate-spin" />
    </div>
  );

  return (
    <div className={`bg-background-glass border border-accent/30 rounded-xl p-4 shadow-[0_4px_20px_rgba(56,189,248,0.05)] animate-slide-up ${delay}`}>
      <div className="flex items-center gap-2 mb-3 text-white font-bold text-sm border-b border-border-light pb-2">
        <span className="text-accent">{icon}</span> {title}
      </div>
      {isCode ? (
        <pre className="text-[10px] font-mono text-accent-light bg-[#020612] p-2 rounded border border-border-light overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data && Object.entries(data).map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <span className="text-text-secondary uppercase tracking-wider text-[9px] mb-1">{k}</span>
              <span className="text-white font-medium">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentPipeline;
