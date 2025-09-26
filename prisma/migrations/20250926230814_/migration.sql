/*
  Warnings:

  - You are about to drop the `better_auth_subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."better_auth_subscription" DROP CONSTRAINT "better_auth_subscription_userId_fkey";

-- DropTable
DROP TABLE "public"."better_auth_subscription";

-- CreateTable
CREATE TABLE "public"."subscription" (
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

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_paystackSubscriptionId_key" ON "public"."subscription"("paystackSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_paystackSubscriptionId_key" ON "public"."subscription"("userId", "paystackSubscriptionId");

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
