// app/components/ResultsDisplay.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export const ResultsDisplay = ({ results, state, formatToK }: any) => {
  const displayRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = useCallback(() => {
    if (displayRef.current === null || isExporting) {
      return;
    }

    setIsExporting(true);

    toPng(displayRef.current, {
      cacheBust: true,
      filter: (node: any) => {
        const exclusionClasses = ['no-capture'];
        return !exclusionClasses.some(cls => node.classList?.contains(cls));
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `thedsk-roi-report-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      })
      .finally(() => {
        setIsExporting(false);
      });
  }, [displayRef, isExporting]);

  return (
    <section
      id="results-display"
      ref={displayRef}
      className="bg-[#0066FF] rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
    >
      {/* Background Image Decoration */}
      <div className="absolute top-0 left-0 right-0 z-0 select-none pointer-events-none opacity-40 mix-blend-overlay">
        <img src="/Images/Money_bg.png" alt="Card Background" className="w-full h-auto scale-110" />
      </div>

      <div className="relative z-10 text-center mb-10 pt-4">
        <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-white/20">
          Estimated Annual ROI
        </div>
        <p className="font-black text-blue-100/80 text-lg uppercase tracking-wider mb-2">Total Savings</p>
        <motion.h2
          key={results.totalSavingsOverTime}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          {formatToK(results.totalSavingsOverTime)}
        </motion.h2>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 relative z-10 mb-8">
        {[
          { label: 'Monthly', val: formatToK(results.monthlySavings), color: 'bg-[#FFD700]' },
          { label: 'ROI (1yr)', val: `${results.roi}%`, color: 'bg-[#F4C700]' },
          { label: 'Payback', val: `${results.breakEven}`, sub: 'months', color: 'bg-[#FFD700]' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-[24px] flex flex-col border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <div className={`${item.color} text-black text-[10px] font-black py-2 px-1 text-center border-b-2 border-black uppercase tracking-widest`}>
              {item.label}
            </div>
            <div className="p-4 text-center text-black flex flex-col justify-center items-center grow min-h-[80px]">
              <span className="font-black text-2xl md:text-3xl tracking-tighter leading-none">{item.val}</span>
              {item.sub && <span className="text-[10px] font-black block mt-1 uppercase text-slate-400">{item.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Breakdown List */}
      <div className="bg-black/20 backdrop-blur-lg rounded-[32px] overflow-hidden text-white relative z-10 mb-8 border-2 border-white/10 p-6 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-black text-blue-100/60 uppercase text-[14px] tracking-widest">Daily / Employee</span>
          <span className="font-black text-xl tracking-tight">${results.dailySavingsPerEmp.toFixed(2)}</span>
        </div>
        <div className="w-full h-px bg-white/10" />
        <div className="flex justify-between items-center text-sm text-white">
          <span className="font-black text-blue-100/60 uppercase text-[14px] tracking-widest">Annual / Employee</span>
          <span className="font-black text-xl tracking-tight">{formatToK(results.annualSavingsPerEmp)}</span>
        </div>
        <div className="w-full h-px bg-white/10" />
        <div className="flex justify-between items-center text-sm">
          <span className="font-black text-blue-100/60 uppercase text-[14px] tracking-widest">Team Capacity</span>
          <span className="font-black text-xl tracking-tight">{state.staffCount} Staff</span>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="bg-white text-black p-6 rounded-[28px] flex flex-col md:flex-row justify-between items-center relative z-10 mb-8 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] gap-2">
        <span className="font-black text-slate-400 uppercase text-[16px] tracking-widest">Projected {state.timeframe}-Year Gain</span>
        <span className="text-3xl font-black tracking-tighter text-[#0066FF]">{formatToK(results.totalSavingsOverTime)}</span>
      </div>

      <div className="mt-auto relative">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className={clsx(
            "no-capture group relative z-10 w-full py-5 rounded-2xl font-black text-xl uppercase tracking-widest border-2 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden",
            isExporting
              ? "bg-slate-800 text-slate-400 border-slate-700 cursor-not-allowed"
              : "bg-black text-white border-white/20 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] hover:border-white/40 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] transition-all active:scale-95"
          )}
        >
          {isExporting ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Download className="group-hover:translate-y-[2px] transition-transform duration-300" size={24} />
              <span>Export Analysis</span>
            </>
          )}

          {/* Shimmer Effect */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={isExporting ? { x: '100%' } : { x: '-100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          />
        </button>
      </div>
    </section>
  );
};
