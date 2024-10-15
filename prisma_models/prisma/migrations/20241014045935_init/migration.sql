-- CreateTable
CREATE TABLE "Rubric" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "context_id" INTEGER NOT NULL,
    "context_type" TEXT NOT NULL,
    "points_possible" INTEGER NOT NULL,
    "reuasable" BOOLEAN NOT NULL,
    "read_only" BOOLEAN NOT NULL,
    "free_form_criterion_comments" BOOLEAN NOT NULL,
    "hide_score_total" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Rubric_pkey" PRIMARY KEY ("id")
);
