/*
  Warnings:

  - Added the required column `strapiCourseId` to the `purchasedCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchasedCourse" ADD COLUMN     "strapiCourseId" INTEGER NOT NULL;
