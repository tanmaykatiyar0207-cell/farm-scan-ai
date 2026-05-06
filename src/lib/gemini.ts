import { GoogleGenerativeAI } from "@google/generative-ai";
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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
      });
      
      const systemInstruction = "You are a world-class plant pathologist and agricultural expert. Your task is to provide highly accurate, localized crop diagnosis based on images. Be specific with disease names (include common and scientific names if possible). Provide actionable, professional advice that considers regional practices in India.";

      const prompt = `${systemInstruction}

Analyze this crop image carefully. 
The user is located in: ${location || "India"}.

1. **Identification**: Identify the crop and the specific disease/pest or physiological disorder. If the plant is healthy, clearly state 'Healthy Plant'.
2. **Symptoms**: Briefly describe the visual symptoms observed in the image that led to this diagnosis.
3. **Severity**: Rate as 'Healthy', 'Medium' (visible damage but manageable), or 'High' (severe threat to yield).
4. **Treatment**: Provide 3-4 specific, actionable steps. Include BOTH an organic/natural option and a recommended chemical intervention if applicable.
5. **Prevention**: Provide 3-4 professional tips to prevent recurrence.
6. **Validation**: If the image does not contain a plant or crop, return an error field in the JSON instead.

Return ONLY a valid JSON object in this exact format:
{
  "crop": "Crop Name",
  "disease": "Disease Name (Scientific Name)",
  "severity": "Healthy/Medium/High",
  "confidence": 95,
  "symptoms": "Description of what you see",
  "treatment": ["Step 1...", "Step 2...", "Step 3..."],
  "prevention": ["Tip 1...", "Tip 2...", "Tip 3..."]
}`;

      const result = await model.generateContent([
        { inlineData: { data: base64Data, mimeType: mimeType || "image/jpeg" } },
        { text: prompt },
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
