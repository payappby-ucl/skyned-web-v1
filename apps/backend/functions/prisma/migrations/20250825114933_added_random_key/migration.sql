-- AlterTable
ALTER TABLE "public"."programs" ADD COLUMN     "randomKey" DOUBLE PRECISION NOT NULL DEFAULT RANDOM();

-- AlterTable
ALTER TABLE "public"."schools" ADD COLUMN     "randomKey" DOUBLE PRECISION NOT NULL DEFAULT RANDOM();
