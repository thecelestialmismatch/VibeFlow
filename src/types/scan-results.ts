export interface ScanRequest {
    url?: string;
    businessType: string;
    geography: string;
    dataTypes: string[];
}

export interface RemediationStep {
    title: string;
    description: string;
    codeSnippet?: string;
    status: 'pending' | 'in_progress' | 'completed';
}

export interface Gap {
    id?: string;
    scanId?: string;
    orgId?: string;
    regulationId: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    status: 'open' | 'remediated' | 'ignored';
    created_at?: string;
}

export interface GapAnalysis {
    framework: string;
    currentScore: number;
    gaps: Gap[];
    severity: 'critical' | 'high' | 'medium' | 'low';
    remediationSteps: RemediationStep[];
}

export interface ComplianceScore {
    overall: number; // 0-100
    byFramework: Record<string, number>;
}

export interface ScanResult {
    applicableRegulations: string[];
    complianceScore: ComplianceScore;
    gaps: Gap[];
    timestamp: string;
}
