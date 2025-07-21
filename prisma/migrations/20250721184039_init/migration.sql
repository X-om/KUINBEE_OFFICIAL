/*
  Warnings:

  - Added the required column `gender` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "gender" TEXT NOT NULL;
