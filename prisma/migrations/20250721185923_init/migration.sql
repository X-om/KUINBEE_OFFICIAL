/*
  Warnings:

  - You are about to drop the column `linkedId` on the `Auth` table. All the data in the column will be lost.
  - Added the required column `city` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_linkedId_Admin_fkey";

-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_linkedId_SuperAdmin_fkey";

-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_linkedId_User_fkey";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "linkedId",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "superAdminId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "PersonalInfo" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "pinCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "SuperAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
