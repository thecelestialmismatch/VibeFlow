'use client';

import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Activity, AlertTriangle, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock Data for MVP visualization
const MOCK_DATA = {
    overallScore: 68,
    frameworkScores: [
        { name: 'GDPR', score: 78, bg: 'bg-emerald-500' },
        { name: 'CCPA', score: 65, bg: 'bg-amber-500' },
        { name: 'SOC 2', score: 45, bg: 'bg-red-500' },
    ],
    gaps: [
        { id: 1, title: 'Missing Data Processing Agreement', framework: 'GDPR', severity: 'critical' },
        { id: 2, title: 'No "Do Not Sell" link on homepage', framework: 'CCPA', severity: 'high' },
        { id: 3, title: 'MFA not enforced for admins', framework: 'SOC 2', severity: 'critical' },
        { id: 4, title: 'Outdated Cookie Policy', framework: 'GDPR', severity: 'medium' },
    ]
};

export default function DashboardPage() {
    const getSeverityColor = (sev: string) => {
        switch (sev) {
            case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200';
            case 'medium': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200';
            default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav title="Dashboard" />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Top Row: Score & Quick Actions */}
                        <div className="grid lg:grid-cols-3 gap-6">

                            {/* Overall Score */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="col-span-1 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center"
                            >
                                <h3 className="text-lg font-medium mb-6 w-full text-left">Overall Compliance Score</h3>
                                <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                                    <svg viewBox="0 0 36 36" className="w-full h-full text-indigo-500">
                                        <path
                                            className="text-gray-100 dark:text-slate-800"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none" stroke="currentColor" strokeWidth="3"
                                        />
                                        <path
                                            className="stroke-current"
                                            strokeDasharray={`${MOCK_DATA.overallScore}, 100`}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none" strokeWidth="3" strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                                        <span className="text-5xl font-bold">{MOCK_DATA.overallScore}</span>
                                        <span className="text-xs text-gray-500">out of 100</span>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                                    Action Required
                                </div>
                            </motion.div>

                            {/* Framework Breakdown & Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="col-span-2 flex flex-col gap-6"
                            >
                                {/* Frameworks */}
                                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex-1">
                                    <h3 className="text-lg font-medium mb-4">Score Breakdown</h3>
                                    <div className="space-y-4">
                                        {MOCK_DATA.frameworkScores.map((f, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium">{f.name}</span>
                                                    <span>{f.score}/100</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2">
                                                    <div className={`h-2 rounded-full ${f.bg}`} style={{ width: `${f.score}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-3 gap-4">
                                    <Link href="/scan" className="flex flex-col items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 transition-colors rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300">
                                        <Activity className="h-6 w-6 mb-2" />
                                        <span className="text-sm font-medium">New Scan</span>
                                    </Link>
                                    <Link href="/policies" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 hover:bg-gray-50 transition-colors rounded-xl border border-gray-200 dark:border-slate-800">
                                        <FileText className="h-6 w-6 mb-2 text-gray-500" />
                                        <span className="text-sm font-medium">Auto Policy</span>
                                    </Link>
                                    <Link href="/reports" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 hover:bg-gray-50 transition-colors rounded-xl border border-gray-200 dark:border-slate-800">
                                        <ShieldCheck className="h-6 w-6 mb-2 text-gray-500" />
                                        <span className="text-sm font-medium">View Report</span>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom Row: Recent Gaps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm"
                        >
                            <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="text-lg font-medium flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-gray-500" /> Critical & High Gaps
                                </h3>
                                <Link href="/reports" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                                    View all <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-slate-800/50">
                                {MOCK_DATA.gaps.map((gap) => (
                                    <div key={gap.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{gap.title}</h4>
                                            <p className="text-sm text-gray-500 mt-1">Impacts {gap.framework} compliance</p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${getSeverityColor(gap.severity)}`}>
                                                {gap.severity}
                                            </span>
                                            <button className="text-sm border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                                                Fix
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </main>
            </div>
        </div>
    );
}
