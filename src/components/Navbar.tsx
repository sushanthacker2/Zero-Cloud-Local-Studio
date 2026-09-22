import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Plane, 
  Laptop, 
  Code2, 
  FileText, 
  Mic, 
  BarChart3, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { StudioMode, HardwareTelemetry } from '../types';

interface NavbarProps {
  currentMode: StudioMode;
  onSelectMode: (mode: StudioMode) => void;
  telemetry: HardwareTelemetry;
  onToggleAirGap: () => void;
  onOpenSubmissionDeck: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  telemetry,
  onToggleAirGap,
  onOpenSubmissionDeck,
}) => {
  const modes: { id: StudioMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'wireframe', label: 'Wireframe to UI', icon: <Layers className="w-4 h-4" />, badge: 'Multimodal' },
    { id: 'code', label: 'Proprietary Code Audit', icon: <Code2 className="w-4 h-4" /> },
    { id: 'documents', label: 'Confidential Docs', icon: <FileText className="w-4 h-4" /> },
    { id: 'voice', label: 'Voice Notes', icon: <Mic className="w-4 h-4" /> },
    { id: 'benchmarks', label: 'NPU vs Cloud', icon: <BarChart3 className="w-4 h-4" />, badge: '45 TOPS' },
    { id: 'architecture', label: 'Submission Kit', icon: <Award className="w-4 h-4" />, badge: 'Pitch' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Hardware Info Bar */}
      <div className="px-4 lg:px-6 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-[11px] shadow-sm shadow-cyan-500/30">
              HP
            </div>
            <span className="font-semibold tracking-wide text-slate-200">
              Copilot+ PC Studio
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 font-mono text-[11px]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Snapdragon X Elite • Hexagon NPU (45 TOPS)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ONNX Runtime (QNN EP v2.23)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* In-flight / Airgap Toggle */}
          <button
            id="airgap-toggle-button"
            onClick={onToggleAirGap}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border ${
              telemetry.isAirGapped
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20'
                : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
            }`}
            title="Toggle zero-network air-gapped flight mode"
          >
            {telemetry.isAirGapped ? (
              <>
                <Plane className="w-3.5 h-3.5 text-emerald-400" />
                <span>Air-Gapped: 0 KB Sent</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </>
            ) : (
              <>
                <Laptop className="w-3.5 h-3.5 text-amber-400" />
                <span>Hybrid Connected</span>
              </>
            )}
          </button>

          {/* Quick Pitch Deck Trigger */}
          <button
            id="pitch-deck-quick-button"
            onClick={onOpenSubmissionDeck}
            className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full text-xs font-semibold shadow-md shadow-cyan-600/30 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submission Showcase</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {modes.map((mode) => {
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                id={`nav-tab-${mode.id}`}
                onClick={() => onSelectMode(mode.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-cyan-300 shadow-inner border border-slate-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
                {mode.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {mode.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
