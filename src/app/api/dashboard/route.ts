import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the user's organization
        const { data: orgData, error: orgError } = await supabase
            .from('organizations')
            .select('id, name')
            .eq('user_id', user.id)
            .single();

        if (orgError) {
            return NextResponse.json({ error: orgError.message }, { status: 400 });
        }

        // Fetch latest scan
        const { data: latestScan } = await supabase
            .from('scans')
            .select('*')
            .eq('org_id', orgData.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // Fetch gaps
        const { data: gaps } = await supabase
            .from('gaps')
            .select('id, regulation_id, severity, status')
            .eq('org_id', orgData.id)
            .eq('status', 'open');

        // Fetch policies
        const { data: policies } = await supabase
            .from('policies')
            .select('id, policy_type, framework, version, created_at')
            .eq('org_id', orgData.id);

        return NextResponse.json({
            organization: orgData,
            latestScan: latestScan || null,
            overallScore: latestScan?.compliance_score?.overall || 0,
            gaps: gaps || [],
            policies: policies || [],
        });
    } catch (error: any) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
