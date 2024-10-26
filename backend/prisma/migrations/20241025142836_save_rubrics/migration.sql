-- DropForeignKey
ALTER TABLE "RubricCriterion" DROP CONSTRAINT "RubricCriterion_rubricId_fkey";

-- DropForeignKey
ALTER TABLE "RubricRating" DROP CONSTRAINT "RubricRating_criterionId_fkey";

-- AddForeignKey
ALTER TABLE "RubricCriterion"
    ADD CONSTRAINT "RubricCriterion_rubricId_fkey" FOREIGN KEY ("rubricId") REFERENCES "Rubric" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRating"
    ADD CONSTRAINT "RubricRating_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "RubricCriterion" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
