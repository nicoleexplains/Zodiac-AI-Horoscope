import { GoogleGenAI } from "@google/genai";
import type { ZodiacSign } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateHoroscope(zodiacSign: ZodiacSign, focusArea: string): Promise<string> {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set.");
    return "API Key not configured. Please check your environment variables.";
  }
  
  const systemInstruction = "You are Astra, a wise and mystical astrologer who provides insightful and empowering guidance based on the user's zodiac sign. Your horoscopes are concise, typically 2-3 sentences, and written in a beautiful, flowing style.";

  const prompt = `Generate a personal horoscope for a ${zodiacSign.name}, focusing on ${focusArea} for today.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.9,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI.");
    }
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The celestial signals are unclear. Please try again later.");
  }
}
