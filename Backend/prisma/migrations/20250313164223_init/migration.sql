/*
  Warnings:

  - A unique constraint covering the columns `[jobpostingid]` on the table `ApplicationField6` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField6_jobpostingid_key" ON "ApplicationField6"("jobpostingid");
