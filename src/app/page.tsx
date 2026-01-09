import { getLeagueData, transformSheetData } from '@/lib/sheets';
import { getOwnerGlow, getOwnerBarColor } from '@/lib/utils';
import StandingsCard from './StandingsCard';

export const dynamic = 'force-dynamic';

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
    <main className="min-h-screen bg-black p-4 sm:p-6 pb-32">
      <header className="mb-10 pt-4 px-2 flex justify-between items-start">
        <div>
          <h1 className="text-white text-3xl font-black tracking-tight italic uppercase leading-none">
            GENTLEMAN'S <span className="text-gentle-gold">CLASSIC</span>
          </h1>
          <p className="text-gentle-stone text-xs uppercase tracking-[0.2em] mt-1 ml-1 font-bold">
            2026 Season Standings
          </p>
        </div>

        {/* LOGO on the Right */}
        <div className="w-20 h-20 pr-6">
          <img 
            src="/logo.png" 
            alt="Logo"
            className="object-contain w-full h-full brightness-110"
          />
        </div>
      </header>

    <div className="max-w-5xl mx-auto space-y-8 px-2 overflow-visible">
      {sortedLeaderboard.map((row: any, index: number) => {
        const coreVal = parseCurrency(row[1]);
        const oadVal = parseCurrency(row[2]);
        const totalVal = row[3];

        return (
          <StandingsCard 
            key={index}
            rank={index + 1}
            name={row[0]}
            total={totalVal}
            coreVal={coreVal}
            oadVal={oadVal}
            maxTotal={maxTotal}
          />
        );
      })}
    </div>
  </main>
);
}