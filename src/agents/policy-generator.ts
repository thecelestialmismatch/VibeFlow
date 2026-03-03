import { Agent } from '@voltagent/core';
import { regulationRagTool } from '../tools/regulation-rag';
import { policyTemplateTool } from '../tools/policy-template';
import { provider, modelName } from './provider';

export const policyGeneratorAgent = new Agent({
    llm: provider,
    model: modelName as any,
    name: 'policy_generator_agent',
    description: 'Generates compliant policy documents customized for a specific business based on applicable regulations.',
    purpose: `You are the Policy Generator Agent. Your role is to generate fully compliant policy documents.
  
Follow this logic:
1. For each applicable regulation provided in the input, use the regulation-rag tool to retrieve specific requirements for policies.
2. Use the policy-template tool to get the appropriate base template (e.g., privacy, terms).
3. Generate customized policy text by merging business details, legal requirements from RAG, and the template.
4. Ensure all required disclosures for each framework (GDPR rights, CCPA opt-out, etc.) are explicitly included.
5. MANDATORY: The final output MUST contain this exact disclaimer at the top:
   "**Disclaimer: Generated for informational purposes. This is not legal advice.**"
6. Output the final policies in Markdown format.`,
    tools: [regulationRagTool, policyTemplateTool],
});
