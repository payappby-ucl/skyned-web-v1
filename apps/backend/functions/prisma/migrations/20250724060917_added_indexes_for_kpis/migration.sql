-- CreateIndex
CREATE INDEX "accommodations_created_at_idx" ON "accommodations"("created_at");

-- CreateIndex
CREATE INDEX "activity_logs_created_at_idx" ON "activity_logs"("created_at");

-- CreateIndex
CREATE INDEX "activity_logs_action_idx" ON "activity_logs"("action");

-- CreateIndex
CREATE INDEX "activity_logs_resource_idx" ON "activity_logs"("resource");

-- CreateIndex
CREATE INDEX "admins_created_at_idx" ON "admins"("created_at");

-- CreateIndex
CREATE INDEX "admins_account_suspended_idx" ON "admins"("account_suspended");

-- CreateIndex
CREATE INDEX "admins_first_name_idx" ON "admins"("first_name");

-- CreateIndex
CREATE INDEX "admins_last_name_idx" ON "admins"("last_name");

-- CreateIndex
CREATE INDEX "admins_gender_idx" ON "admins"("gender");

-- CreateIndex
CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts"("created_at");

-- CreateIndex
CREATE INDEX "departments_name_idx" ON "departments"("name");

-- CreateIndex
CREATE INDEX "departments_created_at_idx" ON "departments"("created_at");

-- CreateIndex
CREATE INDEX "faqs_created_at_idx" ON "faqs"("created_at");

-- CreateIndex
CREATE INDEX "inquiries_created_at_idx" ON "inquiries"("created_at");

-- CreateIndex
CREATE INDEX "intakes_created_at_idx" ON "intakes"("created_at");

-- CreateIndex
CREATE INDEX "programs_active_idx" ON "programs"("active");

-- CreateIndex
CREATE INDEX "programs_created_at_idx" ON "programs"("created_at");

-- CreateIndex
CREATE INDEX "programs_tuition_fee_idx" ON "programs"("tuition_fee");

-- CreateIndex
CREATE INDEX "programs_tuition_fee_type_idx" ON "programs"("tuition_fee_type");

-- CreateIndex
CREATE INDEX "programs_application_fee_idx" ON "programs"("application_fee");

-- CreateIndex
CREATE INDEX "schools_created_at_idx" ON "schools"("created_at");

-- CreateIndex
CREATE INDEX "schools_currency_idx" ON "schools"("currency");

-- CreateIndex
CREATE INDEX "teams_name_idx" ON "teams"("name");

-- CreateIndex
CREATE INDEX "teams_created_at_idx" ON "teams"("created_at");
