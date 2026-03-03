import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
        const result = await model.embedContent(text);
        const embedding = result.embedding;
        return embedding.values;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
    // Try to embed multiple sequentially to respect rate limits or implement proper batching if supported
    const embeddings: number[][] = [];
    for (const text of texts) {
        embeddings.push(await generateEmbedding(text));
    }
    return embeddings;
}
