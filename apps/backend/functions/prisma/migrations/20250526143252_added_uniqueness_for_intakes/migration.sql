/*
  Warnings:

  - A unique constraint covering the columns `[school_id,intake,start_date,deadline]` on the table `intakes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "intakes_deadline_idx" ON "intakes"("deadline");

-- CreateIndex
CREATE UNIQUE INDEX "intakes_school_id_intake_start_date_deadline_key" ON "intakes"("school_id", "intake", "start_date", "deadline");
