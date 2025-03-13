-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "fieldId" INTEGER,
    "entryId" INTEGER,
    "isFile" BOOLEAN NOT NULL DEFAULT false,
    "required" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateEntries" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldId" INTEGER,
    "isFile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TemplateEntries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FailedLoginAttempt" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isblocked" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FailedLoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField1" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Biodata',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "proofOfDateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "addressForCorrespondence" TEXT NOT NULL,
    "pinCode" VARCHAR(6) NOT NULL,
    "emailId" TEXT NOT NULL,
    "fathersOrHusbandsName" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "advtNo" TEXT NOT NULL,
    "fieldOfSpecialization" TEXT NOT NULL,
    "citizenshipType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pwdCategory" TEXT NOT NULL,
    "presentBasicPay" TEXT,
    "passportPhoto" TEXT NOT NULL,
    "timeNeededBeforeJoining" TEXT NOT NULL,
    "mothersName" TEXT NOT NULL,
    "ageAsOnClosingDate" TEXT NOT NULL,
    "signatureOfApplicant" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobpostingid" TEXT NOT NULL,

    CONSTRAINT "ApplicationField1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField2" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Education & Employment',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "education_details" JSONB NOT NULL,
    "employment_details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobpostingid" TEXT NOT NULL,

    CONSTRAINT "ApplicationField2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField3" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Project / Publication',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pgProjects" TEXT NOT NULL,
    "phdCompleted" TEXT NOT NULL,
    "phdOngoing" TEXT NOT NULL,
    "sponsoredProjects" TEXT NOT NULL,
    "consultancyProjects" TEXT NOT NULL,
    "patents" TEXT NOT NULL,
    "journalNational" TEXT NOT NULL,
    "journalInternational" TEXT NOT NULL,
    "conferenceRefereedNational" TEXT NOT NULL,
    "conferenceUnrefereedNational" TEXT NOT NULL,
    "technicalReports" TEXT NOT NULL,
    "citations" TEXT NOT NULL,
    "conferenceRefereedInternational" TEXT NOT NULL,
    "conferenceUnrefereedInternational" TEXT NOT NULL,
    "booksPublished" TEXT NOT NULL,
    "bookChaptersPublished" TEXT NOT NULL,
    "researchExperience" TEXT NOT NULL,
    "patentsList" TEXT NOT NULL,
    "journalPublications" TEXT NOT NULL,
    "conferencePublications" TEXT NOT NULL,
    "researchPublications" JSONB NOT NULL,
    "jobpostingid" TEXT NOT NULL,

    CONSTRAINT "ApplicationField3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField4" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Academic Background',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "teachingExperience" TEXT NOT NULL,
    "coursesTaught" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "specializationDetails" TEXT NOT NULL,
    "phdThesisTitle" TEXT NOT NULL,
    "phdSupervisor" TEXT NOT NULL,
    "phdWorkDocument" TEXT NOT NULL,
    "labExperienceDocument" TEXT NOT NULL,
    "coSupervisor" TEXT,
    "thesisSubmissionDate" TEXT NOT NULL,
    "vivaVoceDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobpostingid" TEXT NOT NULL,

    CONSTRAINT "ApplicationField4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField5" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Awards and Recognitions',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "awardsHonours" TEXT NOT NULL,
    "fellowProfessionalBody" TEXT NOT NULL,
    "memberProfessionalBody" TEXT NOT NULL,
    "editorialBoardMemberships" TEXT NOT NULL,
    "seminarsOrganized" TEXT NOT NULL,
    "jobpostingid" TEXT NOT NULL,

    CONSTRAINT "ApplicationField5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationField6" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Additional Info',
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jobpostingid" TEXT NOT NULL,

    CONSTRAINT "ApplicationField6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PasswordResetRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "submitted" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralField" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "allowFile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReferralField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralEntry" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "referralId" TEXT,
    "isFile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ReferralEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completepercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField1_jobpostingid_key" ON "ApplicationField1"("jobpostingid");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField2_jobpostingid_key" ON "ApplicationField2"("jobpostingid");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField3_jobpostingid_key" ON "ApplicationField3"("jobpostingid");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField4_jobpostingid_key" ON "ApplicationField4"("jobpostingid");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationField5_jobpostingid_key" ON "ApplicationField5"("jobpostingid");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_email_key" ON "Referral"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FailedLoginAttempt" ADD CONSTRAINT "FailedLoginAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "PasswordResetRequest" ADD CONSTRAINT "PasswordResetRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEntry" ADD CONSTRAINT "ReferralEntry_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "ReferralField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEntry" ADD CONSTRAINT "ReferralEntry_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRequest" ADD CONSTRAINT "VerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
