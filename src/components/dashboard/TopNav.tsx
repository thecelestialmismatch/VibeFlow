import Link from 'next/link';
import { BellIcon, UserCircle, ShieldAlert } from 'lucide-react';

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="md:hidden flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            <span className="font-bold text-white tracking-tight">LeakWall</span>
          </Link>
          <h2 className="text-base font-semibold text-white hidden md:block">{title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-white transition-colors relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="h-5 w-px bg-slate-800"></div>
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
          >
            <UserCircle className="h-6 w-6 text-slate-600 group-hover:text-red-400 transition-colors" />
            <span className="hidden sm:block">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
