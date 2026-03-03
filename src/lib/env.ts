import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().optional(), // Make optional so dev can pass without it initially
});

export const env = envSchema.parse(process.env);
