'use client';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CalculatorSection({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isComparison = pathname.includes('comparison');
  const isAutomation = pathname.includes('automation');
  const isHome = pathname === '/';

  return (
    <section id="calculator-section" className="min-h-screen bg-[#F8FAFC] p-6 md:p-20 md:pb-16 font-sans text-slate-900 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {!isHome && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <Link href="/" className="flex items-center gap-2 font-black text-sm uppercase tracking-wider hover:text-[#0066FF] transition-colors group">
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
              Back to Tools
            </Link>

            {/* Compact Navigation Buttons */}
            <div className="flex bg-slate-200/50 p-1.5 rounded-2xl border-[1.5px] border-slate-200">
              <Link
                href="/automation"
                className={clsx(
                  "px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                  isAutomation
                    ? "bg-[#F4C700] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-[1.5px] border-black"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Automation
              </Link>

              <Link
                href="/comparison"
                className={clsx(
                  "px-6 py-2.5 rounded-xl font-bold text-sm transition-all",
                  isComparison
                    ? "bg-[#0066FF] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-[1.5px] border-black"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Cost Comparison
              </Link>
            </div>
          </div>
        )}

        <div>
          {children}
        </div>
      </div>
    </section>
  );
}
