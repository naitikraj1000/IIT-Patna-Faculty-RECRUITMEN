/*
  Warnings:

  - You are about to drop the column `applicationId` on the `ApplicationField1` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `ApplicationField3` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `ApplicationField4` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `ApplicationField5` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `ApplicationField6` table. All the data in the column will be lost.
  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[jobpostingid]` on the table `ApplicationField1` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobpostingid` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_board_university` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_date_of_entry` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_date_of_leaving` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_distinction_class` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_exam_passed` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_percentage_cpi` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_school_college_institute` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_subjects` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education_year_of_passing` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_additional_remarks` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_date_of_joining` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_date_of_leaving` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_last_pay_scale` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_nature_of_duties` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_organisation` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employment_position_held` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobpostingid` to the `ApplicationField2` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobpostingid` to the `ApplicationField3` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobpostingid` to the `ApplicationField4` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobpostingid` to the `ApplicationField5` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobpostingid` to the `ApplicationField6` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_JobPostingId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationField1" DROP CONSTRAINT "ApplicationField1_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationField2" DROP CONSTRAINT "ApplicationField2_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationField3" DROP CONSTRAINT "ApplicationField3_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationField4" DROP CONSTRAINT "ApplicationField4_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationField5" DROP CONSTRAINT "ApplicationField5_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationField6" DROP CONSTRAINT "ApplicationField6_applicationId_fkey";

-- AlterTable
ALTER TABLE "ApplicationField1" DROP COLUMN "applicationId",
ADD COLUMN     "jobpostingid" TEXT NOT NULL,
ALTER COLUMN "ageAsOnClosingDate" SET DATA TYPE TEXT,
ALTER COLUMN "dateOfBirth" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ApplicationField2" DROP COLUMN "applicationId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "education_board_university" TEXT NOT NULL,
ADD COLUMN     "education_date_of_entry" TEXT NOT NULL,
ADD COLUMN     "education_date_of_leaving" TEXT NOT NULL,
ADD COLUMN     "education_distinction_class" TEXT NOT NULL,
ADD COLUMN     "education_exam_passed" TEXT NOT NULL,
ADD COLUMN     "education_percentage_cpi" TEXT NOT NULL,
ADD COLUMN     "education_school_college_institute" TEXT NOT NULL,
ADD COLUMN     "education_subjects" TEXT NOT NULL,
ADD COLUMN     "education_year_of_passing" TEXT NOT NULL,
ADD COLUMN     "educationdetailsindex" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "employment_additional_remarks" TEXT NOT NULL,
ADD COLUMN     "employment_date_of_joining" TEXT NOT NULL,
ADD COLUMN     "employment_date_of_leaving" TEXT NOT NULL,
ADD COLUMN     "employment_last_pay_scale" TEXT NOT NULL,
ADD COLUMN     "employment_nature_of_duties" TEXT NOT NULL,
ADD COLUMN     "employment_organisation" TEXT NOT NULL,
ADD COLUMN     "employment_position_held" TEXT NOT NULL,
ADD COLUMN     "jobpostingid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ApplicationField3" DROP COLUMN "applicationId",
ADD COLUMN     "jobpostingid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ApplicationField4" DROP COLUMN "applicationId",
ADD COLUMN     "jobpostingid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ApplicationField5" DROP COLUMN "applicationId",
ADD COLUMN     "jobpostingid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ApplicationField6" DROP COLUMN "applicationId",
ADD COLUMN     "jobpostingid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "Application";

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField1_jobpostingid_key" ON "ApplicationField1"("jobpostingid");

-- AddForeignKey
ALTER TABLE "ApplicationField1" ADD CONSTRAINT "ApplicationField1_jobpostingid_fkey" FOREIGN KEY ("jobpostingid") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField2" ADD CONSTRAINT "ApplicationField2_jobpostingid_fkey" FOREIGN KEY ("jobpostingid") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField3" ADD CONSTRAINT "ApplicationField3_jobpostingid_fkey" FOREIGN KEY ("jobpostingid") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField4" ADD CONSTRAINT "ApplicationField4_jobpostingid_fkey" FOREIGN KEY ("jobpostingid") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField5" ADD CONSTRAINT "ApplicationField5_jobpostingid_fkey" FOREIGN KEY ("jobpostingid") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationField6" ADD CONSTRAINT "ApplicationField6_jobpostingid_fkey" FOREIGN KEY ("jobpostingid") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
