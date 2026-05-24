'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShieldAlert, Activity, Users, Settings,
  AlertTriangle, Chrome, Zap
} from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/events', label: 'Leak Events', icon: AlertTriangle },
  { href: '/dashboard/activity', label: 'Activity', icon: Activity },
  { href: '/dashboard/team', label: 'Team', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-60 flex-col bg-slate-950 border-r border-slate-800 h-full">
      <div className="h-16 flex items-center px-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <span className="font-bold text-lg tracking-tight text-white">LeakWall</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-3 px-2">Menu</div>
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-600/10 text-red-400 border border-red-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <link.icon className={`h-4 w-4 ${isActive ? 'text-red-400' : 'text-slate-500'}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Chrome className="h-4 w-4 text-red-500" />
            <span className="text-sm font-semibold text-white">Extension Active</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">Monitoring 10 AI tools in real-time.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-emerald-400 font-medium">Protected</span>
          </div>
        </div>
        <Link
          href="/install"
          className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 text-red-400 text-xs font-semibold transition-colors"
        >
          <Zap className="h-3.5 w-3.5" /> Upgrade to Pro
        </Link>
      </div>
    </aside>
  );
}
