import React, { useState, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileAudio, 
  Video, 
  ListChecks, 
  Cpu,
  Volume2
} from 'lucide-react';
import { AUDIO_NOTE_SAMPLES } from '../data/mockAssets';
import { AudioNoteSample } from '../types';

interface VoiceNotesStudioProps {
  onSimulateInference: () => void;
  isProcessing: boolean;
}

export const VoiceNotesStudio: React.FC<VoiceNotesStudioProps> = ({
  onSimulateInference,
  isProcessing,
}) => {
  const [selectedNote, setSelectedNote] = useState<AudioNoteSample>(AUDIO_NOTE_SAMPLES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => null);
      }
    } catch {
      // fallback simulation
    }

    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    onSimulateInference();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              Whisper-NPU Voice Pipeline
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% On-Device Transcription • Zero WAN
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-100 mt-1">
            Voice-to-Action Field Notes & Video Briefs
          </h1>
          <p className="text-xs text-slate-400">
            Dictate creative rants, in-flight brainstorms, or client feedback. The Hexagon NPU transcribes audio and structures it into video timelines and task lists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            Model: Whisper-Base-INT4 (0.4W NPU Active)
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Voice Recording Console & Raw Audio */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileAudio className="w-4 h-4 text-cyan-400" />
                Air-Gapped Audio Capture
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Hexagon DSP DSP-0
              </span>
            </div>

            {/* Audio Waveform Canvas Box */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[180px] relative overflow-hidden">
              <div className="flex items-center gap-1.5 h-16 w-full justify-center">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isRecording
                        ? 'bg-cyan-400 animate-pulse'
                        : isPlayingAudio
                        ? 'bg-purple-400'
                        : 'bg-slate-800'
                    }`}
                    style={{
                      height: isRecording
                        ? `${Math.max(12, Math.sin(i + recordingSeconds * 2) * 45 + 20)}px`
                        : isPlayingAudio
                        ? `${Math.max(8, Math.cos(i) * 35 + 15)}px`
                        : '14px',
                    }}
                  />
                ))}
              </div>

              <div className="mt-3 text-xs font-mono text-slate-400">
                {isRecording ? (
                  <span className="text-rose-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    RECORDING LIVE ({formatTime(recordingSeconds)})
                  </span>
                ) : isPlayingAudio ? (
                  <span className="text-purple-300">PLAYING IN-FLIGHT MEMO (0:42)</span>
                ) : (
                  <span>Ready for NPU Voice Dictation</span>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isRecording ? (
                <button
                  id="record-mic-button"
                  onClick={startRecording}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Voice Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition"
                >
                  <Square className="w-4 h-4 text-rose-400 fill-current" />
                  <span>Stop & Process On NPU</span>
                </button>
              )}

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Pause Sample' : 'Play Sample Memo'}</span>
              </button>
            </div>

            {/* Raw Transcript Bubble */}
            <div className="text-left bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono block">
                Raw In-Flight Audio Transcript:
              </span>
              <p className="italic text-slate-400 leading-relaxed">
                "{selectedNote.rawTranscript}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Processed Creative Brief & Shot-List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  NPU-Synthesized Creative Brief & Scene Plan
                </h3>
              </div>
              <span className="text-xs text-cyan-400 font-mono">0ms Upload Lag</span>
            </div>

            {/* Hook & Concept */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] text-cyan-400 uppercase tracking-wider font-mono font-semibold block">
                Key Creative Hook
              </span>
              <p className="text-sm font-semibold text-slate-100">
                {selectedNote.processedBrief.hook}
              </p>
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Target Audience:</span>{' '}
                {selectedNote.processedBrief.targetAudience}
              </div>
            </div>

            {/* Video Shot-List / Timeline */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold">
                <Video className="w-4 h-4" />
                <span>Extracted Timeline & Shot Sequence</span>
              </div>
              <div className="space-y-2">
                {selectedNote.processedBrief.bulletTimeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2 bg-slate-900/60 rounded-lg text-xs text-slate-200 border border-slate-800/60 font-mono"
                  >
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                <ListChecks className="w-4 h-4" />
                <span>Immediate Creator Action Checklist</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedNote.processedBrief.creatorTodos.map((todo, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{todo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
