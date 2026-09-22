import React, { useState } from 'react';
import { 
  Upload, 
  Sparkles, 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  Cpu, 
  Sliders, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Play, 
  Pause 
} from 'lucide-react';
import { WIREFRAME_SAMPLES } from '../data/mockAssets';
import { WireframeSample } from '../types';

interface WireframeStudioProps {
  onSimulateInference: () => void;
  isProcessing: boolean;
}

export const WireframeStudio: React.FC<WireframeStudioProps> = ({
  onSimulateInference,
  isProcessing,
}) => {
  const [selectedSample, setSelectedSample] = useState<WireframeSample>(WIREFRAME_SAMPLES[0]);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'critique'>('preview');
  const [customPrompt, setCustomPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);

  // Live interactive controls for the generated Synth UI
  const [synthPlaying, setSynthPlaying] = useState(true);
  const [synthCutoff, setSynthCutoff] = useState(74);
  const [synthResonance, setSynthResonance] = useState(58);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedSample.generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserUploadedImage(event.target?.result as string);
        onSimulateInference();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunInference = () => {
    onSimulateInference();
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Studio Header & Confidentiality Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              QNN EP Multimodal Pipeline
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% On-Device • Zero Cloud Transmission
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1">
            Local Wireframe & Sketch to Production Code
          </h1>
          <p className="text-xs text-slate-400">
            Convert confidential UX sketches and client wireframes directly into accessible React/Tailwind UI without leaking IP to external servers.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Preloaded Confidential Samples:</span>
          {WIREFRAME_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setSelectedSample(sample);
                setUserUploadedImage(null);
              }}
              className={`px-3 py-1 text-xs rounded-lg border transition ${
                selectedSample.id === sample.id && !userUploadedImage
                  ? 'bg-cyan-950 border-cyan-600 text-cyan-200'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {sample.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Wireframe / Sketch / Prompt */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Input Confidential Wireframe
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Phi-3.5-Vision-INT4</span>
            </div>

            {/* Wireframe Canvas Preview */}
            <div className="bg-slate-950 rounded-lg border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center min-h-[260px]">
              {userUploadedImage ? (
                <img
                  src={userUploadedImage}
                  alt="Confidential Uploaded Wireframe"
                  className="max-h-64 object-contain rounded"
                />
              ) : selectedSample.svgMarkup ? (
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: selectedSample.svgMarkup }}
                />
              ) : null}

              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                  <div className="text-center">
                    <p className="text-xs font-semibold text-cyan-300 font-mono">
                      Qualcomm Hexagon NPU Computing...
                    </p>
                    <p className="text-[10px] text-slate-400">
                      ONNX Runtime QNN EP • 45 TOPS • 0ms WAN
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload or Drop Local File */}
            <div className="mt-3 flex items-center gap-2">
              <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>Upload Local Wireframe File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleRunInference}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/30 transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isProcessing ? 'Generating...' : 'Re-run NPU Vision'}</span>
              </button>
            </div>

            {/* Prompt Customization */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                Multimodal Instruction Prompt:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customPrompt || selectedSample.prompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Generate high-contrast touch controls with responsive mobile layout"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-cyan-500"
                />
                <button
                  onClick={handleRunInference}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs border border-slate-700 font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* NPU Execution Specs Card */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-3.5 text-xs space-y-2">
            <div className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Offline Multi-Modal Vision Stack</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block">Execution Target</span>
                <span className="text-cyan-300 font-mono font-medium">HTP / Hexagon Tensor Core</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded border border-slate-800">
                <span className="text-slate-500 block">Memory Allocation</span>
                <span className="text-emerald-400 font-mono font-medium">1.8 GB Unified LPDDR5x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Interactive View, Code, and UX Critique */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            {/* Output Sub-Header Tabs */}
            <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === 'preview'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interactive Live Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === 'code'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Generated React Code</span>
                </button>
                <button
                  onClick={() => setActiveTab('critique')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeTab === 'critique'
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>UX & Accessibility Audit</span>
                </button>
              </div>

              {activeTab === 'code' && (
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy JSX'}</span>
                </button>
              )}
            </div>

            {/* Tab Contents */}
            <div className="p-4">
              {activeTab === 'preview' && (
                <div className="space-y-4">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Generated in 320ms on Qualcomm Hexagon NPU (0 Cloud API Calls)</span>
                    <span className="text-emerald-400 font-mono">Status: Fully Interactive</span>
                  </div>

                  {/* Rendered Live Component */}
                  {selectedSample.id === 'wireframe-1' ? (
                    <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-xl max-w-xl mx-auto font-sans">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${synthPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
                          <h2 className="font-semibold text-base tracking-wider text-cyan-400">NPU SYNTH-LAB 01</h2>
                        </div>
                        <span className="text-xs bg-slate-900 text-cyan-300 px-2.5 py-1 rounded-full font-mono border border-cyan-900/60">
                          QNN EP • 45 TOPS
                        </span>
                      </div>

                      {/* Interactive Oscilloscope Waveform */}
                      <div className="my-5 bg-slate-900/90 rounded-xl p-4 border border-cyan-950/60 relative overflow-hidden h-28 flex items-center justify-center">
                        <div className="absolute inset-0 bg-radial from-cyan-500/10 to-transparent" />
                        <svg className="w-full h-16 text-cyan-400" viewBox="0 0 400 60" fill="none">
                          <path
                            d={`M 0 30 Q ${synthCutoff} ${synthResonance / 2} 100 30 T 200 30 T 300 30 T 400 30`}
                            stroke="currentColor"
                            strokeWidth="3"
                            className={synthPlaying ? 'transition-all duration-150' : ''}
                          />
                        </svg>
                        <span className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">
                          INT4 ANALOG SYNTHESIS • 48kHz
                        </span>
                      </div>

                      {/* Interactive Touch Knobs / Sliders */}
                      <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block mb-1 font-mono">CUTOFF</span>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={synthCutoff}
                            onChange={(e) => setSynthCutoff(+e.target.value)}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-cyan-300 font-mono mt-1 block">{synthCutoff}%</span>
                        </div>
                        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block mb-1 font-mono">RESONANCE</span>
                          <input
                            type="range"
                            min="5"
                            max="95"
                            value={synthResonance}
                            onChange={(e) => setSynthResonance(+e.target.value)}
                            className="w-full accent-purple-400 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-purple-300 font-mono mt-1 block">{synthResonance}%</span>
                        </div>
                        <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 block mb-1 font-mono">OVERDRIVE</span>
                          <div className="text-emerald-400 text-sm font-bold font-mono py-1">+4.2 dB</div>
                          <span className="text-[10px] text-emerald-500/80">SATURATED</span>
                        </div>
                      </div>

                      {/* Transport Controls */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <button
                          onClick={() => setSynthPlaying(!synthPlaying)}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition"
                        >
                          {synthPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          {synthPlaying ? 'Mute Audio Loop' : 'Trigger Audio Loop'}
                        </button>
                        <span className="text-xs text-slate-400 font-mono">0ms Local Latency</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-950 text-zinc-100 p-6 rounded-2xl border border-zinc-800 shadow-xl max-w-md mx-auto">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-900">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>AIR-GAPPED COLD STORAGE</span>
                        </div>
                        <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                          Zero Outbound
                        </span>
                      </div>
                      <div className="bg-zinc-900/90 rounded-xl p-4 border border-zinc-800 mb-4">
                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Protected Vault Balance</span>
                        <div className="text-2xl font-bold font-mono text-white mt-1">$184,920.40 USD</div>
                      </div>
                      <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition">
                        Sign Transaction on Hexagon NPU
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'code' && (
                <div className="relative">
                  <pre className="p-4 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto max-h-[420px] border border-slate-800">
                    {selectedSample.generatedCode}
                  </pre>
                </div>
              )}

              {activeTab === 'critique' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block mb-1 font-mono">UX Design Score</span>
                      <div className="text-2xl font-bold text-cyan-400 font-mono">
                        {selectedSample.critique.uxScore} / 100
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        High ergonomics for touchscreen Copilot+ PC format
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block mb-1 font-mono">WCAG Accessibility</span>
                      <div className="text-2xl font-bold text-emerald-400 font-mono">
                        {selectedSample.critique.accessibilityScore} / 100
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Passes WCAG AA color contrast (7.4:1 ratio)
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                      On-Device Design Insights
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {selectedSample.critique.insights.map((insight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider pt-2 border-t border-slate-800">
                      Recommended Enhancements
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {selectedSample.critique.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
