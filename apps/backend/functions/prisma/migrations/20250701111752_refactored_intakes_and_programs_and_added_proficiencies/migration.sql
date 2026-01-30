/*
  Warnings:

  - You are about to drop the column `english_proficiency` on the `programs` table. All the data in the column will be lost.
  - You are about to drop the column `english_proficiency_score` on the `programs` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "IntakeStatus" AS ENUM ('open', 'closed', 'likely_open');

-- DropForeignKey
ALTER TABLE "intakes" DROP CONSTRAINT "intakes_school_id_fkey";

-- DropForeignKey
ALTER TABLE "programs" DROP CONSTRAINT "programs_school_id_fkey";

-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "intakes" ADD COLUMN     "status" "IntakeStatus" NOT NULL DEFAULT 'open',
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "deadline" DROP NOT NULL;

-- AlterTable
ALTER TABLE "programs" DROP COLUMN "english_proficiency",
DROP COLUMN "english_proficiency_score",
ADD COLUMN     "requirements" TEXT;

-- CreateTable
CREATE TABLE "english_proficiencies" (
    "test" TEXT NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,
    "programId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "english_proficiencies_test_programId_key" ON "english_proficiencies"("test", "programId");

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "english_proficiencies" ADD CONSTRAINT "english_proficiencies_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("program_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intakes" ADD CONSTRAINT "intakes_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE CASCADE ON UPDATE CASCADE;
