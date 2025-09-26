// auth.ts
import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { admin, createAuthMiddleware } from "better-auth/plugins";
import { PrismaClient } from "./prisma/generated";

export const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const newSession = ctx.context.newSession;
        if (newSession) {
          const user = newSession.user;

          // fetch the "free" plan from SubscriptionPlan table
          const freePlan = await prisma.subscriptionPlan.findUnique({
            where: { code: "free" },
          });
          if (!freePlan) {
            console.error("Free plan not found in DB");
            // optionally throw here to fail user creation or default fallback
          } else {
            await prisma.subscription.create({
              data: {
                userId: user.id,
                planId: freePlan.id,
                status: "active",
                startDate: new Date(),
                // optionally nextPaymentDate, planAmount if free plan has amount
                // paystackPlanCode: freePlan.paystackPlanCode (if relevant)
              },
            });
          }
        }
      }
    }),
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin", "super_admin"],
      impersonationSessionDuration: 60 * 60,
      defaultBanReason: "No reason",
      defaultBanExpiresIn: undefined,
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },
});
