/*
  Warnings:

  - You are about to drop the column `robotTypeId` on the `robots` table. All the data in the column will be lost.
  - Added the required column `robot_type_id` to the `robots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "robots" DROP CONSTRAINT "robots_robotTypeId_fkey";

-- AlterTable
ALTER TABLE "robots" DROP COLUMN "robotTypeId",
ADD COLUMN     "robot_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "robots" ADD CONSTRAINT "robots_robot_type_id_fkey" FOREIGN KEY ("robot_type_id") REFERENCES "robot_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
