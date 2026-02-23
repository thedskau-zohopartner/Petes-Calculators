'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { TrendingDown, Zap, Settings, Quote } from 'lucide-react';

// --- 1. COST REDUCTION: QUOTE CARD ---
export const CostReductionCard = ({ value }: { value: number }) => {
    return (
        <div className="relative flex flex-col justify-between h-full w-full bg-[#34A853] border-2 border-black shadow-[4px_4px_0px_0px_#000000] overflow-hidden p-5 group rounded-[20px] font-sans">
            {/* Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <TrendingDown size={80} className="text-black" />
            </div>

            <div className="relative z-10">
                <div className="bg-black text-white px-2 py-0.5 inline-block text-[10px] font-black uppercase mb-2 shadow-[2px_2px_0px_0px_#fff]">
                    Cost Efficiency
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white tracking-tighter leading-none">
                        {Math.round(value)}%
                    </span>
                    <span className="text-md font-bold text-black/60 uppercase">Savings</span>
                </div>
                <div className="text-white font-bold text-sm">Operational Cost Reduction</div>
            </div>

            <div className="relative z-10 mt-auto pt-2">
                <Quote size={16} className="text-black mb-1 fill-black rotate-180" />
                <p className="text-md font-bold text-white italic leading-tight border-l-4 border-black pl-2 pr-1">
                    "Transitioning to Zoho One unifies your stack, drastically cutting fees."
                </p>
            </div>

            {/* Animated BG Pattern */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }} />
        </div>
    );
};

// --- 2. PRODUCTIVITY: LINE GRAPH ---
export const ProductivityGraph = ({ value }: { value: number }) => {
    return (
        <div className="relative flex flex-col h-full w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] overflow-hidden rounded-[20px] font-sans">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b-2 border-black bg-slate-50 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-[#0066FF] p-1 border border-black">
                        <Zap size={14} className="text-white fill-white" />
                    </div>
                    <span className="text-xs font-black uppercase text-black">Productivity</span>
                </div>
                <span className="text-xl font-black text-[#0066FF]">+{Math.round(value)}%</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative p-4 bg-white flex flex-col justify-end min-h-0">
                {/* Grid */}
                <div className="absolute inset-0 mx-4 mb-8 mt-4 border-l border-b border-dashed border-slate-300"></div>

                {/* Line Graph SVG */}
                <div className="relative w-full h-full z-10 flex items-end pb-2 justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100">
                        {/* Area Fill */}
                        <motion.path
                            d="M 0 100 L 0 80 L 50 70 L 100 85 L 150 40 L 200 10 L 200 100 Z"
                            fill="#0066FF"
                            fillOpacity="0.1"
                            initial={{ d: "M 0 100 L 0 100 L 50 100 L 100 100 L 150 100 L 200 100 L 200 100 Z" }}
                            animate={{ d: "M 0 100 L 0 80 L 50 70 L 100 85 L 150 40 L 200 10 L 200 100 Z" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* Stroke Line */}
                        <motion.path
                            d="M 0 80 L 50 70 L 100 85 L 150 40 L 200 10"
                            fill="none"
                            stroke="#0066FF"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        {/* Nodes */}
                        {[0, 50, 100, 150, 200].map((x, i) => (
                            <motion.circle
                                key={x}
                                cx={x}
                                cy={[80, 70, 85, 40, 10][i]}
                                r="4"
                                fill="white"
                                stroke="#0066FF"
                                strokeWidth="2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.5 + (i * 0.1) }}
                            />
                        ))}
                    </svg>
                </div>

                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase shrink-0 w-full">
                    <span>Current</span>
                    <span>Projected</span>
                </div>
            </div>
        </div>
    );
};

// --- 3. PROCESS: SWEEPING RING ---
export const ProcessRing = ({ value }: { value: number }) => {
    // Value 0-100
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
        <div className="relative flex flex-col items-center justify-between h-full w-full bg-[#fcfcfc] border-2 border-black shadow-[4px_4px_0px_0px_#000000] overflow-hidden p-4 rounded-[20px] font-sans">
            <div className="w-full flex justify-between items-start mb-2 shrink-0">
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-slate-400">Optimization</span>
                    <span className="text-sm font-bold text-black border-b-2 border-[#F4C700] inline-block">Process Flow</span>
                </div>
                {/* Gear icon removed as requested */}
            </div>

            <div className="relative w-48 h-24 overflow-hidden mt-auto mb-auto shrink-0 scale-90">
                {/* Gauge Background */}
                <svg className="w-full h-full" viewBox="0 0 200 100">
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#eee" strokeWidth="20" strokeLinecap="butt" />
                    <motion.path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#F4C700"
                        strokeWidth="20"
                        strokeLinecap="butt"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 * (1 - clampedValue / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-4xl font-black text-black leading-none">
                        {Math.round(value)}%
                    </span>
                </div>
            </div>

            <div className="w-full bg-white border border-black p-2 mt-2 shadow-[2px_2px_0px_0px_#ccc] flex items-center justify-center gap-2 shrink-0 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-[#F4C700] border border-black animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase text-black">Workflow Automated</span>
            </div>
        </div>
    );
}
