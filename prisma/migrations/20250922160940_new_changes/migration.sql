/*
  Warnings:

  - You are about to drop the column `xUrl` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "xUrl",
ADD COLUMN     "twitterUrl" TEXT DEFAULT '';
