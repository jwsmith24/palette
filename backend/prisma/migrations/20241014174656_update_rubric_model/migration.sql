/*
  Warnings:

  - You are about to drop the column `userId` on the `Rubric` table. All the data in the column will be lost.
  - Changed the type of `criteria` on the `Rubric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Rubric" DROP CONSTRAINT "Rubric_userId_fkey";

-- AlterTable
ALTER TABLE "Rubric"
DROP
COLUMN "userId",
    DROP
COLUMN "criteria",
    ADD COLUMN "criteria" JSONB NOT NULL;
