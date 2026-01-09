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

  // 1. Create a Frequency Map to count how many times each owner appears
  // This represents their history of roster submissions
  const submissionCounts: Record<string, number> = {};
  coreRows.forEach((row: any) => {
    const ownerName = row[0];
    submissionCounts[ownerName] = (submissionCounts[ownerName] || 0) + 1;
  });

  // 2. Identify "Active" rosters only (to display the card)
  // We assume the LATEST entry for each member is the one to show
  const uniqueMemberMap = new Map();
  coreRows.forEach((row: any) => {
    uniqueMemberMap.set(row[0], row); // Overwrites previous entries, keeping only the last one
  });

  const memberRosters = Array.from(uniqueMemberMap.values()).map((row: any) => {
    const ownerName = row[0];
    const totalEntries = submissionCounts[ownerName] || 1;
    
    return {
      name: ownerName,
      totalEarnings: row[10] || "$0",
      changeCount: Math.max(0, totalEntries - 1), // 1 entry = 0 changes, 2 entries = 1 change
      golfers: [
        { name: row[1], earnings: row[7] || "$0" },
        { name: row[2], earnings: row[8] || "$0" },
        { name: row[3], earnings: row[9] || "$0" },
      ],
      numericTotal: Number(row[10]?.replace(/[^0-9.-]+/g, "")) || 0
    };
  });

  const maxEarnings = Math.max(...memberRosters.map((m: any) => m.numericTotal));

  return (
    <main className="min-h-screen bg-black p-4 sm:p-8 pb-24">
      <header className="mb-10 pt-4 px-2">
        <h1 className="text-white text-3xl font-black tracking-tight italic uppercase">
          Core <span className="text-gentle-gold">3</span> Roster
        </h1>
        <p className="text-gentle-stone text-[10px] uppercase tracking-[0.3em] mt-2 font-black">
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