const fs = require('fs');
const path = require('path');

const agentsDir = path.join(__dirname, '../src/agents');
const files = ['gap-analyzer.ts', 'policy-generator.ts', 'remediation.ts', 'scanner.ts', 'supervisor.ts'];

for (const file of files) {
  const filePath = path.join(agentsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add import if missing
    if (!content.includes('import { provider, modelName } from \'./provider\';')) {
        content = content.replace(/import \{ provider.* \} from '\.\/provider';/g, '');
        content = content.replace(/import \{ Agent \} from '@voltagent\/core';/g, 'import { Agent } from \'@voltagent/core\';\nimport { provider, modelName } from \'./provider\';');
    }
    
    // Add llm and model if missing
    if (!content.includes('llm: provider,')) {
        content = content.replace(/name: '(.*?)',/, 'llm: provider,\n    model: modelName as any,\n    name: \'$1\',');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${file}`);
  }
}
