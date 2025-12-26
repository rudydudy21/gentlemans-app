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

      <div className="space-y-4">
        {sortedLeaderboard.map((row: any, index: number) => {
  const coreVal = parseCurrency(row[1]); 
  const oadVal = parseCurrency(row[2]);  
  const totalVal = parseCurrency(row[3]); 
  
  // Calculate the percentage for the bar
  const corePercent = totalVal > 0 ? (coreVal / totalVal) * 100 : 0;

  return (
    <div key={row[0] || index} className="mb-8">
      <LeaderboardCard
        name={row[0]}         
        total={row[3] || "$0"}        
        rank={index + 1}      
        change="none" 
        colorClass={index === 0 
          ? "bg-gentle-gold/15 border border-gentle-gold/30 shadow-[0_0_20px_rgba(184,155,114,0.15)]" 
          : "bg-white/5 border border-white/5"
        }
      />
      
{/* TALLER, COHESIVE BAR */}
      <div className="mx-2 -mt-2"> {/* Negative margin pulls it closer to the card */}
        <div className="h-4 w-full bg-black/40 rounded-b-xl flex overflow-hidden border-x border-b border-white/10">
          {/* Core 3 Portion */}
          <div 
            className="h-full bg-gentle-gold flex items-center px-2 min-w-fit" 
            style={{ width: `${corePercent}%` }}
          >
            {corePercent > 15 && (
              <span className="text-[8px] text-black font-black uppercase whitespace-nowpax">
                Core
              </span>
            )}
          </div>
          {/* OAD Portion */}
          <div 
            className="h-full bg-gentle-stone/30 flex items-center justify-end px-2" 
            style={{ width: `${100 - corePercent}%` }}
          >
            {(100 - corePercent) > 15 && (
              <span className="text-[8px] text-gentle-stone font-black uppercase whitespace-nowrap">
                OAD
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Labels beneath the bar */}
        <div className="flex justify-between mt-1 px-1">
          <span className="text-gentle-gold text-[10px] font-mono font-bold">
            ${coreVal.toLocaleString()}
          </span>
          <span className="text-gentle-stone text-[10px] font-mono font-bold">
            ${oadVal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
})}
      </div>
    </main>
  );
}