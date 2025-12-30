import React from 'react';

type Props = {
  data: {
    owner: string;
    player: string;
    pos?: string | number;
    score?: string | number;
    today?: string | number;
    thru?: string | number;
    earnings?: string | number;
  };
};

export default function LiveScoringRow({ data }: Props) {
  const { owner, player, pos, score, today, thru, earnings } = data;
  const isFinal = earnings && earnings !== "$0" && earnings !== "" && earnings !== "-";

  return (
    <div className="flex flex-col px-4 py-3 border-b border-white/5 last:border-0 bg-transparent">
      
      {/* LAYER 1: LIVE DOT, POS & GOLFER */}
      <div className="flex items-center gap-2 mb-0.5">
        {/* The Live Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-gentle-gold animate-pulse shrink-0" />
        
        <span className="text-gentle-gold font-black text-[12px] shrink-0">
          {pos ?? '-'}
        </span>
        <span className="text-white font-black uppercase text-[15px] sm:text-lg leading-none tracking-tight">
          {player}
        </span>
      </div>

      {/* LAYER 2: OWNER & STATS */}
      <div className="flex items-center justify-between">
        {/* Owner - Indented under name (increased margin to account for dot) */}
        <span className="text-white/40 text-[13px] uppercase font-bold tracking-widest italic ml-8">
          {owner}
        </span>

        {/* Scoring Stats - Unified items-center for perfect horizontal alignment */}
        <div className="flex items-center gap-6 shrink-0">
          {/* TOTAL */}
          <div className="flex flex-col items-center w-[40px]">
            <span className="text-[7px] text-white/20 uppercase font-black mb-1 tracking-tighter">Total</span>
            <span className={`font-black italic text-[13px] sm:text-base leading-none ${score?.toString().includes('-') ? 'text-red-500' : 'text-white'}`}>
              {score ?? '-'}
            </span>
          </div>

          {/* TODAY */}
          <div className="flex flex-col items-center w-[40px]">
            <span className="text-[7px] text-white/20 uppercase font-black mb-1 tracking-tighter">Today</span>
            <span className="text-white/60 font-black italic text-[13px] sm:text-base leading-none">
              {today || '-'}
            </span>
          </div>

          {/* THRU / PAYOUT */}
          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[7px] text-white/20 uppercase font-black mb-1 tracking-tighter">
              {isFinal ? 'Payout' : 'Thru'}
            </span>
            <span className="text-gentle-gold font-black italic text-[11px] sm:text-sm leading-none">
              {isFinal ? earnings : (thru || '-')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}