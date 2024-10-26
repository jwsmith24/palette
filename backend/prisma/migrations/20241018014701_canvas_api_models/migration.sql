/*
  Warnings:

  - You are about to drop the column `criteria` on the `Rubric` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Rubric` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Rubric` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title,authorId]` on the table `Rubric` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Rubric"
    DROP COLUMN "criteria",
    DROP COLUMN "description",
    ADD COLUMN "authorId"                     INTEGER DEFAULT 0,
    ADD COLUMN "content"                      TEXT,
    ADD COLUMN "context_id"                   INTEGER,
    ADD COLUMN "context_type"                 TEXT,
    ADD COLUMN "createdAt"                    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "free_form_criterion_comments" BOOLEAN,
    ADD COLUMN "hide_score_total"             BOOLEAN,
    ADD COLUMN "points_possible"              INTEGER      NOT NULL DEFAULT 0,
    ADD COLUMN "published"                    BOOLEAN      NOT NULL DEFAULT false,
    ADD COLUMN "read_only"                    BOOLEAN,
    ADD COLUMN "reusable"                     BOOLEAN,
    ADD COLUMN "updatedAt"                    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "RubricCriterion"
(
    "id"               SERIAL       NOT NULL,
    "description"      VARCHAR(255) NOT NULL,
    "long_description" VARCHAR(510) NOT NULL,
    "points"           INTEGER      NOT NULL DEFAULT 0,
    "criterion_use_range" INTEGER,
    "rubric_id"        INTEGER      NOT NULL,

    CONSTRAINT "RubricCriterion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricRating"
(
    "id"               SERIAL       NOT NULL,
    "description"      VARCHAR(255) NOT NULL,
    "long_description" VARCHAR(510) NOT NULL,
    "points"           INTEGER      NOT NULL DEFAULT 0,
    "criterion_use_range" INTEGER,
    "criterion_id"     INTEGER      NOT NULL,

    CONSTRAINT "RubricRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricAssessment"
(
    "id"               SERIAL  NOT NULL,
    "rubric_id"        INTEGER NOT NULL,
    "rubric_association_id" INTEGER NOT NULL,
    "score"            INTEGER NOT NULL,
    "artifact_type"    TEXT    NOT NULL,
    "artifact_id"      INTEGER NOT NULL,
    "artifact_attempt" INTEGER NOT NULL,
    "assessment_type"  TEXT    NOT NULL,
    "assessor_id"      INTEGER NOT NULL,

    CONSTRAINT "RubricAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricAssociation"
(
    "id"               SERIAL  NOT NULL,
    "rubric_id"        INTEGER NOT NULL,
    "association_id"   INTEGER NOT NULL,
    "association_type" TEXT    NOT NULL,
    "use_for_grading"  BOOLEAN NOT NULL,
    "summary_data"     TEXT    NOT NULL,
    "purpose"          TEXT    NOT NULL,
    "hide_score_total" BOOLEAN NOT NULL,
    "hide_points"      BOOLEAN NOT NULL,
    "hide_outcome_results" BOOLEAN NOT NULL,

    CONSTRAINT "RubricAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rubric_title_authorId_key" ON "Rubric" ("title", "authorId");

-- AddForeignKey
ALTER TABLE "RubricCriterion"
    ADD CONSTRAINT "RubricCriterion_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRating"
    ADD CONSTRAINT "RubricRating_criterion_id_fkey" FOREIGN KEY ("criterion_id") REFERENCES "RubricCriterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
