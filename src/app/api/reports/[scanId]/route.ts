import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ scanId: string }> }
) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { scanId } = await params;

        // Retrieve gap analysis report 
        // Usually the scan contains the gaps inside the results JSONB or we fetch from gaps table
        const { data: gapsData, error: gapsError } = await supabase
            .from('gaps')
            .select('*, remediations(*)')
            .eq('scan_id', scanId);

        if (gapsError) {
            return NextResponse.json({ error: gapsError.message }, { status: 400 });
        }

        const { data: scanData } = await supabase
            .from('scans')
            .select('compliance_score')
            .eq('id', scanId)
            .single();

        const gapAnalysis = {
            framework: 'Aggregated', // In a real app we might break this down per framework
            currentScore: scanData?.compliance_score?.overall || 0,
            gaps: gapsData || [],
            severity: gapsData?.some(g => g.severity === 'critical') ? 'critical' : 'high',
            remediationSteps: gapsData?.flatMap(g => g.remediations) || [],
        };

        return NextResponse.json(gapAnalysis);
    } catch (error: any) {
        console.error('Report API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
