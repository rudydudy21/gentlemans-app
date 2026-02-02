export default function BarChart({ 
  history = [], 
  colorClass = 'bg-gentle-gold' // Default fallback
}: { 
  history: number[], 
  colorClass?: string 
}) {
  const maxWeekly = Math.max(...history, 1);

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <div className="flex justify-between items-end mb-2">
        <p className="text-[10px] uppercase tracking-widest text-gentle-stone font-black">
          Weekly Performance
        </p>
        <span className="text-[10px] text-gentle-stone/50 font-mono italic">Trend Line</span>
      </div>
      
      <div className="flex items-end gap-[2px] h-12 w-full group/chart">
        {history.map((amount, i) => {
          const heightPct = (amount / maxWeekly) * 100;
          
          return (
            <div key={i} className="flex-1 relative h-full flex items-end group/bar">
              <div 
                style={{ height: `${amount > 0 ? Math.max(heightPct, 8) : 2}%` }}
                className={`w-full rounded-t-[1px] transition-all duration-500 ${
                  amount > 0 
                    ? `${colorClass} opacity-60 group-hover/bar:opacity-100` // Uses owner's color
                    : 'bg-white/5'
                }`}
              />
              
              {/* Tooltip remains standard for readability */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-30 whitespace-nowrap font-mono">
                W{i+1}: ${amount.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}