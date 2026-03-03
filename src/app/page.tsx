'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <header className="px-6 lg:px-8 h-20 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-indigo-600" />
          <span className="font-bold text-xl tracking-tight">VibeFlow</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium hover:text-indigo-600 transition-colors">Sign in</Link>
          <Link href="/scan" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-all">Start Free Scan</Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-sm font-medium mb-8"
          >
            <Zap className="h-4 w-4" />
            <span>VoltAgent Powered</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 text-balance"
          >
            AI Compliance Officer for Businesses. <br />
            <span className="text-indigo-600">$49/month.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl text-balance"
          >
            Stop fearing GDPR, CCPA, and SOC 2. Our multi-agent AI scans your business, identifies gaps, auto-generates compliant policies, and tells you exactly how to fix issues.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/scan" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25">
              Start Free Scan <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </section>

        {/* Problem Section */}
        <section className="bg-white dark:bg-slate-950 py-24 px-6 lg:px-8 border-y border-gray-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Compliance costs SMBs $12,000+/year</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Between lawyers, consultants, and enterprise software that starts at $15k, staying compliant is an expensive nightmare. VibeFlow uses specialized AI agents to automate the entire process for a fraction of the cost.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Constant Changes</h3>
                <p className="text-gray-600 dark:text-gray-400">New laws like the EU AI Act appear quarterly. Keeping up manually is impossible.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <ShieldCheck className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Massive Fines</h3>
                <p className="text-gray-600 dark:text-gray-400">Average GDPR fines are in the millions. Even small mistakes can trigger audits.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="font-bold text-xl mb-2">Enterprise Bias</h3>
                <p className="text-gray-600 dark:text-gray-400">Existing solutions are built and priced for Fortune 500s, not 5-person startups.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Three simple steps to airtight compliance.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (hidden on mobile) */}
            <div className="hidden md:block absolute top-[50px] left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-slate-800 -z-10"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 border-4 border-white dark:border-slate-900 shadow-xl">1</div>
              <h3 className="text-xl font-bold mb-3">AI Deep Scan</h3>
              <p className="text-gray-600 dark:text-gray-400">Our Scanner Agent analyzes your site, code, and business structure against global regulations.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 border-4 border-white dark:border-slate-900 shadow-xl">2</div>
              <h3 className="text-xl font-bold mb-3">Auto-Generate Specs</h3>
              <p className="text-gray-600 dark:text-gray-400">The Policy Generator outputs custom privacy policies, terms, and processing agreements.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 border-4 border-white dark:border-slate-900 shadow-xl">3</div>
              <h3 className="text-xl font-bold mb-3">Fix Gaps</h3>
              <p className="text-gray-600 dark:text-gray-400">The Remediation Agent provides copy-paste code snippets and configurations to solve issues.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-slate-900 text-white py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Free */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
                <h3 className="text-lg text-slate-300 font-medium mb-2">Free</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> 1 Scan / month</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> GDPR only</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> Basic privacy policy</li>
                </ul>
                <Link href="/scan" className="block text-center bg-slate-700 hover:bg-slate-600 py-3 rounded-full font-medium transition-colors">Get Started</Link>
              </div>

              {/* Startup */}
              <div className="bg-indigo-600 rounded-3xl p-8 border border-indigo-500 flex flex-col relative transform md:-translate-y-2 shadow-2xl shadow-indigo-900/50">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</div>
                <h3 className="text-lg text-indigo-200 font-medium mb-2">Startup</h3>
                <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-indigo-300 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1 text-indigo-100 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-white shrink-0" /> Unlimited Scans</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-white shrink-0" /> All policies generated</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-white shrink-0" /> GDPR, CCPA, HIPAA</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-white shrink-0" /> Detailed Gap Analysis</li>
                </ul>
                <Link href="/login" className="block text-center bg-white text-indigo-600 hover:bg-gray-50 py-3 rounded-full font-medium transition-colors">Start Free Trial</Link>
              </div>

              {/* Business */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
                <h3 className="text-lg text-slate-300 font-medium mb-2">Business</h3>
                <div className="text-4xl font-bold mb-6">$199<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> Everything in Startup</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> SOC 2 & ISO 27001</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> Auto-remediation steps</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> Weekly change alerts</li>
                </ul>
                <Link href="/login" className="block text-center bg-slate-700 hover:bg-slate-600 py-3 rounded-full font-medium transition-colors">Upgrade</Link>
              </div>

              {/* Enterprise */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
                <h3 className="text-lg text-slate-300 font-medium mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-6">$999<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1 text-slate-300 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> All Frameworks + Custom</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> EU AI Act Compliance</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> Dedicated Advisor Agent</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-indigo-400 shrink-0" /> Audit-ready reporting</li>
                </ul>
                <Link href="/login" className="block text-center bg-slate-700 hover:bg-slate-600 py-3 rounded-full font-medium transition-colors">Contact Sales</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-12 px-6 lg:px-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center bg-white dark:bg-slate-950">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <span className="font-semibold text-gray-900 dark:text-white">VibeFlow Inc.</span>
        </div>
        <p>&copy; {new Date().getFullYear()} VibeFlow. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/policies" className="hover:text-indigo-600">Privacy Policy</Link>
          <Link href="/policies" className="hover:text-indigo-600">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}
