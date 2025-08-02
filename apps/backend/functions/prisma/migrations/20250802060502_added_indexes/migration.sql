-- CreateIndex
CREATE INDEX "accommodations_created_by_id_idx" ON "public"."accommodations"("created_by_id");

-- CreateIndex
CREATE INDEX "activity_logs_resource_id_idx" ON "public"."activity_logs"("resource_id");

-- CreateIndex
CREATE INDEX "activity_logs_admin_id_idx" ON "public"."activity_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admins_created_by_id_idx" ON "public"."admins"("created_by_id");

-- CreateIndex
CREATE INDEX "blog_posts_updated_at_idx" ON "public"."blog_posts"("updated_at");

-- CreateIndex
CREATE INDEX "blog_posts_featured_idx" ON "public"."blog_posts"("featured");

-- CreateIndex
CREATE INDEX "blog_posts_status_idx" ON "public"."blog_posts"("status");

-- CreateIndex
CREATE INDEX "blog_posts_author_id_idx" ON "public"."blog_posts"("author_id");

-- CreateIndex
CREATE INDEX "blog_posts_published_at_idx" ON "public"."blog_posts"("published_at");

-- CreateIndex
CREATE INDEX "categories_created_by_id_idx" ON "public"."categories"("created_by_id");

-- CreateIndex
CREATE INDEX "categories_created_at_idx" ON "public"."categories"("created_at");

-- CreateIndex
CREATE INDEX "categories_updated_at_idx" ON "public"."categories"("updated_at");

-- CreateIndex
CREATE INDEX "departments_lead_id_idx" ON "public"."departments"("lead_id");

-- CreateIndex
CREATE INDEX "english_proficiencies_programId_idx" ON "public"."english_proficiencies"("programId");

-- CreateIndex
CREATE INDEX "faqs_created_by_id_idx" ON "public"."faqs"("created_by_id");

-- CreateIndex
CREATE INDEX "intakes_school_id_idx" ON "public"."intakes"("school_id");

-- CreateIndex
CREATE INDEX "intakes_created_by_id_idx" ON "public"."intakes"("created_by_id");

-- CreateIndex
CREATE INDEX "programs_school_id_idx" ON "public"."programs"("school_id");

-- CreateIndex
CREATE INDEX "programs_created_by_id_idx" ON "public"."programs"("created_by_id");

-- CreateIndex
CREATE INDEX "schools_created_by_id_idx" ON "public"."schools"("created_by_id");

-- CreateIndex
CREATE INDEX "tags_created_by_id_idx" ON "public"."tags"("created_by_id");

-- CreateIndex
CREATE INDEX "tags_created_at_idx" ON "public"."tags"("created_at");

-- CreateIndex
CREATE INDEX "tags_updated_at_idx" ON "public"."tags"("updated_at");

-- CreateIndex
CREATE INDEX "teams_department_id_idx" ON "public"."teams"("department_id");

-- CreateIndex
CREATE INDEX "teams_created_by_id_idx" ON "public"."teams"("created_by_id");

-- CreateIndex
CREATE INDEX "teams_lead_id_idx" ON "public"."teams"("lead_id");
