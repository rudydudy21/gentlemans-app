'use client'; // This tells Next.js this component is interactive

import { Trophy, Shield, Target, ListOrdered } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Total', href: '/', icon: Trophy },
    { name: 'Core 3', href: '/core', icon: Shield },
    { name: 'O&D', href: '/oad', icon: Target },
    { name: 'Live Feed', href: '/live', icon: ListOrdered },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gentle-charcoal/80 backdrop-blur-lg border-t border-white/10 pb-8 pt-3 px-6">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center gap-1 group">
             {/* The "Glow" behind the active icon */}
                {isActive && (
                <div className="absolute -top-1 h-8 w-8 bg-gentle-gold/20 blur-xl rounded-full" />
            )}
    
            <Icon 
        size={24} 
        className={`transition-all duration-300 ${isActive ? 'text-gentle-gold scale-110' : 'text-gentle-stone group-hover:text-white'}`} 
            />
    
    <span className={`text-[10px] uppercase font-bold tracking-tighter transition-colors ${isActive ? 'text-gentle-gold' : 'text-gentle-stone'}`}>
      {item.name}
    </span>
  </Link>
          );
        })}
      </div>
    </nav>
  );
}