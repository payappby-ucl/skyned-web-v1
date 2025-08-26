-- CreateIndex
CREATE INDEX "programs_slug_idx" ON "public"."programs"("slug");

-- CreateIndex
CREATE INDEX "programs_application_fee_discount_idx" ON "public"."programs"("application_fee_discount");

-- CreateIndex
CREATE INDEX "programs_duration_idx" ON "public"."programs"("duration");

-- CreateIndex
CREATE INDEX "programs_timeframe_idx" ON "public"."programs"("timeframe");

-- CreateIndex
CREATE INDEX "programs_faculty_idx" ON "public"."programs"("faculty");

-- CreateIndex
CREATE INDEX "programs_overview_idx" ON "public"."programs"("overview");

-- CreateIndex
CREATE INDEX "programs_description_idx" ON "public"."programs"("description");

-- CreateIndex
CREATE INDEX "programs_requirements_idx" ON "public"."programs"("requirements");

-- CreateIndex
CREATE INDEX "programs_pgwp_idx" ON "public"."programs"("pgwp");

-- CreateIndex
CREATE INDEX "programs_minimum_education_level_idx" ON "public"."programs"("minimum_education_level");

-- CreateIndex
CREATE INDEX "programs_minimum_education_degree_idx" ON "public"."programs"("minimum_education_degree");

-- CreateIndex
CREATE INDEX "programs_minimum_education_gpa_idx" ON "public"."programs"("minimum_education_gpa");

-- CreateIndex
CREATE INDEX "programs_randomKey_idx" ON "public"."programs"("randomKey");

-- CreateIndex
CREATE INDEX "schools_overview_idx" ON "public"."schools"("overview");
