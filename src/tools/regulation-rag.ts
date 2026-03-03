import { tool } from '@voltagent/core';
import { z } from 'zod';
import { qdrantClient, COLLECTION_NAME } from '../lib/qdrant';
import { generateEmbedding } from '../lib/embeddings';

export const regulationRagTool = tool({
    name: 'regulation-rag',
    description: 'Search for specific compliance regulation requirements (GDPR, CCPA, HIPAA, SOC 2, EU AI Act) using natural language',
    parameters: z.object({
        query: z.string().describe('The search query related to a compliance topic or specific regulation'),
        topK: z.number().optional().default(3).describe('Number of results to return'),
        frameworkFilters: z.array(z.string()).optional().describe('Optional list of frameworks to filter by (e.g. ["GDPR", "CCPA"])'),
    }),
    execute: async ({ query, topK, frameworkFilters }) => {
        try {
            const queryEmbedding = await generateEmbedding(query);

            let filter;
            if (frameworkFilters && frameworkFilters.length > 0) {
                filter = {
                    must: [
                        {
                            key: 'framework',
                            match: {
                                any: frameworkFilters,
                            },
                        },
                    ],
                };
            }

            const searchResults = await qdrantClient.search(COLLECTION_NAME, {
                vector: queryEmbedding,
                limit: topK,
                filter,
                with_payload: true,
            });

            if (searchResults.length === 0) {
                return "No specific regulations found for this query.";
            }

            // Format the results with citations
            const formattedResults = searchResults.map((result: any, index: number) => {
                const payload = result.payload;
                return `
Result ${index + 1}:
Framework: ${payload.framework}
Article: ${payload.article}
Title: ${payload.title}
Summary: ${payload.summary}
Requirements: ${payload.requirements.join('; ')}
Applicability: ${payload.applicableTo.join(', ')}
Citation: [${payload.framework} ${payload.article}: ${payload.title}]
`;
            }).join('\n---\n');

            return `Found the following relevant regulations:\n\n${formattedResults}`;
        } catch (error: any) {
            console.error('RAG Tool Error:', error);
            return `Error searching regulations: ${error.message}`;
        }
    },
});
