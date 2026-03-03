import Link from 'next/link';
import { BellIcon, Settings, UserCircle } from 'lucide-react';

interface TopNavProps {
    title: string;
}

export function TopNav({ title }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="md:hidden flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-500/20 font-bold text-lime-400">
              🦀
            </div>
            <span className="font-bold text-white tracking-tight">VibeFlow</span>
          </Link>
          <h2 className="text-lg font-medium text-white hidden md:block">{title}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-zinc-400 hover:text-white transition-colors relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-lime-500"></span>
          </button>
          <div className="h-6 w-px bg-zinc-800"></div>
          <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors group">
            <UserCircle className="h-6 w-6 text-zinc-500 group-hover:text-lime-400 transition-colors" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
