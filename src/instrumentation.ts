export async function register() {
    console.log("Checking required environment variables...");
    try {
        await import('./lib/env');
        console.log("Environment variables verified successfully.");
    } catch (error) {
        console.warn("WARNING: Missing required environment variables. Ensure .env.local is configured correctly.");
        if (process.env.NODE_ENV === 'production') {
             // throw new Error("Missing environment variables in production");
             // Keeping it as a warn for now to avoid breaking vercel deployments until they actually add keys
        }
    }
}
