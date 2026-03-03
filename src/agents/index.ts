import { VoltAgent } from '@voltagent/core';
import { supervisorAgent } from './supervisor';

export const voltAgent = new VoltAgent({
    agents: { supervisor_agent: supervisorAgent }, // The supervisor will recursively load its subAgents
});
