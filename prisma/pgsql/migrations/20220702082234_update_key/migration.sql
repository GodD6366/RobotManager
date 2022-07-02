/*
  Warnings:

  - You are about to drop the column `robotId` on the `rules` table. All the data in the column will be lost.
  - Added the required column `robot_id` to the `rules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rules" DROP CONSTRAINT "rules_robotId_fkey";

-- AlterTable
ALTER TABLE "rules" DROP COLUMN "robotId",
ADD COLUMN     "robot_id" INTEGER NOT NULL;
