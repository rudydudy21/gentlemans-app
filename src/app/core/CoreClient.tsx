'use client';
import { useState } from 'react';
import RosterCard from '@/components/RosterCard';
import { getOwnerVerticalGlow } from '@/lib/utils'; //

export default function CoreClient({ memberRosters, individualPlayerData, maxEarnings }: any) {
  const [viewMode, setViewMode] = useState<'grouped' | 'individual'>('grouped');

  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex gap-1">
          <button 
            onClick={() => setViewMode('grouped')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'grouped' ? 'bg-gentle-gold text-black shadow-lg' : 'text-gentle-stone hover:text-white'
            }`}
          >
            Grouped by Owner
          </button>
          <button 
            onClick={() => setViewMode('individual')}
            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'individual' ? 'bg-gentle-gold text-black shadow-lg' : 'text-gentle-stone hover:text-white'
            }`}
          >
            Individual Players
          </button>
        </div>
      </div>

      {viewMode === 'grouped' ? (
        <div className="space-y-6 max-w-5xl mx-auto">
          {memberRosters.map((roster: any) => (
            <RosterCard 
              key={roster.name} 
              {...roster} 
              isLeader={roster.numericTotal === maxEarnings && maxEarnings > 0} 
            />
          ))}
        </div>
      ) : (
/* INDIVIDUAL VIEW: Live Leaderboard Style - Tightened Stats */
<div className="max-w-4xl mx-auto space-y-[2px] px-1 sm:px-0">
  {/* Header Row - Rebalanced Spans */}
  <div className="grid grid-cols-12 bg-white/5 border border-white/10 py-2 px-3 rounded-t-lg items-center mb-1">
    <div className="col-span-1 text-[8px] sm:text-[9px] uppercase font-black text-gentle-stone tracking-tighter italic pl-1">Pos</div>
    <div className="col-span-6 text-[8px] sm:text-[9px] uppercase font-black text-gentle-stone tracking-tighter italic">Player / Owner</div>
    <div className="col-span-1 text-center text-[8px] sm:text-[9px] uppercase font-black text-gentle-stone tracking-tighter italic border-l border-white/10">St</div>
    <div className="col-span-1 text-center text-[8px] sm:text-[9px] uppercase font-black text-gentle-stone tracking-tighter italic border-l border-white/10">C%</div>
    <div className="col-span-3 text-right text-[8px] sm:text-[9px] uppercase font-black text-gentle-stone tracking-tighter italic border-l border-white/10 pr-1">Earnings</div>
  </div>

  {/* Player Rows */}
  {individualPlayerData.map((player: any, idx: number) => {
    const { bar, spread } = getOwnerVerticalGlow(player.owner);

    return (
      <div 
        key={idx} 
        className="grid grid-cols-12 bg-white/[0.03] border border-white/5 py-2 px-3 items-center hover:bg-white/[0.07] transition-all relative overflow-hidden group rounded-sm"
      >
        <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r ${spread} to-transparent opacity-20 pointer-events-none`} />
        <div className={`absolute left-0 top-1 bottom-1 w-[2px] rounded-r-full z-10 ${bar}`} />

        {/* Pos - 1 Column */}
        <div className="col-span-1 font-mono text-[10px] text-gentle-stone pl-1">
          {idx + 1}
        </div>

        {/* Identity - 6 Columns (Maximum Space) */}
        <div className="col-span-6 flex flex-col min-w-0 pr-2">
          <span className="text-white font-bold text-[12px] sm:text-[14px] tracking-tight truncate uppercase italic group-hover:text-gentle-gold transition-colors">
            {player.name}
          </span>
          <span className="text-white/40 text-[8px] uppercase font-black tracking-tighter italic truncate">
            {player.owner}
          </span>
        </div>

        {/* Starts - 1 Column */}
        <div className="col-span-1 text-center border-l border-white/10 font-mono text-[10px] text-white/80">
          {player.starts}
        </div>

        {/* Cuts - 1 Column */}
        <div className="col-span-1 text-center border-l border-white/10 font-mono text-[10px] text-white/80">
          {player.cutPct.replace('%', '')} 
          <span className="text-[7px] opacity-40">%</span>
        </div>

        {/* Earnings - 3 Columns */}
        <div className="col-span-3 text-right border-l border-white/10 font-mono text-[11px] sm:text-sm font-bold text-gentle-gold pr-1">
          ${player.earnings.toLocaleString()}
        </div>
      </div>
    );
  })}
</div>
      )}
    </>
  );
}