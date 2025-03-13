/*
  Warnings:

  - A unique constraint covering the columns `[jobpostingid]` on the table `ApplicationField6` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ApplicationField6" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField6_jobpostingid_key" ON "ApplicationField6"("jobpostingid");
