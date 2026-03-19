'use client';

import { motion } from 'framer-motion';
import {
  ShieldAlert, ShieldCheck, Zap, KeyRound, Code2, CreditCard, Lock,
  Chrome, ArrowRight, CheckCircle2, AlertTriangle, Eye, EyeOff, Users
} from 'lucide-react';
import Link from 'next/link';

const AI_TOOLS = [
  'ChatGPT', 'Claude', 'Gemini', 'Copilot', 'DeepSeek',
  'Perplexity', 'Poe', 'Mistral', 'Jasper', 'Copy.ai',
];

const LEAK_TYPES = [
  { icon: KeyRound, label: 'API Keys & Tokens', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { icon: Code2, label: 'Source Code', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { icon: CreditCard, label: 'Credit Card Numbers', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { icon: Lock, label: 'Passwords & Secrets', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  { icon: Users, label: 'SSNs & PII', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { icon: Eye, label: 'Medical Records', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
];

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For individuals who want basic protection',
    features: [
      'Chrome extension',
      'Paste warnings',
      '5 AI tools monitored',
      'Basic leak history',
    ],
    cta: 'Install Free',
    href: '/install',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$5',
    period: '/month',
    description: 'For power users and freelancers',
    features: [
      'Everything in Free',
      '600+ AI tools monitored',
      'Custom detection rules',
      'Export reports',
      'Priority support',
    ],
    cta: 'Start Pro',
    href: '/login',
    highlight: false,
  },
  {
    name: 'Team',
    price: '$9',
    period: '/user/month',
    description: 'For small businesses (5–50 people)',
    features: [
      'Everything in Pro',
      'Admin dashboard',
      'Team analytics',
      'Policy controls',
      'Email alerts',
    ],
    cta: 'Start Team Trial',
    href: '/login',
    highlight: true,
  },
  {
    name: 'Business',
    price: '$19',
    period: '/user/month',
    description: 'For mid-market companies (50–500)',
    features: [
      'Everything in Team',
      'SSO / SAML',
      'Advanced policy engine',
      'Compliance reports',
      'API access',
    ],
    cta: 'Contact Sales',
    href: '/login',
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">

      {/* Navigation */}
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-7 w-7 text-red-500" />
          <span className="font-bold text-lg tracking-tight text-white">LeakWall</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
        </nav>
        <div className="flex gap-3 items-center">
          <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">Sign in</Link>
          <Link
            href="/install"
            className="text-sm font-semibold bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-red-900/30"
          >
            <Chrome className="h-4 w-4" /> Add to Chrome — Free
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="px-6 lg:px-8 pt-20 pb-24 flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
            77% of employees paste company data into AI tools
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-balance leading-tight"
          >
            Stop leaking secrets<br />
            <span className="text-red-500">into AI tools.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl text-balance"
          >
            LeakWall intercepts passwords, API keys, source code, SSNs, and credit cards
            before they reach ChatGPT, Claude, Gemini, Copilot, and 600+ other AI tools.
            All processing is local. Zero data leaves your device.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link
              href="/install"
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-red-900/40"
            >
              <Chrome className="h-5 w-5" /> Add to Chrome — It&apos;s Free
            </Link>
            <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
              See the dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-5 text-xs text-slate-600"
          >
            No account required to install. Open source. Zero telemetry.
          </motion.p>
        </section>

        {/* Stats bar */}
        <section className="border-y border-slate-800 bg-slate-900/50 py-10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '77%', label: 'of employees paste company data into AI' },
              { stat: '$4.88M', label: 'average cost of a data breach (IBM 2024)' },
              { stat: '600+', label: 'AI tools monitored by LeakWall' },
              { stat: '0 bytes', label: 'of your data sent to our servers' },
            ].map(({ stat, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="text-3xl font-extrabold text-white mb-1">{stat}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What gets leaked */}
        <section className="py-24 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What are your employees leaking?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Samsung banned ChatGPT after employees pasted source code into it.
              Your secrets are one paste event away from being used to train AI models.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {LEAK_TYPES.map(({ icon: Icon, label, color, bg }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                className={`flex items-center gap-3 p-4 rounded-xl border ${bg}`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${color}`} />
                <span className="text-sm font-medium text-slate-200">{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-slate-900/40 border-y border-slate-800">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Protection in 30 seconds
              </h2>
              <p className="text-slate-400 text-lg">No IT team required. No config files. No proxies.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 relative">
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-slate-800 via-red-800/50 to-slate-800"></div>
              {[
                {
                  step: '1',
                  title: 'Install the extension',
                  desc: 'One click from the Chrome Web Store. No account needed to start protecting yourself.',
                },
                {
                  step: '2',
                  title: 'Work normally with AI',
                  desc: 'LeakWall silently monitors every paste and upload to AI tools running in your browser.',
                },
                {
                  step: '3',
                  title: 'Get warned before it\'s too late',
                  desc: 'When sensitive data is detected, LeakWall flags it before you hit send. You decide what to share.',
                },
              ].map(({ step, title, desc }, i) => (
                <div key={i} className="flex flex-col items-center text-center relative">
                  <div className="w-20 h-20 rounded-full bg-red-600/10 border-2 border-red-600/30 flex items-center justify-center text-2xl font-bold text-red-500 mb-6 relative z-10">
                    {step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported AI Tools */}
        <section className="py-16 px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-slate-400">
              Monitors every AI tool your team uses
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {AI_TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300"
              >
                {tool}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-500">
              + 590 more
            </span>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="py-24 px-6 lg:px-8 bg-slate-900/40 border-y border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <EyeOff className="h-3.5 w-3.5" /> Privacy-First Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  We never see your data.<br />
                  <span className="text-emerald-400">Ever.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Every pattern match runs locally in your browser using regex and heuristics.
                  No text, prompts, or content is transmitted to LeakWall servers.
                  The extension is fully open source — audit every line of code yourself.
                </p>
                <ul className="space-y-3">
                  {[
                    'All detection is 100% local (no cloud processing)',
                    'Open source — MIT licensed, auditable on GitHub',
                    'Minimal permissions: only reads AI tool pages you visit',
                    'No user content ever stored or transmitted',
                    'Anonymous usage metrics only (opt-out available)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex flex-col items-center justify-center p-8 gap-6">
                  <ShieldCheck className="h-20 w-20 text-emerald-500 opacity-80" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-1">Zero-Knowledge</div>
                    <div className="text-sm text-slate-400">Your data never leaves your browser</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Start free. Scale when you need to.
              </h2>
              <p className="text-slate-400 text-lg">
                The Grammarly model for data security — individual adoption, team upgrade.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {PRICING.map(({ name, price, period, description, features, cta, href, highlight }) => (
                <div
                  key={name}
                  className={`rounded-2xl p-7 flex flex-col border relative ${
                    highlight
                      ? 'bg-red-950/30 border-red-600/50 shadow-xl shadow-red-900/20'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${highlight ? 'text-red-400' : 'text-slate-400'}`}>
                      {name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-extrabold text-white">{price}</span>
                      <span className="text-slate-500 text-sm">{period}</span>
                    </div>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${highlight ? 'text-red-400' : 'text-slate-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={href}
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                      highlight
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Your next paste could be a $4.88M mistake.
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Install LeakWall in 30 seconds. Free forever for individuals.
            </p>
            <Link
              href="/install"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-red-900/40"
            >
              <Chrome className="h-5 w-5" /> Add to Chrome — Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-xs text-slate-600">
              No account required · Open source · Zero telemetry
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 lg:px-8 bg-slate-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <span className="font-bold text-white">LeakWall</span>
            <span className="text-slate-600 text-sm ml-2">Stop AI data leaks before they happen.</span>
          </div>
          <p className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} LeakWall. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
