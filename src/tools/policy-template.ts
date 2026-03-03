import { tool } from '@voltagent/core';
import { z } from 'zod';

export const policyTemplateTool = tool({
    name: 'policy-template',
    description: 'Provides standardized templates for various compliance policies (Privacy Policy, Terms of Service, Cookie Policy, Information Security Policy)',
    parameters: z.object({
        policyType: z.enum(['privacy', 'terms', 'cookie', 'infosec']).describe('The type of policy template to retrieve'),
    }),
    execute: async ({ policyType }) => {
        switch (policyType) {
            case 'privacy':
                return `# Privacy Policy Template\n\n## 1. Information We Collect\n[Detail information collection]\n\n## 2. How We Use Information\n[Detail usage]\n\n## 3. Data Sharing\n[Detail sharing]\n\n## 4. User Rights\n[Detail GDPR/CCPA rights]`;
            case 'terms':
                return `# Terms of Service Template\n\n## 1. Acceptance of Terms\n[Detail acceptance]\n\n## 2. User Responsibilities\n[Detail responsibilities]\n\n## 3. Limitation of Liability\n[Detail limitation]`;
            case 'cookie':
                return `# Cookie Policy Template\n\n## 1. What are Cookies\n[Detail definition]\n\n## 2. How We Use Cookies\n[Detail usage]\n\n## 3. Managing Cookies\n[Detail management]`;
            case 'infosec':
                return `# Information Security Policy\n\n## 1. Access Control\n[Detail access policies]\n\n## 2. Data Encryption\n[Detail encryption standards]\n\n## 3. Incident Response\n[Detail IR plan]`;
            default:
                return 'Template not found.';
        }
    },
});
