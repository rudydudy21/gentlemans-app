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

  return (
    <div className="grid grid-cols-[40px_1fr_60px_60px_50px] sm:grid-cols-[40px_1fr_80px_80px_60px_100px] gap-2 px-4 py-3 items-start">
      {/* POS */}
      <div className="text-gentle-stone text-[13px] font-black uppercase text-center">
        <span>{pos ?? '-'}</span>
      </div>

      {/* Player (and owner as a secondary line on small screens).
          On small screens we want the player to span the full width above the other columns.
          On sm+ it occupies the player column (col 2). */}
      <div className="flex flex-col col-span-full sm:col-auto sm:col-start-2">
        <span className="text-white font-black text-sm sm:text-base truncate">{player}</span>
        <span className="text-gentle-gold text-xs mt-1 sm:mt-0 sm:text-[12px] sm:opacity-80">{owner}</span>
      </div>

      {/* Total - on small screens force it to start at column 3 so it lines up under the header */}
      <div className="text-center font-black text-white col-start-3 sm:col-auto">
        {score ?? '-'}
      </div>

      {/* Today - align under header's Today column (col 4 on small grid) */}
      <div className="text-center text-gentle-stone col-start-4 sm:col-auto">
        {today ?? '-'}
      </div>

      {/* Thru - align under header's Thru column (col 5 on small grid) */}
      <div className="text-center text-gentle-stone col-start-5 sm:col-auto">
        {thru ?? '-'}
      </div>

      {/* Earnings hidden on small screens, shown on sm+ (occupies last column on sm+) */}
      <div className="hidden sm:block text-right text-gentle-stone font-black sm:col-start-6">
        {earnings ?? '-'}
      </div>
    </div>
  );
}