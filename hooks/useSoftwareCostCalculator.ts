'use client';

import { useState, useMemo, useCallback } from 'react';
import { SOFTWARE_CATEGORIES, SoftwareCategory } from '@/constants/calculator';

export interface DepartmentData {
    id: string;
    active: boolean;
    userCount: number;
    selectedCompetitors: number[]; // Indices in the competitors array
    customName: string;
    customPrice: number;
}

const ZOHO_ONE_PRICE = 37.00; // USD per user per month

export const useSoftwareCostCalculator = () => {
    const [step, setStep] = useState(1);
    const [employeeCount, setEmployeeCount] = useState(20);
    const [duration, setDuration] = useState(1); // Years: 1, 2, 3

    // Initialize department data based on categories
    const [departmentData, setDepartmentData] = useState<DepartmentData[]>(() =>
        SOFTWARE_CATEGORIES.map(category => ({
            id: category.id,
            active: category.initialSelected || false,
            // Initial calc based on default employeeCount (20)
            userCount: Math.max(1, Math.min(20, Math.ceil(20 * (category.defaultUserRatio || 0.25)))),
            selectedCompetitors: category.competitors && category.competitors.length > 0 ? [0] : [],
            customName: '',
            customPrice: 50
        }))
    );

    const handleStepChange = (newStep: number) => {
        setStep(newStep);
    };

    const updateEmployeeCount = (count: number) => {
        setEmployeeCount(count);
        
        setDepartmentData(prev => prev.map(dept => {
            const category = SOFTWARE_CATEGORIES.find(cat => cat.id === dept.id);
            const ratio = category ? category.defaultUserRatio : 0.25;
            
            // Calculate new default based on ratio
            const newDefault = Math.max(1, Math.min(count, Math.ceil(count * ratio)));

            return {
                ...dept,
                userCount: newDefault // Always scale to match new employee count
            };
        }));
    };

    const toggleDepartment = (id: string) => {
        setDepartmentData(prev => prev.map(dept => {
            if (dept.id === id) {
                const isActive = !dept.active;
                const category = SOFTWARE_CATEGORIES.find(cat => cat.id === dept.id);
                const ratio = category ? category.defaultUserRatio : 0.25;
                
                // When activating, set to default ratio of CURRENT employee count
                const userCount = isActive ? Math.max(1, Math.min(employeeCount, Math.ceil(employeeCount * ratio))) : dept.userCount;
                
                // Ensure we have at least one selected competitor if none
                const selectedCompetitors = dept.selectedCompetitors.length === 0 && category?.competitors && category.competitors.length > 0 
                    ? [0] 
                    : dept.selectedCompetitors;

                return { ...dept, active: isActive, userCount, selectedCompetitors };
            }
            return dept;
        }));
    };

    const updateDepartment = (id: string, updates: Partial<DepartmentData>) => {
        setDepartmentData(prev => prev.map(dept => {
            if (dept.id === id) {
                return { ...dept, ...updates };
            }
            return dept;
        }));
    };

    /**
     * Calculates the monthly cost for a single competitor based on its pricing model.
     * - 'per_user': price × userCount
     * - 'flat_monthly': price (fixed, regardless of user count)
     */
    const getCompetitorMonthlyCost = (
        competitor: { price: number; pricingModel: 'per_user' | 'flat_monthly' },
        userCount: number
    ): number => {
        if (competitor.pricingModel === 'flat_monthly') {
            return competitor.price;
        }
        return userCount * competitor.price;
    };

    const results = useMemo(() => {
        const zohoMonthlyCost = employeeCount * ZOHO_ONE_PRICE;
        let competitorMonthlyCost = 0;

        departmentData.forEach(dept => {
            if (dept.active) {
                const category = SOFTWARE_CATEGORIES.find(cat => cat.id === dept.id);

                if (dept.id === 'custom') {
                    // Custom software is always treated as per-user
                    competitorMonthlyCost += dept.userCount * (dept.customPrice || 0);
                } else if (category && category.competitors && dept.selectedCompetitors.length > 0) {
                    dept.selectedCompetitors.forEach(idx => {
                        const competitor = category.competitors?.[idx];
                        if (competitor) {
                            competitorMonthlyCost += getCompetitorMonthlyCost(competitor, dept.userCount);
                        }
                    });
                }
            }
        });

        const totalCompetitorCost = competitorMonthlyCost * 12 * duration;
        const totalZohoCost = zohoMonthlyCost * 12 * duration;
        const savings = totalCompetitorCost - totalZohoCost;
        const isSavings = savings > 0;

        // Breakdown data
        const breakdown = departmentData
            .filter(dept => dept.active)
            .flatMap(dept => {
                const category = SOFTWARE_CATEGORIES.find(cat => cat.id === dept.id);

                if (dept.id === 'custom') {
                    const monthly = dept.userCount * (dept.customPrice || 0);
                    return [{
                        categoryName: category?.name || dept.id,
                        productName: dept.customName || 'Custom Software',
                        userCount: dept.userCount,
                        pricePerUser: dept.customPrice || 0,
                        pricingModel: 'per_user' as const,
                        monthlyCost: monthly,
                        totalCost: monthly * 12 * duration
                    }];
                } else if (category && category.competitors && dept.selectedCompetitors.length > 0) {
                    return dept.selectedCompetitors.map(idx => {
                         const competitor = category.competitors?.[idx];
                         if (!competitor) return null;
                         const monthly = getCompetitorMonthlyCost(competitor, dept.userCount);
                         return {
                            categoryName: category.name,
                            productName: competitor.name,
                            userCount: dept.userCount,
                            pricePerUser: competitor.price,
                            pricingModel: competitor.pricingModel,
                            monthlyCost: monthly,
                            totalCost: monthly * 12 * duration
                         };
                    }).filter(Boolean);
                }
                return [];
            });

        return {
            zohoMonthlyCost,
            competitorMonthlyCost,
            totalZohoCost,
            totalCompetitorCost,
            savings,
            isSavings,
            breakdown
        };
    }, [departmentData, employeeCount, duration]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    return {
        step,
        handleStepChange,
        employeeCount,
        updateEmployeeCount,
        duration,
        setDuration,
        departmentData,
        toggleDepartment,
        updateDepartment,
        results,
        formatPrice
    };
};
