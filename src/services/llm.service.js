import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 🧠 CONTEXT BUILDER
function buildPrompt(contextChunks, question) {
  const contextText = contextChunks
    .map((c, i) => `[SOURCE_${i + 1}]\n${c.text}`)
    .join("\n\n");

  return `
<system_role>
You are Mora AI, a highly precise corporate SOP (Standard Operating Procedure) assistant. Your objective is to provide accurate information based strictly on the provided documentation.
</system_role>

<constraints>
1. SOURCE_GROUNDING: Answer the question using ONLY the provided <context> block below. 
2. UNCERTAINTY_PROTOCOL: If the information required to answer is not explicitly stated in the context, respond exactly with: "I don't know." Do not use outside knowledge.
3. CITATION_STYLE: You must append the source identifier to every claim, for example: (Source 1) or (Source 1, Source 2).
</constraints>

<context>
${contextText}
</context>

<user_query>
${question}
</user_query>

<assistant_response_format>
Provide a clear, professional answer followed by the appropriate citations. If the answer is not in the context, trigger the UNCERTAINTY_PROTOCOL.
</assistant_response_format>
`;
}



// 🔵 GEMINI
export async function askGemini(contextChunks, question) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = buildPrompt(contextChunks, question);

  const result = await model.generateContent(prompt);

  return result.response.text();
}

// 🟢 GROQ (LLaMA 3)
export async function askGroq(contextChunks, question) {
  if (!groq) {
    throw new Error("Groq API key missing");
  }

  const prompt = buildPrompt(contextChunks, question);

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are Mora AI." },
      { role: "user", content: prompt }
    ]
  });

  return completion.choices[0].message.content;
}