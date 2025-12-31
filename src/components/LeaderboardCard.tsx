import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { getOwnerGlow } from '@/lib/utils';

interface LeaderboardCardProps {
  name: string;
  total: string;
  rank: number;
  change: 'up' | 'down' | 'none';
  colorClass: string;
}

export default function LeaderboardCard({ name, total, rank, change, colorClass }: LeaderboardCardProps) {
  const glowClasses = getOwnerGlow(name);
  return (
    <div className={`w-full rounded-2xl overflow-hidden bg-white/5 border shadow-lg transition-all duration-500 ${glowClasses}`}>
      <div className="flex justify-between items-center">
        {/* Left Side: Rank, Arrow, and Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white font-mono text-xs font-bold border border-white/10">
            {rank}
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* Trend Arrow positioned before name */}
            {change === 'up' && <ArrowUpRight size={16} className="text-green-500" />}
            {change === 'down' && <ArrowDownRight size={16} className="text-red-500" />}
            {change === 'none' && <Minus size={16} className="text-gentle-stone/50" />}
            
            {/* OAD Style Font: Bold, Uppercase */}
            <h3 className="text-white text-xl font-black uppercase tracking-tight">
              {name}
            </h3>
          </div>
        </div>

        {/* Right Side: Earnings */}
        <div className="text-right">
          <p className="text-gentle-stone text-[9px] font-black uppercase tracking-[0.2em] leading-none mb-1">
            Earnings
          </p>
          <p className="text-white font-mono font-bold text-lg leading-none">
            {total}
          </p>
        </div>
      </div>
    </div>
  );
}