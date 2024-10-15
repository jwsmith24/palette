-- CreateTable
CREATE TABLE "RubricCriterion" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "long_description" VARCHAR(510) NOT NULL,
    "points" INTEGER NOT NULL,
    "criterion_use_range" INTEGER NOT NULL,
    "rubric_id" INTEGER NOT NULL,

    CONSTRAINT "RubricCriterion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricRating" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "long_description" VARCHAR(510) NOT NULL,
    "points" INTEGER NOT NULL,
    "criterion_use_range" INTEGER NOT NULL,
    "criterion_id" INTEGER NOT NULL,

    CONSTRAINT "RubricRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricAssessment" (
    "id" SERIAL NOT NULL,
    "rubric_id" INTEGER NOT NULL,
    "rubric_association_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "artifact_type" TEXT NOT NULL,
    "artifact_id" INTEGER NOT NULL,
    "artifact_attempt" INTEGER NOT NULL,
    "assessment_type" TEXT NOT NULL,
    "assessor_id" INTEGER NOT NULL,

    CONSTRAINT "RubricAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricAssociation" (
    "id" SERIAL NOT NULL,
    "rubric_id" INTEGER NOT NULL,
    "association_id" INTEGER NOT NULL,
    "association_type" TEXT NOT NULL,
    "use_for_grading" BOOLEAN NOT NULL,
    "summary_data" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "hide_score_total" BOOLEAN NOT NULL,
    "hide_points" BOOLEAN NOT NULL,
    "hide_outcome_results" BOOLEAN NOT NULL,

    CONSTRAINT "RubricAssociation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RubricCriterion" ADD CONSTRAINT "RubricCriterion_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRating" ADD CONSTRAINT "RubricRating_criterion_id_fkey" FOREIGN KEY ("criterion_id") REFERENCES "RubricCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
