import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { PrismaClient } from "./prisma/generated";

export const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      position: {
        type: "string",
        required: false,
        defaultValue: "developer",
        input: true,
        returned: true,
      },
      githubUrl: {
        type: "string",
        required: false,
        input: true,
        returned: true,
      },
      linkedInUrl: {
        type: "string",
        required: false,
        input: true,
        returned: true,
      },
      twitterUrl: {
        type: "string",
        required: false,
        input: true,
        returned: true,
      },
    },
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
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});
