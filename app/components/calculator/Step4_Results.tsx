'use client';
import React from 'react';
import { motion, animate, useInView } from 'framer-motion';
import clsx from 'clsx';
import { AppWindow, Tag } from 'lucide-react';
import { SOFTWARE_CATEGORIES } from '@/constants/calculator';
import { CATEGORY_COLORS, CategoryIcon } from './CategoryIcon';
import { Svg1, Svg2 } from './Svgs';
import { CostReductionCard, ProductivityGraph, ProcessRing } from './MetricCharts';
import { ZOHO_METRICS, CATEGORY_TO_ZOHO_APP } from '@/constants/zohoMetrics';
import ShimmerLink from '../ShimmerLink';

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

function Counter({ from, to, formatter, duration = 1.5 }: { from: number; to: number; formatter?: (val: number) => string, duration?: number }) {
    const nodeRef = React.useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true });

    React.useEffect(() => {
        const node = nodeRef.current;
        if (!node || !isInView) return;

        const controls = animate(from, to, {
            duration: duration,
            ease: "easeOut",
            onUpdate(value) {
                node.textContent = formatter ? formatter(value) : value.toFixed(0);
            }
        });

        return () => controls.stop();
    }, [from, to, formatter, duration, isInView]);

    return <span ref={nodeRef}>{formatter ? formatter(from) : from}</span>;
}

// Helper hook to forcefully stop scroll propagation
const useStopScrollPropagation = (active: boolean = true) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!active) return;
        const element = ref.current;
        if (!element) return;

        const handleEvent = (e: any) => {
            e.stopPropagation();
        };

        // Add non-passive listeners to forcefully hijack the event
        element.addEventListener('wheel', handleEvent, { passive: false });
        element.addEventListener('touchmove', handleEvent, { passive: false });
        element.addEventListener('pointerdown', handleEvent, { passive: false }); // Stop Lenis from grabbing

        return () => {
            element.removeEventListener('wheel', handleEvent);
            element.removeEventListener('touchmove', handleEvent);
            element.removeEventListener('pointerdown', handleEvent);
        };
    }, [active]);

    return ref;
};

interface Step4Props {
    results: any;
    departmentData: any[];
    duration: number;
    setDuration: (duration: number) => void;
    handleStepChange: (step: number) => void;
    formatPrice: (price: number) => string;
}


