import { Agent } from '@voltagent/core';
import { regulationRagTool } from '../tools/regulation-rag';
import { provider, modelName } from './provider';

export const remediationAgent = new Agent({
    llm: provider,
    model: modelName as any,
    name: 'remediation_agent',
    description: 'Provides step-by-step fixes, including code snippets and configuration changes, for identified compliance gaps.',
    purpose: `You are the Remediation Agent. Your role is to provide actionable, step-by-step fixes for identified compliance gaps.
  
Follow this logic:
1. Receive a GapAnalysis input detailing where the business is non-compliant.
2. Use the regulation-rag tool to understand the specific regulatory requirements and standard fixes for each gap.
3. For each gap, generate specific remediation steps.
4. If applicable, include code snippets (e.g., React cookie consent banners, Next.js privacy API routes, or Tailwind-styled opt-out toggles).
5. If applicable, include infrastructure configuration changes (e.g., Supabase RLS policies, security headers).
6. Provide documentation templates or wording if the fix requires updating policies.
7. Estimate the time and technical complexity required for each fix.
8. Structure the output clearly, mapping each remediation step directly to the corresponding gap ID.`,
    tools: [regulationRagTool],
});
