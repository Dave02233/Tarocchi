import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.APIKEY });

export default async function questionAPI() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Ciao come va?",
  });
  console.log(response.text);
}

