'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy, Users } from 'lucide-react';

interface RosterCardProps {
  name: string;
  totalEarnings: string;
  golfers: { name: string; earnings: string }[];
  isLeader?: boolean;
}

export default function RosterCard({ name, totalEarnings, golfers, isLeader }: RosterCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full rounded-2xl overflow-hidden transition-all duration-300 
      /* Added hover states below */
      hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01] hover:shadow-xl
      ${
      isLeader 
        ? "bg-gentle-gold/10 border border-gentle-gold/40 shadow-[0_0_20px_rgba(184,155,114,0.15)]" 
        : "bg-white/5 border border-white/5"
    }`}>
      {/* HEADER */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-[1fr_auto] gap-6 p-6 sm:p-7 text-left items-center"
      >
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-bold text-xl uppercase tracking-tight">{name}</h3>
            {isLeader && (
              <span className="flex items-center gap-1 bg-gentle-gold text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                <Trophy size={10} /> Leader
              </span>
            )}
          </div>
          <p className="text-gentle-gold text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
            <Users size={12} /> Roster Locked
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className={`font-mono font-bold leading-none tabular-nums ${isLeader ? "text-gentle-gold text-2xl" : "text-white text-xl"}`}>
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
        <div className="bg-black/40 border-t border-white/5 px-6 sm:px-8 pb-6">
          <div className="mt-4 space-y-1">
            {/* Header Labels */}
            <div className="grid grid-cols-[3fr_auto] gap-6 text-gentle-stone text-[10px] uppercase tracking-[0.25em] pb-2 border-b border-white/10">
              <span>Golfer</span>
              <span className="text-right">Season Earnings</span>
            </div>

            {/* Individual Golfer Rows */}
            {golfers.map((golfer, idx) => (
              <div key={idx} className="grid grid-cols-[3fr_auto] gap-6 items-center py-4 border-b border-white/5 last:border-0">
                <span className="text-white font-semibold text-sm uppercase tracking-wide">
                  {golfer.name}
                </span>
                <span className="text-right text-white font-mono font-bold text-base tabular-nums tracking-tight">
                  {golfer.earnings}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}