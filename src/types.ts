export type StudioMode = 'wireframe' | 'code' | 'documents' | 'voice' | 'benchmarks' | 'architecture';

export interface HardwareTelemetry {
  npuTops: number;
  npuUtilization: number;
  cpuUtilization: number;
  gpuUtilization: number;
  powerDrawWatts: number;
  batteryLifeHours: number;
  temperatureCelsius: number;
  tokensPerSec: number;
  timeToFirstTokenMs: number;
  memoryUsageMb: number;
  outboundPackets: number;
  isAirGapped: boolean;
  executionProvider: string;
  modelQuantization: string;
}

export interface WireframeSample {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  svgMarkup?: string;
  prompt: string;
  generatedCode: string;
  critique: {
    uxScore: number;
    accessibilityScore: number;
    responsiveReady: boolean;
    insights: string[];
    improvements: string[];
  };
}

export interface CodeSample {
  id: string;
  title: string;
  language: string;
  description: string;
  originalCode: string;
  auditedCode: string;
  securityIssues: {
    severity: 'critical' | 'high' | 'medium' | 'info';
    title: string;
    description: string;
    fixExplanation: string;
  }[];
  performanceBoost: string;
}

export interface DocumentSample {
  id: string;
  title: string;
  classification: string;
  content: string;
  summary: string;
  actionItems: string[];
  keyRisks: string[];
  suggestedRevisions: string[];
}

export interface AudioNoteSample {
  id: string;
  title: string;
  duration: string;
  rawTranscript: string;
  processedBrief: {
    hook: string;
    targetAudience: string;
    bulletTimeline: string[];
    creatorTodos: string[];
  };
}
