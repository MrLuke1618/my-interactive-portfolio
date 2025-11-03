


import { GoogleGenAI, Type } from '@google/genai';
import { Language } from '../types';

// FIX: Per Gemini API guidelines, initialize the SDK using the API_KEY from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chatbotSystemInstruction = `
You are an AI assistant for Hoang Cao Minh's portfolio. Your primary role is to answer questions on his behalf, as if you were him. You must adopt his persona.

**Core Rules:**
- **Persona:** ALWAYS speak in the first person ("I", "my", "me"). You are representing Hoang Cao Minh.
- **NEVER** identify yourself as an AI, a chatbot, or an assistant when answering about his skills, experience, etc.
- **Knowledge:** Your knowledge is based on the information provided in the portfolio (skills, experience, projects, etc.). You can also answer general knowledge questions if asked.
- **Tone:** Be professional, friendly, and helpful. Keep answers concise.

**Special Modes (These are exceptions to the persona rule):**

1. **Easter Egg Mode:**
   - If the user's prompt is EXACTLY "synthwave" or "the matrix", respond ONLY with: ---SYNTHWAVE_MODE_ACTIVATE---
   - If the user asks to "return to normal", "disable synthwave", etc., respond ONLY with: ---SYNTHWAVE_MODE_DEACTIVATE---

2. **Minigame "Game Master" Mode:**
   - If the user asks to "play a game", "start a game", etc., you will become a Game Master.
   - **Your task:** Invent and manage a simple, fun, text-based minigame (e.g., a riddle, simple trivia, guess the number, word association). The game should be different each time.
   - **Step 1:** Announce that you're starting a game and briefly explain the simple rules.
   - **Step 2:** Manage the game turn-by-turn based on the user's input.
   - **Step 3:** If the user wins, you MUST congratulate them and then reveal the secret hint for the Easter Egg. The hint is: "You've won! As a reward, here's a secret: try typing 'synthwave' or 'the matrix' into the chat."
   - **Step 4:** If the user loses or gives up, be a good sport and end the game gracefully.
   - **IMPORTANT:** You manage the entire game. Do not use special tokens. Just use natural language.

**Example Conversation:**
User: "What are your key skills?"
Your Correct Response: "I'm experienced in Video Editing and News Editing, and skillful in AI App Development, Figma, Canva, and Unity, among others."

User: "Let's play a game."
Your Correct Response: "Great idea! Let's play a riddle game. I'll give you a riddle, and you have to guess the answer. Ready? Here it is: I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?"
`;


// --- Helper for API calls ---
const callGemini = async (prompt: string, schema: any) => {
    // FIX: Per guidelines, we assume the API key is set via environment variables. The `ai` instance is now a const.
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const jsonStr = (response.text ?? '').trim();
        if (!jsonStr) {
            throw new Error("The AI returned an empty response. Please try again.");
        }
        try {
            return JSON.parse(jsonStr);
        } catch (parseError) {
             console.error("Failed to parse JSON response from Gemini", parseError, "Raw text:", jsonStr);
             throw new Error("The AI returned an unexpected format. Please try again.");
        }
    } catch (e) {
        console.error("Gemini API call failed", e);
        if (e instanceof Error) throw e;
        throw new Error("Failed to get a response from the AI. Please check your connection and try again.");
    }
}


export const getChatbotResponse = async (prompt: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]): Promise<string> => {
    // FIX: Per guidelines, we assume the API key is set via environment variables.
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [...history, {role: 'user', parts: [{text: prompt}]}],
            config: {
                systemInstruction: chatbotSystemInstruction,
            },
        });
        return response.text ?? '';
    } catch (e) {
        console.error("Gemini API call failed", e);
        return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
};

export const generateYoutubeTitles = async (topic: string, tone: string, language: Language): Promise<{ title: string; reasoning: string }[]> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            titles: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        reasoning: { type: Type.STRING, description: "A brief explanation of why this title is effective (e.g., SEO, emotional appeal, clarity)." }
                    },
                    required: ['title', 'reasoning']
                }
            }
        },
        required: ['titles']
    };
    const langInstruction = language === 'vi' ? 'Vietnamese' : 'English';
    const prompt = `Generate 5 catchy, SEO-friendly YouTube titles for a video about "${topic}". The tone should be ${tone}. For each title, provide a brief reasoning for why it's effective. The response must be in ${langInstruction} and contain no special formatting characters like asterisks.`;
    const result = await callGemini(prompt, schema);
    return result.titles || [];
};

