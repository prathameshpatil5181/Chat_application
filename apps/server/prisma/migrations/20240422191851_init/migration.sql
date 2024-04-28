/*
  Warnings:

  - Added the required column `createdBy` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "Admins" TEXT[],
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profilePicture" TEXT NOT NULL DEFAULT '';
