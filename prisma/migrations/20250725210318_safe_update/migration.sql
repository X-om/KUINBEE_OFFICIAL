/*
  Warnings:

  - The `alternativePhNo` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `email` on the `Auth` table. All the data in the column will be lost.
  - The `alternativePhNo` column on the `SuperAdmin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[emailId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `phNo` on the `Admin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `emailId` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `PersonalInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phNo` on the `SuperAdmin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `phNo` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterEnum
ALTER TYPE "AdminPermission" ADD VALUE 'READ';

-- DropIndex
DROP INDEX "Auth_email_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "phNo",
ADD COLUMN     "phNo" BIGINT NOT NULL,
DROP COLUMN "alternativePhNo",
ADD COLUMN     "alternativePhNo" BIGINT;

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "email",
ADD COLUMN     "emailId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalInfo" ALTER COLUMN "aadharUrl" DROP NOT NULL,
ALTER COLUMN "panCardUrl" DROP NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "SuperAdmin" DROP COLUMN "phNo",
ADD COLUMN     "phNo" BIGINT NOT NULL,
DROP COLUMN "alternativePhNo",
ADD COLUMN     "alternativePhNo" BIGINT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phNo",
ADD COLUMN     "phNo" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_emailId_key" ON "Auth"("emailId");
