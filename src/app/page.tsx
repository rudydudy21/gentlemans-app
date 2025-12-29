import { getLeagueData, transformSheetData } from '@/lib/sheets';
import LeaderboardCard from '@/components/LeaderboardCard';

export default async function Home() {
  const rawData = await getLeagueData();
  
  if (!rawData) {
    return (
      <main className="min-h-screen bg-gentle-charcoal p-4 sm:p-8 flex items-center justify-center">
        <p className="text-white opacity-50 font-mono">Connecting to League Data...</p>
      </main>
    );
  }

  const { leaderboard } = transformSheetData(rawData);

  if (!leaderboard || leaderboard.length <= 1) {
    return (
      <main className="min-h-screen bg-gentle-charcoal p-6 flex items-center justify-center">
        <p className="text-white opacity-50 font-mono uppercase tracking-widest text-xs">
          No Standings Recorded Yet
        </p>
      </main>
    );
  }

  // Helper to turn "$1,234" into 1234
  const parseCurrency = (val: string) => {
    if (!val) return 0;
    return Number(val.replace(/[^0-9.-]+/g, "")) || 0;
  };

  // 1. Sort and Prepare Data
  const sortedLeaderboard = [...leaderboard].slice(1).sort((a, b) => {
    return parseCurrency(b[3]) - parseCurrency(a[3]);
  });

  const maxTotal = Math.max(...sortedLeaderboard.map((row: any) => parseCurrency(row[3])));
  return (
    <main className="min-h-screen bg-gentle-charcoal p-4 sm:p-6 pb-32">
      <header className="mb-10 pt-4 px-2">
        <h1 className="text-white text-3xl font-black tracking-tight italic uppercase leading-none">
          GENTLEMAN'S <span className="text-gentle-gold">CLASSIC</span>
        </h1>
        <p className="text-gentle-stone text-[10px] uppercase tracking-[0.3em] mt-2 font-black">
          2025 Season Standings
        </p>
      </header>

      <div className="space-y-3">
  
{sortedLeaderboard.map((row: any, index: number) => {
    const coreVal = parseCurrency(row[1]);
    const oadVal = parseCurrency(row[2]);
    const totalVal = parseCurrency(row[3]);
    const barScalePercent = maxTotal > 0 ? (totalVal / maxTotal) * 100 : 0;
    const coreWidth = totalVal > 0 ? (coreVal / totalVal) * 100 : 0;

    return (
      <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg">
        {/* Main Info Row */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black italic text-gentle-gold border border-white/10">{index + 1}</span>
             <span className="text-lg font-black text-white uppercase">{row[0]}</span>
          </div>
          <div className="text-right">
            <span className="block text-[8px] text-white/40 font-black uppercase tracking-widest">Earnings</span>
            <span className="text-xl font-black text-white leading-none">{row[3]}</span>
          </div>
        </div>

        {/* The Bar - Now integrated and thicker */}
        <div className="px-4 pb-4">
          <div style={{ width: `${barScalePercent}%` }} className="h-6 flex rounded-md overflow-hidden border border-black/20 shadow-inner">
             <div className="h-full bg-gentle-gold flex items-center px-2" style={{ width: `${coreWidth}%` }}>
               {coreWidth > 20 && <span className="text-[9px] font-black italic text-black uppercase">Core</span>}
             </div>
             <div className="h-full bg-white/10 flex items-center justify-end px-2" style={{ width: `${100 - coreWidth}%` }}>
               {(100 - coreWidth) > 20 && <span className="text-[9px] font-black italic text-white/40 uppercase">OAD</span>}
             </div>
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-mono italic font-bold">
             <span className="text-gentle-gold">${coreVal.toLocaleString()}</span>
             <span className="text-white/30">${oadVal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  })}
</div>
  </main>
);
}