/*
  Warnings:

  - You are about to drop the column `isReset` on the `PasswordResetRequest` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `PasswordResetRequest` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `VerificationRequest` table. All the data in the column will be lost.
  - You are about to drop the `Snapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UploadHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_snapshotId_fkey";

-- DropForeignKey
ALTER TABLE "Snapshot" DROP CONSTRAINT "Snapshot_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Snapshot" DROP CONSTRAINT "Snapshot_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Snapshot" DROP CONSTRAINT "Snapshot_userId_fkey";

-- DropForeignKey
ALTER TABLE "UploadHistory" DROP CONSTRAINT "UploadHistory_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "UploadHistory" DROP CONSTRAINT "UploadHistory_userId_fkey";

-- AlterTable
ALTER TABLE "FailedLoginAttempt" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isblocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PasswordResetRequest" DROP COLUMN "isReset",
DROP COLUMN "password",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "VerificationRequest" DROP COLUMN "isVerified",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Snapshot";

-- DropTable
DROP TABLE "UploadHistory";