export const countWordsInScript = async (script: string, _language: Language): Promise<{ wordCount: number }> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            wordCount: { type: Type.INTEGER }
        },
        required: ['wordCount']
    };
    const prompt = `Count the number of words in the following script. Respond only with the JSON object containing the word count. Script: "${script}"`
    return await callGemini(prompt, schema);
};

export const generateHeadlines = async (topic: string, audience: string, language: Language): Promise<{ headline: string; reasoning: string }[]> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            headlines: {
                type: Type.ARRAY,
                items: {
                     type: Type.OBJECT,
                    properties: {
                        headline: { type: Type.STRING },
                        reasoning: { type: Type.STRING, description: "A brief explanation of why this headline is compelling for the target audience." }
                    },
                    required: ['headline', 'reasoning']
                }
            }
        },
        required: ['headlines']
    };
    const langInstruction = language === 'vi' ? 'Vietnamese' : 'English';
    const audienceInstruction = audience ? ` The target audience is ${audience}.` : '';
    const prompt = `Generate 5 engaging, click-worthy headlines for a news article about "${topic}".${audienceInstruction} For each headline, provide a brief reasoning for why it's compelling. The response must be in ${langInstruction} and contain no special formatting characters like asterisks.`;
    const result = await callGemini(prompt, schema);
    return result.headlines || [];
};

export const explainIdiom = async (idiom: string, language: Language): Promise<{ explanation: string; dialogue: string; equivalent: string; dialogueReasoning: string; }> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            explanation: { type: Type.STRING },
            dialogue: { type: Type.STRING, description: "A short, natural dialogue of 2-3 lines that uses the idiom." },
            equivalent: { type: Type.STRING, description: "A contextual equivalent, e.g., a similar phrase in another language or a simpler way to say it." },
            dialogueReasoning: { type: Type.STRING, description: "A brief explanation of why the dialogue is a good, natural-sounding example of the idiom in use."}
        },
        required: ['explanation', 'dialogue', 'equivalent', 'dialogueReasoning']
    };
    const langInstruction = language === 'vi' ? 'Vietnamese' : 'English';
    const prompt = `Explain the idiom "${idiom}". Provide its meaning, a contextual equivalent, a short dialogue using it, and a brief reasoning for why the dialogue is a good example. The response must be in ${langInstruction} and contain no special formatting characters like asterisks.`;
    return await callGemini(prompt, schema);
};

export const generateClanNames = async (theme: string, count: number, language: Language): Promise<{ name: string; reasoning: string }[]> => {
    const schema = {
        type: Type.OBJECT,
        properties: {
            clanNames: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        reasoning: { type: Type.STRING, description: "A brief explanation of the name's origin, meaning, or why it fits the theme (e.g., historical context, mythology, wordplay)." }
                    },
                    required: ['name', 'reasoning']
                }
            }
        },
        required: ['clanNames']
    };
    const langInstruction = language === 'vi' ? 'Vietnamese' : 'English';
    const prompt = `Generate ${count} unique and cool names for a gaming clan with the theme "${theme}". For each name, provide a brief reasoning explaining its origin or why it fits the theme. The response must be in ${langInstruction} and contain no special formatting characters like asterisks.`;
    const result = await callGemini(prompt, schema);
    return result.clanNames || [];
};