export default function BarChart({ history = [] }: { history: number[] }) {
  if (!history || history.length === 0) {
    return <div className="mt-6 text-[10px] text-gentle-stone italic uppercase">No weekly data available</div>;
  }
  const maxWeekly = Math.max(...history, 1); //

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <div className="flex justify-between items-end mb-2">
        <p className="text-[10px] uppercase tracking-widest text-gentle-stone font-black">
          Weekly Performance
        </p>
        <span className="text-[10px] text-gentle-stone/50 font-mono">WK 1-29</span>
      </div>
      
      <div className="flex items-end gap-[2px] h-12 w-full group/chart">
        {history.map((amount, i) => {
          const heightPct = (amount / maxWeekly) * 100;
          
          return (
            <div key={i} className="flex-1 relative h-full flex items-end group/bar">
              {/* The Visual Bar */}
              <div 
                style={{ height: `${amount > 0 ? Math.max(heightPct, 8) : 2}%` }}
                className={`w-full rounded-t-[1px] transition-all duration-300 ${
                  amount > 0 
                    ? 'bg-gentle-gold/60 group-hover/bar:bg-gentle-gold group-hover/bar:opacity-100' 
                    : 'bg-white/5'
                }`}
              />
              
              {/* Tooltip on Hover */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap font-mono shadow-2xl">
                W{i+1}: ${amount.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}