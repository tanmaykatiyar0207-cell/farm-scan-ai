import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { c as createServerFn } from "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const analyzeWithGemini_createServerFn_handler = createServerRpc({
  id: "b16ed1540eb3a15d6982d4e3c4e0e0344181a053c347f4f3921e3366c6e39dc9",
  name: "analyzeWithGemini",
  filename: "src/lib/gemini.ts"
}, (opts) => analyzeWithGemini.__executeServer(opts));
const analyzeWithGemini = createServerFn({
  method: "POST"
}).validator((data) => data).handler(analyzeWithGemini_createServerFn_handler, async ({
  data: {
    base64Data,
    mimeType,
    location
  }
}) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("SERVER ERROR: No Gemini API Key found.");
    throw new Error("API Key not configured on server.");
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
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
    const result = await model.generateContent([{
      inlineData: {
        data: base64Data,
        mimeType: mimeType || "image/jpeg"
      }
    }, {
      text: prompt
    }]);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI returned invalid JSON: " + text.substring(0, 100));
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("SERVER AI ERROR:", err);
    return {
      error: "Server-side Analysis Failed",
      details: err.message || "Unknown error during AI processing"
    };
  }
});
export {
  analyzeWithGemini_createServerFn_handler
};
