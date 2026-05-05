import { GoogleGenAI } from "@google/genai";
import { createServerFn } from "@tanstack/react-start";

const MOCK_RESULTS = [
  {
    crop: "Tomato", disease: "Early Blight (Alternaria solani)", severity: "Medium", confidence: 87,
    treatment: ["Apply copper-based fungicide every 7–10 days", "Remove and destroy infected lower leaves immediately", "Avoid overhead irrigation to reduce leaf wetness"],
    prevention: ["Use certified disease-free seeds", "Rotate crops — avoid planting tomatoes in same spot for 2+ years", "Maintain proper plant spacing for airflow"],
  },
  {
    crop: "Rice", disease: "Rice Blast (Magnaporthe oryzae)", severity: "High", confidence: 92,
    treatment: ["Apply tricyclazole or isoprothiolane fungicide", "Drain fields and re-irrigate after 3 days", "Apply silicon-based fertilizer to strengthen stems"],
    prevention: ["Plant blast-resistant varieties (IR64, Swarna)", "Avoid excessive nitrogen fertilization", "Monitor fields weekly during tillering stage"],
  },
  {
    crop: "Wheat", disease: "Yellow Rust (Puccinia striiformis)", severity: "Medium", confidence: 89,
    treatment: ["Spray propiconazole 25% EC at 0.1% concentration", "Apply a second spray 15 days later if needed", "Remove severely infected plants to prevent spread"],
    prevention: ["Sow rust-resistant varieties", "Early sowing reduces rust infection risk", "Apply balanced fertilization — avoid excess nitrogen"],
  },
  {
    crop: "Cotton", disease: "Healthy Plant", severity: "Healthy", confidence: 95,
    treatment: ["No treatment needed — crop appears healthy", "Continue regular monitoring every 2 weeks", "Maintain current fertilization schedule"],
    prevention: ["Continue current good agricultural practices", "Monitor for bollworm during flowering stage", "Ensure proper drainage to maintain root health"],
  },
];

export function getMockResult() {
  return {
    crop: "Unknown",
    disease: "Analysis Inconclusive",
    severity: "Medium",
    confidence: 0,
    treatment: ["Please try taking a clearer photo of the affected area.", "Ensure the plant is well-lit and the leaf is flat.", "If the issue persists, consult a local agricultural expert."],
    prevention: ["Maintain regular monitoring of your crops.", "Ensure proper irrigation and fertilization.", "Practice good field hygiene."],
    isFallback: true
  };
}

export const analyzeWithGemini = createServerFn({ method: "POST" })
  .handler(async ({ data: { base64Data, mimeType, location } }: { data: { base64Data: string; mimeType: string; location: string } }) => {
    // Read from process.env on server
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("SERVER ERROR: No Gemini API Key found.");
      throw new Error("API Key not configured on server.");
    }

    try {
      const genAI = new GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      });
      
      const prompt = `Analyze this crop image. The user is in ${location || "India"}.
Identify crop, disease, severity (Healthy/Medium/High), confidence (%), treatment (3 steps), and prevention (3 tips).
Return ONLY JSON: {"crop": "...", "disease": "...", "severity": "...", "confidence": 90, "treatment": ["...", "..."], "prevention": ["...", "..."]}`;

      const result = await model.generateContent([
        { text: prompt },
        { inlineData: { data: base64Data, mimeType: mimeType || "image/jpeg" } },
      ]);

      const response = await result.response;
      const text = response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI returned invalid JSON: " + text.substring(0, 100));
      
      return JSON.parse(jsonMatch[0]);
    } catch (err: any) {
      console.error("SERVER AI ERROR:", err);
      // Return a structured error object that the UI can display
      return { 
        error: "Server-side Analysis Failed", 
        details: err.message || "Unknown error during AI processing" 
      };
    }
  });
