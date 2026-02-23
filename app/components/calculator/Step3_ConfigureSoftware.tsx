'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { SOFTWARE_CATEGORIES } from '@/constants/calculator';
import { CategoryIcon, CATEGORY_COLORS } from './CategoryIcon';
import { ChevronDown } from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

interface Step3Props {
    departmentData: any[];
    updateDepartment: (id: string, updates: any) => void;
    handleStepChange: (step: number) => void;
    formatPrice: (price: number) => string;
    employeeCount: number;
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

// Extracted Dropdown List component to use the hook easily
const DropdownList = ({
    category,
    dept,
    color,
    updateDepartment,
    setActiveDropdown,
    formatPrice
}: any) => {
    const listRef = useStopScrollPropagation();
    const selectedIndices = dept.selectedCompetitors || [];

    // Sort: selected items first
    const sortedCompetitors = [...(category.competitors || [])].map((comp, originalIdx) => ({
        ...comp,
        originalIdx
    })).sort((a, b) => {
        const aSelected = selectedIndices.includes(a.originalIdx);
        const bSelected = selectedIndices.includes(b.originalIdx);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
    });

    return (
        <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-30 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden max-h-60 overflow-y-auto overscroll-contain touch-pan-y"
            data-lenis-prevent
        >
            {sortedCompetitors.map((comp: any, idx: number) => {
                const isSelected = selectedIndices.includes(comp.originalIdx);
                const isDefault = comp.originalIdx === 0;

                // Show divider after the last selected item if there are unselected items following
                const isLastSelected = isSelected && (idx + 1 < sortedCompetitors.length && !selectedIndices.includes(sortedCompetitors[idx + 1].originalIdx));
                const showDivider = isLastSelected;

                return (
                    <React.Fragment key={comp.originalIdx}>
                        <button
                            onClick={() => {
                                let newSelected;
                                if (isSelected) {
                                    newSelected = selectedIndices.filter((i: number) => i !== comp.originalIdx);
                                } else {
                                    newSelected = [...selectedIndices, comp.originalIdx];
                                }
                                updateDepartment(dept.id, { selectedCompetitors: newSelected });
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex justify-between items-center group"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                                    style={{
                                        backgroundColor: isSelected ? color : 'transparent',
                                        borderColor: isSelected ? color : '#cbd5e1'
                                    }}
                                >
                                    {isSelected && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span className={isSelected ? "text-slate-900 font-bold" : "group-hover:text-slate-900 transition-colors"}>{comp.name}</span>
                            </div>
                        </button>
                        {showDivider && <div className="h-px bg-slate-200 mx-3 my-1" />}
                    </React.Fragment>
                );
            })}
        </motion.div>
    );
};

export default function Step3_ConfigureSoftware({ departmentData, updateDepartment, handleStepChange, formatPrice, employeeCount }: Step3Props) {
    const activeDepartments = departmentData.filter(d => d.active);
    const [dropdownState, setDropdownState] = React.useState<{ id: string, top: number, left: number, width: number } | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Close dropdown on resize or scroll
    React.useEffect(() => {
        const handleResize = () => setDropdownState(null);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Attach hook to main scroll container
    const mainListRef = useStopScrollPropagation();

    const handleModalSubmit = (data: any) => {
        setIsModalOpen(false);
        handleStepChange(4);
    };

    return (
        <motion.div
            ref={containerRef}
            key="step3"
            variants={CARD_VARIANTS}
            initial="hidden" animate="visible" exit="exit"
            className="bg-white border-2 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] z-0 pointer-events-none border-b-2 border-l-2 border-black/5" />

            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-6 text-center tracking-tight leading-tight uppercase">
                    Configure your <br />
                    <span className="text-[#0066FF]">current stack</span>
                </h2>

                <div
                    ref={mainListRef}
                    onScroll={() => setDropdownState(null)}
                    className="grid md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-4 overscroll-contain touch-pan-y custom-scrollbar"
                    data-lenis-prevent
                >
                    {activeDepartments.map(dept => {
                        const category = SOFTWARE_CATEGORIES.find(c => c.id === dept.id);
                        if (!category) return null;
                        const color = CATEGORY_COLORS[dept.id] || '#0066FF';
                        const selectedIndices = dept.selectedCompetitors || [];

                        return (
                            <div key={dept.id}
                                className="relative border-2 border-black rounded-[24px] p-6 m-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-xl text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black" style={{ backgroundColor: color }}>
                                        <CategoryIcon id={dept.id} color="white" size={20} />
                                    </div>
                                    <h4 className="font-black text-lg tracking-tight uppercase">{category.name}</h4>
                                </div>

                                <div className="space-y-4">
                                    {dept.id === 'custom' ? (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Name</label>
                                                <input
                                                    type="text"
                                                    value={dept.customName}
                                                    onChange={(e) => updateDepartment(dept.id, { customName: e.target.value })}
                                                    placeholder="e.g. Legacy"
                                                    className="w-full rounded-xl border-2 border-black px-4 py-2.5 text-sm font-bold focus:outline-none focus:bg-slate-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Price</label>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={dept.customPrice}
                                                            onChange={(e) => updateDepartment(dept.id, { customPrice: parseFloat(e.target.value) || 0 })}
                                                            className="w-full rounded-xl border-2 border-black pl-8 pr-4 py-2.5 text-sm font-bold focus:outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Users</label>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={employeeCount}
                                                        value={dept.userCount}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value) || 0;
                                                            if (val <= employeeCount) {
                                                                updateDepartment(dept.id, { userCount: val });
                                                            }
                                                        }}
                                                        className="w-full rounded-xl border-2 border-black px-4 py-2.5 text-sm font-bold focus:outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Apps</label>
                                                <div className="relative">
                                                    <button
                                                        onClick={(e) => {
                                                            if (dropdownState?.id === dept.id) {
                                                                setDropdownState(null);
                                                            } else if (containerRef.current) {
                                                                const rect = e.currentTarget.getBoundingClientRect();
                                                                const containerRect = containerRef.current.getBoundingClientRect();
                                                                setDropdownState({
                                                                    id: dept.id,
                                                                    top: rect.bottom - containerRect.top,
                                                                    left: rect.left - containerRect.left,
                                                                    width: rect.width
                                                                });
                                                            }
                                                        }}
                                                        className="w-full flex items-center justify-between appearance-none rounded-xl border-2 border-black bg-white px-4 py-2.5 text-sm font-black transition-all hover:bg-slate-50 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]"
                                                    >
                                                        <span className="truncate">
                                                            {selectedIndices.length === 1
                                                                ? category.competitors?.[selectedIndices[0]]?.name
                                                                : selectedIndices.length > 1
                                                                    ? `${selectedIndices.length} items`
                                                                    : "Choose"}
                                                        </span>
                                                        <ChevronDown size={14} strokeWidth={3} className="text-slate-900 shrink-0 ml-2" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Active Users</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max={employeeCount}
                                                        value={dept.userCount}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value) || 0;
                                                            if (val <= employeeCount) {
                                                                updateDepartment(dept.id, { userCount: val });
                                                            }
                                                        }}
                                                        className="w-20 rounded-xl border-2 border-black px-3 py-2 text-sm font-black focus:outline-none transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]"
                                                    />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Users</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center border-t-2 border-slate-50 pt-8">
                    <button
                        onClick={() => handleStepChange(2)}
                        className="font-black text-xs uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={activeDepartments.some(d => d.id !== 'custom' && (!d.selectedCompetitors || d.selectedCompetitors.length === 0))}
                        className="bg-[#0066FF] text-white font-black text-lg px-10 py-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none uppercase tracking-widest"
                    >
                        Audit Savings
                    </button>
                </div>
            </div>

            {dropdownState && (() => {
                const dept = activeDepartments.find(d => d.id === dropdownState.id);
                const category = SOFTWARE_CATEGORIES.find(c => c.id === dept?.id);
                const color = CATEGORY_COLORS[dept?.id || ''] || '#0066FF';

                if (!dept || !category) return null;

                return (
                    <div style={{
                        position: 'absolute',
                        top: dropdownState.top,
                        left: dropdownState.left,
                        width: dropdownState.width,
                        zIndex: 50
                    }}>
                        <div className="fixed inset-0 z-20" onClick={() => setDropdownState(null)} />
                        <DropdownList
                            category={category}
                            dept={dept}
                            color={color}
                            updateDepartment={updateDepartment}
                            setActiveDropdown={() => setDropdownState(null)}
                            formatPrice={formatPrice}
                        />
                    </div>
                );
            })()}

            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
        </motion.div>
    );
}
