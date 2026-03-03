import { Agent } from '@voltagent/core';
import { scannerAgent } from './scanner';
import { policyGeneratorAgent } from './policy-generator';
import { gapAnalyzerAgent } from './gap-analyzer';
import { remediationAgent } from './remediation';
import { provider, modelName } from './provider';

export const supervisorAgent = new Agent({
   llm: provider,
   model: modelName as any,
   name: 'supervisor_agent',
   description: 'Orchestrates the compliance multi-agent system. Routes user requests to appropriate specialized agents and aggregates results.',
   purpose: `You are the Supervisor Agent, the top-level orchestrator for the VibeFlow Compliance AI. You manage a team of specialized sub-agents.
  
Follow this routing logic:
1. Receive the user's request and categorize their intent.
2. For a "full scan" or "new onboarding": 
   - First, call the scanner_agent to identify applicable regulations.
   - Then, pass the results to the gap_analyzer_agent to find issues.
   - Finally, pass the gaps to the remediation_agent to get actionable fixes.
3. For "generate policy": 
   - First, call the scanner_agent (if not already done).
   - Then, pass the results to the policy_generator_agent.
4. For "check gaps" (when results exist): 
   - Route directly to the gap_analyzer_agent.
5. Aggregate the responses from the sub-agents and return a unified, cohesive response to the user. Do not expose internal agent routing to the user, present the final findings.`,
   subAgents: [scannerAgent, policyGeneratorAgent, gapAnalyzerAgent, remediationAgent],
});
