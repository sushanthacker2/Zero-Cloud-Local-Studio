import { WireframeSample, CodeSample, DocumentSample, AudioNoteSample } from '../types';

export const WIREFRAME_SAMPLES: WireframeSample[] = [
  {
    id: 'wireframe-1',
    title: 'Stealth Audio Synth & DAW (iPad/Surface Sketch)',
    category: 'Creative App UI',
    description: 'Confidential touch-first digital audio synthesizer with visual oscillators, filter envelopes, and preset rack.',
    prompt: 'Generate a touch-optimized dark mode UI with interactive knobs, waveform oscilloscope canvas, and neon accent controls.',
    svgMarkup: `<svg viewBox="0 0 400 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <rect x="20" y="20" width="360" height="65" rx="8" fill="#1e293b" stroke="#475569" stroke-dasharray="4"/>
      <path d="M 30 52 Q 60 25 90 52 T 150 52 T 210 52 T 270 52 T 330 52 T 370 52" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="60" cy="140" r="28" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
      <line x1="60" y1="140" x2="78" y2="122" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
      <circle cx="150" cy="140" r="28" fill="#1e293b" stroke="#a855f7" stroke-width="4"/>
      <line x1="150" y1="140" x2="168" y2="158" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <circle cx="240" cy="140" r="28" fill="#1e293b" stroke="#22c55e" stroke-width="4"/>
      <line x1="240" y1="140" x2="240" y2="114" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
      <rect x="295" y="115" width="85" height="50" rx="6" fill="#334155"/>
      <rect x="20" y="195" width="360" height="35" rx="6" fill="#1e293b"/>
      <text x="35" y="217" fill="#94a3b8" font-size="11" font-family="monospace">PRESET: [CHILLWAVE_POLY_01] • 120 BPM • 44.1kHz</text>
    </svg>`,
    generatedCode: `// Generated locally via Phi-3.5-Vision on Qualcomm Hexagon NPU (QNN EP)
import React, { useState } from 'react';
import { Play, Pause, Activity, Volume2, Sliders, Zap } from 'lucide-react';

export function SynthOscillator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [resonance, setResonance] = useState(64);
  const [cutoff, setCutoff] = useState(82);

  return (
    <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-2xl max-w-xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="font-semibold text-lg tracking-wider text-cyan-400">NPU SYNTH-LAB 01</h2>
        </div>
        <span className="text-xs bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-full font-mono">QNN EP • 45 TOPS</span>
      </div>

      {/* Visual Oscilloscope */}
      <div className="my-5 bg-slate-900/90 rounded-xl p-4 border border-cyan-950/60 relative overflow-hidden h-28 flex items-center justify-center">
        <div className="absolute inset-0 bg-radial from-cyan-500/10 to-transparent" />
        <svg className="w-full h-16 text-cyan-400" viewBox="0 0 400 60" fill="none">
          <path d="M 0 30 Q 50 5 100 30 T 200 30 T 300 30 T 400 30" stroke="currentColor" strokeWidth="3" />
        </svg>
        <span className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">ANALOG MODELING • 48kHz</span>
      </div>

      {/* Touch Parameter Knobs */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block mb-2 font-mono">CUTOFF</span>
          <input type="range" min="0" max="100" value={cutoff} onChange={e => setCutoff(+e.target.value)} className="w-full accent-cyan-400 cursor-pointer" />
          <span className="text-sm font-bold text-cyan-300 font-mono mt-1 block">{cutoff}%</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block mb-2 font-mono">RESONANCE</span>
          <input type="range" min="0" max="100" value={resonance} onChange={e => setResonance(+e.target.value)} className="w-full accent-purple-400 cursor-pointer" />
          <span className="text-sm font-bold text-purple-300 font-mono mt-1 block">{resonance}%</span>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 block mb-2 font-mono">DRIVE</span>
          <div className="text-emerald-400 text-lg font-bold font-mono py-1">+4.2 dB</div>
          <span className="text-[10px] text-emerald-500/80">SATURATED</span>
        </div>
      </div>

      {/* Preset & Transport */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
        <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause Loop' : 'Play Loop'}
        </button>
        <span className="text-xs text-slate-400 font-mono">0ms Local Latency</span>
      </div>
    </div>
  );
}`,
    critique: {
      uxScore: 94,
      accessibilityScore: 96,
      responsiveReady: true,
      insights: [
        'Detected high-contrast oscilloscope layout suitable for flight cabin lighting conditions.',
        'Touch-target sliders formatted to meet minimum 44px hit-box requirements on touchscreen Copilot+ PCs.',
        'Preset HUD avoids nested menu trees, maximizing live performance ergonomics.'
      ],
      improvements: [
        'Add keyboard shortcuts (Spacebar for transport play/pause, Arrow keys for preset navigation).',
        'Add haptic touch feedback support for Windows Pen and Touch API.'
      ]
    }
  },
  {
    id: 'wireframe-2',
    title: 'Confidential Fintech Mobile Vault Card',
    category: 'Mobile Security UI',
    description: 'Proprietary biometric crypto vault card with air-gapped signing status, instant balance hide, and gas optimizer.',
    prompt: 'Create a sleek, high-trust security card showing cold-storage balance, NPU-verified biometric indicator, and instant freeze switch.',
    svgMarkup: `<svg viewBox="0 0 400 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="250" rx="14" fill="#09090b" stroke="#27272a" stroke-width="2"/>
      <rect x="25" y="25" width="350" height="70" rx="10" fill="#18181b"/>
      <circle cx="55" cy="60" r="16" fill="#10b981" opacity="0.2"/>
      <circle cx="55" cy="60" r="8" fill="#10b981"/>
      <text x="85" y="55" fill="#f43f5e" font-size="10" font-family="sans-serif" font-weight="bold">COLD VAULT #0849</text>
      <text x="85" y="72" fill="#fafafa" font-size="16" font-family="sans-serif" font-weight="bold">$184,920.40</text>
      <rect x="25" y="110" width="168" height="60" rx="8" fill="#18181b" stroke="#3f3f46"/>
      <rect x="207" y="110" width="168" height="60" rx="8" fill="#18181b" stroke="#3f3f46"/>
      <rect x="25" y="185" width="350" height="42" rx="8" fill="#2563eb"/>
      <text x="140" y="211" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">AIR-GAP SIGN NOW</text>
    </svg>`,
    generatedCode: `// Generated locally with INT4 Multimodal weights on Hexagon NPU
import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, ArrowUpRight, Cpu } from 'lucide-react';

export function VaultSecurityCard() {
  const [hidden, setHidden] = useState(false);
  const [locked, setLocked] = useState(false);

  return (
    <div className="bg-zinc-950 text-zinc-100 p-6 rounded-2xl border border-zinc-800 shadow-2xl max-w-md mx-auto">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-900">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>ZERO-CLOUD COLD ISOLATION</span>
        </div>
        <span className="text-[11px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">Air-Gapped</span>
      </div>

      <div className="bg-zinc-900/90 rounded-xl p-5 border border-zinc-800/80 mb-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Protected Assets</p>
            <p className="text-2xl font-bold font-mono tracking-tight mt-1 text-white">
              {hidden ? '••••••••••' : '$184,920.40 USD'}
            </p>
          </div>
          <button onClick={() => setHidden(!hidden)} className="text-zinc-500 hover:text-zinc-300 p-1">
            {hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/60">
          <span className="text-zinc-500 text-[11px] block">SIGNING ENGINE</span>
          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mt-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Hexagon NPU
          </span>
        </div>
        <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/60">
          <span className="text-zinc-500 text-[11px] block">SECURITY LEVEL</span>
          <span className="text-xs font-semibold text-emerald-400 mt-1 block">Hardware Enclave</span>
        </div>
      </div>

      <button onClick={() => setLocked(!locked)} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" />
        {locked ? 'Unlock Vault Partition' : 'Engage Air-Gapped Lockdown'}
      </button>
    </div>
  );
}`,
    critique: {
      uxScore: 97,
      accessibilityScore: 92,
      responsiveReady: true,
      insights: [
        'Privacy toggle prevents shoulder-surfing on trains or public flights.',
        'Zero external RPC dependencies; signature verification runs strictly in local sandboxed memory.',
        'Clean, high-contrast dark palette complies with WCAG AA standards.'
      ],
      improvements: [
        'Add visual countdown timer for automatic session timeout during idle periods.',
        'Incorporate hardware security key (FIDO2/Windows Hello) confirmation badge.'
      ]
    }
  }
];

