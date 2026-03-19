import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/extension/ping
 * Called by the extension on install to register the user and retrieve their settings.
 * No sensitive data is transmitted — only the anonymous extension install ID.
 */

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { install_id, extension_version } = body as Record<string, string>;

  if (!install_id) {
    return NextResponse.json({ error: 'install_id required' }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    install_id,
    extension_version: extension_version ?? 'unknown',
    settings: {
      enabled: true,
      sensitivity: 'medium',
      monitored_tools: [
        'ChatGPT', 'Claude', 'Gemini', 'Copilot', 'DeepSeek',
        'Perplexity', 'Poe', 'Mistral', 'Jasper', 'Copy.ai',
      ],
    },
    message: 'LeakWall active. All detection is local.',
  });
}
