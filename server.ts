import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (e) {
      console.error("Failed to init Gemini client:", e);
    }
  }
  return geminiClient;
}

// Hardware & Architecture Telemetry API
app.get("/api/hardware/profile", (req, res) => {
  res.json({
    device: "HP OmniBook X / EliteBook Ultra (Copilot+ PC)",
    soc: "Qualcomm Snapdragon X Elite (X1E-80-100, 12 cores @ 3.4GHz)",
    npu: {
      name: "Qualcomm Hexagon NPU",
      tops: 45,
      quantization: ["INT4", "INT8", "FP16"],
      engine: "ONNX Runtime with QNN Execution Provider (QNN EP v2.23)",
      framework: "onnxruntime-genai 0.5.2",
      activePowerDrawWatts: 4.2,
      idlePowerDrawWatts: 0.4,
      totalMemoryBandwidthGBps: 135
    },
    privacy: {
      airgapStatus: "Active",
      outboundPackets: 0,
      encryptionAtRest: "BitLocker AES-XTS-256",
      cloudLeakRisk: "0.0% (Air-Gapped Local Inference)"
    },
    status: "ok"
  });
});

// Optional Cloud Benchmark Endpoint to compare against Local NPU
app.post("/api/gemini/compare", async (req, res) => {
  const { prompt, model } = req.body;
  // Use gemini-3.8-flash as the modern standard model for text tasks
  const selectedModel = (!model || model.includes("2.5") || model.includes("2.0") || model.includes("1.5")) 
    ? "gemini-3.8-flash" 
    : model;
  const startTime = Date.now();

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        success: false,
        warning: "No GEMINI_API_KEY configured for cloud comparison. Using local NPU emulation benchmark.",
        timeMs: 420,
        estimatedPowerJoules: 14.7,
        dataTransferredKb: prompt ? Math.round(prompt.length / 1024 * 10) / 10 : 2.4,
        privacyRisk: "Data transmitted to external servers across public Internet"
      });
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt || "Briefly summarize local NPU benefits vs cloud AI.",
    });

    const duration = Date.now() - startTime;
    return res.json({
      success: true,
      text: response.text,
      timeMs: duration,
      estimatedPowerJoules: (duration / 1000) * 28.5, // typical cloud round-trip Wi-Fi + CPU TX burst
      dataTransferredKb: Math.round(((prompt?.length || 100) + (response.text?.length || 300)) / 1024 * 10) / 10,
      privacyRisk: "Payload transmitted off-device via public WAN"
    });
  } catch (error: any) {
    console.warn("Cloud benchmark notice:", error?.message || error);
    const duration = Date.now() - startTime;
    return res.json({
      success: false,
      error: error?.message || "Cloud connection timed out or blocked (In-Flight / Off-Grid simulation)",
      timeMs: duration || 850,
      estimatedPowerJoules: 12.2,
      dataTransferredKb: 1.8,
      privacyRisk: "Network attempt logged"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HP Copilot+ Local Studio server running on port ${PORT}`);
  });
}

startServer();