export const CODE_SAMPLES: CodeSample[] = [
  {
    id: 'code-1',
    title: 'Proprietary Session JWT & CSRF Verifier',
    language: 'TypeScript',
    description: 'Internal authentication module with potential timing attack vulnerabilities and secret leakage risks.',
    originalCode: `// PROPRIETARY & CONFIDENTIAL - DO NOT UPLOAD TO CLOUD
import crypto from 'crypto';

export function verifyClientAuthToken(token: string, clientSecret: string) {
  // Vulnerable: Naive string comparison subject to timing attacks
  const [header, payload, signature] = token.split('.');
  const computedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(header + '.' + payload)
    .digest('base64');

  if (signature === computedSignature) {
    // Dangerous: Logging raw payload without sanitizing PII
    console.log("Authenticated client payload:", JSON.parse(Buffer.from(payload, 'base64').toString()));
    return true;
  }
  return false;
}`,
    auditedCode: `// AUDITED LOCALLY ON QUALCOMM HEXAGON NPU (0 Cloud Leaks)
import crypto from 'crypto';

export interface VerifiedAuthResult {
  valid: boolean;
  claims?: Record<string, unknown>;
  error?: string;
}

export function verifyClientAuthToken(token: string, clientSecret: string): VerifiedAuthResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Invalid token structure' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed JWT structure' };
  }

  const [header, payload, signature] = parts;

  const computedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(header + '.' + payload)
    .digest('base64');

  // FIX 1: Constant-time buffer comparison protects against side-channel timing attacks
  const sigBuf = Buffer.from(signature, 'base64');
  const compBuf = Buffer.from(computedSignature, 'base64');

  if (sigBuf.length !== compBuf.length || !crypto.timingSafeEqual(sigBuf, compBuf)) {
    return { valid: false, error: 'Signature mismatch' };
  }

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    // FIX 2: Zero PII logging in production - strictly return parsed claims
    return { valid: true, claims };
  } catch (err) {
    return { valid: false, error: 'Invalid JSON payload' };
  }
}`,
    securityIssues: [
      {
        severity: 'critical',
        title: 'Timing Attack Vulnerability in Signature Verification',
        description: 'Using `===` string equality allows attackers to deduce valid cryptographic signatures byte-by-byte via microsecond timing discrepancies.',
        fixExplanation: 'Replaced with `crypto.timingSafeEqual()` using fixed-length buffers for constant-time evaluation.'
      },
      {
        severity: 'high',
        title: 'Plaintext PII Logging Exposure',
        description: 'Console logging the decoded payload leaks confidential bearer tokens and user identifiers to standard output and log aggregators.',
        fixExplanation: 'Eliminated unvetted console logging; payload claims are safely typed and returned without side effects.'
      },
      {
        severity: 'medium',
        title: 'Missing Token Structure Validation',
        description: 'Calling split on unverified input could throw unhandled exceptions or trigger denial of service.',
        fixExplanation: 'Added boundary validation and defensive parsing with try-catch blocks.'
      }
    ],
    performanceBoost: 'Zero-cloud execution: 14ms NPU verification vs 320ms cloud roundtrip. Battery impact negligible.'
  },
  {
    id: 'code-2',
    title: 'High-Throughput Vector Similarity Matcher',
    language: 'TypeScript / Math',
    description: 'Proprietary embedding cosine similarity calculator for on-device semantic search in off-grid creative libraries.',
    originalCode: `export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}`,
    auditedCode: `// OPTIMIZED FOR QUALCOMM HEXAGON NPU / SIMD VECTOR PIPELINES
export function cosineSimilaritySIMD(a: Float32Array, b: Float32Array): number {
  const len = a.length;
  if (len !== b.length || len === 0) return 0;

  // Unrolled 4-way vector accumulator for NPU DSP alignment
  let dot = 0;
  let nA = 0;
  let nB = 0;
  let i = 0;

  for (; i <= len - 4; i += 4) {
    dot += a[i]*b[i] + a[i+1]*b[i+1] + a[i+2]*b[i+2] + a[i+3]*b[i+3];
    nA  += a[i]*a[i] + a[i+1]*a[i+1] + a[i+2]*a[i+2] + a[i+3]*a[i+3];
    nB  += b[i]*b[i] + b[i+1]*b[i+1] + b[i+2]*b[i+2] + b[i+3]*b[i+3];
  }

  // Handle remainder
  for (; i < len; i++) {
    dot += a[i] * b[i];
    nA  += a[i] * a[i];
    nB  += b[i] * b[i];
  }

  const denominator = Math.sqrt(nA) * Math.sqrt(nB);
  return denominator === 0 ? 0 : dot / denominator;
}`,
    securityIssues: [
      {
        severity: 'medium',
        title: 'Division by Zero & NaN Propagation',
        description: 'Zero-vector inputs or sparse embeddings lead to `0 / 0 = NaN`, polluting downstream ranking algorithms.',
        fixExplanation: 'Safeguarded denominator evaluation with zero check.'
      },
      {
        severity: 'info',
        title: 'Garbage Collection Pressure with Standard JS Arrays',
        description: 'Standard JavaScript arrays cause memory fragmentation when processing thousands of vector dimensions.',
        fixExplanation: 'Migrated to contiguous `Float32Array` typed buffers suitable for direct NPU memory mapping.'
      }
    ],
    performanceBoost: '4.8x faster vector dot throughput, 0 allocation overhead during batch search.'
  }
];

