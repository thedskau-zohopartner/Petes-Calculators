export interface Competitor {
  name: string;
  price: number;
  pricingModel: 'per_user' | 'flat_monthly';
}

export interface SoftwareCategory {
  id: string;
  name: string;
  competitors?: Competitor[];
  defaultUserRatio: number;
  initialSelected: boolean;
  isCustom?: boolean;
}

export const SOFTWARE_CATEGORIES: SoftwareCategory[] = [
  {
    id: 'crm',
    name: 'CRM',
    defaultUserRatio: 1.0,
    initialSelected: true,
    competitors: [
      { name: 'Salesforce Enterprise', price: 175.0, pricingModel: 'per_user' },
      { name: 'Salesforce Pro Suite', price: 100.0, pricingModel: 'per_user' },
      { name: 'Salesforce Starter Suite', price: 25.0, pricingModel: 'per_user' },
      { name: 'HubSpot CRM Professional', price: 100.0, pricingModel: 'per_user' },
      { name: 'HubSpot CRM Enterprise', price: 150.0, pricingModel: 'per_user' },
      { name: 'HubSpot CRM Starter', price: 20.0, pricingModel: 'per_user' },
      { name: 'Microsoft Dynamics 365 Sales Enterprise', price: 95.0, pricingModel: 'per_user' },
      { name: 'Microsoft Dynamics 365 Sales Professional', price: 65.0, pricingModel: 'per_user' },
      { name: 'Pipedrive Growth', price: 39.0, pricingModel: 'per_user' },
      { name: 'Pipedrive Premium', price: 49.0, pricingModel: 'per_user' },
      { name: 'Freshsales Pro', price: 47.0, pricingModel: 'per_user' },
      { name: 'SugarCRM Sell Essentials', price: 49.0, pricingModel: 'per_user' },
      { name: 'Keap', price: 249.0, pricingModel: 'flat_monthly' },
      { name: 'Copper Professional', price: 49.0, pricingModel: 'per_user' }
    ]
  },

  {
    id: 'project',
    name: 'Project Management',
    defaultUserRatio: 1.0,
    initialSelected: true,
    competitors: [
      { name: 'Asana Advanced', price: 24.99, pricingModel: 'per_user' },
      { name: 'Asana Starter', price: 10.99, pricingModel: 'per_user' },
      { name: 'Monday.com Standard', price: 12.0, pricingModel: 'per_user' },
      { name: 'Monday.com Pro', price: 19.0, pricingModel: 'per_user' },
      { name: 'Monday.com Enterprise', price: 78.0, pricingModel: 'per_user' },
      { name: 'ClickUp Business', price: 12.0, pricingModel: 'per_user' },
      { name: 'ClickUp Enterprise', price: 29.0, pricingModel: 'per_user' },
      { name: 'Jira Premium', price: 15.25, pricingModel: 'per_user' },
      { name: 'Jira Enterprise', price: 122.5, pricingModel: 'per_user' },
      { name: 'Wrike Business', price: 24.8, pricingModel: 'per_user' },
      { name: 'Wrike Enterprise', price: 34.6, pricingModel: 'per_user' },
      { name: 'Trello Premium', price: 10.0, pricingModel: 'per_user' },
      { name: 'Trello Enterprise', price: 17.5, pricingModel: 'per_user' },
      { name: 'Smartsheet Business', price: 19.0, pricingModel: 'per_user' },
      { name: 'Basecamp', price: 15.0, pricingModel: 'per_user' },
      { name: 'TeamWork Grow', price: 19.99, pricingModel: 'per_user' }
    ]
  },

  {
    id: 'email',
    name: 'Email & Productivity',
    defaultUserRatio: 1.0,
    initialSelected: true,
    competitors: [
      { name: 'Google Workspace Business Plus', price: 22.0, pricingModel: 'per_user' },
      { name: 'Google Workspace Business Standard', price: 14.0, pricingModel: 'per_user' },
      { name: 'Google Workspace Business Starter', price: 7.0, pricingModel: 'per_user' },
      { name: 'Microsoft 365 Business Premium', price: 22.0, pricingModel: 'per_user' },
      { name: 'Microsoft 365 Business Standard', price: 12.5, pricingModel: 'per_user' },
      { name: 'Microsoft 365 Business Basic', price: 6.0, pricingModel: 'per_user' },
      { name: 'Slack Pro', price: 7.25, pricingModel: 'per_user' },
      { name: 'Slack Business+', price: 15.0, pricingModel: 'per_user' },
      { name: 'Notion Plus', price: 10.0, pricingModel: 'per_user' },
      { name: 'Notion Business', price: 15.0, pricingModel: 'per_user' },
      { name: 'Confluence Standard', price: 5.75, pricingModel: 'per_user' },
      { name: 'Confluence Premium', price: 11.0, pricingModel: 'per_user' },
      { name: 'DropBox Business', price: 20.0, pricingModel: 'per_user' },
      { name: 'Box Business', price: 20.0, pricingModel: 'per_user' },
      { name: 'Evernote Teams', price: 24.99, pricingModel: 'per_user' }
    ]
  },

  {
    id: 'marketing',
    name: 'Marketing',
    defaultUserRatio: 0.25,
    initialSelected: false,
    competitors: [
      { name: 'GetResponse eCommerce Marketing', price: 119.0, pricingModel: 'flat_monthly' },
      { name: 'GetResponse Max', price: 165.0, pricingModel: 'flat_monthly' },
      { name: 'GetResponse Marketing Automation', price: 59.0, pricingModel: 'flat_monthly' },
      { name: 'HubSpot Marketing Hub Pro', price: 800.0, pricingModel: 'flat_monthly' },
      { name: 'HubSpot Marketing Hub Enterprise', price: 3600.0, pricingModel: 'flat_monthly' },
      { name: 'HubSpot Marketing Hub Starter', price: 20.0, pricingModel: 'per_user' },
      { name: 'ActiveCampaign Plus', price: 49.0, pricingModel: 'flat_monthly' },
      { name: 'ActiveCampaign Professional', price: 149.0, pricingModel: 'flat_monthly' },
      { name: 'ActiveCampaign Enterprise', price: 259.0, pricingModel: 'flat_monthly' },
      { name: 'Mailchimp Premium', price: 350.0, pricingModel: 'flat_monthly' },
      { name: 'Mailchimp Standard', price: 100.0, pricingModel: 'flat_monthly' },
      { name: 'Marketo Engage', price: 1995.0, pricingModel: 'flat_monthly' },
      { name: 'Constant Contact Premium', price: 80.0, pricingModel: 'flat_monthly' },
      { name: 'Brevo Business', price: 69.0, pricingModel: 'flat_monthly' },
      { name: 'Marketing Cloud Account Engagement Growth', price: 1500.0, pricingModel: 'flat_monthly' },
      { name: 'Klaviyo', price: 150.0, pricingModel: 'flat_monthly' },
      { name: 'Adobe Campaign', price: 1475.0, pricingModel: 'flat_monthly' }
    ]
  },

  {
    id: 'support',
    name: 'Customer Support',
    defaultUserRatio: 0.25,
    initialSelected: false,
    competitors: [
      { name: 'Zendesk Suite Professional', price: 115.0, pricingModel: 'per_user' },
      { name: 'Zendesk Suite Team', price: 55.0, pricingModel: 'per_user' },
      { name: 'Zendesk Suite Enterprise', price: 169.0, pricingModel: 'per_user' },
      { name: 'Freshdesk Pro', price: 55.0, pricingModel: 'per_user' },
      { name: 'Freshdesk Enterprise', price: 89.0, pricingModel: 'per_user' },
      { name: 'Freshdesk Growth', price: 19.0, pricingModel: 'per_user' },
      { name: 'Help Scout Plus', price: 40.0, pricingModel: 'per_user' },
      { name: 'Help Scout Pro', price: 65.0, pricingModel: 'per_user' },
      { name: 'LiveAgent Medium Business', price: 49.0, pricingModel: 'per_user' },
      { name: 'LiveAgent Large Business', price: 69.0, pricingModel: 'per_user' },
      { name: 'Intercom Essential', price: 39.0, pricingModel: 'per_user' },
      { name: 'Salesloft (formerly Drift)', price: 224.0, pricingModel: 'per_user' },
      { name: 'HubSpot Service Hub Professional', price: 500.0, pricingModel: 'flat_monthly' },
      { name: 'Salesforce Service Cloud Enterprise', price: 175.0, pricingModel: 'per_user' },
      { name: 'Freshdesk (formerly Kayako)', price: 39.0, pricingModel: 'per_user' },
      { name: 'Richpanel', price: 29.0, pricingModel: 'per_user' }
    ]
  },

  {
    id: 'hr',
    name: 'HR Management',
    defaultUserRatio: 0.1,
    initialSelected: false,
    competitors: [
      { name: 'TriNet HR (formerly Zenefits) Zen', price: 21.0, pricingModel: 'per_user' },
      { name: 'TriNet HR (formerly Zenefits) Growth', price: 16.0, pricingModel: 'per_user' },
      { name: 'BambooHR Core', price: 6.0, pricingModel: 'per_user' },
      { name: 'BambooHR Pro', price: 8.75, pricingModel: 'per_user' },
      { name: 'Gusto Plus', price: 12.0, pricingModel: 'per_user' },
      { name: 'Gusto Premium', price: 25.0, pricingModel: 'per_user' },
      { name: 'Rippling', price: 8.0, pricingModel: 'per_user' },
      { name: 'ADP Workforce Now', price: 25.0, pricingModel: 'per_user' },
      { name: 'Workday HCM', price: 100.0, pricingModel: 'per_user' },
      { name: 'SAP SuccessFactors', price: 85.0, pricingModel: 'per_user' },
      { name: 'Paylocity', price: 30.0, pricingModel: 'per_user' },
      { name: 'UKG Pro', price: 40.0, pricingModel: 'per_user' },
      { name: 'Paycor', price: 25.0, pricingModel: 'per_user' },
      { name: 'Paycom', price: 35.0, pricingModel: 'per_user' },
      { name: 'Ceridian Dayforce', price: 40.0, pricingModel: 'per_user' },
      { name: 'Employment Hero', price: 10.0, pricingModel: 'per_user' }
    ]
  },

  {
    id: 'finance',
    name: 'Finance',
    defaultUserRatio: 0.1,
    initialSelected: false,
    competitors: [
      { name: 'Xero Ultimate', price: 78.0, pricingModel: 'flat_monthly' },
      { name: 'Xero Premium', price: 55.0, pricingModel: 'flat_monthly' },
      { name: 'Xero Standard', price: 42.0, pricingModel: 'flat_monthly' },
      { name: 'QuickBooks Advanced', price: 235.0, pricingModel: 'flat_monthly' },
      { name: 'QuickBooks Plus', price: 105.0, pricingModel: 'flat_monthly' },
      { name: 'QuickBooks Simple Start', price: 65.0, pricingModel: 'flat_monthly' },
      { name: 'MYOB Business', price: 55.0, pricingModel: 'flat_monthly' },
      { name: 'MYOB Advanced', price: 75.0, pricingModel: 'flat_monthly' },
      { name: 'MYOB Essentials', price: 30.0, pricingModel: 'flat_monthly' },
      { name: 'FreshBooks Premium', price: 60.0, pricingModel: 'flat_monthly' },
      { name: 'FreshBooks Plus', price: 33.0, pricingModel: 'flat_monthly' },
      { name: 'Sage Accounting Start', price: 25.0, pricingModel: 'flat_monthly' },
      { name: 'Sage Intacct', price: 120.0, pricingModel: 'flat_monthly' },
      { name: 'Wave Financial', price: 0.0, pricingModel: 'flat_monthly' },
      { name: 'NetSuite ERP', price: 175.0, pricingModel: 'flat_monthly' },
      { name: 'Reckon One', price: 35.0, pricingModel: 'flat_monthly' },
      { name: 'Saasu', price: 40.0, pricingModel: 'flat_monthly' }
    ]
  },

  {
    id: 'inventory',
    name: 'Inventory',
    defaultUserRatio: 0.15,
    initialSelected: false,
    competitors: [
      { name: 'Cin7 Core', price: 349.0, pricingModel: 'flat_monthly' },
      { name: 'Cin7 Advanced', price: 799.0, pricingModel: 'flat_monthly' },
      { name: 'Cin7 (formerly DEAR Systems) Advanced', price: 349.0, pricingModel: 'flat_monthly' },
      { name: 'Cin7 (formerly DEAR Systems) Premium', price: 799.0, pricingModel: 'flat_monthly' },
      { name: 'QuickBooks Commerce (formerly TradeGecko) Pro', price: 199.0, pricingModel: 'flat_monthly' },
      { name: 'QuickBooks Commerce (formerly TradeGecko) Premium', price: 399.0, pricingModel: 'flat_monthly' },
      { name: 'Unleashed Standard', price: 349.0, pricingModel: 'flat_monthly' },
      { name: 'Unleashed Premium', price: 799.0, pricingModel: 'flat_monthly' },
      { name: 'Fishbowl Inventory', price: 499.0, pricingModel: 'flat_monthly' },
      { name: 'Ordoro Express', price: 59.0, pricingModel: 'flat_monthly' },
      { name: 'Ordoro Pro', price: 499.0, pricingModel: 'flat_monthly' },
      { name: 'SkuVault', price: 299.0, pricingModel: 'flat_monthly' },
      { name: 'inFlow Entrepreneur', price: 110.0, pricingModel: 'flat_monthly' },
      { name: 'Finale Inventory', price: 199.0, pricingModel: 'flat_monthly' }
    ]
  },

  {
    id: 'social',
    name: 'Social Media',
    defaultUserRatio: 0.1,
    initialSelected: false,
    competitors: [
      { name: 'Hootsuite Professional', price: 99.0, pricingModel: 'flat_monthly' },
      { name: 'Buffer Team', price: 100.0, pricingModel: 'flat_monthly' }
    ]
  },

  {
    id: 'analytics',
    name: 'Analytics',
    defaultUserRatio: 0.2,
    initialSelected: false,
    competitors: [
      { name: 'Tableau Creator', price: 75.0, pricingModel: 'per_user' },
      { name: 'Power BI Pro', price: 14.0, pricingModel: 'per_user' }
    ]
  },

  {
    id: 'custom',
    name: 'Custom Software',
    defaultUserRatio: 0.25,
    initialSelected: false,
    isCustom: true
  }
];
