'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getOwnerGlow, getOwnerBarColor } from '@/lib/utils';
import BarChart from '@/components/BarChart';

interface StandingsCardProps {
  rank: number;
  name: string;
  total: string;
  coreVal: number;
  oadVal: number;
  maxTotal: number;
  weeklyHistory: number[];
  weeklyAverages: number[];
}

export default function StandingsCard({ rank, name, total, coreVal, oadVal, maxTotal, weeklyHistory, weeklyAverages }: StandingsCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const glowClasses = getOwnerGlow(name);
  const barColors = getOwnerBarColor(name);

  const totalNumeric = coreVal + oadVal;
  const barScalePercent = maxTotal > 0 ? (totalNumeric / maxTotal) * 100 : 0;
  const coreWidth = totalNumeric > 0 ? (coreVal / totalNumeric) * 100 : 0;

  return (
    <div className={`w-full rounded-2xl bg-white/5 border transition-all duration-500 mb-4 relative overflow-visible shadow-lg ${glowClasses} ${isOpen ? 'bg-white/[0.08]' : ''}`}>
      
      {/* HEADER AREA */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 sm:p-6 text-left hover:bg-white/[0.02] group"
      >
        {/* ROW 1: Member Name and Total Earnings aligned */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic text-gentle-gold border border-white/10 shrink-0">
              {rank}
            </span>
            <h3 className="font-mono font-bold leading-none tabular-nums uppercase text-white text-xl sm:text-2xl">
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-mono font-bold leading-none tabular-nums text-white text-xl sm:text-2xl">
              {total}
            </p>
            <span className="text-gentle-stone/40 group-hover:text-gentle-stone transition-colors">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </div>
        </div>

        {/* ROW 2: FULL LENGTH BAR */}
        <div className="w-full">
          <div className="relative">
            <div 
              style={{ width: `${barScalePercent}%` }} 
              className="h-5 flex rounded-md overflow-hidden border border-black/40 shadow-inner bg-white/5 transition-all duration-1000"
            >
              {/* CORE SECTION */}
              <div 
                className={`h-full flex items-center px-2 transition-all duration-700 ${barColors.core}`} 
                style={{ width: `${coreWidth}%` }}
              >
                {coreWidth > 15 && (
                  <span className="text-[8px] font-black italic text-black uppercase tracking-tighter">Core</span>
                )}
              </div>

              {/* OAD SECTION - Now using the tinted team color */}
              <div 
                className={`h-full flex items-center justify-end px-2 transition-all duration-700 ${barColors.oad}`} 
                style={{ width: `${100 - coreWidth}%` }}
              >
                {(100 - coreWidth) > 15 && (
                  <span className="text-[8px] font-black italic text-white/50 uppercase tracking-tighter">OAD</span>
                )}
              </div>
            </div>
          </div>

          {/* Sub-values with labels "Core:" and "OAD:" */}
          <div className="flex justify-between mt-2 px-0.5 text-[9px] font-mono font-bold italic tracking-tight uppercase">
             <span className="text-white opacity-90">
               <span className="opacity-90 mr-1">Core:</span>${coreVal.toLocaleString()}
             </span>
             <span className="text-white/90">
               <span className="mr-1">OAD:</span>${oadVal.toLocaleString()}
             </span>
          </div>
        </div>
      </button>

      {/* DETAILS (Expanded view) */}
        {isOpen && (
          <div className="bg-black/40 border-t border-white/5 px-6 pb-6 rounded-b-2xl">
            
            {/* Title and Chart Container */}
            <div className="pt-5 pb-4">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-[10px] uppercase tracking-widest text-gentle-stone font-black italic">
                    Weekly Performance
                  </p>
                  <span className="text-[9px] text-gentle-stone/40 font-mono tracking-tighter">WK 1-29</span>
                </div>

                <BarChart 
                  history={weeklyHistory} 
                  averages={weeklyAverages} 
                  colorClass={barColors.core} 
                />
            </div>
          </div>
        )}
    </div>
  );
}