/**
 * LeakWall Pattern Scanner
 * All detection runs locally in the browser. Zero network calls.
 *
 * @typedef {{ label: string, severity: 'critical' | 'high' | 'medium', pattern: RegExp }} LeakPattern
 * @typedef {{ label: string, severity: string }} LeakResult
 */

/** @type {LeakPattern[]} */
const PATTERNS = [
  // --- Critical: Secrets & Credentials ---
  {
    label: 'AWS Access Key',
    severity: 'critical',
    pattern: /\b(AKIA|ASIA|AROA)[A-Z0-9]{16}\b/,
  },
  {
    label: 'AWS Secret Key',
    severity: 'critical',
    pattern: /aws[_\-\s]?secret[_\-\s]?(?:access[_\-\s]?)?key[\s"'=:]+([A-Za-z0-9/+]{40})/i,
  },
  {
    label: 'GitHub Personal Access Token',
    severity: 'critical',
    pattern: /ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{82}/,
  },
  {
    label: 'OpenAI API Key',
    severity: 'critical',
    pattern: /sk-[A-Za-z0-9]{32,}/,
  },
  {
    label: 'Stripe Secret Key',
    severity: 'critical',
    pattern: /sk_(live|test)_[A-Za-z0-9]{24,}/,
  },
  {
    label: 'Google API Key',
    severity: 'critical',
    pattern: /AIza[A-Za-z0-9\-_]{35}/,
  },
  {
    label: 'Private Key / Certificate',
    severity: 'critical',
    pattern: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/,
  },
  {
    label: 'Generic API Key or Token',
    severity: 'high',
    pattern: /(?:api[_\-\s]?key|api[_\-\s]?token|access[_\-\s]?token|auth[_\-\s]?token|secret[_\-\s]?key)[\s"'=:]+([A-Za-z0-9\-_.]{16,})/i,
  },
  {
    label: 'Password Field',
    severity: 'high',
    pattern: /(?:password|passwd|pwd)[\s"'=:]+\S{6,}/i,
  },
  {
    label: 'Connection String / Database URL',
    severity: 'critical',
    pattern: /(?:postgres|mysql|mongodb|redis|mssql):\/\/[^:\s]+:[^@\s]+@[^\s]+/i,
  },

  // --- Critical: PII ---
  {
    label: 'Social Security Number (SSN)',
    severity: 'critical',
    pattern: /\b(?!000|666|9\d{2})\d{3}[- ](?!00)\d{2}[- ](?!0000)\d{4}\b/,
  },
  {
    label: 'Credit Card Number',
    severity: 'critical',
    pattern: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b/,
  },
  {
    label: 'Passport Number',
    severity: 'high',
    pattern: /\b[A-Z]{1,2}[0-9]{6,9}\b/,
  },
  {
    label: 'Driver\'s License Number',
    severity: 'high',
    pattern: /\bDL[:\s]?[A-Z0-9]{6,14}\b/i,
  },

  // --- High: Source Code ---
  {
    label: 'Source Code (imports)',
    severity: 'high',
    pattern: /^import\s+(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)\s+from\s+['"][^'"]+['"]/m,
  },
  {
    label: 'Source Code (function definitions)',
    severity: 'high',
    pattern: /(?:def\s+\w+\s*\(|function\s+\w+\s*\(|const\s+\w+\s*=\s*(?:async\s+)?\(|class\s+\w+\s*(?:extends\s+\w+\s*)?\{)/,
  },
  {
    label: 'Source Code (require statements)',
    severity: 'high',
    pattern: /(?:const|let|var)\s+\w+\s*=\s*require\s*\(/,
  },

  // --- Medium: Contact / Medical ---
  {
    label: 'Email Address (bulk)',
    severity: 'medium',
    pattern: /(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[\s,;]+){3,}/,
  },
  {
    label: 'Medical / Health Information',
    severity: 'high',
    pattern: /(?:diagnosis|patient\s+(?:name|id)|medical\s+record|prescription|ICD-?10)\s*[:=]?\s*\S/i,
  },
  {
    label: 'IP Address (private range)',
    severity: 'medium',
    pattern: /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/,
  },
];

/**
 * Scan a text string for sensitive data patterns.
 * @param {string} text
 * @returns {LeakResult[]}
 */
export function scanText(text) {
  if (!text || typeof text !== 'string') return [];

  const found = [];
  const seenLabels = new Set();

  for (const { label, severity, pattern } of PATTERNS) {
    if (seenLabels.has(label)) continue;
    if (pattern.test(text)) {
      found.push({ label, severity });
      seenLabels.add(label);
    }
  }

  return found;
}
