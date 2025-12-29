'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface OADCardProps {
  name: string;
  currentPick: string;
  totalOADEarnings: string;
  history?: {
    tournament: string;
    golfer: string;
    money: string;
  }[];
  isLeader?: boolean; // Kept in props for logic, but removed from styling
}

export default function OADCard({
  name,
  currentPick,
  totalOADEarnings,
  history = [],
}: OADCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-2xl overflow-hidden transition-all duration-300 bg-white/5 border border-white/5">
      {/* ================= HEADER ================= */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-[1fr_auto] gap-6 p-6 sm:p-7 text-left items-center hover:bg-white/[0.02]"
      >
        {/* Left */}
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

        {/* Right */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-mono font-bold leading-none tabular-nums text-white text-xl sm:text-2xl">
              {totalOADEarnings}
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
              {/* Labels */}
              <div className="grid grid-cols-[2fr_3fr_auto] gap-6 text-gentle-stone text-[10px] uppercase font-black tracking-[0.2em] pb-2 border-b border-white/10">
                <span>Tournament</span>
                <span>Golfer</span>
                <span className="text-right">Earnings</span>
              </div>

              {/* Rows */}
              {history.map((week, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[2fr_3fr_auto] gap-6 items-center py-3 border-b border-white/5 last:border-0"
                >
                  <span className="text-gentle-stone text-[11px] italic truncate uppercase">
                    {week.tournament}
                  </span>

                  <span className="text-white font-bold text-sm truncate uppercase italic">
                    {week.golfer}
                  </span>

                  <span className="text-right text-white text-sm font-mono font-bold tracking-tight tabular-nums">
                    {week.money}
                  </span>
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