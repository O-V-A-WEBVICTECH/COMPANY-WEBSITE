export interface PriceRange {
  min: number;
  max: number;
}

export interface PricingOption {
  value: string;
  label: string;
  min: number;
  max: number;
}

export interface Feature extends PricingOption {
  description: string;
}

export interface QuotePricing {
  website: {
    base: PriceRange;
    types: PricingOption[];
    platforms: PricingOption[];
    features: Feature[];
    optional: PricingOption[];
  };
}

export const defaultQuotePricing: QuotePricing = {
  website: {
    base: { min: 120000, max: 300000 },
    types: [
      { value: "landing", label: "Landing Page", min: 100000, max: 200000 },
      {
        value: "ecommerce",
        label: "E-commerce Store",
        min: 250000,
        max: 500000,
      },
      { value: "webapp", label: "Web Application", min: 180000, max: 320000 },
    ],
    platforms: [
      { value: "web", label: "Web", min: 0, max: 0 },
      { value: "android", label: "Android", min: 300000, max: 500000 },
      { value: "ios", label: "iOS", min: 300000, max: 500000 },
      { value: "desktop", label: "Desktop", min: 300000, max: 800000 },
      
      { value: "pwa", label: "PWA", min: 50000, max: 90000 },
    ],
    features: [
      {
        value: "auth",
        label: "User Authentication",
        description: "Secure login, registration, and user management.",
        min: 100000,
        max: 200000,
      },
      {
        value: "payment",
        label: "Payment Integration",
        description: "Integrate checkout and payment gateways.",
        min: 150000,
        max: 300000,
      },
      {
        value: "admin_panel",
        label: "Admin Panel",
        description: "Dashboard for managing content and users.",
        min: 200000,
        max: 400000,
      },
      {
        value: "analytics",
        label: "Analytics",
        description: "User tracking and reporting tools.",
        min: 60000,
        max: 100000,
      },
    ],
    optional: [
      { value: "domain", label: "Domain", min: 50000, max: 80000 },
      { value: "hosting_first", label: "Hosting", min: 30000, max: 50000 },
    ],
  },
};
