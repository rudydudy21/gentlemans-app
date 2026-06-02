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
    place?: string;
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
            <h3 className="font-mono font-bold leading-none tabular-nums uppercase text-white text-xl sm:text-2xl">
              {name}
            </h3>
          </div>
            <p className="text-[10px] text-gentle-stone uppercase font-bold tracking-widest">
              Current Pick:
              <span className="block text-white text-sm mt-1 uppercase normal-case">
                {currentPick || 'No Pick'}
              </span>
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
        <div className="bg-black/40 border-t border-white/5 px-6 sm:px-8 py-4">
          {history.length > 0 ? (
            <div className="space-y-2">
              {/* Header Row */}
              <div className="grid grid-cols-[2fr_0.8fr_1.2fr] gap-4 px-2 pb-2 border-b border-white/10">
                <div className="text-[9px] text-gentle-stone uppercase font-bold tracking-widest">Player / Tournament</div>
                <div className="text-center text-[9px] text-gentle-stone uppercase font-bold tracking-widest">Place</div>
                <div className="text-right text-[9px] text-gentle-stone uppercase font-bold tracking-widest">Earnings</div>
              </div>

              {/* Rows */}
              {history.map((week, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[2fr_0.8fr_1.2fr] gap-4 items-center py-2 px-2 border-b border-white/5 last:border-0 hover:bg-white/[0.05] rounded transition-colors"
                >
                  {/* Left Side: Stacked Info */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-gentle-gold font-bold text-sm uppercase italic leading-tight">
                      {week.golfer}
                    </span>
                    <span className="text-white/50 text-[9px] uppercase tracking-wider truncate mt-0.5">
                      {week.tournament}
                    </span>
                  </div>

                  {/* Middle: Place */}
                  <div className="text-center">
                    <span className="text-white font-mono font-bold text-sm">
                      {week.place && week.place !== "-" ? `${week.place}` : "-"}
                    </span>
                  </div>

                  {/* Right Side: Earnings */}
                  <div className="text-right">
                    <span className="text-gentle-gold text-sm font-mono font-bold tabular-nums">
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