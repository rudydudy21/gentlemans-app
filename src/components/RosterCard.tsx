'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react'; // Changed icon
import { getOwnerGlow } from '@/lib/utils';

interface RosterCardProps {
  name: string;
  totalEarnings: string;
  golfers: { name: string; earnings: string }[];
  changeCount: number; // NEW PROP
  isLeader?: boolean;
}

export default function RosterCard({ name, totalEarnings, golfers, changeCount }: RosterCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const glowClasses = getOwnerGlow(name);

  return (
    <div className={`w-full rounded-2xl overflow-hidden bg-white/5 border shadow-lg transition-all duration-500 ${glowClasses}`}>
      
      {/* HEADER */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-[1fr_auto] gap-6 p-6 sm:p-7 text-left items-center hover:bg-white/[0.02]"
      >
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-mono font-bold leading-none tabular-nums uppercase text-white text-xl sm:text-2xl">{name}</h3>
          </div>
          {/* UPDATED: Displays the count of changes */}
          <p className="text-gentle-gold text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-2 italic opacity-80">
            <RefreshCcw size={10} className={changeCount > 0 ? "text-gentle-gold" : "text-gentle-stone"} /> 
            {changeCount === 0 ? 'Roster Changes: 0' : `${changeCount} Roster ${changeCount === 1 ? 'Change' : 'Changes'}`}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-mono font-bold leading-none tabular-nums text-white text-xl sm:text-2xl">
              {totalEarnings}
            </p>
            <p className="text-[10px] text-gentle-stone uppercase font-bold tracking-[0.25em] mt-2">
              Combined Total
            </p>
          </div>
          <span className="text-gentle-stone">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </div>
      </button>

      {/* ROSTER LIST */}
      {isOpen && (
        <div className="bg-black/20 border-t border-white/5 px-6 pb-3">
          <div className="mt-2 space-y-0.5">
            {/* Clean, headerless rows to match OAD style */}
            {golfers.map((golfer, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_auto] gap-4 items-center py-2 border-b border-white/5 last:border-0"
              >
                {/* Left Side: Name only (Since the "Tournament" isn't needed here) */}
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-bold text-sm uppercase italic leading-tight">
                    {golfer.name}
                  </span>
                </div>

                {/* Right Side: Individual Earnings */}
                <div className="text-right">
                  <span className="text-white text-sm font-mono font-bold tracking-tight tabular-nums">
                    {golfer.earnings}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}