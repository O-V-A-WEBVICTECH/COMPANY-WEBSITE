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
    base: { min: 50000, max: 100000 },
    types: [
      { value: "landing", label: "Landing Page", min: 50000, max: 80000 },
      {
        value: "ecommerce",
        label: "E-commerce Store",
        min: 120000,
        max: 220000,
      },
      { value: "webapp", label: "Web Application", min: 180000, max: 320000 },
    ],
    platforms: [
      { value: "web", label: "Web", min: 0, max: 0 },
      { value: "android", label: "Android", min: 60000, max: 120000 },
      { value: "ios", label: "iOS", min: 60000, max: 120000 },
      { value: "desktop", label: "Desktop", min: 80000, max: 160000 },
      { value: "react", label: "React Native", min: 80000, max: 140000 },
      { value: "flutter", label: "Flutter", min: 70000, max: 130000 },
      { value: "pwa", label: "PWA", min: 50000, max: 90000 },
    ],
    features: [
      {
        value: "auth",
        label: "User Authentication",
        description: "Secure login, registration, and user management.",
        min: 30000,
        max: 60000,
      },
      {
        value: "payment",
        label: "Payment Integration",
        description: "Integrate checkout and payment gateways.",
        min: 40000,
        max: 80000,
      },
      {
        value: "admin_panel",
        label: "Admin Panel",
        description: "Dashboard for managing content and users.",
        min: 50000,
        max: 100000,
      },
      {
        value: "analytics",
        label: "Analytics",
        description: "User tracking and reporting tools.",
        min: 25000,
        max: 50000,
      },
    ],
    optional: [
      { value: "domain", label: "Domain", min: 35000, max: 35000 },
      { value: "hosting_first", label: "Hosting", min: 15000, max: 15000 },
    ],
  },
};
