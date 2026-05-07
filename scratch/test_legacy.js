import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function list() {
  try {
    // There isn't a direct listModels in the standard GoogleGenerativeAI class in this SDK version?
    // It's usually part of the admin or GoogleCloud SDK.
    // Let's try the simplest possible request.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hi");
    console.log(await result.response.text());
  } catch (e) {
    console.log("Error:", e.status, e.message);
  }
}
list();
