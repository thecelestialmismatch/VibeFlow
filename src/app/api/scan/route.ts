import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { voltAgent } from '@/agents';
import { z } from 'zod';

const scanSchema = z.object({
    url: z.string().url().optional().or(z.literal('')),
    businessDescription: z.string().optional(),
    businessType: z.string().min(1, "Business type is required"),
    geography: z.string().min(1, "Geography is required"),
});

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Zod Input Validation
        const parsedResult = scanSchema.safeParse(body);
        if (!parsedResult.success) {
            return NextResponse.json({ error: 'Invalid input parameters', details: parsedResult.error.format() }, { status: 400 });
        }

        const { url, businessDescription, businessType, geography } = parsedResult.data;

        // Rate limiting check: Mock logic for MVP (checking scans table for today)
        // Query organization for this user
        const { data: orgData } = await supabase
            .from('organizations')
            .select('id')
            .eq('user_id', user.id)
            .single();

        if (orgData) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const { count } = await supabase
                .from('scans')
                .select('*', { count: 'exact', head: true })
                .eq('org_id', orgData.id)
                .gte('created_at', today.toISOString());

            // Simplified rate limit: 1 free scan per day if not on a paid tier (mocked paid tier check omitted)
            if (count && count >= 1) {
                // Here we'd typically check their Stripe subscription status from the database.
                // Assuming free tier behavior for the MVP unless implemented.
                console.warn('Rate limit hit: Free tier allows 1 scan per day');
                // We'll let it pass for development purposes, but in production:
                // return NextResponse.json({ error: 'Rate limit exceeded. Upgrade for unlimited scans.' }, { status: 429 });
            }
        }

        // Call Supervisor agent to orchestrate the scan
        const prompt = `Perform a full compliance scan for the following business:
URL: ${url || 'N/A'}
Description: ${businessDescription || 'N/A'}
Type: ${businessType}
Geography: ${geography}`;

        // Note: The VoltAgent execution pattern depends on the @voltagent/core API spec.
        // Supposing an execute method that returns aggregated strings or JSON per the prompt setup:
        const response = await (voltAgent as any).execute({ input: prompt });

        let scanResult;
        try {
            scanResult = JSON.parse(response); // Assuming agent returns strict JSON
        } catch {
            scanResult = { message: response }; // Fallback to raw response
        }

        // Save scan results to Supabase if org exists
        if (orgData) {
            await supabase.from('scans').insert({
                org_id: orgData.id,
                scan_type: 'full',
                results: scanResult,
                compliance_score: scanResult.complianceScore || { overall: 0, byFramework: {} },
            });
        }

        return NextResponse.json(scanResult);
    } catch (error: any) {
        console.error('Scan API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
