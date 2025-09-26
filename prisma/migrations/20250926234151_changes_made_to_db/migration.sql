/*
  Warnings:

  - You are about to drop the `subscription_plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."subscription" DROP CONSTRAINT "subscription_planId_fkey";

-- DropTable
DROP TABLE "public"."subscription_plan";

-- CreateTable
CREATE TABLE "public"."subscriptionPlan" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paystackPlanCode" TEXT,
    "amount" INTEGER,
    "interval" TEXT NOT NULL,
    "features" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscriptionPlan_code_key" ON "public"."subscriptionPlan"("code");

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."subscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
