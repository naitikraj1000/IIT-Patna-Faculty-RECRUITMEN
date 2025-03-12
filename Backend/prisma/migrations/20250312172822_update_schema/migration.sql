/*
  Warnings:

  - A unique constraint covering the columns `[jobpostingid]` on the table `ApplicationField2` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField2_jobpostingid_key" ON "ApplicationField2"("jobpostingid");
