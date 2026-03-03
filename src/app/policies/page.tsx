'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { FileText, Download, RefreshCw, ChevronRight, Clock, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_POLICIES = [
    { id: 1, type: 'Privacy Policy', framework: 'GDPR / CCPA', version: 'v1.4', date: '2 hours ago', status: 'Compliant', content: "MOCK PRIVACY POLICY...\n\n**Disclaimer: Generated for informational purposes. This is not legal advice.**" },
    { id: 2, type: 'Cookie Policy', framework: 'GDPR / ePrivacy', version: 'v2.1', date: '1 day ago', status: 'Compliant', content: "MOCK COOKIE POLICY...\n\n**Disclaimer: Generated for informational purposes. This is not legal advice.**" },
    { id: 3, type: 'Data Processing Agreement', framework: 'GDPR (Art 28)', version: 'v1.0', date: '3 days ago', status: 'Compliant', content: "MOCK DPA...\n\n**Disclaimer: Generated for informational purposes. This is not legal advice.**" },
    { id: 4, type: 'Information Security Policy', framework: 'SOC 2', version: 'v1.2', date: '1 week ago', status: 'Needs Review', content: "MOCK INFOSEC POLICY...\n\n**Disclaimer: Generated for informational purposes. This is not legal advice.**" },
];

export default function PoliciesPage() {
    const [selectedPolicy, setSelectedPolicy] = useState<number | null>(MOCK_POLICIES[0].id);

    const policy = MOCK_POLICIES.find(p => p.id === selectedPolicy);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav title="Policy Documents" />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">

                        {/* Policy List */}
                        <div className="w-full lg:w-1/3 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
                            <div className="p-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex justify-between items-center">
                                <h2 className="font-semibold">Your Policies</h2>
                                <button className="text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                                    <RefreshCw className="h-3 w-3" /> Regenerate
                                </button>
                            </div>
                            <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                {MOCK_POLICIES.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedPolicy(p.id)}
                                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-colors ${selectedPolicy === p.id
                                                ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50'
                                                : 'hover:bg-gray-50 dark:hover:bg-slate-900 border border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <FileText className={`h-5 w-5 mt-0.5 ${selectedPolicy === p.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`} />
                                            <div>
                                                <div className={`font-medium ${selectedPolicy === p.id ? 'text-indigo-900 dark:text-indigo-300' : ''}`}>{p.type}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{p.framework}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`h-4 w-4 ${selectedPolicy === p.id ? 'text-indigo-400' : 'text-gray-300 group-hover:text-gray-400'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Document Viewer */}
                        <div className="w-full lg:w-2/3 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                            <AnimatePresence mode="wait">
                                {policy ? (
                                    <motion.div
                                        key={policy.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex flex-col h-full"
                                    >
                                        {/* Viewer Header */}
                                        <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between items-start">
                                            <div>
                                                <h2 className="text-2xl font-bold mb-2">{policy.type}</h2>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                                        <Clock className="h-3 w-3" /> {policy.version} ({policy.date})
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FileCheck className="h-3 w-3 text-emerald-500" /> {policy.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-slate-900 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                    <Download className="h-4 w-4" /> PDF
                                                </button>
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-slate-900 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                    <Download className="h-4 w-4" /> HTML
                                                </button>
                                            </div>
                                        </div>

                                        {/* Viewer Content */}
                                        <div className="flex-1 p-8 overflow-y-auto font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-300 bg-gray-50 dark:bg-[#0a0f1c]">
                                            {policy.content.split('\n').map((line, i) => (
                                                <p key={i} className="mb-4">
                                                    {line.includes('Disclaimer') ? (
                                                        <span className="text-red-500 dark:text-red-400 font-bold">{line}</span>
                                                    ) : (
                                                        line
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        Select a policy to view
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
