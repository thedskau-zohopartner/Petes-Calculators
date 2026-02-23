import React from 'react';
import CalculatorSection from '@/app/components/CalculatorSection';
import AutomationSavingsCalculator from '@/app/components/AutomationSavingsCalculator';

export default function AutomationPage() {
    return (
        <CalculatorSection>
            <AutomationSavingsCalculator />
        </CalculatorSection>
    );
}
