import { getLeagueData, transformSheetData } from '@/lib/sheets';
import CoreClient from './CoreClient'; 

export const dynamic = 'force-dynamic';

export default async function CorePage() {
  const rawData = await getLeagueData();
  if (!rawData) return <div className="p-10 text-white text-center">Data Unavailable</div>;

  const allData = transformSheetData(rawData);
  const coreRows = allData.core || [];
  const individualPlayerData = allData.individualPlayers || []; 

  // --- AGGREGATION LOGIC (This was missing!) ---
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
    data.latestRow = row; 
  });

  const memberRosters = Array.from(aggregatedData.values()).map(({ latestRow, totalG1, totalG2, totalG3, runningTotal, submissionCount }) => {
    const currencyFormat = new Intl.NumberFormat('en-US', { 
      style: 'currency', currency: 'USD', maximumFractionDigits: 0 
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
  }).sort((a: any, b: any) => b.numericTotal - a.numericTotal);

  // Now memberRosters is defined, so we can calculate this safely
  const maxEarnings = memberRosters.length > 0 
    ? Math.max(...memberRosters.map((m: any) => m.numericTotal)) 
    : 0;

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
      
      <CoreClient 
        memberRosters={memberRosters} 
        individualPlayerData={individualPlayerData} 
        maxEarnings={maxEarnings} 
      />
    </main>
  );
}