export default function Step4_Results({ results, departmentData, duration, setDuration, handleStepChange, formatPrice }: Step4Props) {
    // Attach hook to breakdown list scroll container
    const breakdownListRef = useStopScrollPropagation();

    // Calculate aggregate metrics based on active departments
    const aggregateMetrics = React.useMemo(() => {
        const activeMetrics = departmentData
            .filter(d => d.active)
            .map(d => {
                const appName = CATEGORY_TO_ZOHO_APP[d.id];
                return appName ? ZOHO_METRICS[appName] : null;
            })
            .filter(Boolean);

        if (activeMetrics.length === 0) {
            return {
                productivity: 0,
                roi: 0,
                process: 0,
                costReduction: 0
            };
        }

        const sum = activeMetrics.reduce((acc, curr) => ({
            productivity: acc.productivity + (curr?.ProductivityIncrease || 0),
            roi: acc.roi + (curr?.ROIScore || 0),
            process: acc.process + (curr?.ProcessImprovement || 0)
            // costReduction is now calculated from real totals, not averaged
        }), { productivity: 0, roi: 0, process: 0 });

        // Calculate real cost reduction percentage based on financial results
        // Savings / Total Current Cost * 100
        const realCostReduction = results.totalCompetitorCost > 0
            ? (results.savings / results.totalCompetitorCost) * 100
            : 0;

        return {
            productivity: Math.round(sum.productivity / activeMetrics.length),
            roi: Number((sum.roi / activeMetrics.length).toFixed(1)),
            process: Math.round(sum.process / activeMetrics.length),
            costReduction: Math.round(Math.max(0, realCostReduction)) // Ensure non-negative for "Reduction" display
        };
    }, [departmentData, results]);

    return (
        <motion.div
            key="step4"
            variants={CARD_VARIANTS}
            initial="hidden" animate="visible" exit="exit"
            className="space-y-8"
        >
            {/* Primary Results Card */}
            <div
                className="bg-[#0066FF] text-white border-2 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col items-center"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 right-0 z-0 select-none pointer-events-none opacity-40 mix-blend-overlay">
                    <img src="/Images/Money_bg.png" alt="Decoration" className="w-full h-auto scale-110" />
                </div>

                <div className="relative z-10 w-full max-w-4xl flex-1 flex flex-col items-center">
                    <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                        Total Audit Savings
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                        {results.isSavings ? formatPrice(results.savings) : `-${formatPrice(Math.abs(results.savings))}`}
                    </h2>

                    <p className="text-lg md:text-xl font-black text-blue-100/80 uppercase tracking-widest flex flex-wrap items-center justify-center gap-x-2">
                        Estimated
                        <motion.span
                            key={Math.round((results.savings / results.totalCompetitorCost) * 100)}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            className="text-2xl md:text-3xl font-semibold tracking-normal"
                        >
                            <Counter
                                from={0}
                                to={Math.round((results.savings / results.totalCompetitorCost) * 100)}
                                formatter={(val) => `${Math.round(val)}%`}
                            />
                        </motion.span>
                        {duration}-Year Profit Increase
                    </p>

                    {/* Visual Comparison Chart */}
                    <div className="w-full flex justify-center items-end gap-12 md:gap-24 h-[280px] border-b-2 border-white/20 pb-8 relative mb-8 pt-12">
                        {/* Current Cost Bar */}
                        <div className="flex flex-col items-center group w-full max-w-[200px]">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-full bg-white rounded-t-2xl border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between relative"
                            >
                                <div className="text-black text-center">
                                    <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Legacy Cost</div>
                                    <div className="text-2xl md:text-3xl font-black tracking-tight">{formatPrice(results.totalCompetitorCost)}</div>
                                </div>
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="mb-4"
                                >
                                    <AppWindow className="text-slate-200" size={48} />
                                </motion.div>
                            </motion.div>
                            <span className="font-black text-[12px] uppercase tracking-widest text-blue-100 mt-4">Current Stack</span>
                        </div>

                        {/* Zoho Cost Bar */}
                        <div className="flex flex-col items-center group w-full max-w-[140px]">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max((results.totalZohoCost / results.totalCompetitorCost) * 100, 20)}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                className="w-full bg-[#F4C700] rounded-t-2xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between relative"
                            >
                                <div className="text-black text-center">
                                    <div className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Zoho One</div>
                                    <div className="text-lg md:text-xl font-black tracking-tight">{formatPrice(results.totalZohoCost)}</div>
                                </div>
                                <Tag className="text-black/10 mb-2" size={24} />
                            </motion.div>
                            <span className="font-black text-[11px] uppercase tracking-widest text-[#F4C700] mt-4">Optimized Stack</span>
                        </div>
                    </div>

                    {/* Timeframe Selector */}
                    <div className="flex bg-white/10 p-1 rounded-2xl border-2 border-white/10">
                        {[1, 2, 3].map(yr => (
                            <button
                                key={yr}
                                onClick={() => setDuration(yr)}
                                className={clsx(
                                    "px-6 py-2 rounded-xl font-black text-xs transition-all uppercase tracking-widest",
                                    duration === yr
                                        ? "bg-[#F4C700] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                                        : "text-white/60 hover:text-white"
                                )}
                            >
                                {yr} Year{yr > 1 && 's'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group transition-all hover:translate-y-[-2px]">
                    <CostReductionCard value={aggregateMetrics.costReduction} />
                </div>
                <div className="group transition-all hover:translate-y-[-2px]">
                    <ProductivityGraph value={aggregateMetrics.productivity} />
                </div>
                <div className="group transition-all hover:translate-y-[-2px]">
                    <ProcessRing value={aggregateMetrics.process} />
                </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white border-2 border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="p-6 border-b-2 border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-lg font-black uppercase tracking-tight">Audit Breakdown</h3>
                    <div className="text-[10px] font-black bg-[#F4C700] px-3 py-1.5 rounded-lg border-2 border-black uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {duration} Year Outlook
                    </div>
                </div>

                <div
                    ref={breakdownListRef}
                    className="max-h-[350px] overflow-y-auto p-4 space-y-3 overscroll-contain touch-pan-y custom-scrollbar"
                    data-lenis-prevent
                >
                    {results.breakdown.map((item: any, idx: number) => {
                        const deptId = departmentData.find(d => d.active && (SOFTWARE_CATEGORIES.find(c => c.id === d.id)?.name === item.categoryName || d.id === item.categoryName))?.id || '';
                        const color = CATEGORY_COLORS[deptId] || '#0066FF';

                        return (
                            <div key={idx} className="flex justify-between items-center p-4 rounded-xl border-2 border-black/5 bg-white hover:border-black/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-xl shrink-0"
                                        style={{ backgroundColor: color }}
                                    >
                                        <CategoryIcon id={deptId} color="white" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900 text-sm tracking-tight uppercase">{item.productName}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 scale-90 origin-left">
                                                {item.categoryName}
                                            </span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                                                {item.userCount} Units / {formatPrice(item.pricePerUser)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-lg text-black tracking-tighter leading-none">{formatPrice(item.totalCost)}</div>
                                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Projected</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="p-6 border-t-2 border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Estimated Spend</div>
                        <div className="text-2xl font-black tracking-tighter text-[#0066FF]">{formatPrice(results.totalCompetitorCost)}</div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
                <button
                    onClick={() => handleStepChange(3)}
                    className="font-black text-xs uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                >
                    ← Review setup
                </button>

                <button
                    onClick={() => handleStepChange(1)}
                    className="w-full max-w-xs bg-[#F4C700] text-black font-black text-lg px-12 py-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 active:scale-95 uppercase tracking-widest"
                >
                    Restart Audit
                </button>
            </div>

        </motion.div>
    );
}
