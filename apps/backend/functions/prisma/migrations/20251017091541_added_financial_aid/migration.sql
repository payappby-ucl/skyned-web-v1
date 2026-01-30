/*
  Warnings:

  - A unique constraint covering the columns `[scholarship_id]` on the table `scholarships` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "financial_aids" (
    "id" SERIAL NOT NULL,
    "financial_aid_id" TEXT NOT NULL,
    "citizenship" VARCHAR(3) NOT NULL,
    "canadian_resident" CHAR(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" JSONB NOT NULL,
    "school_slug" TEXT NOT NULL,
    "program_slug" TEXT NOT NULL,
    "study_level" TEXT NOT NULL,
    "pgwp" TEXT NOT NULL,
    "has_offer_letter" TEXT NOT NULL,
    "loan_type" TEXT NOT NULL,
    "living_expenses_coverage" TEXT,
    "program_started" TEXT NOT NULL,
    "gpa" DECIMAL(5,2),
    "next_school_term" TIMESTAMP(3) NOT NULL,
    "partner" TEXT NOT NULL,
    "proof_of_address" JSONB NOT NULL,
    "identification" JSONB NOT NULL,
    "resume" JSONB NOT NULL,
    "transcript" JSONB NOT NULL,
    "bank_statement" JSONB,
    "immigration_document" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_aids_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "financial_aids_financial_aid_id_key" ON "financial_aids"("financial_aid_id");

-- CreateIndex
CREATE INDEX "financial_aids_first_name_idx" ON "financial_aids"("first_name");

-- CreateIndex
CREATE INDEX "financial_aids_last_name_idx" ON "financial_aids"("last_name");

-- CreateIndex
CREATE INDEX "financial_aids_email_idx" ON "financial_aids"("email");

-- CreateIndex
CREATE UNIQUE INDEX "scholarships_scholarship_id_key" ON "scholarships"("scholarship_id");
