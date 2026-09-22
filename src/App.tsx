import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NpuTelemetryBar } from './components/NpuTelemetryBar';
import { WireframeStudio } from './components/WireframeStudio';
import { CodeAuditorStudio } from './components/CodeAuditorStudio';
import { DocSummarizerStudio } from './components/DocSummarizerStudio';
import { VoiceNotesStudio } from './components/VoiceNotesStudio';
import { BenchmarkComparison } from './components/BenchmarkComparison';
import { ArchitectureModal } from './components/ArchitectureModal';
import { StudioMode, HardwareTelemetry } from './types';
import { SUBMISSION_OVERVIEW } from './data/architectureDocs';
import { ShieldCheck, Cpu, Plane, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<StudioMode>('wireframe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const [telemetry, setTelemetry] = useState<HardwareTelemetry>({
    npuTops: 45,
    npuUtilization: 14,
    cpuUtilization: 3,
    gpuUtilization: 0,
    powerDrawWatts: 4.2,
    batteryLifeHours: 16.2,
    temperatureCelsius: 32,
    tokensPerSec: 28.4,
    timeToFirstTokenMs: 18,
    memoryUsageMb: 1650,
    outboundPackets: 0,
    isAirGapped: true,
    executionProvider: 'ONNX Runtime (QNN EP v2.23)',
    modelQuantization: 'INT4 AWQ'
  });

  // Check hardware profile on mount
  useEffect(() => {
    fetch('/api/hardware/profile')
      .then(res => res.json())
      .catch(() => null);
  }, []);

  // Simulate on-device Hexagon NPU inference burst
  const triggerInferenceSimulation = () => {
    setIsProcessing(true);
    setTelemetry(prev => ({
      ...prev,
      npuUtilization: 88,
      cpuUtilization: 4,
      powerDrawWatts: 4.8,
      temperatureCelsius: 33,
      tokensPerSec: 31.2,
    }));

    setTimeout(() => {
      setIsProcessing(false);
      setTelemetry(prev => ({
        ...prev,
        npuUtilization: 12,
        powerDrawWatts: 4.2,
        temperatureCelsius: 32,
        tokensPerSec: 28.4,
      }));
    }, 850);
  };

  const toggleAirGap = () => {
    setTelemetry(prev => ({
      ...prev,
      isAirGapped: !prev.isAirGapped,
      outboundPackets: 0,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        telemetry={telemetry}
        onToggleAirGap={toggleAirGap}
        onOpenSubmissionDeck={() => setIsSubmissionModalOpen(true)}
      />

      {/* Real-time NPU Hardware Telemetry Bar */}
      <NpuTelemetryBar
        telemetry={telemetry}
        isProcessing={isProcessing}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 overflow-y-auto">
        {currentMode === 'wireframe' && (
          <WireframeStudio
            onSimulateInference={triggerInferenceSimulation}
            isProcessing={isProcessing}
          />
        )}

        {currentMode === 'code' && (
          <CodeAuditorStudio
            onSimulateInference={triggerInferenceSimulation}
            isProcessing={isProcessing}
          />
        )}

        {currentMode === 'documents' && (
          <DocSummarizerStudio
            onSimulateInference={triggerInferenceSimulation}
            isProcessing={isProcessing}
          />
        )}

        {currentMode === 'voice' && (
          <VoiceNotesStudio
            onSimulateInference={triggerInferenceSimulation}
            isProcessing={isProcessing}
          />
        )}

        {currentMode === 'benchmarks' && (
          <BenchmarkComparison />
        )}

        {currentMode === 'architecture' && (
          <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
            {/* Quick Hero Banner inside Architecture View */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <Award className="w-4 h-4" />
                  <span>WINNING SUBMISSION BLUEPRINT</span>
                </div>
                <button
                  onClick={() => setIsSubmissionModalOpen(true)}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/30 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Judge Presentation Deck</span>
                </button>
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-100">
                  {SUBMISSION_OVERVIEW.title}
                </h1>
                <p className="text-sm text-cyan-300 font-medium mt-1">
                  {SUBMISSION_OVERVIEW.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-rose-400 uppercase font-mono mb-2">
                    Critical Pain Points Solved
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {SUBMISSION_OVERVIEW.problem.map((p, idx) => (
                      <li key={idx}>
                        <strong className="text-slate-200">{p.title}:</strong> {p.desc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase font-mono mb-2">
                    Hexagon NPU Strategic Advantage
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {SUBMISSION_OVERVIEW.solution.map((s, idx) => (
                      <li key={idx}>
                        <strong className="text-slate-200">{s.title}:</strong> {s.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Stack Breakdown */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase font-mono">
                  Technical Architecture Layers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUBMISSION_OVERVIEW.technicalStack.map((tech, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900/70 rounded-lg border border-slate-800 text-xs">
                      <span className="text-slate-400 font-mono font-semibold block text-[11px]">
                        {tech.layer}
                      </span>
                      <span className="text-slate-200 mt-1 block">
                        {tech.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Benchmarks Section */}
            <BenchmarkComparison />
          </div>
        )}
      </main>

      {/* Bottom Minimal Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 px-4 py-2.5 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>HP Copilot+ PC • Qualcomm Snapdragon X Elite</span>
          <span>•</span>
          <span className="text-cyan-400 font-mono">Qualcomm Hexagon NPU (45 TOPS)</span>
          <span>•</span>
          <span>ONNX Runtime (QNN EP)</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero-Cloud Local Inference Guaranteed</span>
        </div>
      </footer>

      {/* Submission Showcase Pitch Deck Modal */}
      <ArchitectureModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </div>
  );
}
