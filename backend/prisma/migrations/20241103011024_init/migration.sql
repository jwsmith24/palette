/*
  Warnings:

  - Added the required column `tempateId` to the `RubricCriterion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RubricCriterion" ADD COLUMN     "tempateId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RubricCriterion" ADD CONSTRAINT "RubricCriterion_tempateId_fkey" FOREIGN KEY ("tempateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
