import { getLeagueData, transformSheetData } from '@/lib/sheets';
import OADCard from '@/components/OADCard';
import { analytics_v3 } from 'googleapis';

export const dynamic = 'force-dynamic';

export default async function OADPage() {
  const rawData = await getLeagueData();
  if (!rawData) return <div className="p-10 text-white text-center">Data Unavailable</div>;

  const allData = transformSheetData(rawData);
  const oadRows = allData.oad || [];

  if (oadRows.length === 0) {
    return <div className="p-10 text-white text-center">No OAD data found.</div>;
  }
  
  const members = oadRows[0]?.slice(2) || [];

  const memberData = members.map((memberName: string, indexIdx: number) => {
    const colIndex = indexIdx + 2; 
    const history = [];
    let totalEarnings = 0;

    for (let i = 1; i <= 33; i++) {
      const row = oadRows[i];
      if (!row) continue;

      const tournamentName = row[1];
      const golfer = row[colIndex];
      const earningsRow = i + 35; 
      const moneyStr = oadRows[earningsRow]?.[colIndex] || "$0";
      
      if (tournamentName && golfer && golfer.trim() !== "") {
        history.push({
          tournament: tournamentName,
          golfer: golfer,
          money: moneyStr
        });
        
        const numericMoney = Number(moneyStr.replace(/[^0-9.-]+/g, "")) || 0;
        totalEarnings += numericMoney;
      }
    }

    return {
      name: memberName,
      totalNumeric: totalEarnings,
      totalFormatted: new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD', 
        maximumFractionDigits: 0 
      }).format(totalEarnings),
      history: [...history].reverse()
    };
  });

  const maxEarnings = Math.max(...memberData.map((m: any) => m.totalNumeric));

  return (
    <main className="min-h-screen bg-black p-6 pb-24">
      <header className="mb-10 pt-4">
        <h1 className="text-white text-3xl font-black tracking-tight italic uppercase">
          One <span className="text-gentle-gold">&</span> Done
        </h1>
        <p className="text-gentle-stone text-xs uppercase tracking-[0.2em] mt-1 font-bold">
          Weekly Picks & History
        </p>
      </header>

      <div className="space-y-4">
        {memberData.map((member:any) => {
          const isLeader = member.totalNumeric === maxEarnings && maxEarnings > 0;

          return (
            <OADCard 
              key={member.name}
              name={member.name}
              currentPick={member.history[0]?.golfer || "Pending"}
              totalOADEarnings={member.totalFormatted}
              history={member.history}
              isLeader={isLeader}
            />
          );
        })}
      </div>
    </main>
  );
}