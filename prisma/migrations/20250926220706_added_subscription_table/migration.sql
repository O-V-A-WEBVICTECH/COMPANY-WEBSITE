/*
  Warnings:

  - You are about to drop the column `about` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `linkedInUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paystackCustomerId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "about",
DROP COLUMN "githubUrl",
DROP COLUMN "linkedInUrl",
DROP COLUMN "position",
DROP COLUMN "twitterUrl",
ADD COLUMN     "paystackAuthorizationCode" TEXT,
ADD COLUMN     "paystackCustomerId" TEXT;

-- CreateTable
CREATE TABLE "public"."better_auth_subscription" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "planType" TEXT NOT NULL,
    "paystackSubscriptionId" TEXT,
    "paystackPlanCode" TEXT,
    "planAmount" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextPaymentDate" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "better_auth_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."report" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "performance" INTEGER NOT NULL,
    "metrics" JSONB NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "better_auth_subscription_paystackSubscriptionId_key" ON "public"."better_auth_subscription"("paystackSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "better_auth_subscription_userId_paystackSubscriptionId_key" ON "public"."better_auth_subscription"("userId", "paystackSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_paystackCustomerId_key" ON "public"."user"("paystackCustomerId");

-- AddForeignKey
ALTER TABLE "public"."better_auth_subscription" ADD CONSTRAINT "better_auth_subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."report" ADD CONSTRAINT "report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
