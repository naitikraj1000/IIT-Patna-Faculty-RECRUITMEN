/*
  Warnings:

  - You are about to drop the column `citations` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `conferenceRefereedInternational` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `conferenceRefereedNational` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `conferenceUnrefereedInternational` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `conferenceUnrefereedNational` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `journalInternational` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `journalNational` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `technicalReports` on the `ApplicationField3` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationField3" DROP COLUMN "citations",
DROP COLUMN "conferenceRefereedInternational",
DROP COLUMN "conferenceRefereedNational",
DROP COLUMN "conferenceUnrefereedInternational",
DROP COLUMN "conferenceUnrefereedNational",
DROP COLUMN "journalInternational",
DROP COLUMN "journalNational",
DROP COLUMN "technicalReports";
