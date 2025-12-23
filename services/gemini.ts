
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (transactions: Transaction[]) => {
  if (transactions.length === 0) return "Add some transactions to get AI financial advice!";

  const dataSummary = transactions.map(t => ({
    type: t.type,
    amount: t.amount,
    category: t.category,
    date: t.date
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these transactions, provide 3 short, actionable financial tips for the user. Keep it friendly but professional. Transactions: ${JSON.stringify(dataSummary)}`,
      config: {
        maxOutputTokens: 200,
        temperature: 0.7,
      }
    });

    return response.text || "Keep tracking your expenses to build wealth!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Focus on minimizing high-interest debt and building an emergency fund.";
  }
};
