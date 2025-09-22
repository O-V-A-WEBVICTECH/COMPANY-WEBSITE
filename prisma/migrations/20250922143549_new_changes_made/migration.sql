/*
  Warnings:

  - You are about to drop the `SocialList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SocialList" DROP CONSTRAINT "SocialList_userId_fkey";

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "githubUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "linkedInUrl" TEXT DEFAULT '',
ADD COLUMN     "twitterUrl" TEXT DEFAULT '';

-- DropTable
DROP TABLE "public"."SocialList";