export const DOCUMENT_SAMPLES: DocumentSample[] = [
  {
    id: 'doc-1',
    title: 'Confidential Investor Pitch: On-Device Creator Engine',
    classification: 'Strictly Confidential • NDA Required',
    content: `PROJECT NEXUS: THE ZERO-CLOUD LOCAL CREATOR WORKSTATION
TARGET MARKET: 45 Million Pro Creators, Traveling Executives, and Defense/Enterprise Engineers.
PROBLEM: Modern creators cannot use Cloud AI on long flights or in secure locations due to IP leaks and 0-bandwidth environments.
SOLUTION: We deploy on HP Copilot+ PCs with Qualcomm Snapdragon X Elite, routing all multimodal tasks to the 45 TOPS Hexagon NPU using ONNX Runtime QNN EP.
UNIT ECONOMICS: Zero cloud hosting bills ($0 server COGS per active user). 100% margin on software licenses. Battery life extends to 18 hours of continuous AI generation.
COMPETITIVE MOAT: Custom INT4 quantized vision weights, offline AST code auditor, zero-telemetry hardware enclave integration.`,
    summary: 'Executive overview proposing an on-device creator workstation on HP Copilot+ PCs that eliminates cloud hosting costs and privacy liabilities through local Hexagon NPU execution.',
    actionItems: [
      'Finalize benchmark comparison chart showcasing 4.2W NPU draw vs 45W discrete GPU.',
      'Package ONNX Runtime QNN execution provider binaries for one-click Windows 11 installation.',
      'Conduct air-gap penetration audit proving 0 outbound packets during multimodal inference.',
      'Prepare 2-minute live demo on flight simulation mode for judging panel.'
    ],
    keyRisks: [
      'Initial cold-start model weight load from SSD (mitigated by mmap and direct HTP caching).',
      'Educating users conditioned to believe high-end AI only works with cloud GPUs.'
    ],
    suggestedRevisions: [
      'Emphasize the 18+ hour battery endurance during in-flight flights (e.g. SF to Tokyo uninterrupted creation).',
      'Include quantitative cost savings comparison ($0 cloud bill vs $4,200/mo server expense for studio teams).'
    ]
  },
  {
    id: 'doc-2',
    title: 'Unreleased Sci-Fi Feature Film Treatment: Script Notes',
    classification: 'Proprietary Screenplay IP',
    content: `TITLE: AURA ZERO (Act II Breakdown)
SCENE 44 - THE STRATOSPHERIC RELAY.
Maya reaches the orbital communications hub, only to discover the automated AI grid has severed all external uplinks. To recalibrate the planetary defense array, she must manually interface with an isolated local computing terminal—completely detached from the planetary cloud.
INTENT: Emphasize physical isolation, analog tension, and the high stakes of having no backup network or remote server assistance.`,
    summary: 'Act II narrative beats for Scene 44, focusing on atmospheric tension around an air-gapped terminal during a catastrophic cloud blackout.',
    actionItems: [
      'Refine pacing in Maya\'s monologue during the terminal reboot sequence.',
      'Ensure technical jargon sounds grounded in modern hardware architecture (e.g., local tensor processors).',
      'Create storyboard wireframe for the terminal tactile interface.'
    ],
    keyRisks: [
      'Script leak risk if uploaded to online cloud summarizers or grammar checkers.'
    ],
    suggestedRevisions: [
      'Add beat where Maya validates that zero radio packets are leaking from the console antenna.'
    ]
  }
];

