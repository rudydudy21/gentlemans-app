import React from 'react';
import {getOwnerColor, getOwnerVerticalGlow} from '@/lib/utils';

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
  
  // Logic to determine if we show Payout or Thru
  const isFinal = earnings && earnings !== "$0" && earnings !== "" && earnings !== "-";
  
  // Get the dynamic color for the pulse
  const pulseColor = getOwnerColor(owner);
  const {bar, spread} = getOwnerVerticalGlow(data.owner);

  return (
  <div className="flex flex-col px-4 py-3 border-b border-white/5 last:border-0 bg-transparent relative overflow-hidden">
    
    {/* NEW: The Right-Side Spread Glow */}
    <div className={`absolute left-0 top-2 bottom-3 w-32 bg-gradient-to-r ${spread} to-transparent opacity-40 pointer-events-none`} />

    {/* The Glowing Vertical Edge */}
    <div className={`absolute left-0 top-2 bottom-3 w-[3px] rounded-r-full z-10 ${bar}`} />

    {/* ... Rest of your Row Content ... */}
    <div className="flex items-center gap-2 mb-0.5 ml-2"> 
       {/* Added ml-2 to give the glowing bar some breathing room */}
       <span className="text-gentle-gold font-black text-[12px] shrink-0">{pos ?? '-'}</span>
       <span className="text-white font-mono font-bold uppercase text-[15px] leading-none">{player}</span>
    </div>

      {/* LAYER 2: OWNER & STATS */}
      <div className="flex items-center justify-between">
        {/* Owner - Indented under name */}
        <span className="text-white/40 text-[12px] uppercase font-bold tracking-widest italic ml-8">
          {owner}
        </span>

        {/* Scoring Stats */}
        <div className="flex items-center gap-6 shrink-0">
          {/* TOTAL */}
          <div className="flex flex-col items-center w-[40px]">
            <span className="text-[8px] text-white/20 uppercase font-black mb-1 tracking-tighter">Total</span>
            <span className={`font-black italic text-[12px] sm:text-base leading-none ${score?.toString().includes('-') ? 'text-red-500' : 'text-white'}`}>
              {score ?? '-'}
            </span>
          </div>

          {/* TODAY */}
          <div className="flex flex-col items-center w-[40px]">
            <span className="text-[8px] text-white/20 uppercase font-black mb-1 tracking-tighter">Today</span>
            <span className="text-white/60 font-black italic text-[12px] sm:text-base leading-none">
              {today || '-'}
            </span>
          </div>

          {/* THRU / PAYOUT */}
          <div className="flex flex-col items-center min-w-[70px]">
            <span className="text-[8px] text-white/20 uppercase font-black mb-1 tracking-tighter">
              {isFinal ? 'Payout' : 'Thru'}
            </span>
            <span className="text-gentle-gold font-black italic text-[12px] sm:text-sm leading-none">
              {isFinal ? earnings : (thru || '-')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}