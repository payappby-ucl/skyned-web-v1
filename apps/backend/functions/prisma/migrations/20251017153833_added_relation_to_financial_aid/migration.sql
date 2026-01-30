/*
  Warnings:

  - Added the required column `program_id` to the `financial_aids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financial_aids" ADD COLUMN     "program_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "financial_aids" ADD CONSTRAINT "financial_aids_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("program_id") ON DELETE RESTRICT ON UPDATE CASCADE;
