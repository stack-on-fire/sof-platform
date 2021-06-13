/*
  Warnings:

  - You are about to drop the `purchasedCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchasedCourses" DROP CONSTRAINT "purchasedCourses_userId_fkey";

-- DropTable
DROP TABLE "purchasedCourses";

-- CreateTable
CREATE TABLE "purchasedCourse" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchasedCourse" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
