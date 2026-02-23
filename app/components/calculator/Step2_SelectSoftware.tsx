'use client';
import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { SOFTWARE_CATEGORIES } from '@/constants/calculator';
import { CategoryIcon, CATEGORY_COLORS } from './CategoryIcon';
import { Check } from 'lucide-react';

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

interface Step2Props {
    departmentData: any[];
    toggleDepartment: (id: string) => void;
    handleStepChange: (step: number) => void;
}

export default function Step2_SelectSoftware({ departmentData, toggleDepartment, handleStepChange }: Step2Props) {
    const activeDepartments = departmentData.filter(d => d.active);

    return (
        <motion.div
            key="step2"
            variants={CARD_VARIANTS}
            initial="hidden" animate="visible" exit="exit"
            className="bg-white border-2 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] z-0 pointer-events-none border-b-2 border-l-2 border-black/5" />

            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-8 text-center tracking-tight leading-tight uppercase">
                    Which software categories <br />
                    <span className="text-[#0066FF]">do you use?</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {SOFTWARE_CATEGORIES.map(category => {
                        const isActive = departmentData.find(d => d.id === category.id)?.active;
                        const color = CATEGORY_COLORS[category.id] || '#0066FF';
                        return (
                            <motion.div
                                key={category.id}
                                onClick={() => toggleDepartment(category.id)}
                                whileTap={{ scale: 0.95 }}
                                className={clsx(
                                    "relative cursor-pointer rounded-2xl border-2 border-black p-4 flex flex-col items-center justify-center gap-2 transition-all h-32 text-center",
                                    isActive
                                        ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                                        : "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                                )}
                                style={{
                                    backgroundColor: isActive ? color : 'white',
                                    color: isActive ? 'white' : 'black',
                                }}
                            >
                                {isActive && (
                                    <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 border-2 border-black">
                                        <Check size={10} color="black" strokeWidth={4} />
                                    </div>
                                )}
                                <div className={clsx("transition-transform duration-300", isActive && "scale-105")}>
                                    <CategoryIcon id={category.id} color={isActive ? 'white' : color} size={20} />
                                </div>
                                <span className="font-black text-[10px] uppercase tracking-tight leading-tight">{category.name}</span>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center border-t-2 border-slate-50 pt-8">
                    <button
                        onClick={() => handleStepChange(1)}
                        className="font-black text-xs uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={() => handleStepChange(3)}
                        disabled={activeDepartments.length === 0}
                        className="bg-[#0066FF] text-white font-black text-lg px-10 py-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none uppercase tracking-widest"
                    >
                        Review Stack
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
