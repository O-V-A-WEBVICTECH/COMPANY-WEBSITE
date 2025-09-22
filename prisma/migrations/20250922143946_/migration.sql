/*
  Warnings:

  - You are about to drop the column `twitterUrl` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "twitterUrl",
ADD COLUMN     "xUrl" TEXT DEFAULT '';
