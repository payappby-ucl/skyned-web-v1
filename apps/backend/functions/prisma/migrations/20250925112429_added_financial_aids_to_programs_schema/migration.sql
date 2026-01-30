-- AlterTable
ALTER TABLE "public"."programs" ADD COLUMN     "financial_aids" TEXT[] DEFAULT ARRAY[]::TEXT[];
