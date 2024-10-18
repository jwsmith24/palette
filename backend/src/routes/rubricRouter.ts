// Router for all /rubrics requests
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
import { Criteria } from "../../../frontend/src/models/types/criteria";
import { Rating } from "../../../frontend/src/models/types/rating";

const router = express.Router();
const prisma = new PrismaClient();

const validateRubric = [
  body("title")
    .isString()
    .notEmpty()
    .trim()
    .withMessage("Rubric does not have a title"),
  body("rubricCriteria")
    .isArray({ min: 1 })
    .withMessage("Rubric must have at least one criterion."),
  body("rubricCriteria.*.description") // * === all objects in the criteria array
    .isString()
    .notEmpty()
    .trim()
    .withMessage("Each criterion must have a description"),
  body("rubricCriteria.*.points")
    .isNumeric()
    .withMessage("maxPoints field must be type number"),
];

// @ts-ignore
router.post("/rubrics", validateRubric, async (req: Request, res: Response) => {
  console.log("got: ", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, rubricCriteria } = req.body;

  try {
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
    return res.status(201).json(newRubric);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create new rubric" });
  }
});

// fetch all rubrics from the database
router.get("/rubrics", async (req: Request, res: Response) => {
  console.log("got", req.body);

  try {
    const rubrics = await prisma.rubric.findMany(); // gets all rubrics
    res.status(200).json(rubrics); // Send back list of all rubrics
  } catch (error) {
    res.status(500).json({ error: "Failed to get rubrics." });
    console.log(error);
  }
});

export default router;
