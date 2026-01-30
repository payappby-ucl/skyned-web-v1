-- CreateEnum
CREATE TYPE "TuitionFeeType" AS ENUM ('per_year', 'per_semester', 'full');

-- CreateEnum
CREATE TYPE "Timeframe" AS ENUM ('day', 'week', 'month', 'year');

-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "program_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "degree_type" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "application_fee" DECIMAL(65,30) NOT NULL,
    "application_fee_discount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tuition_fee" DECIMAL(65,30) NOT NULL,
    "tuition_fee_type" "TuitionFeeType" NOT NULL DEFAULT 'per_year',
    "timeframe" "Timeframe" NOT NULL DEFAULT 'month',
    "duration" DECIMAL(65,30) NOT NULL,
    "minimum_education_level" TEXT NOT NULL,
    "minimum_education_degree" INTEGER NOT NULL,
    "minimum_education_gpa" DECIMAL(65,30) NOT NULL,
    "english_proficiency" TEXT NOT NULL,
    "english_proficiency_score" DECIMAL(65,30) NOT NULL,
    "pgwp" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("program_id")
);

-- CreateTable
CREATE TABLE "_IntakeToProgram" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_IntakeToProgram_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "programs_id_key" ON "programs"("id");

-- CreateIndex
CREATE INDEX "programs_name_idx" ON "programs"("name");

-- CreateIndex
CREATE INDEX "programs_name_active_idx" ON "programs"("name", "active");

-- CreateIndex
CREATE UNIQUE INDEX "programs_school_id_slug_key" ON "programs"("school_id", "slug");

-- CreateIndex
CREATE INDEX "_IntakeToProgram_B_index" ON "_IntakeToProgram"("B");

-- CreateIndex
CREATE INDEX "schools_active_idx" ON "schools"("active");

-- CreateIndex
CREATE INDEX "schools_name_active_idx" ON "schools"("name", "active");

-- CreateIndex
CREATE INDEX "schools_country_active_institution_type_ownership_type_idx" ON "schools"("country", "active", "institution_type", "ownership_type");

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "admins"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IntakeToProgram" ADD CONSTRAINT "_IntakeToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "intakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IntakeToProgram" ADD CONSTRAINT "_IntakeToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "programs"("program_id") ON DELETE CASCADE ON UPDATE CASCADE;
