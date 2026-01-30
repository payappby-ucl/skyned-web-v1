-- CreateTable
CREATE TABLE "public"."scholarships" (
    "id" SERIAL NOT NULL,
    "scholarship_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "banner" JSONB NOT NULL,
    "overview" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "eligibility_requirements" TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scholarships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scholarships_slug_key" ON "public"."scholarships"("slug");

-- CreateIndex
CREATE INDEX "scholarships_category_idx" ON "public"."scholarships"("category");

-- CreateIndex
CREATE INDEX "scholarships_slug_idx" ON "public"."scholarships"("slug");

-- CreateIndex
CREATE INDEX "scholarships_created_at_idx" ON "public"."scholarships"("created_at");

-- CreateIndex
CREATE INDEX "scholarships_updated_at_idx" ON "public"."scholarships"("updated_at");

-- AddForeignKey
ALTER TABLE "public"."scholarships" ADD CONSTRAINT "scholarships_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."admins"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
