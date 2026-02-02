export default function BarChart({ history = [], averages = [], colorClass = 'bg-gentle-gold' }: { history: number[], averages: number[], colorClass?: string }) {
  const maxWeekly = Math.max(...history, ...averages, 1);

  return (
    /* Removed mt-6, pt-6, and border-t */
    <div className="w-full">
      <div className="flex items-end gap-[2px] h-12 w-full group/chart relative">
        {history.map((amount, i) => {
          const heightPct = (amount / maxWeekly) * 100;
          const avgPct = (averages[i] / maxWeekly) * 100;
          
          return (
            <div key={i} className="flex-1 relative h-full flex items-end group/bar">
              <div 
                style={{ height: `${amount > 0 ? Math.max(heightPct, 8) : 2}%` }}
                className={`w-full rounded-t-[1px] transition-all duration-500 z-10 ${
                  amount > 0 ? `${colorClass} opacity-60` : 'bg-white/5'
                }`}
              />

              {averages[i] > 0 && (
                <div 
                  style={{ bottom: `${avgPct}%` }}
                  className="absolute left-0 right-0 h-[1px] bg-white/30 z-20"
                />
              )}
              
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap font-mono">
                W{i+1}: ${amount.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}