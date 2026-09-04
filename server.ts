import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Curated BIM fallback responses if API key is not configured or in offline mode
const BIM_FALLBACK_ANSWERS: Record<string, string> = {
  "parameters": "In Revit and BIM authoring tools, **Type Parameters** control properties shared by all elements of that specific type (e.g., all 36\"x84\" solid core timber doors have the same width and height). **Instance Parameters** control unique properties for that single placed element (e.g., Door #104's Room Tag, Head Height offset, or Fire Rating condition). Changing a Type Parameter updates every instance in the entire project!",
  "worksets": "**Worksets** are subdivisions of a BIM Central Model used for multi-user collaboration and display performance. Best practice: Only check out or borrow the elements you need to modify. When finished or leaving for the day, always perform **Synchronize with Central** and check the box to **Relinquish All Mine** so teammates aren't blocked.",
  "clash": "A **Hard Clash** is geometric physical intersection (e.g., a 12\" HVAC supply duct colliding through a structural steel wide-flange beam). A **Soft Clash (Clearance)** occurs when an element violates maintenance, insulation, or code clearance zones (e.g., an electrical panel with less than 3 feet of clear working space in front of it).",
  "ifc": "**IFC (Industry Foundation Classes)** is the neutral, open standard data model developed by buildingSMART. It allows architects using ArchiCAD or Vectorworks to share models with structural engineers using Revit or Tekla and contractors using Navisworks, preventing vendor lock-in.",
  "bcf": "**BCF (BIM Collaboration Format)** allows teams to communicate issues, clashes, and comments using lightweight XML/JSON camera viewpoints and GUIDs without exchanging gigabytes of full 3D model files.",
  "lod": "**LOD (Level of Development)** defines the reliable geometric and informational fidelity of an element from conceptual massing (LOD 100) to generic assembly (LOD 200), specific design system (LOD 300), fabrication & assembly detailing (LOD 400), and field-verified as-built condition (LOD 500)."
};

// Interactive BIM Mentor endpoint
app.post("/api/mentor", async (req, res) => {
  const { question, topic, history } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "A valid question is required." });
  }

  const ai = getGenAI();

  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are a Senior BIM Manager & Practical BIM Onboarding Mentor.
You are coaching a newly hired junior BIM modeler/technician who is preparing for their first day on the job.
They need clear, encouraging, practical, real-world advice on BIM workflows, Revit/Navisworks software fundamentals, industry terminology (ISO 19650, IFC, BCF, COBie, LOD), central model worksharing, and clash coordination.
Format answers cleanly with markdown headings, bullet points, and highlight practical "Day 1 Pro-Tips" or "Watch Out" warnings where applicable. Keep answers concise, highly readable, and directly actionable.`;

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        history.slice(-4).forEach((msg: { role: string; content: string }) => {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          });
        });
      }

      contents.push({
        role: "user",
        parts: [{
          text: `Context/Topic: ${topic || "General BIM Onboarding"}\nUser Question: ${question}`
        }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.4,
          maxOutputTokens: 1000
        }
      });

      const reply = response.text || "I was unable to generate a response. Please try again.";
      return res.json({ answer: reply, source: "gemini" });
    } catch (err: any) {
      console.error("Gemini API error, using curated domain fallback:", err.message);
    }
  }

  // Fallback response if no API key or upon network issue
  const lowerQ = question.toLowerCase();
  let fallbackAnswer = "In professional BIM environments, precision, coordination, and following the BIM Execution Plan (BEP) are paramount. Always verify your worksets before placing elements, never explode CAD files in your central model, and coordinate with your discipline lead whenever moving primary structural or MEP conduits!";

  for (const [key, answer] of Object.entries(BIM_FALLBACK_ANSWERS)) {
    if (lowerQ.includes(key)) {
      fallbackAnswer = answer;
      break;
    }
  }

  return res.json({
    answer: fallbackAnswer,
    source: "knowledge_base"
  });
});

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
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BIM Academy server listening at http://0.0.0.0:${PORT}`);
  });
}

start();
