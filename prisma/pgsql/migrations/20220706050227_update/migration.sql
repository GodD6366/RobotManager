/*
  Warnings:

  - You are about to drop the column `ownerId` on the `robots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "robots" DROP COLUMN "ownerId",
ADD COLUMN     "group_id" INTEGER,
ADD COLUMN     "owner_id" INTEGER;

-- CreateTable
CREATE TABLE "robot-group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "robot-group_pkey" PRIMARY KEY ("id")
);
