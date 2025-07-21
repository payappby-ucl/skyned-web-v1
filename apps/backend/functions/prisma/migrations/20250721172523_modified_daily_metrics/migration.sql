/*
  Warnings:

  - You are about to alter the column `school_growth` on the `daily_stats` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `program_growth` on the `daily_stats` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `faq_growth` on the `daily_stats` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `inquiry_growth` on the `daily_stats` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `admin_growth` on the `daily_stats` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "daily_stats" ADD COLUMN     "post_growth" DECIMAL(10,2) NOT NULL DEFAULT 0,
ALTER COLUMN "school_growth" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "program_growth" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "faq_growth" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "inquiry_growth" SET DEFAULT 0,
ALTER COLUMN "inquiry_growth" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "admin_growth" SET DEFAULT 0,
ALTER COLUMN "admin_growth" SET DATA TYPE DECIMAL(10,2);
