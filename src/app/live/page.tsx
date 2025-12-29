import { getLeagueData, transformSheetData } from '@/lib/sheets';
import LiveScoringRow from '@/components/LiveScoringRow';

export default async function LivePage() {
  const rawData = await getLeagueData();
  if (!rawData) return <div className="p-10 text-white text-center">Data Unavailable</div>;

  const allData = transformSheetData(rawData);
  const liveRows = allData.filtered || [];

  if (liveRows.length === 0) {
    return (
      <div className="min-h-screen bg-gentle-charcoal flex items-center justify-center p-4 sm:p-8 text-center">
        <p className="text-gentle-stone uppercase tracking-[0.3em] text-xs">Waiting for live data...</p>
      </div>
    );
  }

  // Mapping based on: Owner, Player, POS, Score, Today, Thru, Earnings
  const players = liveRows.slice(1).map((row: any) => ({
    owner: row[0],
    player: row[1],
    pos: row[2],
    score: row[3],
    today: row[4],
    thru: row[5],
    earnings: row[6]
  }));

  return (
    <main className="min-h-screen bg-gentle-charcoal p-4 pb-24">
      <header className="mb-6 pt-4 flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h1 className="text-white text-2xl font-black italic uppercase">Live <span className="text-gentle-gold">Feed</span></h1>
        </div>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header — use same responsive grid as the rows so columns align perfectly */}
        <div className="grid grid-cols-[40px_1fr_60px_60px_50px] sm:grid-cols-[40px_1fr_80px_80px_60px_100px] gap-2 px-4 py-4 bg-white/10 text-gentle-stone text-[9px] font-black uppercase tracking-wider items-center border-b border-white/10">
          <div className="text-center">POS</div>
          <div>Golfer / Owner</div>
          <div className="text-center">Total</div>
          <div className="text-center">Today</div>
          <div className="text-center">Thru</div>
          {/* Earnings column shown only on sm+ (this column is the 6th column in the sm grid) */}
          <div className="hidden sm:block text-right">Earnings</div>
        </div>

        <div className="divide-y divide-white/5">
          {players.map((p:any, idx:any) => (
            <LiveScoringRow key={idx} data={p} />
          ))}
        </div>
      </div>
    </main>
  );
}