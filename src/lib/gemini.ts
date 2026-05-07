import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { createServerFn } from "@tanstack/react-start";

export interface AnalysisResult {
  crop: string;
  disease: string;
  severity: "Healthy" | "Medium" | "High";
  confidence: number;
  symptoms: string;
  treatment: string[];
  prevention: string[];
  is_crop_detected: boolean;
  isFallback?: boolean;
  error?: string;
}

const MOCK_RESULTS: AnalysisResult[] = [
  {
    crop: "Tomato",
    disease: "Early Blight (Alternaria solani)",
    severity: "Medium",
    confidence: 87,
    symptoms: "Concentric rings forming 'target' patterns on lower leaves, surrounded by yellow halos.",
    treatment: [
      "Apply copper-based fungicide every 7–10 days",
      "Remove and destroy infected lower leaves immediately",
      "Avoid overhead irrigation to reduce leaf wetness",
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Rotate crops — avoid planting tomatoes in same spot for 2+ years",
      "Maintain proper plant spacing for airflow",
    ],
    is_crop_detected: true,
  },
  {
    crop: "Rice",
    disease: "Rice Blast (Magnaporthe oryzae)",
    severity: "High",
    confidence: 92,
    symptoms: "Spindle-shaped spots with white to gray centers and brown borders on leaves and nodes.",
    treatment: [
      "Apply tricyclazole or isoprothiolane fungicide",
      "Drain fields and re-irrigate after 3 days",
      "Apply silicon-based fertilizer to strengthen stems",
    ],
    prevention: [
      "Plant blast-resistant varieties (IR64, Swarna)",
      "Avoid excessive nitrogen fertilization",
      "Monitor fields weekly during tillering stage",
    ],
    is_crop_detected: true,
  },
  {
    crop: "Wheat",
    disease: "Yellow Rust (Puccinia striiformis)",
    severity: "Medium",
    confidence: 89,
    symptoms: "Parallel rows of small, orange-yellow pustules along the leaf veins.",
    treatment: [
      "Spray propiconazole 25% EC at 0.1% concentration",
      "Apply a second spray 15 days later if needed",
      "Remove severely infected plants to prevent spread",
    ],
    prevention: [
      "Sow rust-resistant varieties",
      "Early sowing reduces rust infection risk",
      "Apply balanced fertilization — avoid excess nitrogen",
    ],
    is_crop_detected: true,
  },
  {
    crop: "General",
    disease: "Healthy Plant",
    severity: "Healthy",
    confidence: 95,
    symptoms: "Leaves are vibrant green with no visible spots, lesions, or pest damage. Stems are sturdy.",
    treatment: [
      "No treatment needed — crop appears healthy",
      "Continue regular monitoring every 2 weeks",
      "Maintain current fertilization schedule",
    ],
    prevention: [
      "Continue current good agricultural practices",
      "Monitor for pests during flowering stage",
      "Ensure proper drainage to maintain root health",
    ],
    is_crop_detected: true,
  },
];

export function getMockResult(hint?: string): AnalysisResult {
  let result = MOCK_RESULTS[0];
  if (hint) {
    const h = hint.toLowerCase();
    if (h.includes("rice") || h.includes("blast")) result = MOCK_RESULTS[1];
    else if (h.includes("wheat") || h.includes("rust")) result = MOCK_RESULTS[2];
    else if (h.includes("healthy") || h.includes("clean")) result = MOCK_RESULTS[3];
    else if (h.includes("tomato") || h.includes("blight")) result = MOCK_RESULTS[0];
  }
  return { ...result, isFallback: true };
}

const ANALYSIS_SCHEMA = {
  description: "Crop disease analysis result",
  type: SchemaType.OBJECT,
  properties: {
    crop: { type: SchemaType.STRING, description: "Name of the crop identified (or 'None' if not a crop)" },
    disease: { type: SchemaType.STRING, description: "Name of the disease or 'Healthy Plant'" },
    severity: { type: SchemaType.STRING, enum: ["Healthy", "Medium", "High"] },
    confidence: { type: SchemaType.NUMBER, description: "Confidence score from 0-100. Lower it if the image is blurry or ambiguous." },
    symptoms: { type: SchemaType.STRING, description: "Brief description of observed symptoms or why it's not a crop." },
    treatment: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of treatment steps",
    },
    prevention: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of prevention tips",
    },
    is_crop_detected: { 
      type: SchemaType.BOOLEAN, 
      description: "True if the image clearly contains a plant, leaf, or agricultural crop. False if it's a person, building, animal, or random object." 
    },
  },
  required: ["crop", "disease", "severity", "confidence", "symptoms", "treatment", "prevention", "is_crop_detected"],
};

export const getGeminiModel = (config?: { 
  model?: string; 
  systemInstruction?: string; 
  responseSchema?: any;
}) => {
  const apiKey =
    process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || (globalThis as any).GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key not configured on server.");
  }

  console.log("GEMINI_KEY_INIT: Using API key starting with:", apiKey.substring(0, 8) + "...");

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: config?.model || "gemini-2.0-flash",
    systemInstruction: config?.systemInstruction ? {
      role: "system",
      parts: [{ text: config.systemInstruction }],
    } : undefined,
    generationConfig: {
      responseMimeType: config?.responseSchema ? "application/json" : "text/plain",
      responseSchema: config?.responseSchema,
      temperature: 0.1,
    },
  });
};

export const analyzeWithGemini = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: { base64Data: string; mimeType: string; location: string; hint?: string } }) => {
    const { base64Data, mimeType, location, hint } = data;

    try {
      const model = getGeminiModel({
        systemInstruction: `You are a world-class plant pathologist and agricultural expert. 
Your first priority is to determine if the image actually contains a plant, leaf, or agricultural crop.
- If the image is NOT a plant (e.g., person, object, animal, building, blurred mess), set is_crop_detected to false and crop to 'None'.
- If the image IS a plant, set is_crop_detected to true and perform a detailed diagnosis.
- Provide highly accurate, localized crop diagnosis for India. 
- Use scientific names where applicable. 
- If you are unsure (confidence < 60), state your uncertainty in the symptoms.
- Your output must strictly follow the JSON schema.`,
        responseSchema: ANALYSIS_SCHEMA,
      });

      const prompt = `Analyze this crop image. 
Location: ${location || "India"}.
Context: ${hint || "Field diagnosis"}.

Identify the crop and any disease/pest. Provide symptoms, severity, treatment (organic & chemical), and prevention steps.`;

      const result = await model.generateContent([
        { inlineData: { data: base64Data, mimeType: mimeType || "image/jpeg" } },
        { text: prompt },
      ]);

      const response = await result.response;
      const text = response.text();

      try {
        const parsed = JSON.parse(text);
        // Defensive check for the new flag
        if (typeof parsed.is_crop_detected === 'undefined') {
          parsed.is_crop_detected = true; // Assume true if missing but response was valid
        }
        return parsed as AnalysisResult;
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", text);
        throw new Error("Invalid AI response format.");
      }
    } catch (error: any) {
      console.error("ANALYSIS ERROR:", error);

      if (error?.message?.includes("429") || error?.status === 429) {
        return getMockResult(hint);
      }

      if (error?.message?.includes("SAFETY")) {
        return {
          crop: "Unknown",
          disease: "Analysis Blocked",
          severity: "Medium",
          confidence: 0,
          symptoms: "The image analysis was blocked by safety filters.",
          treatment: ["Try a clearer, closer photo of the infected leaf"],
          prevention: ["Ensure good lighting when taking photos"],
          is_crop_detected: false,
        };
      }

      throw error;
    }
  }
);


