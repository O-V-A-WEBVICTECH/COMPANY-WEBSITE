/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."subscription" ALTER COLUMN "planType" SET DEFAULT 'free';

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "public"."subscription"("userId");
