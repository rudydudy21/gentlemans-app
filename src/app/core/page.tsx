import { getLeagueData, transformSheetData } from '@/lib/sheets';
import RosterCard from '@/components/RosterCard';

export default async function CorePage() {
  const rawData = await getLeagueData();
  if (!rawData) return <div className="p-10 text-white text-center">Data Unavailable</div>;

  const allData = transformSheetData(rawData);
  // Using the core roster data from your transformation logic
  const coreRows = allData.core || [];

  if (coreRows.length === 0) {
    return <div className="p-10 text-white text-center">No Core 3 data found.</div>;
  }

  // Map the raw sheet rows to the RosterCard format
  const memberRosters = coreRows.map((row: any) => {
    // Assuming row is an array based on standard sheet fetching:
    // [0]Member, [1]G1, [2]G2, [3]G3, [4]Start, [5]End, [6]Active, [7]G1$, [8]G2$, [9]G3$, [10]Total
    return {
      name: row[0],
      totalEarnings: row[10] || "$0",
      golfers: [
        { name: row[1], earnings: row[7] || "$0" },
        { name: row[2], earnings: row[8] || "$0" },
        { name: row[3], earnings: row[9] || "$0" },
      ],
      // Helper for the leader highlight (strip $ and , to compare numbers)
      numericTotal: Number(row[10]?.replace(/[^0-9.-]+/g, "")) || 0
    };
  });

  // Calculate the leader
  const maxEarnings = Math.max(...memberRosters.map(m => m.numericTotal));

  return (
    <main className="min-h-screen bg-gentle-charcoal p-4 sm:p-8 pb-24">
      <header className="mb-10 pt-4">
        <h1 className="text-white text-3xl font-black tracking-tight italic uppercase">
          Core <span className="text-gentle-gold">3</span> Roster
        </h1>
        <p className="text-gentle-stone text-xs uppercase tracking-[0.25em] mt-1 font-bold">
          Season-Long Stable
        </p>
      </header>

      <div className="space-y-4">
        {memberRosters.map((roster: any) => (
          <RosterCard 
            key={roster.name}
            name={roster.name}
            totalEarnings={roster.totalEarnings}
            golfers={roster.golfers}
            isLeader={roster.numericTotal === maxEarnings && maxEarnings > 0}
          />
        ))}
      </div>
    </main>
  );
}