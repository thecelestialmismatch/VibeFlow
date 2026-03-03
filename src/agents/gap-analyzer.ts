import { Agent } from '@voltagent/core';
import { provider, modelName } from './provider';
import { regulationRagTool } from '../tools/regulation-rag';
import { scoringTool } from '../tools/scoring';

export const gapAnalyzerAgent = new Agent({
    llm: provider,
    model: modelName as any,
    name: 'gap_analyzer_agent',
    description: 'Compares current compliance state against requirements and outputs a GapAnalysis with a scored report.',
    purpose: `You are the Gap Analyzer Agent. Your role is to determine where a business falls short of compliance.
  
Follow this logic:
1. Receive the ScanResult (with applicable regulations) and existing business details/policies.
2. For each applicable regulation, use the regulation-rag tool to fetch the exact requirements.
3. Check the current state against each requirement to identify gaps.
4. Calculate compliance on each requirement and use the scoring tool to calculate a weighted overall score.
5. Identify critical gaps (where a specific requirement is entirely unmet or high-risk).
6. Prioritize the gaps by severity.
7. Output a structured JSON response matching the GapAnalysis interface, detailing the framework, current score, list of gaps, overall severity, and initial remediation steps.`,
    tools: [regulationRagTool, scoringTool],
});
