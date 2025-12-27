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
    <div className="grid grid-cols-[40px_1fr_60px_60px_50px] sm:grid-cols-[40px_1fr_80px_80px_60px_100px] gap-2 px-4 py-3 items-center">
      {/* POS */}
      <div className="text-gentle-stone text-[13px] font-black uppercase text-center">
        <span>{pos ?? '-'}</span>
      </div>

      {/* Player (and owner as a secondary line on small screens).
          On small screens we want the player to span the full width above the other columns.
          On sm+ it behaves like a normal single-row column. */}
      <div className="flex flex-col col-span-full sm:col-auto">
        <span className="text-white font-black text-sm sm:text-base truncate">{player}</span>
        {/* show owner as secondary, smaller text; on sm+ you can hide or adjust visual weight */}
        <span className="text-gentle-gold uppercase text-xs mt-1 sm:mt-0 sm:text-[12px] sm:opacity-80">{owner}</span>
      </div>

      {/* The rest of the columns will flow into the next row on small screens,
          but on sm+ they'll sit in the same row because the player uses sm:col-auto */}
      <div className="text-center font-black text-white">
        {score ?? '-'}
      </div>

      <div className="text-center text-gentle-stone">
        {today ?? '-'}
      </div>

      <div className="text-center text-gentle-stone">
        {thru ?? '-'}
      </div>

      {/* Earnings hidden on small screens, shown on sm+ aligned right */}
      <div className="hidden sm:block text-right text-gentle-stone font-black">
        {earnings ?? '-'}
      </div>
    </div>
  );
}