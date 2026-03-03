import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShieldCheck, FileText, Activity, Settings, Zap } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/scan', label: 'Run Scan', icon: Activity },
        { href: '/policies', label: 'Policies', icon: FileText },
        { href: '/reports', label: 'Gap Reports', icon: ShieldCheck },
        { href: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 h-full">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-800">
                <Link href="/" className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-indigo-600" />
                    <span className="font-bold text-lg tracking-tight">VibeFlow</span>
                    <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ml-2">Pro</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
                {links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-slate-900'
                                }`}
                        >
                            <link.icon className={`h-5 w-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-gray-500'}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-gray-200 dark:border-slate-800">
                <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-indigo-600" />
                        <span className="text-sm font-bold">VoltAgent Active</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Monitoring 5 frameworks continuously.</p>
                </div>
            </div>
        </aside>
    );
}
