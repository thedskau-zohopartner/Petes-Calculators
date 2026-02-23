'use client';
import { useState, useMemo, useCallback } from 'react';

export const useCalculator = () => {
  const [state, setState] = useState({
    staffCount: 100,
    hourlyRate: 50,
    hoursSaved: 0.25,
    workingDays: 260, // Default average work days
    implementationCost: 20000,
    timeframe: 1,
    isAdvancedOpen: false
  });

  const results = useMemo(() => {
    const dailySavingsPerEmp = state.hourlyRate * state.hoursSaved;
    
    // IMPACT: Annual savings now scales with the working days slider
    const annualSavingsPerEmp = dailySavingsPerEmp * state.workingDays;
    
    const totalAnnualSavings = state.staffCount * annualSavingsPerEmp;
    const totalSavingsOverTime = totalAnnualSavings * state.timeframe;
    const monthlySavings = totalAnnualSavings / 12;
    
    const netGain = totalSavingsOverTime - state.implementationCost;
    const roi = state.implementationCost > 0 
      ? ((netGain / state.implementationCost) * 100).toFixed(0)
      : "0";

    const breakEven = monthlySavings > 0 
      ? (state.implementationCost / monthlySavings).toFixed(1) 
      : "0";

    return {
      dailySavingsPerEmp,
      annualSavingsPerEmp,
      totalSavingsOverTime,
      monthlySavings,
      roi,
      breakEven
    };
  }, [state]);

  const formatToK = useCallback((num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${Math.round(num).toLocaleString()}`;
  }, []);

  return { state, setState, results, formatToK };
};