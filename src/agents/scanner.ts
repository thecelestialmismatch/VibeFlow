import { Agent } from '@voltagent/core';
import { webScraperTool } from '../tools/web-scraper';
import { regulationRagTool } from '../tools/regulation-rag';
import { provider, modelName } from './provider';

export const scannerAgent = new Agent({
  llm: provider,
  model: modelName as any,
  name: 'scanner_agent',
  description: 'Analyzes a business and determines which regulations apply based on input or website URL.',
  purpose: `You are the Regulation Scanner Agent. Your role is to determine which compliance regulations (GDPR, CCPA, HIPAA, SOC 2, EU AI Act) apply to a given business.
  
Follow this logic:
1. If a URL is provided, use the web-scraper tool to analyze the website for data practices, geographic indicators, and business type.
2. Cross-reference your findings with the regulation database using the regulation-rag tool to see which frameworks trigger.
3. Return a definitive list of applicable frameworks in exactly this JSON format:
{
  "businessDescription": "Brief summary",
  "applicableRegulations": ["GDPR", "CCPA"],
  "confidenceScores": {"GDPR": 0.95, "CCPA": 0.8},
  "reasoning": "Explanation of why these apply based on the findings"
}`,
  tools: [webScraperTool, regulationRagTool],
});
