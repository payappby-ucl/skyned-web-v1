/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `admins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "activity_logs" (
    "id" SERIAL NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "resource" TEXT NOT NULL,
    "resource_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "previous_state" JSONB,
    "current_state" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_id_key" ON "admins"("id");

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
