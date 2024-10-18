-- AlterTable
ALTER TABLE "RubricCriterion" ALTER COLUMN "long_description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricRating" ALTER COLUMN "long_description" DROP NOT NULL;
