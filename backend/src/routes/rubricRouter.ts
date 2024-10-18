// Router for all /rubrics requests
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
// @ts-ignore
import { Criteria } from "@models/types/criteria";
// @ts-ignore // ts doesn't like using models from another module but whatever
import { Rating } from "@models/types/rating";
import asyncHandler from "express-async-handler";

const router = express.Router();
const prisma = new PrismaClient();

// defines validation for rubrics before being stored on the database
const validateRubric = [
  body("title")
    .isString()
    .notEmpty()
    .trim()
    .withMessage("Rubric does not have a title")
    .isLength({ max: 255 }) // max length: 255 characters
    .withMessage("Rubric title must not exceed 255 characters."),
  body("rubricCriteria")
    .isArray({ min: 1 })
    .withMessage("Rubric must have at least one criterion."),
  body("rubricCriteria.*.description") // * === all objects in the criteria array
    .isString()
    .notEmpty()
    .trim()
    .withMessage("Each criterion must have a description"),
  body("rubricCriteria.*.longDescription").optional().isString(),
  body("rubricCriteria.*.points")
    .isNumeric()
    .withMessage("points field must be numeric"),
];

router.post(
  "/",
  validateRubric,
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }

    const { title, rubricCriteria } = req.body;

    const newRubric = await prisma.rubric.create({
      data: {
        title,
        rubricCriteria: {
          create: rubricCriteria.map((criterion: Criteria) => ({
            description: criterion.description,
            longDescription: criterion.longDescription, // Make sure to include this if it's required
            points: criterion.points,
            ratings: {
              create: criterion.ratings.map((rating: Rating) => ({
                description: rating.description,
                points: rating.points,
              })),
            },
          })),
        },
      },
    });
    res.status(201).send(newRubric);
  }),
);

// fetch a specific rubric by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(`trying to fetch rubric with id=${id}`);
    const rubric = await prisma.rubric.findUnique({
      where: { id: Number(id) },
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    });

    console.log("found ", rubric);

    // Check if the rubric was found
    if (!rubric) {
      res.status(404).send({ error: "Rubric not found" });
    }

    res.status(200).send(rubric); // Send the found rubric back
  }),
);

// fetch all rubrics from the database
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // gets all rubrics with their criteria and ratings
    const rubrics = await prisma.rubric.findMany({
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    });
    res.status(200).send(rubrics); // Send back list of all rubrics
  }),
);

// update an existing rubric

router.put(
  "/:id",
  validateRubric,
  asyncHandler(async (req: Request, res: Response) => {
    const { title, rubricCriteria } = req.body;

    if (rubricCriteria && Array.isArray(rubricCriteria)) {
      // Ensure each criterion has an ID before updating
      const updateCriteriaData = rubricCriteria.map((criterion) => {
        if (!criterion.id) {
          throw new Error("Each criterion must have an id to update");
        }
        return {
          where: { id: criterion.id }, // criterion ID is required to update
          data: {
            description: criterion.description,
            longDescription: criterion.longDescription,
            points: criterion.points,
          },
        };
      });

      const updatedRubric = await prisma.rubric.update({
        where: { id: parseInt(req.params.id, 10) },
        data: {
          title: title,
          rubricCriteria: {
            update: updateCriteriaData,
          },
        },
        include: {
          rubricCriteria: true, // Include criteria in the response
        },
      });

      res.json(updatedRubric);
    } else {
      res
        .status(400)
        .json({ error: "Invalid rubric criteria format or missing criteria" });
    }
  }),
);

// delete an existing rubric
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.rubric.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // Deletion was successful
  }),
);

export default router;
