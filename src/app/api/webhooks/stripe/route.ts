import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16' as any,
    });

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;

      if (userId) {
        // Upgrade user plan
        await supabaseAdmin
          .from('organizations')
          .update({
            stripe_customer_id: session.customer as string,
            subscription_status: 'active',
            subscription_plan: 'startup', // or determine from line items
          })
          .eq('user_id', userId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Stripe webhook handling failed:', error);
    return NextResponse.json({ error: 'Webhook handling failed' }, { status: 500 });
  }
}
