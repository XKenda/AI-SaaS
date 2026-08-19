import { GoogleGenAI } from "@google/genai";
import fs from "fs"
import { GEMINI_API_KEY } from "../../config/env.js";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const analyzeCV = async (cvFile) => {
  try {
    const day = new Date();
    const fileBuffer = cvFile.buffer;
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

export const AtsCvCkecker = async(cvFile, JobDescription) => {
  try {

    
    const day = new Date();
    const fileBuffer = cvFile.buffer;
    const base64File = fileBuffer.toString("base64");
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents : [
        {
          role: "user",
          parts: [
            {
              text : `Today is ${day} use ATS checker to check is the cv is suitable for this job or not ("${JobDescription}")
              the response will be JSON and it has that form
              {
                "atsCehckerRate" : number (rate of 100),
                "Weakness" : string[] (weakness points of the cv based on Job Description)
                "needToImprove" : string[] (the points that needs to be improve to make the cv suiatbel for that Job)
              }
              `
            }, {
              inlineData : {
                mimeType : "application/pdf",
                data: base64File
              }
            }
          ]
        }
      ],
      config : {
        responseMimeType : "application/json"
      }
    })

    return JSON.parse(response.candidates[0].content.parts[0].text);
  } catch (e) {
    throw new Error(e.message);
  }
}