'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

interface RosterCardProps {
  name: string;
  totalEarnings: string;
  golfers: { name: string; earnings: string }[];
  isLeader?: boolean;
}

export default function RosterCard({ name, totalEarnings, golfers }: RosterCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-2xl overflow-hidden transition-all duration-300 
      bg-white/5 border border-white/5
      hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01] hover:shadow-xl">
      
      {/* HEADER */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid grid-cols-[1fr_auto] gap-6 p-6 sm:p-7 text-left items-center"
      >
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-white font-bold text-xl uppercase tracking-tight italic">{name}</h3>
          </div>
          <p className="text-gentle-gold text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1 italic opacity-80">
            <Users size={12} /> Roster Locked
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
        <div className="bg-black/40 border-t border-white/5 px-6 sm:px-8 pb-6">
          <div className="mt-4 space-y-1">
            {/* Header Labels */}
            <div className="grid grid-cols-[3fr_auto] gap-6 text-gentle-stone text-[10px] uppercase font-black tracking-[0.2em] pb-2 border-b border-white/10">
              <span className="italic">Golfer</span>
              <span className="text-right italic">Season Earnings</span>
            </div>

            {/* Individual Golfer Rows */}
            {golfers.map((golfer, idx) => (
              <div key={idx} className="grid grid-cols-[3fr_auto] gap-6 items-center py-4 border-b border-white/5 last:border-0">
                <span className="text-white font-bold text-sm uppercase tracking-wide italic">
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