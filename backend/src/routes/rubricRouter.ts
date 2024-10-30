// Router for all /rubrics requests
import express, { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
//import validateRubric from '../validators/rubricValidator';
import { RubricService } from '../services/rubricService';
import PrismaRubricService from '../services/prismaRubricService.js';
import validateRubric from '../validators/rubricValidator.js';

const router = express.Router();
const rubricService: RubricService = new PrismaRubricService();

export interface Rubric {
  id?: number;
  title: string; // required
  contextId?: number | null;
  pointsPossible: number; // required
  reusable?: boolean | null;
  readOnly?: boolean | null;
  freeFormCriterionComments?: boolean | null;
  hideScoreTotal?: boolean | null;
  content?: string | null;
  published?: boolean;
  authorId?: number | null;
  rubricCriteria: RubricCriterion[]; // required
  key?: string;
}

export interface RubricCriterion {
  description: string;
  longDescription?: string;
  points: number;
  ratings: RubricRating[];
}

export interface RubricRating {
  description: string;
  longDescription?: string;
  points: number;
}

router.post(
  "/",
  validateRubric,
  asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(400).send({ errors: errors.array() });
      return;
    }

    await rubricService.createRubric(req.body as Rubric);
    // respond with the rubric without the key and id fields

    res.status(201).json(req.body as Rubric);
  }),
);

// fetch a specific rubric by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const rubric = await rubricService.getRubricById(Number(id));
    // Check if the rubric was found
    if (!rubric) {
      res.status(404).send({ error: "Rubric not found" });
      return;
    }

    res.status(200).send(rubric); // Send the found rubric back
  }),
);

/**
 * Return all rubrics from the database.
 *
 * "_" is added in front of req to tell eslint that it's not being used but still has to be there anyway.
 */
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    // gets all rubrics with their criteria and ratings
    const rubrics: Rubric[] = await rubricService.getAllRubrics();
    res.status(200).send(rubrics);
  }),
);

// update an existing rubric
router.put(
  "/:id",
  validateRubric,
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }

    // get the params
    const { id } = req.params;

    // does the rubric already exist?
    const existingRubric = await rubricService.getRubricById(Number(id));

    // if not, create a new rubric
    if (!existingRubric) {
      const newRubric = await rubricService.createRubric(req.body as Rubric);
      res.status(201).json(newRubric);
      return;
    }

    // Otherwise, update the existing rubric
    await rubricService.updateRubric(Number(id), req.body as Rubric);
    // No error, send back the updated rubric
    res.status(200).send(req.body as Rubric);
  }),
);

// get a rubric by title
router.get(
  "/title/:title",
  asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.params;

    if (!title) {
      res.status(400).json({ error: "Rubric title is required!" });
      return;
    }

    const rubric = await rubricService.getRubricIdByTitle(title);

    if (rubric) {
      res.status(200).json({ exists: true, id: rubric.id });
    } else {
      res.status(404).json({ exists: false, id: null });
    }
  }),
);

// delete an existing rubric
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // delete the rubric
    await rubricService.deleteRubric(Number(id));
    res.status(204).send(); // Deletion was successful
  }),
);

export default router;
