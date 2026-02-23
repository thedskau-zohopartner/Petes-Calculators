export interface ZohoMetric {
    Application: string;
    ProductivityIncrease: number; // Percentage
    CostReduction: number; // Percentage
    ProcessImprovement: number; // Percentage
    ROIScore: number; // 1-10
    IntegrationMultiplier: number;
}

export interface ZohoProcessAndExp {
  process_improvement: string;
  customer_experience: string;
}

export const ZOHO_PROCESS_AND_EXP: Record<string, ZohoProcessAndExp> = {
  "Zoho CRM": {
    process_improvement: "35% sales cycle reduction",
    customer_experience: "18% satisfaction increase"
  },
  "Zoho Books": {
    process_improvement: "65% faster month-end close",
    customer_experience: "40% faster invoicing"
  },
  "Zoho Inventory": {
    process_improvement: "42% reduction in stockouts",
    customer_experience: "29% faster order fulfillment"
  },
  "Zoho People": {
    process_improvement: "38% faster onboarding",
    customer_experience: "22% improved employee satisfaction"
  },
  "Zoho Projects": {
    process_improvement: "44% improvement in on-time delivery",
    customer_experience: "31% better resource utilization"
  },
  "Zoho Desk": {
    process_improvement: "47% faster resolution time",
    customer_experience: "35% higher customer retention"
  },
  "Zoho Campaigns": {
    process_improvement: "41% higher campaign ROI",
    customer_experience: "26% improved engagement rates"
  },
  "Zoho Analytics": {
    process_improvement: "68% faster reporting",
    customer_experience: "37% improved decision accuracy"
  },
  "Zoho Sign": {
    process_improvement: "82% faster document processing",
    customer_experience: "44% improved client experience"
  },
  "Zoho Meeting": {
    process_improvement: "35% reduction in meeting time",
    customer_experience: "23% improved collaboration"
  },
  "Zoho Workdrive": {
    process_improvement: "55% reduction in file search time",
    customer_experience: "31% improved content sharing"
  },
  "Zoho Forms": {
    process_improvement: "73% reduction in data entry errors",
    customer_experience: "42% faster data processing"
  },
  "Zoho SalesIQ": {
    process_improvement: "41% higher conversion rate",
    customer_experience: "38% improved visitor engagement"
  },
  "Zoho Social": {
    process_improvement: "37% improved social engagement",
    customer_experience: "33% faster response time"
  },
  "Zoho Recruit": {
    process_improvement: "43% faster time-to-hire",
    customer_experience: "29% better candidate quality"
  },
  "Zoho Survey": {
    process_improvement: "61% faster insights gathering",
    customer_experience: "47% higher response rates"
  },
  "Zoho Commerce": {
    process_improvement: "45% higher conversion rates",
    customer_experience: "39% reduced cart abandonment"
  },
  "Zoho Mail": {
    process_improvement: "32% improved mail organization",
    customer_experience: "27% reduced response time"
  },
  "Zoho Expense": {
    process_improvement: "75% faster reimbursement",
    customer_experience: "53% improved policy compliance"
  },
  "Zoho Creator": {
    process_improvement: "67% faster app development",
    customer_experience: "42% reduced IT dependence"
  },
  "Zoho Flow": {
    process_improvement: "71% improved process automation",
    customer_experience: "35% reduction in manual transfers"
  },
  "Zoho Cliq": {
    process_improvement: "36% improved team coordination",
    customer_experience: "31% faster information sharing"
  },
  "Zoho Backstage": {
    process_improvement: "52% improved event planning efficiency",
    customer_experience: "41% higher attendee satisfaction"
  },
  "Zoho Lens": {
    process_improvement: "55% faster problem resolution",
    customer_experience: "46% improved service experience"
  },
  "Zoho PageSense": {
    process_improvement: "42% higher conversion rate",
    customer_experience: "36% improved user experience"
  },
  "Zoho Notebook": {
    process_improvement: "37% improved information capture",
    customer_experience: "28% better task organization"
  },
  "Zoho Vault": {
    process_improvement: "62% reduction in security incidents",
    customer_experience: "44% faster access management"
  },
  "Zoho Sprints": {
    process_improvement: "47% faster development cycles",
    customer_experience: "35% improved team alignment"
  },
  "Zoho ShowTime": {
    process_improvement: "45% improved training effectiveness",
    customer_experience: "37% higher engagement"
  },
  "Zoho Learn": {
    process_improvement: "43% faster onboarding",
    customer_experience: "34% improved knowledge retention"
  }
}


