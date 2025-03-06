/*
  Warnings:

  - Added the required column `addressForCorrespondence` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `advtNo` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ageAsOnClosingDate` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citizenshipType` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fathersOrHusbandsName` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldOfSpecialization` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNo` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mothersName` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportPhoto` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanentAddress` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proofOfDateOfBirth` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pwdCategory` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signatureOfApplicant` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeNeededBeforeJoining` to the `ApplicationField1` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationField1" ADD COLUMN     "addressForCorrespondence" TEXT NOT NULL,
ADD COLUMN     "advtNo" TEXT NOT NULL,
ADD COLUMN     "ageAsOnClosingDate" INTEGER NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "citizenshipType" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emailId" TEXT NOT NULL,
ADD COLUMN     "fathersOrHusbandsName" TEXT NOT NULL,
ADD COLUMN     "fieldOfSpecialization" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "maritalStatus" TEXT NOT NULL,
ADD COLUMN     "mobileNo" TEXT NOT NULL,
ADD COLUMN     "mothersName" TEXT NOT NULL,
ADD COLUMN     "passportPhoto" TEXT NOT NULL,
ADD COLUMN     "permanentAddress" TEXT NOT NULL,
ADD COLUMN     "pinCode" VARCHAR(6) NOT NULL,
ADD COLUMN     "presentBasicPay" TEXT,
ADD COLUMN     "proofOfDateOfBirth" TEXT NOT NULL,
ADD COLUMN     "pwdCategory" TEXT NOT NULL,
ADD COLUMN     "signatureOfApplicant" TEXT NOT NULL,
ADD COLUMN     "timeNeededBeforeJoining" TEXT NOT NULL;
