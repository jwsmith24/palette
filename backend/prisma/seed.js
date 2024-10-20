/**
 * Script to generate a sample rubric entry with multiple criteria and rating options.
 */

// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // create a rubric for testing
  try {
    const rubric = await prisma.rubric.create({
      data: {
        title: "Basic Programming Assignment",
        contextId: 1,
        contextType: "assignment",
        pointsPossible: 100,
        reusable: true,
        readOnly: false,
        freeFormCriterionComments: true,
        hideScoreTotal: false,
        content: "A rubric for assessing basic programming skills.",
        published: true,
        authorId: 1,
      },
    });

    // Create Rubric Criteria
    const criteria = await prisma.rubricCriterion.createMany({
      data: [
        {
          description: "Correctness",
          longDescription:
            "The solution produces the correct output for all provided test cases.",
          points: 50,
          criterionUseRange: null,
          rubricId: rubric.id, // Use the rubric ID created above
        },
        {
          description: "Code Quality",
          longDescription:
            "The code is well-structured, readable, and follows best practices.",
          points: 30,
          criterionUseRange: null,
          rubricId: rubric.id,
        },
        {
          description: "Documentation",
          longDescription:
            "The code is well-documented with appropriate comments and a README file.",
          points: 20,
          criterionUseRange: null,
          rubricId: rubric.id,
        },
      ],
    });

    // Fetch the created criteria to get their IDs
    const createdCriteria = await prisma.rubricCriterion.findMany({
      where: { rubricId: rubric.id },
    });

    // Create Rubric Ratings for each Criterion
    const ratingsData = [
      {
        description: "Exceeds Expectations",
        longDescription:
          "The submission is not only correct but also includes additional features or optimizations.",
        points: 50,
        criterionId: createdCriteria[0].id, // Correctly referencing the ID of the first criterion
      },
      {
        description: "Meets Expectations",
        longDescription:
          "The submission meets all requirements and produces correct output.",
        points: 40,
        criterionId: createdCriteria[0].id, // Correctly referencing the ID of the first criterion
      },
      {
        description: "Needs Improvement",
        longDescription:
          "The submission has some errors and does not meet all requirements.",
        points: 20,
        criterionId: createdCriteria[0].id, // Correctly referencing the ID of the first criterion
      },
      {
        description: "Unsatisfactory",
        longDescription: "The submission is incomplete or does not work.",
        points: 0,
        criterionId: createdCriteria[0].id, // Correctly referencing the ID of the first criterion
      },
      {
        description: "Good",
        longDescription:
          "The code is mostly clean and well-structured, with minor issues.",
        points: 25,
        criterionId: createdCriteria[1].id, // Correctly referencing the ID of the second criterion
      },
      {
        description: "Fair",
        longDescription:
          "The code has significant readability issues but is functional.",
        points: 15,
        criterionId: createdCriteria[1].id, // Correctly referencing the ID of the second criterion
      },
      {
        description: "Poor",
        longDescription:
          "The code is difficult to read and understand, with major structural issues.",
        points: 0,
        criterionId: createdCriteria[1].id, // Correctly referencing the ID of the second criterion
      },
      {
        description: "Excellent",
        longDescription:
          "The documentation is thorough and provides all necessary information.",
        points: 20,
        criterionId: createdCriteria[2].id, // Correctly referencing the ID of the third criterion
      },
      {
        description: "Adequate",
        longDescription:
          "The documentation is sufficient but lacks detail in some areas.",
        points: 10,
        criterionId: createdCriteria[2].id, // Correctly referencing the ID of the third criterion
      },
      {
        description: "Inadequate",
        longDescription:
          "The documentation is missing or does not provide useful information.",
        points: 0,
        criterionId: createdCriteria[2].id, // Correctly referencing the ID of the third criterion
      },
    ];

    // Create Rubric Ratings
    await prisma.rubricRating.createMany({
      data: ratingsData,
    });
  } catch (error) {
    console.error(
      "Rubric with same title already exists on the database. Change the title to add a new entry.",
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