export const ZOHO_METRICS: Record<string, ZohoMetric> = {
    "Zoho CRM": { Application: "Zoho CRM", ProductivityIncrease: 29, CostReduction: 23, ProcessImprovement: 35, ROIScore: 9.2, IntegrationMultiplier: 1.4 },
    "Zoho Books": { Application: "Zoho Books", ProductivityIncrease: 32, CostReduction: 27, ProcessImprovement: 65, ROIScore: 8.8, IntegrationMultiplier: 1.3 },
    "Zoho Invoice": { Application: "Zoho Invoice", ProductivityIncrease: 28, CostReduction: 31, ProcessImprovement: 52, ROIScore: 7.9, IntegrationMultiplier: 1.2 },
    "Zoho Inventory": { Application: "Zoho Inventory", ProductivityIncrease: 37, CostReduction: 31, ProcessImprovement: 42, ROIScore: 8.5, IntegrationMultiplier: 1.3 },
    "Zoho People": { Application: "Zoho People", ProductivityIncrease: 26, CostReduction: 25, ProcessImprovement: 38, ROIScore: 7.8, IntegrationMultiplier: 1.2 },
    "Zoho Projects": { Application: "Zoho Projects", ProductivityIncrease: 34, CostReduction: 22, ProcessImprovement: 44, ROIScore: 8.3, IntegrationMultiplier: 1.3 },
    "Zoho Desk": { Application: "Zoho Desk", ProductivityIncrease: 31, CostReduction: 28, ProcessImprovement: 47, ROIScore: 8.7, IntegrationMultiplier: 1.3 },
    "Zoho Campaigns": { Application: "Zoho Campaigns", ProductivityIncrease: 28, CostReduction: 24, ProcessImprovement: 41, ROIScore: 7.9, IntegrationMultiplier: 1.2 },
    "Zoho Analytics": { Application: "Zoho Analytics", ProductivityIncrease: 42, CostReduction: 35, ProcessImprovement: 68, ROIScore: 9.5, IntegrationMultiplier: 1.5 },
    "Zoho Sign": { Application: "Zoho Sign", ProductivityIncrease: 39, CostReduction: 41, ProcessImprovement: 82, ROIScore: 8.4, IntegrationMultiplier: 1.1 },
    "Zoho Meeting": { Application: "Zoho Meeting", ProductivityIncrease: 27, CostReduction: 32, ProcessImprovement: 35, ROIScore: 7.2, IntegrationMultiplier: 1.1 },
    "Zoho Workdrive": { Application: "Zoho Workdrive", ProductivityIncrease: 33, CostReduction: 29, ProcessImprovement: 55, ROIScore: 8.0, IntegrationMultiplier: 1.3 },
    "Zoho Forms": { Application: "Zoho Forms", ProductivityIncrease: 36, CostReduction: 34, ProcessImprovement: 73, ROIScore: 8.2, IntegrationMultiplier: 1.2 },
    "Zoho SalesIQ": { Application: "Zoho SalesIQ", ProductivityIncrease: 32, CostReduction: 27, ProcessImprovement: 41, ROIScore: 8.4, IntegrationMultiplier: 1.3 },
    "Zoho Social": { Application: "Zoho Social", ProductivityIncrease: 29, CostReduction: 26, ProcessImprovement: 37, ROIScore: 7.5, IntegrationMultiplier: 1.2 },
    "Zoho Recruit": { Application: "Zoho Recruit", ProductivityIncrease: 31, CostReduction: 28, ProcessImprovement: 43, ROIScore: 7.8, IntegrationMultiplier: 1.2 },
    "Zoho Survey": { Application: "Zoho Survey", ProductivityIncrease: 35, CostReduction: 30, ProcessImprovement: 61, ROIScore: 7.3, IntegrationMultiplier: 1.1 },
    "Zoho Commerce": { Application: "Zoho Commerce", ProductivityIncrease: 38, CostReduction: 33, ProcessImprovement: 45, ROIScore: 8.6, IntegrationMultiplier: 1.3 },
    "Zoho Mail": { Application: "Zoho Mail", ProductivityIncrease: 25, CostReduction: 21, ProcessImprovement: 32, ROIScore: 7.1, IntegrationMultiplier: 1.1 },
    "Zoho Expense": { Application: "Zoho Expense", ProductivityIncrease: 41, CostReduction: 38, ProcessImprovement: 75, ROIScore: 8.7, IntegrationMultiplier: 1.2 },
    "Zoho Creator": { Application: "Zoho Creator", ProductivityIncrease: 44, CostReduction: 36, ProcessImprovement: 67, ROIScore: 9.1, IntegrationMultiplier: 1.4 },
    "Zoho Flow": { Application: "Zoho Flow", ProductivityIncrease: 46, CostReduction: 39, ProcessImprovement: 71, ROIScore: 9.3, IntegrationMultiplier: 1.5 },
    "Zoho Cliq": { Application: "Zoho Cliq", ProductivityIncrease: 28, CostReduction: 24, ProcessImprovement: 36, ROIScore: 7.5, IntegrationMultiplier: 1.2 },
    "Zoho Backstage": { Application: "Zoho Backstage", ProductivityIncrease: 33, CostReduction: 29, ProcessImprovement: 52, ROIScore: 7.6, IntegrationMultiplier: 1.1 },
    "Zoho Lens": { Application: "Zoho Lens", ProductivityIncrease: 37, CostReduction: 33, ProcessImprovement: 55, ROIScore: 7.8, IntegrationMultiplier: 1.1 },
    "Zoho PageSense": { Application: "Zoho PageSense", ProductivityIncrease: 34, CostReduction: 29, ProcessImprovement: 42, ROIScore: 7.7, IntegrationMultiplier: 1.2 },
    "Zoho Notebook": { Application: "Zoho Notebook", ProductivityIncrease: 26, CostReduction: 22, ProcessImprovement: 37, ROIScore: 6.9, IntegrationMultiplier: 1.0 },
    "Zoho Vault": { Application: "Zoho Vault", ProductivityIncrease: 35, CostReduction: 31, ProcessImprovement: 62, ROIScore: 8.1, IntegrationMultiplier: 1.1 },
    "Zoho Sprints": { Application: "Zoho Sprints", ProductivityIncrease: 32, CostReduction: 28, ProcessImprovement: 47, ROIScore: 7.9, IntegrationMultiplier: 1.2 },
    "Zoho ShowTime": { Application: "Zoho ShowTime", ProductivityIncrease: 31, CostReduction: 26, ProcessImprovement: 45, ROIScore: 7.4, IntegrationMultiplier: 1.1 },
    "Zoho Learn": { Application: "Zoho Learn", ProductivityIncrease: 29, CostReduction: 25, ProcessImprovement: 43, ROIScore: 7.5, IntegrationMultiplier: 1.1 },
    "Zoho DataPrep": { Application: "Zoho DataPrep", ProductivityIncrease: 41, CostReduction: 36, ProcessImprovement: 64, ROIScore: 8.5, IntegrationMultiplier: 1.3 },
    "Zoho Bigin": { Application: "Zoho Bigin", ProductivityIncrease: 27, CostReduction: 24, ProcessImprovement: 33, ROIScore: 7.4, IntegrationMultiplier: 1.1 },
    "Zoho Connect": { Application: "Zoho Connect", ProductivityIncrease: 28, CostReduction: 23, ProcessImprovement: 37, ROIScore: 7.2, IntegrationMultiplier: 1.1 },
    "Zoho Checkout": { Application: "Zoho Checkout", ProductivityIncrease: 33, CostReduction: 36, ProcessImprovement: 48, ROIScore: 7.6, IntegrationMultiplier: 1.1 },
    "Zoho Subscriptions": { Application: "Zoho Subscriptions", ProductivityIncrease: 35, CostReduction: 33, ProcessImprovement: 54, ROIScore: 8.2, IntegrationMultiplier: 1.2 },
    "Zoho MarketingHub": { Application: "Zoho MarketingHub", ProductivityIncrease: 36, CostReduction: 31, ProcessImprovement: 49, ROIScore: 8.4, IntegrationMultiplier: 1.3 },
    "Zoho Field Service": { Application: "Zoho Field Service", ProductivityIncrease: 38, CostReduction: 35, ProcessImprovement: 59, ROIScore: 8.6, IntegrationMultiplier: 1.3 },
    "Zoho Writer": { Application: "Zoho Writer", ProductivityIncrease: 28, CostReduction: 24, ProcessImprovement: 39, ROIScore: 7.1, IntegrationMultiplier: 1.0 },
    "Zoho Sheet": { Application: "Zoho Sheet", ProductivityIncrease: 29, CostReduction: 25, ProcessImprovement: 42, ROIScore: 7.2, IntegrationMultiplier: 1.0 },
    "Zoho Show": { Application: "Zoho Show", ProductivityIncrease: 27, CostReduction: 23, ProcessImprovement: 38, ROIScore: 7.0, IntegrationMultiplier: 1.0 }
};

export const CATEGORY_TO_ZOHO_APP: Record<string, string> = {
    'crm': 'Zoho CRM',
    'project': 'Zoho Projects',
    'email': 'Zoho Mail',
    'marketing': 'Zoho Campaigns',
    'support': 'Zoho Desk',
    'hr': 'Zoho People',
    'finance': 'Zoho Books',
    'inventory': 'Zoho Inventory',
    'social': 'Zoho Social',
    'analytics': 'Zoho Analytics',
    'custom': 'Zoho Creator'
};

