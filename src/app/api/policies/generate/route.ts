import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { voltAgent } from '@/agents';
import { z } from 'zod';

const generatePolicySchema = z.object({
    scan_id: z.string().uuid("Invalid scan ID format"),
});

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const parsedResult = generatePolicySchema.safeParse(body);
        if (!parsedResult.success) {
            return NextResponse.json({ error: 'Invalid input parameters', details: parsedResult.error.format() }, { status: 400 });
        }
        const { scan_id } = parsedResult.data;

        // Retrieve scan data to give necessary context to the policy generator
        const { data: scanData, error: scanError } = await supabase
            .from('scans')
            .select('*, organizations(*)')
            .eq('id', scan_id)
            .single();

        if (scanError || !scanData) {
            return NextResponse.json({ error: 'Scan not found' }, { status: 404 });
        }

        // Trigger Supervisor agent to generate policies
        const prompt = `Generate compliant policy documents based on the following scan results and business context:
Business: ${scanData.organizations.name}
Type: ${scanData.organizations.business_type}
Applicable Regulations: ${(scanData.results as any)?.applicableRegulations?.join(', ') || 'Unknown'}`;

        const response = await (voltAgent as any).execute({ input: prompt });

        // Parse Response (assuming agent returns an array of PolicyDocument objects as JSON)
        let policies = [];
        try {
            policies = JSON.parse(response);
        } catch {
            return NextResponse.json({ error: 'Failed to parse generated policies.' }, { status: 500 });
        }

        // Store generated policies in DB
        const insertedPolicies = [];
        for (const policy of policies) {
            const { data, error } = await supabase.from('policies').insert({
                org_id: scanData.org_id,
                policy_type: policy.type,
                content: policy.content,
                framework: policy.framework,
                version: '1.0',
            }).select().single();

            if (!error && data) insertedPolicies.push(data);
        }

        return NextResponse.json(insertedPolicies);
    } catch (error: any) {
        console.error('Policy Generation API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
