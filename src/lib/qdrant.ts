import { QdrantClient } from '@qdrant/js-client-rest';

const qdrantUrl = process.env.QDRANT_URL || '';
const qdrantApiKey = process.env.QDRANT_API_KEY || '';

export const qdrantClient = new QdrantClient({
    url: qdrantUrl,
    apiKey: qdrantApiKey,
});

export const COLLECTION_NAME = 'regulations';

// Initialize the collection if it doesn't exist
export async function initializeQdrant() {
    try {
        const collections = await qdrantClient.getCollections();
        const exists = collections.collections.some(c => c.name === COLLECTION_NAME);

        if (!exists) {
            await qdrantClient.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: 768, // Gemini text-embedding-004 size
                    distance: 'Cosine',
                },
            });
            console.log(`Created Qdrant collection: ${COLLECTION_NAME}`);
        }
    } catch (error) {
        console.error('Failed to initialize Qdrant:', error);
    }
}
