'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { motion } from 'framer-motion';
import { Globe, FileText, Building2, MapPin, Zap, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        setIsScanning(true);
        // Simulate scan delay
        setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
        }, 3000);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav title="New Compliance Scan" />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">

                        {!isScanning && !scanComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-6 sm:p-8"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Configure Your Scan</h2>
                                    <p className="text-gray-500">Provide details about your business to help our AI agents identify the regulatory frameworks that apply to you.</p>
                                </div>

                                <form onSubmit={handleScan} className="space-y-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            <Globe className="h-4 w-4 text-indigo-500" /> Website URL (Optional, but recommended)
                                        </label>
                                        <input
                                            type="url"
                                            placeholder="https://yourcompany.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            <FileText className="h-4 w-4 text-indigo-500" /> Business Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            required
                                            placeholder="e.g., We are a B2B SaaS company providing AI marketing tools to e-commerce stores."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                <Building2 className="h-4 w-4 text-indigo-500" /> Business Type
                                            </label>
                                            <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                                                <option value="">Select industry...</option>
                                                <option value="saas">B2B SaaS</option>
                                                <option value="ecommerce">E-Commerce</option>
                                                <option value="healthcare">Healthtech / Healthcare</option>
                                                <option value="fintech">Fintech</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                <MapPin className="h-4 w-4 text-indigo-500" /> Target Geography
                                            </label>
                                            <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                                                <option value="">Select typical customer location...</option>
                                                <option value="eu">European Union (EU/EEA)</option>
                                                <option value="us-ca">US - California</option>
                                                <option value="us-all">US - Nationwide</option>
                                                <option value="global">Global</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25">
                                            <Zap className="h-5 w-5" /> Run AI Compliance Scan
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {isScanning && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white dark:bg-slate-950 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 shadow-xl shadow-indigo-100 dark:shadow-none p-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-900/10 animate-pulse"></div>
                                <Loader2 className="h-16 w-16 text-indigo-500 animate-spin mb-6 relative z-10" />
                                <h3 className="text-2xl font-bold mb-2 relative z-10">Scanner Agent Active</h3>
                                <p className="text-gray-500 max-w-md relative z-10">Analyzing web properties, cross-referencing Qdrant vector database, and determining regulatory scope...</p>

                                <div className="mt-8 space-y-3 w-full max-w-sm relative z-10 text-left">
                                    <div className="flex items-center gap-3 text-sm text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle /> <span className="font-medium">Web scrape completed</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle /> <span className="font-medium">Data structures identified</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Cross-referencing GDPR requirements...
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {scanComplete && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="bg-emerald-50 darK:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-2xl flex items-start gap-4">
                                    <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full text-emerald-600 dark:text-emerald-400 shrink-0">
                                        <Zap className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-1">Scan Complete</h3>
                                        <p className="text-emerald-600 dark:text-emerald-400">We analyzed your business against 5 major global frameworks. Here are your requirements.</p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
                                        <h3 className="font-bold text-lg">Applicable Frameworks</h3>
                                    </div>
                                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                                        {/* Framework 1 */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">GDPR</h4>
                                                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">HIGH RISK</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">General Data Protection Regulation (EU)</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">78/100</div>
                                                    <div className="text-xs text-gray-500">Compliance Score</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Triggers: Identifies EU visitors, collects email addresses for newsletters, uses analytics cookies.</p>
                                            <Link href="/reports" className="text-sm font-medium text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                                                View 4 identified gaps <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>

                                        {/* Framework 2 */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">CCPA</h4>
                                                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700">MED RISK</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">California Consumer Privacy Act</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">65/100</div>
                                                    <div className="text-xs text-gray-500">Compliance Score</div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Triggers: Targeting US traffic, sharing analytics data with advertising partners.</p>
                                            <Link href="/reports" className="text-sm font-medium text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                                                View 2 identified gaps <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button onClick={() => { setIsScanning(false); setScanComplete(false); }} className="px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-700 font-medium hover:bg-gray-50 transition-colors">
                                        Run New Scan
                                    </button>
                                    <Link href="/policies" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-2 transition-shadow shadow-lg hover:shadow-indigo-500/25">
                                        Generate Missing Policies <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>

                            </motion.div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}

// Simple helper icon
function CheckCircle() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
