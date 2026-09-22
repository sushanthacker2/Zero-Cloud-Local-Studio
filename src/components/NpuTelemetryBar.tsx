import React from 'react';
import { 
  Cpu, 
  Zap, 
  BatteryCharging, 
  Activity, 
  Thermometer, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { HardwareTelemetry } from '../types';

interface NpuTelemetryBarProps {
  telemetry: HardwareTelemetry;
  isProcessing: boolean;
}

export const NpuTelemetryBar: React.FC<NpuTelemetryBarProps> = ({
  telemetry,
  isProcessing,
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 lg:px-6 py-2.5 text-xs text-slate-300">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
        {/* Metric 1: NPU Load */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Cpu className={`w-4 h-4 ${isProcessing ? 'text-cyan-400 animate-spin' : 'text-cyan-500'}`} />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Hexagon NPU</div>
            <div className="font-semibold text-slate-100 flex items-center gap-1.5 font-mono">
              <span>{isProcessing ? '88%' : `${telemetry.npuUtilization}%`}</span>
              <span className="text-[10px] text-cyan-400 font-normal">/ 45 TOPS</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Power Draw */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Zap className="w-4 h-4 text-amber-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Total System Draw</div>
            <div className="font-semibold text-slate-100 flex items-center gap-1.5 font-mono">
              <span className="text-amber-300">{isProcessing ? '4.8W' : `${telemetry.powerDrawWatts}W`}</span>
              <span className="text-[10px] text-slate-500">vs 48W GPU</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Battery Flight Range */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <BatteryCharging className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Flight AI Range</div>
            <div className="font-semibold text-emerald-400 font-mono">
              ~{telemetry.batteryLifeHours} hrs continuous
            </div>
          </div>
        </div>

        {/* Metric 4: Throughput & Latency */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Activity className="w-4 h-4 text-indigo-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">INT4 Speed & TTFT</div>
            <div className="font-semibold text-indigo-300 font-mono">
              {telemetry.tokensPerSec} t/s • {telemetry.timeToFirstTokenMs}ms
            </div>
          </div>
        </div>

        {/* Metric 5: Thermal & Fan */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <Thermometer className="w-4 h-4 text-teal-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Skin Temp / Acoustic</div>
            <div className="font-semibold text-teal-300 font-mono">
              {telemetry.temperatureCelsius}°C • Fanless 0dB
            </div>
          </div>
        </div>

        {/* Metric 6: Privacy Outbound Bytes */}
        <div className="flex items-center gap-2.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Network Outbound</div>
            <div className="font-semibold text-emerald-400 font-mono flex items-center gap-1">
              <span>0 Bytes (Airgap OK)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
