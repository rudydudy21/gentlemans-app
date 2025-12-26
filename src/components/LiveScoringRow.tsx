'use client';

export default function LiveScoringRow({ data }: { data: any }) {
  const { owner, player, pos, score, today, thru, earnings } = data;

  const getScoreStyle = (val: string) => {
    if (!val) return 'text-white';
    if (val.includes('-')) return 'text-green-400';
    if (val.includes('+')) return 'text-red-400';
    return 'text-white';
  };

  return (
    <div className="grid grid-cols-[40px_1fr_60px_60px_50px] sm:grid-cols-[40px_1fr_80px_80px_60px_100px] gap-2 px-4 py-4 items-center hover:bg-white/[0.03] transition-colors">
      
      {/* Position */}
      <span className="text-gentle-stone font-mono text-xs font-bold">{pos || '-'}</span>

      {/* Player & Owner */}
      <div className="min-w-0">
        <p className="text-white font-bold text-sm truncate uppercase tracking-tight">{player}</p>
        <p className="text-gentle-gold text-[10px] font-black uppercase tracking-tighter">{owner}</p>
      </div>

      {/* Total Score */}
      <div className={`text-center font-mono font-black text-base tabular-nums ${getScoreStyle(score)}`}>
        {score || 'E'}
      </div>

      {/* Today's Score - Hides if empty */}
      <div className={`text-center font-mono text-xs font-bold tabular-nums ${getScoreStyle(today)}`}>
        {today && today !== '0' ? today : '--'}
      </div>

      {/* Thru */}
      <div className="text-center text-gentle-stone font-mono text-[10px] font-bold uppercase">
        {thru || '--'}
      </div>

      {/* Earnings - Desktop Only or logic to show if > 0 */}
      <div className="hidden sm:block text-right text-white font-mono text-sm font-bold tabular-nums">
        {earnings && earnings !== '$0' ? earnings : '-'}
      </div>
    </div>
  );
}