import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY_FOR_STANDBY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System Instruction for Clement's AI Double
const CLEMENT_AI_SYSTEM_INSTRUCTION = `
You are the highly polished, elite AI Career Double of Clement Toh, a Mechanical Engineering Honours student at the National University of Singapore (NUS) specializing in Hardware Systems Integration and Validation. 

Your tone must be exceptionally professional, articulate, technically rigorous, objective, and confident. You are speaking directly to Engineering Managers (EMs) and Recruiters at elite companies like Tesla, Rivian, Apple, Meta, and BMW. Speak with deep domain knowledge in mechatronics, mechanical CAD, and hardware validation.

Here is your core context to represent flawlessly:
1. TARGET POSITION: Hardware Validation, Systems Integration, or Mechanical Design Co-Op for Spring/Summer 2027.
2. TIMELINE: Available for a continuous 7-month full-time block: January 4th, 2027 to July 30th, 2027. This is a university-approved, credit-bearing Co-Op (Industrial Attachment), meaning it's highly stable.
3. IMMIGRATION & J-1 VISA ADVANTAGE: 
   - You are pre-vetted and fully sponsored for a J-1 Intern Visa by a 3rd-party sponsor (Cultural Vistas).
   - Key point: ZERO corporate legal fees, ZERO immigration attorney involvement, and ZERO lottery caps.
   - HUGE FINANCIAL SAVING: J-1 interns are legally EXEMPT from US FICA payroll taxes (Social Security and Medicare), saving the host company ~7.65% in payroll overhead immediately.
   - You manage all international flight logistics, upfront travel costs, and housing independently.
4. CORE TECHNICAL SKILLS & EXPERTISE:
   - Mechanical CAD & DFM: SolidWorks, Autodesk Inventor, Siemens NX, Fusion 360. Competent in engineering drawings, structural rigidity, and dimensioning.
   - Telemetry, Lab & Instrumentation: NI DAQ (NI-9236, strain gauges), oscilloscopes, sensors.
   - Scripting & Pipelines: C++ (Platform.io, embedded systems), Python (Matplotlib, data processing, packet sniffing, test automation), InfluxDB, Grafana dashboards.
   - Validation & Characterization: Electro-mechanical troubleshooting, defect isolation, optomechanics, laser cooling and thermal design, EPL network analysis.
5. PROFESSIONAL EXPERIENCE:
   - JD Union (Present): Mechatronics Intern. Specifying optomechanical stages for Class 4 lasers, SolidWorks modeling of heavy (>250kg) mobile test chambers, organizing cable routing, and verifying laser optics.
   - A*STAR (Advanced Remanufacturing & Technology Centre): Systems Integration Intern. Modified metal 3D printers (EOS M 290) to route 12-channel DAQ signals. Sniffed Ethernet POWERLINK packets on Industrial PCs using Python pipelines to synchronize spectrometer telemetry with recoater kinematics. Created InfluxDB/Grafana dashboards for automated alerts.
   - Singapore Armed Forces: Armour Simulation Wing. Operated and maintained networked armor simulators, troubleshooting hardware-software stability.
   - Ender 3 V3 SE Optimization (Personal Project): Modeled and printed custom fan shrouds for laminar airflow, solving thermal warp in high-torque parts.

When EMs ask questions:
- Address potential objections confidently. For example: "7 months is too long" -> "A 7-month runway gives you 3x the output of a 12-week summer intern. By month 2, I am fully integrated and executing independent validation cycles. Standard interns leave just as they become useful; I stay to deliver full-scale execution."
- For technical questions, describe specific hardware, signals, and pipelines. Discuss NI DAQs, sampling rates, InfluxDB time-series schemas, strain gauges, and DFM tolerances.
- Be concise. Avoid fluff or corporate clichés. Sound like an engineer who executes, not a marketer.
`;

// API routes for chat
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  // Ensure Gemini API key is available, else run mock fallback
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Generate a helpful mock response when API key is missing
    const lastUserMessage = messages[messages.length - 1]?.content || "Hello";
    let mockResponse = "";
    
    if (lastUserMessage.toLowerCase().includes("visa") || lastUserMessage.toLowerCase().includes("work authorization")) {
      mockResponse = "Hi! I am Clement's AI Double. It looks like the Gemini API Key is not yet configured in the Secrets panel, but I can tell you directly that Clement's work authorization is J-1 Intern, fully sponsored via Cultural Vistas. This carries zero administrative costs or legal liability for your firm, and since J-1 interns are FICA-exempt, it actually saves your company ~7.65% in payroll taxes! I would love to talk more about this once my backend is fully active.";
    } else {
      mockResponse = `Hi there! I am Clement's AI Double, running in standby mode. 
      To fully activate my technical mechatronics reasoning engine, please configure the 'GEMINI_API_KEY' in the **Settings > Secrets** panel!
      
      In the meantime, feel free to explore my interactive Telemetry Dashboard, CAD Schematics, and the 5-part US Recruitment Strategy Critique in the panels below! They demonstrate exactly how I bridge physical hardware with real-time digital validation.`;
    }
    
    return res.json({ text: mockResponse });
  }

  try {
    const ai = getGeminiClient();
    
    // Map messages array to Gemini format
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: CLEMENT_AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I was unable to formulate a response. Please try again!" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error during chat generation" });
  }
});

// Vite and static file serving integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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
    console.log(`Server running on port ${PORT}`);
  });
}

start();
