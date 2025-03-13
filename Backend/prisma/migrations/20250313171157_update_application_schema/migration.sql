/*
  Warnings:

  - Added the required column `additionalRemarks` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courtCase` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `declaration` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalProceeding` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousApplication` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrer1` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrer2` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrer3` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.
  - Added the required column `researchPlan` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ApplicationField6_jobpostingid_key";

-- AlterTable
ALTER TABLE "ApplicationField6" ADD COLUMN     "additionalRemarks" TEXT NOT NULL,
ADD COLUMN     "courtCase" TEXT NOT NULL,
ADD COLUMN     "declaration" TEXT NOT NULL,
ADD COLUMN     "legalProceeding" TEXT NOT NULL,
ADD COLUMN     "previousApplication" TEXT NOT NULL,
ADD COLUMN     "referrer1" JSONB NOT NULL,
ADD COLUMN     "referrer2" JSONB NOT NULL,
ADD COLUMN     "referrer3" JSONB NOT NULL,
ADD COLUMN     "researchPlan" JSONB NOT NULL;
