/*
  Warnings:

  - You are about to drop the column `function` on the `rules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rules" DROP COLUMN "function",
ADD COLUMN     "func" TEXT;
