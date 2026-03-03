export interface RegulationFramework {
  id: string;
  name: string;
  articles: string[];
  jurisdiction: string;
  lastUpdated: string;
}

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface RegulationEntry {
  id: string;
  framework: string;
  article: string;
  title: string;
  summary: string;
  requirements: string[];
  commonGaps: string[];
  severity: Severity;
  applicableTo: string[];
}
