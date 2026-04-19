import { GoogleGenAI } from "@google/genai";
import fs from "fs"

const ai = new GoogleGenAI  ({});

export const analyzeCV = async (cvFile) => {
  try {
    const day = new Date()
    const fileBuffer = fs.readFileSync(cvFile.path)
    const base64File = fileBuffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Extract and analyze this CV and return JSON ( keep in mind today is ${day}) and keep your language simple to understand:
              {
                aiOverview: string,
                cvRate: number (out of 10),
                skills: string[],
                weaknesses: string[],
                improvements: string[]
              }`
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64File
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.candidates[0].content.parts[0].text);
  } catch (e) {
    throw new Error(e.message);
  }
};