export const AUDIO_NOTE_SAMPLES: AudioNoteSample[] = [
  {
    id: 'audio-1',
    title: 'Flight 892 In-Flight Creator Brain Dump',
    duration: '0:42',
    rawTranscript: "Hey, I'm sitting at 35,000 feet right now on my flight to Tokyo. The in-flight Wi-Fi is completely broken, but I had this massive breakthrough about our creative workflow. Instead of waiting for cloud renders, we can run all our wireframe conversions directly on the laptop's Hexagon NPU. That means our client confidential NDA designs never leave this machine. Tomorrow morning I need to record the screen capture, polish the pitch deck slides, and run the battery longevity benchmark against an RTX laptop. Let's make sure the telemetry shows zero network packets sent.",
    processedBrief: {
      hook: "Zero-Cloud creative freedom: Why creator studios belong on 45 TOPS NPUs, not remote server farms.",
      targetAudience: "On-the-go creative directors, freelance designers, and privacy-conscious developers.",
      bulletTimeline: [
        "00:00 - Introduction at 35,000 ft: The broken flight Wi-Fi dilemma.",
        "00:15 - Demonstrating instant offline wireframe-to-code generation on HP Copilot+ PC.",
        "00:28 - Live telemetry proof: 0 outbound packets and 4.2W power draw.",
        "00:38 - Call to action: Build with ONNX Runtime and QNN EP."
      ],
      creatorTodos: [
        "Record screen demo of offline wireframe conversion in flight mode.",
        "Run battery telemetry comparison (HP Snapdragon X Elite vs Intel/Nvidia).",
        "Export audited JWT security code for the technical appendix."
      ]
    }
  }
];
