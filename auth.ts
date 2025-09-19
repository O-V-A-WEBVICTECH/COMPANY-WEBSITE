import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { PrismaClient } from "./lib/generated/prisma";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
