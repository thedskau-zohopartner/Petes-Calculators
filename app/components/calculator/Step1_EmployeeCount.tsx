'use client';
import React from 'react';
import { motion } from 'framer-motion';

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

interface Step1Props {
    employeeCount: number;
    updateEmployeeCount: (count: number) => void;
    handleStepChange: (step: number) => void;
}

export default function Step1_EmployeeCount({ employeeCount, updateEmployeeCount, handleStepChange }: Step1Props) {
    const [inputValue, setInputValue] = React.useState(employeeCount.toString());

    // Keep local input in sync with parent (e.g. when slider moves)
    React.useEffect(() => {
        setInputValue(employeeCount.toString());
    }, [employeeCount]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const numVal = parseInt(val);

        if (!isNaN(numVal)) {
            if (numVal > 200) {
                setInputValue('200');
                updateEmployeeCount(200);
            } else {
                setInputValue(val);
                updateEmployeeCount(numVal);
            }
        } else {
            setInputValue(val);
            if (val === '') {
                updateEmployeeCount(0);
            }
        }
    };

    const isInvalid = inputValue === '' || parseInt(inputValue) < 1;

    return (
        <motion.div
            key="step1"
            variants={CARD_VARIANTS}
            initial="hidden" animate="visible" exit="exit"
            className="bg-white border-2 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden max-w-2xl mx-auto"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] z-0 pointer-events-none border-b-2 border-l-2 border-black/5" />

            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-10 text-center tracking-tight leading-tight">
                    WHATS THE SIZE OF <br />
                    <span className="text-[#0066FF] uppercase">YOUR ORGANISATION?</span>
                </h2>

                <div className="flex justify-between items-end mb-6 group">
                    <span className="font-black text-slate-900 tracking-tight uppercase text-sm">Total Workforce</span>
                    <div className="border-2 border-black rounded-xl w-[110px] h-14 px-2 font-black text-xl text-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleTextChange}
                            onKeyDown={(e) => {
                                if (['+', '-', 'e', 'E', '.'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            className="w-full bg-transparent text-center outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[#0066FF]"
                            min="1"
                            max="200"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="relative flex items-center h-8 mb-8">
                    <div className="absolute w-full h-2.5 bg-slate-100 rounded-full border-2 border-black/5" />
                    <motion.div
                        className="absolute h-2.5 bg-[#0066FF] rounded-full border-y-2 border-black/10 transition-all duration-300"
                        style={{ width: `${(employeeCount / 200) * 100}%` }}
                    />
                    <input
                        type="range"
                        min="1" max="200"
                        value={employeeCount || 1}
                        onChange={(e) => updateEmployeeCount(parseInt(e.target.value))}
                        className="absolute w-full h-3 bg-transparent appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:active:scale-95"
                    />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-black px-1 uppercase tracking-widest mb-10">
                    <span>1 Unit</span>
                    <span>100 Units</span>
                    <span>200 Units</span>
                </div>

                <div className="flex justify-center border-t-2 border-slate-50 pt-8">
                    <button
                        onClick={() => handleStepChange(2)}
                        disabled={isInvalid}
                        className="w-full max-w-xs bg-[#F4C700] text-black font-black text-lg px-12 py-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 active:scale-95 uppercase tracking-widest"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
