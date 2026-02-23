'use client';
import React from 'react';
import {
    Building2,
    Briefcase,
    Mail,
    Megaphone,
    Headphones,
    Users,
    TrendingUp,
    Box,
    Share2,
    BarChart,
    Code
} from 'lucide-react';

export const CATEGORY_COLORS: Record<string, string> = {
    crm: '#F4C700',       // Yellow (Sales)
    project: '#EA4335',   // Red (Projects)
    email: '#F4C700',     // Yellow (Collaboration)
    marketing: '#0066FF', // Blue (Marketing)
    support: '#0066FF',   // Blue (Customer Support)
    hr: '#34A853',        // Green (HR)
    finance: '#34A853',   // Green (Finance)
    inventory: '#0066FF', // Blue (Inventory)
    social: '#0066FF',    // Blue (Social)
    analytics: '#EA4335', // Red (BI)
    custom: '#6A2BE9'     // Purple (Operations)
};

export const CategoryIcon = ({ id, color, size = 32 }: { id: string, color?: string, size?: number }) => {
    const iconProps = { size, color: color || 'currentColor' };
    switch (id) {
        case 'crm': return <Building2 {...iconProps} />;
        case 'project': return <Briefcase {...iconProps} />;
        case 'email': return <Mail {...iconProps} />;
        case 'marketing': return <Megaphone {...iconProps} />;
        case 'support': return <Headphones {...iconProps} />;
        case 'hr': return <Users {...iconProps} />;
        case 'finance': return <TrendingUp {...iconProps} />;
        case 'inventory': return <Box {...iconProps} />;
        case 'social': return <Share2 {...iconProps} />;
        case 'analytics': return <BarChart {...iconProps} />;
        case 'custom': return <Code {...iconProps} />;
        default: return <Box {...iconProps} />;
    }
};
