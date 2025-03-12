/*
  Warnings:

  - You are about to drop the column `education_board_university` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_date_of_entry` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_date_of_leaving` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_distinction_class` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_exam_passed` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_percentage_cpi` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_school_college_institute` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_subjects` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `education_year_of_passing` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_additional_remarks` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_date_of_joining` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_date_of_leaving` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_last_pay_scale` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_nature_of_duties` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_organisation` on the `ApplicationField2` table. All the data in the column will be lost.
  - You are about to drop the column `employment_position_held` on the `ApplicationField2` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationField2" DROP COLUMN "education_board_university",
DROP COLUMN "education_date_of_entry",
DROP COLUMN "education_date_of_leaving",
DROP COLUMN "education_distinction_class",
DROP COLUMN "education_exam_passed",
DROP COLUMN "education_percentage_cpi",
DROP COLUMN "education_school_college_institute",
DROP COLUMN "education_subjects",
DROP COLUMN "education_year_of_passing",
DROP COLUMN "employment_additional_remarks",
DROP COLUMN "employment_date_of_joining",
DROP COLUMN "employment_date_of_leaving",
DROP COLUMN "employment_last_pay_scale",
DROP COLUMN "employment_nature_of_duties",
DROP COLUMN "employment_organisation",
DROP COLUMN "employment_position_held",
ADD COLUMN     "education_details" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "employment_details" JSONB NOT NULL DEFAULT '{}';
