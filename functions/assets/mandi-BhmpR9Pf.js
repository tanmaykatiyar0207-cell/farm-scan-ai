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
const fetchLiveMandiPrices_createServerFn_handler = createServerRpc({
  id: "8b2b791de38b4fe7d6e5f76e53cfc6462e79404e5a58490d3e58ad62448559b9",
  name: "fetchLiveMandiPrices",
  filename: "src/routes/mandi.tsx"
}, (opts) => fetchLiveMandiPrices.__executeServer(opts));
const fetchLiveMandiPrices = createServerFn({
  method: "GET"
}).handler(fetchLiveMandiPrices_createServerFn_handler, async ({
  data: query
}) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("your-api-key")) {
      console.warn("SERVER: Gemini API key missing or placeholder. Returning empty results.");
      return [];
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
    const prompt = `Provide 3-5 realistic local mandi prices for ${query}, India. 
      Return ONLY a JSON array of objects with fields: id (unique string), name (mandi name), state, district, lat (number), lon (number), commodities (array of { name, price, unit, trend }).`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text || "[]");
  } catch (e) {
    console.error("SERVER_FN_ERROR (fetchLiveMandiPrices):", e);
    return [];
  }
});
const geocodeCity_createServerFn_handler = createServerRpc({
  id: "7a0930bf3d609a5d36ab753fbcb89eeebfafb274e3db2ff09735671fe829aa28",
  name: "geocodeCity",
  filename: "src/routes/mandi.tsx"
}, (opts) => geocodeCity.__executeServer(opts));
const geocodeCity = createServerFn({
  method: "GET"
}).handler(geocodeCity_createServerFn_handler, async ({
  data: city
}) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("your-api-key")) return {
      lat: 28.61,
      lon: 77.2
    };
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });
    const prompt = `Return ONLY a JSON object with "lat" and "lon" for "${city}, India". Example: {"lat": 28.61, "lon": 77.20}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const cleanJson = text.substring(jsonStart, jsonEnd);
    return JSON.parse(cleanJson || '{"lat": 28.61, "lon": 77.20}');
  } catch (e) {
    console.error("SERVER_FN_ERROR (geocodeCity):", e);
    return {
      lat: 28.61,
      lon: 77.2
    };
  }
});
export {
  fetchLiveMandiPrices_createServerFn_handler,
  geocodeCity_createServerFn_handler
};
