'use client';
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSoftwareCostCalculator } from '@/hooks/useSoftwareCostCalculator';
import clsx from 'clsx';

// Import Modular Components
import Step1_EmployeeCount from './calculator/Step1_EmployeeCount';
import Step2_SelectSoftware from './calculator/Step2_SelectSoftware';
import Step3_ConfigureSoftware from './calculator/Step3_ConfigureSoftware';
import Step4_Results from './calculator/Step4_Results';

export default function SoftwareCostComparisonCalculator() {
    const {
        step,
        handleStepChange,
        employeeCount,
        updateEmployeeCount,
        departmentData,
        toggleDepartment,
        updateDepartment,
        results,
        formatPrice,
        duration,
        setDuration
    } = useSoftwareCostCalculator();

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll for better UX: Step 3 scrolls to bottom to show action button, others to top
    React.useEffect(() => {
        // Small delay to allow AnimatePresence to complete entry and layout
        const timer = setTimeout(() => {
            if (containerRef.current) {
                let y;
                if (step === 3) {
                    // Scroll so the bottom of the section is visible
                    const rect = containerRef.current.getBoundingClientRect();
                    y = rect.bottom + window.pageYOffset - window.innerHeight + 40;
                } else {
                    const yOffset = -100;
                    y = containerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                }
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [step]);
    return (
        <div ref={containerRef} className={clsx("w-full mx-auto transition-all duration-700 ease-in-out", step === 4 ? "max-w-6xl" : "max-w-4xl")}>
            <header className={clsx(
                "text-center transition-all duration-500 relative z-10",
                step === 1 ? "mb-16" : "mb-8"
            )}>
                <div className={clsx(
                    "inline-block bg-[#0066FF] text-white border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                    step === 1 ? "mb-6" : "mb-4 scale-90"
                )}>
                    Expense Auditor
                </div>
                <h2 className={clsx(
                    "font-black tracking-tighter leading-[0.9] transition-all duration-500",
                    step === 1 ? "text-5xl md:text-7xl mb-4" : "text-3xl md:text-4xl mb-2"
                )}>
                    {step === 1 ? (
                        <>OPTIMIZE <br /> <span className="text-[#0066FF] relative inline-block">STACK COSTS</span></>
                    ) : (
                        <span className="text-[#0066FF]">AUDIT IN PROGRESS</span>
                    )}
                </h2>
                {step === 1 && (
                    <p className="text-slate-500 font-bold text-lg mt-6">
                        Audit your current software spend and find cheaper alternatives.
                    </p>
                )}
            </header>

            {/* Progress Bar Container */}
            <div className={clsx("max-w-xl mx-auto px-4 transition-all duration-500", step === 1 ? "mb-12" : "mb-8")}>
                <div className="flex justify-between mb-3 px-1">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={clsx(
                            "w-7 h-7 rounded-full border-2 border-black flex items-center justify-center font-black text-[10px] transition-all duration-500",
                            step >= s ? "bg-[#0066FF] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : "bg-white text-slate-300 border-slate-200"
                        )}>
                            {s}
                        </div>
                    ))}
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full w-full overflow-hidden border-2 border-black relative shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                    <motion.div
                        className="h-full absolute top-0 left-0 bg-[#0066FF]"
                        initial={{ width: '25%' }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <Step1_EmployeeCount
                        employeeCount={employeeCount}
                        updateEmployeeCount={updateEmployeeCount}
                        handleStepChange={handleStepChange}
                    />
                )}

                {step === 2 && (
                    <Step2_SelectSoftware
                        departmentData={departmentData}
                        toggleDepartment={toggleDepartment}
                        handleStepChange={handleStepChange}
                    />
                )}

                {step === 3 && (
                    <Step3_ConfigureSoftware
                        departmentData={departmentData}
                        updateDepartment={updateDepartment}
                        handleStepChange={handleStepChange}
                        formatPrice={formatPrice}
                        employeeCount={employeeCount}
                    />
                )}

                {step === 4 && (
                    <Step4_Results
                        results={results}
                        departmentData={departmentData}
                        duration={duration}
                        setDuration={setDuration}
                        handleStepChange={handleStepChange}
                        formatPrice={formatPrice}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
