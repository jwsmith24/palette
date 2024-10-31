// Router for all /rubrics requests
import express, { Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
//import validateRubric from '../validators/rubricValidator';
import { RubricService } from "../services/rubricService";
import PrismaRubricService from "../services/prismaRubricService.js";
import validateRubric from "../validators/rubricValidator.js";
import { Rubric } from "../../../palette-types/src/DatabaseSafeTypes";
import { StatusCodes } from "http-status-codes";

const router = express.Router();
const rubricService: RubricService = new PrismaRubricService();

/**
 * Create a new rubric in the database.
 * @route POST /rubrics
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.post(
  "/",
  validateRubric,
  asyncHandler(async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      res.status(StatusCodes.BAD_REQUEST).send({ errors: errors.array() });
      return;
    }

    const createdRubric = await rubricService.createRubric(req.body as Rubric);

    if (createdRubric) {
      res.status(StatusCodes.CREATED).json(createdRubric);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create rubric" });
    }
  }),
);

/**
 * Fetch a specific rubric by ID.
 * @route GET /rubrics/:id
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const rubric = await rubricService.getRubricById(Number(id));
    // Check if the rubric was found
    if (!rubric) {
      res.status(StatusCodes.NOT_FOUND).send({ error: "Rubric not found" });
      return;
    }

    res.status(StatusCodes.OK).send(rubric); // Send the found rubric back
  }),
);

/**
 * Return all rubrics from the database.
 * @route GET /rubrics
 * @param {Request} _req - The request object (not used).
 * @param {Response} res - The response object.
 */
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    // this always returns an array, even if empty
    const rubrics = await rubricService.getAllRubrics();
    res.status(StatusCodes.OK).send(rubrics);
  }),
);

/**
 * Update an existing rubric.
 * @route PUT /rubrics/:id
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.put(
  "/:id",
  validateRubric,
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(StatusCodes.BAD_REQUEST).send({ errors: errors.array() });
      return;
    }

    // get the params
    const { id } = req.params;

    // does the rubric already exist?
    const existingRubric = await rubricService.getRubricById(Number(id));

    // if not, create a new rubric
    if (!existingRubric) {
      const newRubric = await rubricService.createRubric(req.body as Rubric);
      res.status(StatusCodes.CREATED).json(newRubric);
      return;
    }

    // Otherwise, update the existing rubric
    const updatedRubric = await rubricService.updateRubric(
      Number(id),
      req.body as Rubric,
    );

    if (!updatedRubric) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update rubric" });
      return;
    }

    // No error, send back the updated rubric
    res.status(StatusCodes.OK).send(updatedRubric);
  }),
);

/**
 * Get a rubric id by title.
 * @route GET /rubrics/title/:title
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get(
  "/title/:title",
  asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.params;

    if (!title) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Rubric title is required!" });
      return;
    }

    const rubric = await rubricService.getRubricIdByTitle(title);

    if (rubric) {
      res.status(StatusCodes.OK).json({ exists: true, id: rubric.id });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ exists: false, id: -1 });
    }
  }),
);

/**
 * Delete an existing rubric.
 * @route DELETE /rubrics/:id
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // delete the rubric
    await rubricService.deleteRubric(Number(id));
    res.status(StatusCodes.NO_CONTENT).send(); // Deletion was successful
  }),
);

export default router;
