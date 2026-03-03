'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { ShieldCheck, AlertTriangle, Download, Terminal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_GAPS = [
    {
        id: 1,
        framework: 'GDPR',
        article: 'Article 7',
        severity: 'critical',
        title: 'Pre-ticked consent boxes used',
        desc: 'The newsletter signup form currently uses a pre-ticked box for marketing consent, which violates GDPR Article 7.',
        remediation: 'Change the checkbox to be unchecked by default. Require explicit opt-in.',
        code: `<input type="checkbox" id="marketing" name="marketing" />\n<label htmlFor="marketing">I agree to receive marketing emails.</label>`
    },
    {
        id: 2,
        framework: 'CCPA',
        article: 'Section 1798.120',
        severity: 'high',
        title: 'Missing "Do Not Sell" link',
        desc: 'Cannot locate the required "Do Not Sell or Share My Personal Information" link in the website footer.',
        remediation: 'Add a clear link to the footer that points to a consent management portal or webform.',
        code: `<footer className="...">\n  <a href="/opt-out" className="...">Do Not Sell or Share My Personal Information</a>\n</footer>`
    },
    {
        id: 3,
        framework: 'SOC 2',
        article: 'CC 6.1',
        severity: 'medium',
        title: 'Inactive accounts not suspended',
        desc: 'No automated process detected to restrict access for employees who have left the organization.',
        remediation: 'Implement an automated script or IdP rule to suspend accounts inactive for > 30 days.',
        code: null
    }
];

export default function ReportsPage() {
    const [filter, setFilter] = useState('all');
    const [expandedGap, setExpandedGap] = useState<number | null>(MOCK_GAPS[0].id);

    const filteredGaps = filter === 'all' ? MOCK_GAPS : MOCK_GAPS.filter(g => g.severity === filter);

    const stats = {
        total: MOCK_GAPS.length,
        critical: MOCK_GAPS.filter(g => g.severity === 'critical').length,
        fixed: 12 // Mock
    };

    const getSeverityColor = (sev: string) => {
        switch (sev) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400';
            case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav title="Gap Analysis Report" />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Header & Stats */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <ShieldCheck className="h-6 w-6 text-indigo-600" />
                                    <h2 className="text-2xl font-bold">Action Plan</h2>
                                </div>
                                <p className="text-gray-500">March 3, 2026 Scan Results</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="text-center px-4">
                                    <div className="text-3xl font-bold text-red-500">{stats.critical}</div>
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Critical</div>
                                </div>
                                <div className="w-px bg-gray-200 dark:bg-slate-800"></div>
                                <div className="text-center px-4">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</div>
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Open Gaps</div>
                                </div>
                                <div className="w-px bg-gray-200 dark:bg-slate-800"></div>
                                <div className="text-center px-4">
                                    <div className="text-3xl font-bold text-emerald-500">{stats.fixed}</div>
                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Remediated</div>
                                </div>
                            </div>

                            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors font-medium">
                                <Download className="h-4 w-4" /> Export PDF
                            </button>
                        </div>

                        {/* Filter */}
                        <div className="flex gap-2">
                            {['all', 'critical', 'high', 'medium'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${filter === f
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Gaps Accordion List */}
                        <div className="space-y-4">
                            {filteredGaps.map(gap => (
                                <div key={gap.id} className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
                                    {/* Header (Clickable) */}
                                    <div
                                        onClick={() => setExpandedGap(expandedGap === gap.id ? null : gap.id)}
                                        className="p-6 cursor-pointer flex flex-col sm:flex-row justify-between gap-4 hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors"
                                    >
                                        <div className="flex gap-4">
                                            <div className="mt-1">
                                                <AlertTriangle className={`h-6 w-6 ${gap.severity === 'critical' ? 'text-red-500' : gap.severity === 'high' ? 'text-orange-500' : 'text-amber-500'}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{gap.title}</h3>
                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="font-medium bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">{gap.framework}</span>
                                                    <span className="text-gray-500">{gap.article}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getSeverityColor(gap.severity)}`}>
                                                {gap.severity}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expanded Remediation Body */}
                                    <AnimatePresence>
                                        {expandedGap === gap.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/30"
                                            >
                                                <div className="p-6 md:p-8 space-y-6">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Description</h4>
                                                        <p className="text-gray-600 dark:text-gray-400">{gap.desc}</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                            <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Auto-Remediation Steps
                                                        </h4>
                                                        <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm relative pl-12">
                                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-xl"></div>
                                                            <div className="absolute left-4 top-5 h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-xs">1</div>

                                                            <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">{gap.remediation}</p>

                                                            {gap.code && (
                                                                <div className="mt-4 bg-[#0a0f1c] rounded-lg overflow-hidden border border-slate-800">
                                                                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                                                                        <Terminal className="h-4 w-4 text-gray-400" />
                                                                        <span className="text-xs text-gray-400 font-mono">Suggested Code Patch</span>
                                                                    </div>
                                                                    <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                                                                        <code>{gap.code}</code>
                                                                    </pre>
                                                                </div>
                                                            )}

                                                            <div className="mt-6 flex justify-end">
                                                                <button className="bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 dark:hover:bg-emerald-500/20 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                                                                    Mark as Fixed
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
