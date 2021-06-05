/*
  Warnings:

  - You are about to drop the column `courseId` on the `watchedVideos` table. All the data in the column will be lost.
  - Added the required column `userId` to the `watchedVideos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "watchedVideos" DROP CONSTRAINT "watchedVideos_courseId_fkey";

-- AlterTable
ALTER TABLE "watchedVideos" DROP COLUMN "courseId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "watchedVideos" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
