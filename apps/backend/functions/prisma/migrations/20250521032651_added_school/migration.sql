-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('university', 'college');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('private', 'public');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'CAD', 'AUD', 'NGN', 'EUR', 'GBP');

-- CreateTable
CREATE TABLE "schools" (
    "id" SERIAL NOT NULL,
    "school_id" TEXT NOT NULL,
    "logo" JSONB NOT NULL,
    "school_image" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "state" VARCHAR(10) NOT NULL,
    "country" VARCHAR(3) NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "institution_type" "InstitutionType" NOT NULL,
    "ownership_type" "OwnershipType" NOT NULL,
    "currency" "Currency" NOT NULL,
    "overview" TEXT NOT NULL,
    "created_by_id" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("school_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schools_id_key" ON "schools"("id");

-- CreateIndex
CREATE UNIQUE INDEX "schools_slug_key" ON "schools"("slug");

-- CreateIndex
CREATE INDEX "schools_name_idx" ON "schools"("name");

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "admins"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
