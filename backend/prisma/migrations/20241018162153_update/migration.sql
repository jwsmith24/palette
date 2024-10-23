/*
  Warnings:

  - You are about to drop the column `context_id` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `context_type` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `free_form_criterion_comments` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `hide_score_total` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `points_possible` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `read_only` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `artifact_attempt` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `artifact_id` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `artifact_type` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_type` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `assessor_id` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `rubric_association_id` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `rubric_id` on the `RubricAssessment` table. All the data in the column will be lost.
  - You are about to drop the column `association_id` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `association_type` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `hide_outcome_results` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `hide_points` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `hide_score_total` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `rubric_id` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `summary_data` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `use_for_grading` on the `RubricAssociation` table. All the data in the column will be lost.
  - You are about to drop the column `criterion_use_range` on the `RubricCriterion` table. All the data in the column will be lost.
  - You are about to drop the column `long_description` on the `RubricCriterion` table. All the data in the column will be lost.
  - You are about to drop the column `rubric_id` on the `RubricCriterion` table. All the data in the column will be lost.
  - You are about to drop the column `criterion_id` on the `RubricRating` table. All the data in the column will be lost.
  - You are about to drop the column `criterion_use_range` on the `RubricRating` table. All the data in the column will be lost.
  - You are about to drop the column `long_description` on the `RubricRating` table. All the data in the column will be lost.
  - Added the required column `artifactAttempt` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artifactId` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artifactType` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assessmentType` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assessorId` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rubricAssociationId` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rubricId` to the `RubricAssessment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `associationId` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `associationType` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hideOutcomeResults` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hidePoints` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hideScoreTotal` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rubricId` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summaryData` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useForGrading` to the `RubricAssociation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rubricId` to the `RubricCriterion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criterionId` to the `RubricRating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RubricCriterion"
    DROP CONSTRAINT "RubricCriterion_rubric_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricRating"
    DROP CONSTRAINT "RubricRating_criterion_id_fkey";

-- AlterTable
ALTER TABLE "Rubric"
    DROP COLUMN "context_id",
    DROP COLUMN "context_type",
    DROP COLUMN "free_form_criterion_comments",
    DROP COLUMN "hide_score_total",
    DROP COLUMN "points_possible",
    DROP COLUMN "read_only",
    ADD COLUMN "contextId"                 INTEGER,
    ADD COLUMN "contextType"               TEXT,
    ADD COLUMN "freeFormCriterionComments" BOOLEAN,
    ADD COLUMN "hideScoreTotal"            BOOLEAN,
    ADD COLUMN "pointsPossible"            INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN "readOnly"                  BOOLEAN;

-- AlterTable
ALTER TABLE "RubricAssessment"
    DROP COLUMN "artifact_attempt",
    DROP COLUMN "artifact_id",
    DROP COLUMN "artifact_type",
    DROP COLUMN "assessment_type",
    DROP COLUMN "assessor_id",
    DROP COLUMN "rubric_association_id",
    DROP COLUMN "rubric_id",
    ADD COLUMN "artifactAttempt"     INTEGER NOT NULL,
    ADD COLUMN "artifactId"          INTEGER NOT NULL,
    ADD COLUMN "artifactType"        TEXT    NOT NULL,
    ADD COLUMN "assessmentType"      TEXT    NOT NULL,
    ADD COLUMN "assessorId"          INTEGER NOT NULL,
    ADD COLUMN "rubricAssociationId" INTEGER NOT NULL,
    ADD COLUMN "rubricId"            INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RubricAssociation"
    DROP COLUMN "association_id",
    DROP COLUMN "association_type",
    DROP COLUMN "hide_outcome_results",
    DROP COLUMN "hide_points",
    DROP COLUMN "hide_score_total",
    DROP COLUMN "rubric_id",
    DROP COLUMN "summary_data",
    DROP COLUMN "use_for_grading",
    ADD COLUMN "associationId"      INTEGER NOT NULL,
    ADD COLUMN "associationType"    TEXT    NOT NULL,
    ADD COLUMN "hideOutcomeResults" BOOLEAN NOT NULL,
    ADD COLUMN "hidePoints"         BOOLEAN NOT NULL,
    ADD COLUMN "hideScoreTotal"     BOOLEAN NOT NULL,
    ADD COLUMN "rubricId"           INTEGER NOT NULL,
    ADD COLUMN "summaryData"        TEXT    NOT NULL,
    ADD COLUMN "useForGrading"      BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "RubricCriterion"
    DROP COLUMN "criterion_use_range",
    DROP COLUMN "long_description",
    DROP COLUMN "rubric_id",
    ADD COLUMN "criterionUseRange" INTEGER,
    ADD COLUMN "longDescription"   VARCHAR(510),
    ADD COLUMN "rubricId"          INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RubricRating"
    DROP COLUMN "criterion_id",
    DROP COLUMN "criterion_use_range",
    DROP COLUMN "long_description",
    ADD COLUMN "criterionId"       INTEGER NOT NULL,
    ADD COLUMN "criterionUseRange" INTEGER,
    ADD COLUMN "longDescription"   VARCHAR(510);

-- AddForeignKey
ALTER TABLE "RubricCriterion"
    ADD CONSTRAINT "RubricCriterion_rubricId_fkey" FOREIGN KEY ("rubricId") REFERENCES "Rubric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRating"
    ADD CONSTRAINT "RubricRating_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "RubricCriterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
