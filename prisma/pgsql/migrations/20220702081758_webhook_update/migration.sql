/*
  Warnings:

  - You are about to drop the column `robotId` on the `webhooks` table. All the data in the column will be lost.
  - Made the column `robotId` on table `rules` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `robot_id` to the `webhooks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rules" DROP CONSTRAINT "rules_robotId_fkey";

-- DropForeignKey
ALTER TABLE "webhooks" DROP CONSTRAINT "webhooks_robotId_fkey";

-- AlterTable
ALTER TABLE "rules" ALTER COLUMN "robotId" SET NOT NULL;

-- AlterTable
ALTER TABLE "webhooks" DROP COLUMN "robotId",
ADD COLUMN     "robot_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "rules" ADD CONSTRAINT "rules_robotId_fkey" FOREIGN KEY ("robotId") REFERENCES "robots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_robot_id_fkey" FOREIGN KEY ("robot_id") REFERENCES "robots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
