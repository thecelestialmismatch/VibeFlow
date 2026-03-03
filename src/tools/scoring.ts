import { tool } from '@voltagent/core';
import { z } from 'zod';

export const scoringTool = tool({
    name: 'scoring',
    description: 'Calculates compliance score based on gaps and their severities',
    parameters: z.object({
        gaps: z.array(z.object({
            framework: z.string(),
            severity: z.enum(['critical', 'high', 'medium', 'low']),
        })).describe('List of identified compliance gaps'),
    }),
    execute: async ({ gaps }) => {
        let score = 100;
        const severityWeights = {
            critical: 20,
            high: 10,
            medium: 5,
            low: 2,
        };

        const frameworkLoss: Record<string, number> = {};

        for (const gap of gaps) {
            const deduction = severityWeights[gap.severity];
            score -= deduction;

            if (!frameworkLoss[gap.framework]) {
                frameworkLoss[gap.framework] = 0;
            }
            frameworkLoss[gap.framework] += deduction;
        }

        if (score < 0) score = 0;

        const byFramework: Record<string, number> = {};
        for (const [framework, loss] of Object.entries(frameworkLoss)) {
            byFramework[framework] = Math.max(0, 100 - loss);
        }

        return JSON.stringify({
            overall: score,
            byFramework,
        });
    },
});
