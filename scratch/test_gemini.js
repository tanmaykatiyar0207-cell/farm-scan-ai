import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key found. Pass it via GEMINI_API_KEY=xxx node ...");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("SUCCESS:", response.text());
  } catch (error) {
    console.error("TEST FAILED:");
    console.error("Status:", error.status);
    console.error("Message:", error.message);
    if (error.errorDetails) {
      console.error("Details:", JSON.stringify(error.errorDetails, null, 2));
    }
  }
}

test();
