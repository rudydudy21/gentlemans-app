'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getOwnerGlow } from '@/lib/utils';

interface OADCardProps {
  name: string;
  currentPick: string;
  totalOADEarnings: string;
  history?: {
    tournament: string;
    golfer: string;
    money: string;
  }[];
  isLeader?: boolean;
}

export default function OADCard({
  name,
  currentPick,
  totalOADEarnings,
  history = [],
}: OADCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const glowClasses = getOwnerGlow(name);

  // Helper to strip decimals and format as whole dollar
  const formatToWholeDollar = (val: string) => {
    if (!val || val === '-' || val === '$0') return val;
    // Remove $, commas, and anything else not a number or decimal
    const numeric = parseFloat(val.replace(/[$,]/g, ''));
    if (isNaN(numeric)) return val;
    
    // Round to whole number and format with commas
    return '$' + Math.round(numeric).toLocaleString();
  };

  return (
   <div className={`w-full rounded-2xl overflow-hidden bg-white/5 border shadow-lg transition-all duration-500 ${glowClasses}`}>
      {/* ================= HEADER ================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-[1fr_auto] gap-6 p-6 sm:p-7 text-left items-center hover:bg-white/[0.02]"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-bold text-xl uppercase tracking-tight">
              {name}
            </h3>
          </div>
          <p className="text-gentle-gold text-xs font-bold uppercase tracking-widest mt-1 italic">
            Current Pick: {currentPick || 'No Pick'}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-mono font-bold leading-none tabular-nums text-white text-xl sm:text-2xl">
              {formatToWholeDollar(totalOADEarnings)}
            </p>
            <p className="text-[10px] text-gentle-stone uppercase font-bold tracking-[0.25em] mt-2">
              OAD Total
            </p>
          </div>
          <span className="text-gentle-stone">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </div>
      </button>

      {/* ================= HISTORY ================= */}
      {isOpen && (
        <div className="bg-black/40 border-t border-white/5 px-6 sm:px-8 pb-6">
          {history.length > 0 ? (
            <div className="mt-4 space-y-1">

          {/* Rows */}
          {history.map((week, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[1fr_auto] gap-4 items-center py-1 border-b border-white/5 last:border-0"
            >
              {/* Left Side: Stacked Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-sm uppercase italic leading-tight mb-1">
                  {week.golfer}
                </span>
                <span className="text-gentle-stone text-[10px] uppercase tracking-wider truncate">
                  {week.tournament}
                </span>
              </div>

              {/* Right Side: Earnings */}
              <div className="text-right">
                <span className="text-white text-sm font-mono font-bold tracking-tight tabular-nums">
                  {formatToWholeDollar(week.money)}
                </span>
              </div>
            </div>
          ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gentle-stone text-xs uppercase tracking-[0.3em] italic">
              No picks recorded yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}