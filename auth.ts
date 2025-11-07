import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { admin, createAuthMiddleware } from "better-auth/plugins";
import { PrismaClient } from "./prisma/generated";
import { sendPasswordResetEmail } from "./lib/nodeMailer";

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
      // Handle both email sign-up AND social sign-up
      if (ctx.path === "/sign-up/email" || ctx.path === "/sign-in/social") {
        const newSession = ctx.context.newSession;
        if (newSession) {
          const user = newSession.user;

          // Check if user already has a subscription (important for social login)
          const existingSubscription = await prisma.subscription.findFirst({
            where: { userId: user.id },
          });

          // Only create subscription if user doesn't have one
          if (!existingSubscription) {
            // Fetch the "free" plan from SubscriptionPlan table
            const freePlan = await prisma.subscriptionPlan.findUnique({
              where: { code: "free" },
            });

            if (!freePlan) {
              console.error("Free plan not found in DB");
            } else {
              await prisma.subscription.create({
                data: {
                  userId: user.id,
                  planId: freePlan.id,
                  status: "active",
                  startDate: new Date(),
                },
              });
              console.log(`Created free subscription for user ${user.email}`);
            }
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

    sendResetPassword: async ({ user, url }, _request) => {
      await sendPasswordResetEmail({
        email: user.email,
        subject: "Reset your password",
        url,
      });
    },

    onPasswordReset: async ({ user }, _request) => {
      console.log(`Password for user ${user.email} has been reset.`);
      // optional: notify user, log audit trail, etc.
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
