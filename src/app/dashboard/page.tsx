'use client';

import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import {
  ShieldCheck, AlertTriangle, KeyRound, Code2,
  CreditCard, Lock, Users, Eye, Activity, ArrowRight, Chrome
} from 'lucide-react';
import Link from 'next/link';

const MOCK_STATS = [
  { label: 'Leaks Blocked Today', value: '14', delta: '+3 vs yesterday', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { label: 'High Severity', value: '3', delta: 'Needs review', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { label: 'AI Tools Monitored', value: '10', delta: 'All active', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { label: 'Team Members', value: '1', delta: 'Upgrade for teams', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
];

const MOCK_EVENTS = [
  {
    id: 1,
    type: 'API Key',
    icon: KeyRound,
    detail: 'AWS access key pattern detected',
    tool: 'ChatGPT',
    severity: 'critical',
    time: '2 min ago',
    blocked: true,
  },
  {
    id: 2,
    type: 'Source Code',
    icon: Code2,
    detail: 'Function definitions + import statements',
    tool: 'Claude',
    severity: 'high',
    time: '18 min ago',
    blocked: true,
  },
  {
    id: 3,
    type: 'Credit Card',
    icon: CreditCard,
    detail: '16-digit pattern matching Luhn algorithm',
    tool: 'Gemini',
    severity: 'critical',
    time: '1 hr ago',
    blocked: true,
  },
  {
    id: 4,
    type: 'Password',
    icon: Lock,
    detail: 'Password field content pasted',
    tool: 'DeepSeek',
    severity: 'high',
    time: '3 hr ago',
    blocked: false,
  },
  {
    id: 5,
    type: 'PII / SSN',
    icon: Eye,
    detail: 'Social Security Number format detected',
    tool: 'Copilot',
    severity: 'critical',
    time: '5 hr ago',
    blocked: true,
  },
];

const TOP_LEAK_TYPES = [
  { label: 'API Keys & Tokens', count: 28, color: 'bg-red-500' },
  { label: 'Source Code', count: 22, color: 'bg-orange-500' },
  { label: 'Passwords', count: 15, color: 'bg-amber-500' },
  { label: 'PII / SSNs', count: 9, color: 'bg-purple-500' },
  { label: 'Credit Cards', count: 6, color: 'bg-blue-500' },
];

const maxCount = Math.max(...TOP_LEAK_TYPES.map((t) => t.count));

export default function DashboardPage() {
  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Overview" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {MOCK_STATS.map(({ label, value, delta, icon: Icon, color, bg }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`p-5 rounded-xl border ${bg} flex flex-col gap-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="text-3xl font-extrabold text-white">{value}</div>
                  <div className="text-xs text-slate-500">{delta}</div>
                </motion.div>
              ))}
            </div>

            {/* Middle Row: Recent Events + Leak Breakdown */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Recent Leak Events */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="col-span-2 bg-slate-900 rounded-xl border border-slate-800"
              >
                <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    Recent Leak Events
                  </h3>
                  <Link href="/dashboard/events" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="divide-y divide-slate-800/60">
                  {MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                        <event.icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-white">{event.type}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getSeverityStyle(event.severity)}`}>
                            {event.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{event.detail}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-medium text-slate-400 mb-1">{event.tool}</div>
                        <div className={`text-[10px] font-semibold ${event.blocked ? 'text-emerald-400' : 'text-red-400'}`}>
                          {event.blocked ? 'Blocked' : 'Warned'}
                        </div>
                      </div>
                      <div className="text-xs text-slate-600 shrink-0 hidden sm:block">{event.time}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Leak Type Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-slate-900 rounded-xl border border-slate-800 p-5"
              >
                <h3 className="text-sm font-semibold text-white mb-6 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-slate-400" />
                  Top Leak Categories
                  <span className="text-xs text-slate-600 font-normal ml-auto">Last 30 days</span>
                </h3>
                <div className="space-y-4">
                  {TOP_LEAK_TYPES.map(({ label, count, color }, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-300 font-medium">{label}</span>
                        <span className="text-slate-500">{count}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${color}`}
                          style={{ width: `${(count / maxCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upgrade nudge */}
                <div className="mt-8 p-4 rounded-xl bg-red-600/5 border border-red-600/15">
                  <div className="flex items-center gap-2 mb-2">
                    <Chrome className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-semibold text-white">Free Plan</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Upgrade to Team to see analytics across your whole organization.
                  </p>
                  <Link
                    href="/login"
                    className="block text-center py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
                  >
                    Upgrade to Team →
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
