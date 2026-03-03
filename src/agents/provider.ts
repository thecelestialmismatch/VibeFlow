import { VercelAIProvider } from '@voltagent/vercel-ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';

export const modelName = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    ? createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY })('gemini-1.5-pro') as any
    : createGroq({ apiKey: process.env.GROQ_API_KEY || 'test-key' })('mixtral-8x7b-32768') as any;

export const getProvider = () => {
    return new VercelAIProvider();
};

export const provider = getProvider();
