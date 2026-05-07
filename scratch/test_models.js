import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key found.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // dummy to get genAI object
    // genAI doesn't have listModels directly in the same way?
    // Let's just try several names.
    const names = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.0-pro", "gemini-2.0-flash-exp"];
    
    for (const name of names) {
      console.log(`Testing ${name}...`);
      try {
        const model = genAI.getGenerativeModel({ model: name });
        const result = await model.generateContent("Hi");
        const resp = await result.response;
        console.log(`  SUCCESS ${name}:`, resp.text());
        break;
      } catch (e) {
        console.error(`  FAILED ${name}:`, e.status, e.message);
      }
    }
  } catch (error) {
    console.error("GENERAL ERROR:", error);
  }
}

test();
