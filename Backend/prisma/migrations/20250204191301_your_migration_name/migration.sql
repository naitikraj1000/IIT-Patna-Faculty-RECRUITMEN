/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FieldGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_fieldGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateEntries" DROP CONSTRAINT "TemplateEntries_fieldId_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Field";

-- DropTable
DROP TABLE "FieldGroup";

-- DropTable
DROP TABLE "Position";

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "JobPostingId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField1" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Biodata',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationField1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField2" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Education & Employment',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationField2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField3" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Project / Publication',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationField3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField4" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Teaching Experience',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationField4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField5" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Awards and Recognitions',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationField5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField6" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Additional Info',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "applicationId" TEXT NOT NULL,

    CONSTRAINT "ApplicationField6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_JobPostingId_fkey" FOREIGN KEY ("JobPostingId") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField1" ADD CONSTRAINT "ApplicationField1_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField2" ADD CONSTRAINT "ApplicationField2_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField3" ADD CONSTRAINT "ApplicationField3_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField4" ADD CONSTRAINT "ApplicationField4_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField5" ADD CONSTRAINT "ApplicationField5_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField6" ADD CONSTRAINT "ApplicationField6_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
