import { getLeagueData, transformSheetData } from '@/lib/sheets';
import LiveScoringRow from '@/components/LiveScoringRow';

export const dynamic = 'force-dynamic';

export default async function LivePage() {
  const rawData = await getLeagueData();
  if (!rawData) return <div className="p-10 text-white text-center">Data Unavailable</div>;

  const { filtered: liveRows, tournamentName } = transformSheetData(rawData);

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
  
// 2. Sort them by Position (Lower number = Better rank)
  const sortedPlayers = [...players].sort((a, b) => {
    const parsePos = (val: any) => {
      // Convert to string and clean: remove 'T' (for Ties), spaces, etc.
      const s = String(val || '').toUpperCase().replace('T', '').trim();
      
      // If they don't have a position (Empty, -, CUT, WD), send to bottom
      if (s === '-' || s === '' || isNaN(Number(s))) return 999;
      
      return parseInt(s, 10);
    };

    const posA = parsePos(a.pos);
    const posB = parsePos(b.pos);

    // If positions are the same (e.g., both are T10), 
    // we sub-sort by score just in case.
    if (posA === posB) {
      const scoreA = parseInt(String(a.score).replace('+', '').replace('E', '0')) || 0;
      const scoreB = parseInt(String(b.score).replace('+', '').replace('E', '0')) || 0;
      return scoreA - scoreB;
    }

    return posA - posB;
  });

  return (
    <main className="min-h-screen bg-black p-4 pb-24">
      <header className="pt-4 flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h1 className="text-white text-2xl font-black italic uppercase">Live <span className="text-gentle-gold">Feed</span></h1>
        </div>
      </header>
      
      {/* TOURNAMENT HEADER */}
      <div className="px-2 mb-3 mt-2">
        <div className="flex flex-col border-l-2 border-gentle-gold pl-3">
          <span className="text-gentle-stone text-[10px] uppercase tracking-[0.4em] font-black">
            Currently Playing
          </span>
          <h2 className="text-white text-xl sm:text-2xl font-black uppercase italic tracking-tighter leading-none mt-1">
            {tournamentName || "Tournament Loading..."}
          </h2>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header — use same responsive grid as the rows so columns align perfectly */}
        <div className="divide-y divide-white/5">
          {sortedPlayers.map((p:any, idx:any) => (
            <LiveScoringRow key={idx} data={p} />
          ))}
        </div>
      </div>
    </main>
  );
}