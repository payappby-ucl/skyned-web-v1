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

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('verify', 'reset');

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "token_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("token_id")
);
