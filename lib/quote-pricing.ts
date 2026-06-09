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
  backend: {
    base: PriceRange;
    types: PricingOption[];
    features: Feature[];
    optional: PricingOption[];
  };
}

export const defaultQuotePricing: QuotePricing = {
  website: {
    base: { min: 80000, max: 200000 },
    types: [
      {
        value: "landing",
        label: "Landing Page",
        min: 80000,
        max: 180000,
      },
      {
        value: "portfolio",
        label: "Portfolio / Personal Site",
        min: 100000,
        max: 220000,
      },
      {
        value: "business",
        label: "Business / Corporate Website",
        min: 180000,
        max: 380000,
      },
      {
        value: "blog_cms",
        label: "Blog / CMS Website",
        min: 150000,
        max: 320000,
      },
      {
        value: "ecommerce",
        label: "E-commerce Store",
        min: 300000,
        max: 650000,
      },
      {
        value: "saas",
        label: "SaaS / Web Application",
        min: 400000,
        max: 900000,
      },
      {
        value: "booking",
        label: "Booking / Appointment System",
        min: 250000,
        max: 550000,
      },
      {
        value: "marketplace",
        label: "Marketplace / Multi-vendor",
        min: 500000,
        max: 1200000,
      },
    ],
    platforms: [
      { value: "web", label: "Web", min: 0, max: 0 },
      { value: "pwa", label: "PWA", min: 50000, max: 100000 },
      { value: "android", label: "Android", min: 300000, max: 550000 },
      { value: "ios", label: "iOS", min: 300000, max: 550000 },
      { value: "desktop", label: "Desktop", min: 350000, max: 800000 },
    ],
    features: [
      {
        value: "auth",
        label: "User Authentication",
        description: "Sign up, login, password reset, email verification.",
        min: 80000,
        max: 180000,
      },
      {
        value: "payment",
        label: "Payment Integration",
        description: "Paystack, Stripe, Flutterwave, or custom checkout.",
        min: 150000,
        max: 300000,
      },
      {
        value: "admin_panel",
        label: "Admin Dashboard",
        description: "Manage content, users, orders, and settings.",
        min: 180000,
        max: 380000,
      },
      {
        value: "cms",
        label: "Content Management (CMS)",
        description: "Non-technical editors can update pages and posts.",
        min: 120000,
        max: 250000,
      },
      {
        value: "seo",
        label: "SEO Optimisation",
        description: "Meta tags, sitemaps, structured data, and performance tuning.",
        min: 60000,
        max: 120000,
      },
      {
        value: "analytics",
        label: "Analytics & Reporting",
        description: "User behaviour tracking and custom dashboard reports.",
        min: 60000,
        max: 120000,
      },
      {
        value: "live_chat",
        label: "Live Chat / Support Widget",
        description: "Real-time chat or support integration (e.g. Intercom, Crisp).",
        min: 40000,
        max: 90000,
      },
      {
        value: "multilang",
        label: "Multi-language Support",
        description: "Internationalisation (i18n) for multiple locales.",
        min: 80000,
        max: 180000,
      },
      {
        value: "notifications",
        label: "Email / Push Notifications",
        description: "Transactional emails, newsletters, and push alerts.",
        min: 60000,
        max: 130000,
      },
      {
        value: "social_auth",
        label: "Social Login",
        description: "Sign in with Google, Facebook, GitHub, etc.",
        min: 50000,
        max: 100000,
      },
    ],
    optional: [
      { value: "domain", label: "Domain Registration", min: 35000, max: 80000 },
      { value: "hosting_first", label: "Web Hosting (first month)", min: 15000, max: 50000 },
    ],
  },
  backend: {
    base: { min: 150000, max: 400000 },
    types: [
      {
        value: "rest_api",
        label: "REST API",
        min: 120000,
        max: 280000,
      },
      {
        value: "graphql_api",
        label: "GraphQL API",
        min: 180000,
        max: 350000,
      },
      {
        value: "microservices",
        label: "Microservices Architecture",
        min: 400000,
        max: 900000,
      },
      {
        value: "realtime",
        label: "Real-time API (WebSocket)",
        min: 200000,
        max: 450000,
      },
      {
        value: "serverless",
        label: "Serverless Functions",
        min: 100000,
        max: 250000,
      },
    ],
    features: [
      {
        value: "auth_backend",
        label: "Authentication & Authorization",
        description: "JWT/OAuth2, role-based access control, session management.",
        min: 100000,
        max: 200000,
      },
      {
        value: "database_design",
        label: "Database Design & Integration",
        description: "Schema design, ORM setup, migrations (SQL or NoSQL).",
        min: 100000,
        max: 220000,
      },
      {
        value: "payment_backend",
        label: "Payment Gateway Integration",
        description: "Paystack, Stripe, Flutterwave, or custom payment flows.",
        min: 130000,
        max: 250000,
      },
      {
        value: "file_upload",
        label: "File Upload & Storage",
        description: "Cloud storage integration (Cloudinary, S3, etc.).",
        min: 60000,
        max: 120000,
      },
      {
        value: "email_service",
        label: "Email / Notification Service",
        description: "Transactional emails, SMS alerts, and push notifications.",
        min: 50000,
        max: 100000,
      },
      {
        value: "third_party",
        label: "Third-party API Integrations",
        description: "Connect with external services and data providers.",
        min: 80000,
        max: 200000,
      },
      {
        value: "caching",
        label: "Caching & Performance",
        description: "Redis, in-memory caching, rate limiting, and query optimisation.",
        min: 70000,
        max: 150000,
      },
      {
        value: "api_docs",
        label: "API Documentation",
        description: "Swagger / OpenAPI auto-generated docs and developer guides.",
        min: 60000,
        max: 100000,
      },
    ],
    optional: [
      {
        value: "deployment",
        label: "Deployment & DevOps Setup",
        min: 80000,
        max: 160000,
      },
      {
        value: "ci_cd",
        label: "CI/CD Pipeline",
        min: 60000,
        max: 120000,
      },
    ],
  },
};
