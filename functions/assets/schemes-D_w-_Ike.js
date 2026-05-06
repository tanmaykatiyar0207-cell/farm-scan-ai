import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
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
const getAISchemes_createServerFn_handler = createServerRpc({
  id: "453e3685e2009543c71d4e734c7493ef9f0bf1569e10a2615163dcd9c906a232",
  name: "getAISchemes",
  filename: "src/routes/schemes.tsx"
}, (opts) => getAISchemes.__executeServer(opts));
const getAISchemes = createServerFn({
  method: "POST"
}).handler(getAISchemes_createServerFn_handler, async ({
  data: location
}) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("your-api-key")) return [];
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              id: {
                type: SchemaType.STRING
              },
              title: {
                type: SchemaType.STRING
              },
              category: {
                type: SchemaType.STRING
              },
              description: {
                type: SchemaType.STRING
              },
              states: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.STRING
                }
              },
              link: {
                type: SchemaType.STRING
              }
            },
            required: ["id", "title", "category", "description", "states", "link"]
          }
        }
      }
    });
    const prompt = `Find 5-8 NEW or STATE-SPECIFIC agricultural schemes for ${location}, India (2024-2026). Return ONLY JSON array of { id, title, category, description, states: [], link }.`;
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text() || "[]");
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
});
export {
  getAISchemes_createServerFn_handler
};
