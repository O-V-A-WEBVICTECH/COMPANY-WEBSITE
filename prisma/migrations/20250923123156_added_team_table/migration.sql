-- CreateTable
CREATE TABLE "public"."Team" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "position" TEXT,
    "about" TEXT,
    "twitterUrl" TEXT DEFAULT '',
    "linkedInUrl" TEXT DEFAULT '',
    "githubUrl" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_email_key" ON "public"."Team"("email");
