'use client';
import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '@/hooks/useCalculator';
import { ResultsDisplay } from './ResultsDisplay';
import Image from 'next/image';

const InputSlider = memo(({ label, value, min, max, step = 1, prefix = "", suffix = "", onChange, ticks }: any) => (
    <div className="mb-8 group">
        <div className="flex justify-between items-end mb-4">
            <span className="font-black text-[#0066FF] tracking-tight uppercase text-lg mb-1">{label}</span>
            <div className="border-2 border-black rounded-xl w-[120px] h-12 px-2 font-black text-xl text-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-0.5 group-hover:-translate-x-px group-hover:-translate-y-px group-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
                <span className="text-slate-400 text-sm">{prefix}</span>
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                            onChange("0");
                            return;
                        }
                        let numVal = parseFloat(val);
                        if (numVal > max) numVal = max;
                        onChange(numVal.toString());
                    }}
                    onKeyDown={(e) => {
                        if (['+', '-', 'e', 'E'].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className="w-full bg-transparent text-center outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none font-black"
                />
                <span className="text-slate-400 text-xs lowercase">{suffix}</span>
            </div>
        </div>
        <div className="relative flex items-center h-8">
            <div className="absolute w-full h-2 bg-slate-200 rounded-full border border-black/5" />
            <motion.div
                className="absolute h-2 bg-[#FFD700] rounded-full border-y border-l border-black/10"
                style={{ width: `${((value - min) / (max - min)) * 100}%` }}
            />
            <input
                type="range"
                min={min} max={max} step={step} value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-90"
            />
        </div>
        <div className="flex justify-between text-xs text-slate-400 font-black mt-2 px-1 uppercase tracking-tighter">
            {ticks.map((t: string) => <span key={t}>{t}</span>)}
        </div>
    </div>
));

InputSlider.displayName = 'InputSlider';

export default function AutomationSavingsCalculator() {
    const { state, setState, results, formatToK } = useCalculator();
    const [timeUnit, setTimeUnit] = useState<'min' | 'hr'>('min');

    const handleSlider = (key: string, value: string) => {
        setState((prev) => ({ ...prev, [key]: parseFloat(value) }));
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            <header className="text-center mb-12 relative z-10">
                <div className="inline-block bg-[#F4C700] border-2 border-black px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Efficiency Optimizer
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4">
                    ESTIMATE <span className="text-[#0066FF]">TIME SAVED</span>
                </h2>
                <p className="text-slate-500 font-bold text-lg mt-6">
                    See how much manual workload your team can eliminate.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Panel: Inputs */}
                <section className="bg-white border-2 border-black rounded-[40px] p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-[120px] z-0 pointer-events-none border-b-2 border-l-2 border-black/5" />

                    <div className="relative z-10">
                        <InputSlider label="Total Employees" value={state.staffCount} min={1} max={200} onChange={(v: any) => handleSlider('staffCount', v)} ticks={["1", "50", "100", "150", "200"]} />
                        <InputSlider label="Hourly Rate" value={state.hourlyRate} min={50} max={150} step={5} prefix="$" onChange={(v: any) => handleSlider('hourlyRate', v)} ticks={["$50", "$75", "$100", "$125", "$150"]} />
                        <InputSlider
                            label={
                                <div className="flex items-center gap-4">
                                    <span>Daily Time Saved</span>
                                    <button
                                        onClick={() => setTimeUnit(u => u === 'min' ? 'hr' : 'min')}
                                        className="text-[10px] bg-slate-100 hover:bg-[#F4C700] px-4 py-1.5 rounded-full border border-black font-black transition-colors uppercase"
                                    >
                                        Use {timeUnit === 'min' ? 'Hrs' : 'Mins'}
                                    </button>
                                </div>
                            }
                            value={timeUnit === 'min' ? Math.round(state.hoursSaved * 60) : state.hoursSaved}
                            min={timeUnit === 'min' ? 15 : 0.25}
                            max={timeUnit === 'min' ? 120 : 2}
                            step={timeUnit === 'min' ? 15 : 0.25}
                            suffix={timeUnit === 'min' ? "min" : "hrs"}
                            onChange={(v: any) => handleSlider('hoursSaved', (timeUnit === 'min' ? parseFloat(v || '0') / 60 : parseFloat(v || '0')).toString())}
                            ticks={timeUnit === 'min' ? ["15m", "30m", "45m", "60m", "75m", "90m", "105m", "120m"] : ["0.25h", "0.5h", "0.75h", "1h", "1.25h", "1.5h", "1.75h", "2h"]}
                        />

                        <InputSlider
                            label="Working days per year"
                            value={state.workingDays}
                            min={150}
                            max={365}
                            onChange={(v: any) => handleSlider('workingDays', v)}
                            ticks={["150", "200", "260", "310", "365"]}
                        />

                        <div className="mb-10">
                            <label className="block text-sm font-black mb-4 uppercase tracking-wider text-[#0066FF]">Projection Timeline</label>
                            <div className="flex gap-4">
                                {[1, 2, 3].map((yr) => (
                                    <button key={yr} onClick={() => setState({ ...state, timeframe: yr })}
                                        className={`flex-1 py-4 rounded-2xl border-2 border-black font-black text-lg transition-all ${state.timeframe === yr ? 'bg-[#FFD700] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5' : 'bg-white text-slate-300 hover:text-slate-900 shadow-none'}`}>
                                        {yr} Year{yr > 1 ? 's' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setState(s => ({ ...s, isAdvancedOpen: !s.isAdvancedOpen }))}
                            className="font-black text-sm uppercase text-slate-400 hover:text-black transition-colors"
                        >
                            {state.isAdvancedOpen ? 'Hide' : 'Show'} Advanced Options
                        </button>

                        <AnimatePresence>
                            {state.isAdvancedOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="pt-6 border-t-2 px-1 border-slate-100 mt-2">
                                        <InputSlider label="Implementation Cost" value={state.implementationCost} min={5000} max={100000} step={1000} prefix="$" onChange={(v: any) => handleSlider('implementationCost', v)} ticks={["$5K", "$25K", "$50K", "$75K", "$100K"]} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Right Panel: Results */}
                <div className="sticky top-8">
                    <ResultsDisplay results={results} state={state} formatToK={formatToK} />
                </div>
            </div>
        </div>
    );
}
