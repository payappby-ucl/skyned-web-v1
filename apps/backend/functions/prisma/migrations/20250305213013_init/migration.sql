-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');

-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('university', 'college');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('private', 'public');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'CAD', 'AUD', 'NGN', 'EUR');

-- CreateEnum
CREATE TYPE "DegreeLevel" AS ENUM ('undergraduate', 'postgraduate', 'masters', 'diploma', 'certificate');

-- CreateEnum
CREATE TYPE "Intakes" AS ENUM ('winter', 'fall', 'spring');

-- CreateTable
CREATE TABLE "temp_users" (
    "id" SERIAL NOT NULL,
    "token_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" VARCHAR(6) NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temp_users_pkey" PRIMARY KEY ("token_id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "middle_name" VARCHAR(100),
    "last_name" VARCHAR(100) NOT NULL,
    "account_suspended" BOOLEAN NOT NULL DEFAULT false,
    "country_of_residence" VARCHAR(3) NOT NULL,
    "nationality" VARCHAR(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "phone_number" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "study_preferences" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "desired_country" VARCHAR(3) NOT NULL,
    "preferred_program_of_study" TEXT NOT NULL,
    "degree_level" "DegreeLevel" NOT NULL,
    "preferred_intake" "Intakes" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educational_backgrounds" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "highest_level_of_education" "DegreeLevel" NOT NULL,
    "institution_name" TEXT NOT NULL,
    "year_of_graduation" INTEGER NOT NULL,
    "cgpa" DECIMAL(65,30) NOT NULL,
    "field_of_study" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educational_backgrounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_experience" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "years_of_experience" INTEGER NOT NULL,
    "industry" TEXT NOT NULL,
    "current_job_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "admin_id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "middle_name" VARCHAR(100),
    "last_name" VARCHAR(100) NOT NULL,
    "account_suspended" BOOLEAN NOT NULL DEFAULT false,
    "phone_number" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "schools" (
    "id" SERIAL NOT NULL,
    "school_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "state" VARCHAR(10) NOT NULL,
    "country" VARCHAR(3) NOT NULL,
    "city" TEXT NOT NULL,
    "institutionType" "InstitutionType" NOT NULL,
    "ownershipType" "OwnershipType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("school_id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "program_id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("program_id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" SERIAL NOT NULL,
    "admin_id" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "previous_state" JSONB NOT NULL,
    "update_state" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "study_preferences_student_id_key" ON "study_preferences"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "educational_backgrounds_student_id_key" ON "educational_backgrounds"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_experience_student_id_key" ON "work_experience"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "schools_id_key" ON "schools"("id");

-- CreateIndex
CREATE UNIQUE INDEX "schools_slug_key" ON "schools"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "programs_id_key" ON "programs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "programs_slug_key" ON "programs"("slug");

-- AddForeignKey
ALTER TABLE "study_preferences" ADD CONSTRAINT "study_preferences_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_backgrounds" ADD CONSTRAINT "educational_backgrounds_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
