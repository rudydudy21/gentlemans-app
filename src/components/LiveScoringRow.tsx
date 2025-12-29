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
    <div className="grid grid-cols-[40px_1fr_60px_60px_50px] sm:grid-cols-[40px_1fr_80px_80px_60px_100px] gap-2 px-4 py-4 items-center border-b border-white/5 last:border-0 bg-transparent">
      {/* POS */}
      <div className="text-gentle-stone text-[11px] font-black uppercase italic text-center">
        {pos ?? '-'}
      </div>

      {/* Golfer / Owner
          On small screens this spans full width above the numeric columns (col-span-full).
          On sm+ it occupies the player column (col 2). */}
      <div className="flex flex-col min-w-0 col-span-full sm:col-auto sm:col-start-2">
        <span className="text-white font-black uppercase text-[13px] sm:text-base leading-tight truncate">
          {player}
        </span>
        <span className="text-gentle-gold text-[9px] uppercase italic opacity-70 leading-none mt-0.5 tracking-tighter">
          {owner}
        </span>
      </div>

      {/* Total - ensure it aligns under header on small screens (col-start-3) */}
      <div className="text-center font-black text-[13px] sm:text-lg col-start-3 sm:col-auto whitespace-nowrap">
        <span className={score?.toString().includes('-') ? 'text-red-500' : 'text-white'}>
          {score ?? '-'}
        </span>
      </div>

      {/* Today - align under header's Today column (col-start-4) */}
      <div className="text-center text-gentle-stone col-start-4 sm:col-auto whitespace-nowrap">
        {today || '-'}
      </div>

      {/* Thru / Payout - align under header's Thru column (col-start-5).
          Use an end-aligned column with a small stacked label */}
      <div className="text-right text-gentle-gold col-start-5 sm:col-auto">
        <div className="flex flex-col items-end">
          <span className="font-black italic text-[11px] sm:text-sm leading-none">
            {isFinal ? earnings : (thru || '-')}
          </span>
        </div>
      </div>
    </div>
  );
}