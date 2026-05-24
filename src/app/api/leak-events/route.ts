import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const LeakEventSchema = z.object({
  user_id: z.string().uuid().optional(),
  tool_name: z.string().max(100),
  leak_types: z.array(z.string()),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  action: z.enum(['blocked', 'warned', 'allowed']),
  extension_version: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LeakEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('leak_events')
    .insert({
      user_id: parsed.data.user_id ?? null,
      tool_name: parsed.data.tool_name,
      leak_types: parsed.data.leak_types,
      severity: parsed.data.severity,
      action: parsed.data.action,
      extension_version: parsed.data.extension_version ?? null,
    })
    .select('id')
    .single();

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);

  if (!userId) {
    return NextResponse.json({ error: 'user_id required' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('leak_events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ events: data });
}
