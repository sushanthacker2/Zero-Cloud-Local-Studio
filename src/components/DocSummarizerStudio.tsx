import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Square, 
  AlertOctagon, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Cpu 
} from 'lucide-react';
import { DOCUMENT_SAMPLES } from '../data/mockAssets';
import { DocumentSample } from '../types';

interface DocSummarizerStudioProps {
  onSimulateInference: () => void;
  isProcessing: boolean;
}

export const DocSummarizerStudio: React.FC<DocSummarizerStudioProps> = ({
  onSimulateInference,
  isProcessing,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentSample>(DOCUMENT_SAMPLES[0]);
  const [customText, setCustomText] = useState('');
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleAction = (index: number) => {
    setCheckedActions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCopy = () => {
    const summaryText = `# ${selectedDoc.title}\n\n## Executive Summary\n${selectedDoc.summary}\n\n## Action Items\n${selectedDoc.actionItems.map(a => `- [ ] ${a}`).join('\n')}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSummarize = () => {
    onSimulateInference();
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              QNN EP Document Engine
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% On-Device • Encrypted RAM Buffer
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1">
            Confidential Document & Pitch Deck Summarizer
          </h1>
          <p className="text-xs text-slate-400">
            Process NDA contracts, investor memos, and unreleased screenplays with zero risk of leaks to cloud training datasets.
          </p>
        </div>

        {/* Sample Picker */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Classified Files:</span>
          {DOCUMENT_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setSelectedDoc(sample);
                setCustomText('');
                setCheckedActions({});
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                selectedDoc.id === sample.id && !customText
                  ? 'bg-cyan-950 border-cyan-600 text-cyan-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {sample.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Raw Document Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {selectedDoc.title}
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-rose-950/80 text-rose-300 border border-rose-800/60 px-2 py-0.5 rounded">
                {selectedDoc.classification}
              </span>
            </div>

            <div className="relative">
              <textarea
                value={customText || selectedDoc.content}
                onChange={(e) => setCustomText(e.target.value)}
                rows={16}
                className="w-full bg-slate-950 text-slate-200 font-sans text-xs p-3.5 rounded-lg border border-slate-800 focus:outline-hidden focus:border-cyan-500 leading-relaxed resize-none"
                placeholder="Paste confidential agreement, investor brief, or script..."
              />

              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 rounded-lg">
                  <div className="w-7 h-7 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                  <span className="text-xs font-mono text-cyan-300">
                    Hexagon NPU Summarizing Locally...
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Model: Llama-3.2-3B-INT4 (1.4GB RAM)
              </span>
              <button
                onClick={handleRunSummarize}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/30 transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Summarizing...' : 'Summarize On NPU'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Local NPU Executive Brief
                </h3>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Export Brief'}</span>
              </button>
            </div>

            {/* Executive Summary */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <h4 className="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-semibold mb-1.5">
                Executive Synthesis
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDoc.summary}
              </p>
            </div>

            {/* Extracted Action Items */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-[11px] uppercase tracking-wider text-indigo-400 font-mono font-semibold mb-2">
                Extracted In-Flight Action Items ({selectedDoc.actionItems.length})
              </h4>
              <div className="space-y-2">
                {selectedDoc.actionItems.map((action, idx) => {
                  const isChecked = !!checkedActions[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleAction(idx)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition text-xs ${
                        isChecked
                          ? 'bg-slate-900/40 text-slate-500 line-through'
                          : 'bg-slate-900/80 text-slate-200 hover:bg-slate-850'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span>{action}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Identified Risks & Suggested Revisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold mb-2">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Strategic Risks</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  {selectedDoc.keyRisks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-mono font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pitch Refinements</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  {selectedDoc.suggestedRevisions.map((rev, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-500">•</span>
                      <span>{rev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
