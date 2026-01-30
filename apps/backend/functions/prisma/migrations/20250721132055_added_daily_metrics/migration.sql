/*
  Warnings:

  - You are about to alter the column `application_fee` on the `programs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `application_fee_discount` on the `programs` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "programs" ALTER COLUMN "application_fee" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "application_fee_discount" SET DATA TYPE DECIMAL(5,2);

-- CreateTable
CREATE TABLE "daily_stats" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "total_schools" INTEGER NOT NULL DEFAULT 0,
    "new_schools" INTEGER NOT NULL DEFAULT 0,
    "active_schools" INTEGER NOT NULL DEFAULT 0,
    "school_growth" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_programs" INTEGER NOT NULL DEFAULT 0,
    "new_programs" INTEGER NOT NULL DEFAULT 0,
    "active_programs" INTEGER NOT NULL DEFAULT 0,
    "program_growth" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_faqs" INTEGER NOT NULL DEFAULT 0,
    "new_faqs" INTEGER NOT NULL DEFAULT 0,
    "faq_growth" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total_inquiries" INTEGER NOT NULL DEFAULT 0,
    "new_inquiries" INTEGER NOT NULL DEFAULT 0,
    "inquiry_growth" INTEGER NOT NULL DEFAULT 0,
    "total_admins" INTEGER NOT NULL DEFAULT 0,
    "new_admins" INTEGER NOT NULL DEFAULT 0,
    "active_admins" INTEGER NOT NULL DEFAULT 0,
    "admin_growth" INTEGER NOT NULL DEFAULT 0,
    "total_posts" INTEGER NOT NULL DEFAULT 0,
    "published_posts" INTEGER NOT NULL DEFAULT 0,
    "scheduled_posts" INTEGER NOT NULL DEFAULT 0,
    "draft_posts" INTEGER NOT NULL DEFAULT 0,
    "unpublished_posts" INTEGER NOT NULL DEFAULT 0,
    "new_posts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_stats_date_key" ON "daily_stats"("date");

-- CreateIndex
CREATE INDEX "daily_stats_created_at_idx" ON "daily_stats"("created_at");

-- CreateIndex
CREATE INDEX "daily_stats_date_idx" ON "daily_stats"("date");
