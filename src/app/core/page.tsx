import { getLeagueData, transformSheetData } from '@/lib/sheets';
import RosterCard from '@/components/RosterCard';

export const dynamic = 'force-dynamic';

export default async function CorePage() {
  const rawData = await getLeagueData();
  if (!rawData) return <div className="p-10 text-white text-center">Data Unavailable</div>;

  const allData = transformSheetData(rawData);
  // This contains EVERY entry in the Core Log sheet
  const coreRows = allData.core || [];

  if (coreRows.length === 0) {
    return <div className="p-10 text-white text-center">No Core 3 data found.</div>;
  }

// 1. First pass: Aggregate total earnings and golfer history
const aggregatedData = new Map();
  
  coreRows.forEach((row: any) => {
    const ownerName = row[0];
    const g1Earnings = Number(row[7]?.replace(/[^0-9.-]+/g, "")) || 0;
    const g2Earnings = Number(row[8]?.replace(/[^0-9.-]+/g, "")) || 0;
    const g3Earnings = Number(row[9]?.replace(/[^0-9.-]+/g, "")) || 0;
    const rowTotal = Number(row[10]?.replace(/[^0-9.-]+/g, "")) || 0;
    
    if (!aggregatedData.has(ownerName)) {
      aggregatedData.set(ownerName, {
        latestRow: row,
        totalG1: 0,
        totalG2: 0,
        totalG3: 0,
        runningTotal: 0,
        submissionCount: 0
      });
    }
    
    const data = aggregatedData.get(ownerName);
    data.totalG1 += g1Earnings;
    data.totalG2 += g2Earnings;
    data.totalG3 += g3Earnings;
    data.runningTotal += rowTotal;
    data.submissionCount += 1;
    data.latestRow = row; // Keep this to get the CURRENT golfer names
  });

  const memberRosters = Array.from(aggregatedData.values()).map(({ latestRow, totalG1, totalG2, totalG3, runningTotal, submissionCount }) => {
    const currencyFormat = new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    });

    return {
      name: latestRow[0],
      totalEarnings: currencyFormat.format(runningTotal),
      changeCount: Math.max(0, submissionCount - 1),
      golfers: [
        { name: latestRow[1], earnings: currencyFormat.format(totalG1) },
        { name: latestRow[2], earnings: currencyFormat.format(totalG2) },
        { name: latestRow[3], earnings: currencyFormat.format(totalG3) },
      ],
      numericTotal: runningTotal
    };
  });

  const maxEarnings = Math.max(...memberRosters.map((m: any) => m.numericTotal));

  return (
    <main className="min-h-screen bg-black p-4 sm:p-8 pb-40">
      <header className="mb-10 pt-4 px-2">
        <h1 className="text-white text-3xl font-black tracking-tight italic uppercase">
          Core <span className="text-gentle-gold">3</span> Roster
        </h1>
        <p className="text-gentle-stone text-[10px] uppercase tracking-[0.3em] mt-2 ml-1 font-black">
          Season-Long Stable
        </p>
      </header>

      <div className="space-y-6 max-w-5xl mx-auto overflow-visible">
        {memberRosters.map((roster: any) => (
          <RosterCard 
            key={roster.name}
            name={roster.name}
            totalEarnings={roster.totalEarnings}
            golfers={roster.golfers}
            changeCount={roster.changeCount} // Passing the new count
            isLeader={roster.numericTotal === maxEarnings && maxEarnings > 0}
          />
        ))}
      </div>
    </main>
  );
}