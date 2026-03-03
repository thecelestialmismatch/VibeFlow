import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';

const checkoutSchema = z.object({
  priceId: z.string().min(1, "Price ID is required"),
});

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16' as any,
    });

    const body = await req.json();

    const parsedResult = checkoutSchema.safeParse(body);
    if (!parsedResult.success) {
      return NextResponse.json({ error: 'Invalid input parameters', details: parsedResult.error.format() }, { status: 400 });
    }
    const { priceId } = parsedResult.data;

    // Attempt to get user from session
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?canceled=true`,
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
