import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Play, 
  Cpu, 
  Zap, 
  Code2, 
  FileCode,
  Sparkles
} from 'lucide-react';
import { CODE_SAMPLES } from '../data/mockAssets';
import { CodeSample } from '../types';

interface CodeAuditorStudioProps {
  onSimulateInference: () => void;
  isProcessing: boolean;
}

export const CodeAuditorStudio: React.FC<CodeAuditorStudioProps> = ({
  onSimulateInference,
  isProcessing,
}) => {
  const [selectedSample, setSelectedSample] = useState<CodeSample>(CODE_SAMPLES[0]);
  const [activeTab, setActiveTab] = useState<'audit' | 'fixed' | 'tests'>('audit');
  const [customCode, setCustomCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunAudit = () => {
    onSimulateInference();
  };

  const offlineTests = `// Generated 100% Offline via StarCoder2-INT4 on Hexagon NPU
import { describe, it, expect } from 'vitest';
import { verifyClientAuthToken } from './auth';

describe('Local Zero-Trust Token Verifier', () => {
  const SECRET = 'airgapped_creator_key_x1e';

  it('rejects tampered signatures with constant-time check', () => {
    const invalidToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.tampered_sig';
    const result = verifyClientAuthToken(invalidToken, SECRET);
    expect(result.valid).toBe(false);
  });

  it('prevents denial of service on malformed payloads', () => {
    const malformed = 'not.a.token';
    const result = verifyClientAuthToken(malformed, SECRET);
    expect(result.valid).toBe(false);
  });
});`;

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              QNN EP Code Engine
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Zero Source Code Transmission • Air-Gapped
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1">
            Proprietary Codebase & Security Auditor
          </h1>
          <p className="text-xs text-slate-400">
            Never upload proprietary algorithms, API auth modules, or trading logic to cloud providers. Audit, refactor, and generate unit tests locally on the NPU.
          </p>
        </div>

        {/* Sample Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Confidential Repos:</span>
          {CODE_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setSelectedSample(sample);
                setCustomCode('');
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                selectedSample.id === sample.id && !customCode
                  ? 'bg-cyan-950 border-cyan-600 text-cyan-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Code */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {selectedSample.title}
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
                {selectedSample.language}
              </span>
            </div>

            <div className="relative">
              <textarea
                value={customCode || selectedSample.originalCode}
                onChange={(e) => setCustomCode(e.target.value)}
                rows={16}
                className="w-full bg-slate-950 text-slate-200 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:outline-hidden focus:border-cyan-500 leading-relaxed resize-none"
                placeholder="Paste confidential proprietary code here..."
              />

              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 rounded-lg">
                  <div className="w-7 h-7 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                  <span className="text-xs font-mono text-cyan-300">
                    AST Parsing on Hexagon NPU...
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Model: StarCoder2-7B-INT4 (1.9GB Memory)
              </span>
              <button
                onClick={handleRunAudit}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/30 transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Auditing...' : 'Run Local NPU Audit'}</span>
              </button>
            </div>
          </div>

          {/* Performance Telemetry Note */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-3 text-xs flex items-center gap-3">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">Local Telemetry Gain:</span>{' '}
              <span className="text-slate-400">{selectedSample.performanceBoost}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Security Issues, Fixed Code & Tests */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            {/* Tab Navigation */}
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === 'audit'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Vulnerability Report ({selectedSample.securityIssues.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('fixed')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === 'fixed'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audited NPU Code</span>
                </button>
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === 'tests'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Offline Tests</span>
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    activeTab === 'fixed'
                      ? selectedSample.auditedCode
                      : activeTab === 'tests'
                      ? offlineTests
                      : JSON.stringify(selectedSample.securityIssues, null, 2)
                  )
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4">
              {activeTab === 'audit' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pb-2 border-b border-slate-800">
                    <span>Audit performed locally in 14ms (0 Cloud Bytes Uploaded)</span>
                    <span className="text-emerald-400 font-mono">Air-Gap Confirmed</span>
                  </div>

                  {selectedSample.securityIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                            issue.severity === 'critical'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : issue.severity === 'high'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-blue-950 text-blue-300 border border-blue-800'
                          }`}
                        >
                          {issue.severity} RISK
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100">{issue.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{issue.description}</p>
                      <div className="pt-2 border-t border-slate-900 text-[11px] text-cyan-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Fix: {issue.fixExplanation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'fixed' && (
                <div className="relative">
                  <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto max-h-[420px] border border-slate-800 leading-relaxed">
                    {selectedSample.auditedCode}
                  </pre>
                </div>
              )}

              {activeTab === 'tests' && (
                <div className="relative">
                  <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-indigo-300 overflow-x-auto max-h-[420px] border border-slate-800 leading-relaxed">
                    {offlineTests}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
