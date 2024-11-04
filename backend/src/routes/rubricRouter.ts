// Router for all /rubrics requests
import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import validateRubric from "../validators/rubricValidator.js";
import { handleCreateRubric } from "../controllers/handleCreateRubric.js";
import { rubricFieldErrorHandler } from "../middleware/rubricFieldErrorHandler.js";

const router = express.Router();

/**
 * Create a new rubric on Canvas.
 * @route POST /rubrics
 */
router.post("/", validateRubric, handleCreateRubric, rubricFieldErrorHandler);

/**
 * Fetch a specific rubric by ID.
 * @route GET /rubrics/:id
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
router.get(
  "/:id",
  asyncHandler((req: Request, res: Response) => {
    console.log(req, res);

    //   const { id } = req.params;
    //   const rubric = await rubricService.getRubricById(Number(id));
    //   // Check if the rubric was found
    //   if (!rubric) {
    //     res.status(StatusCodes.NOT_FOUND).send({ error: "Rubric not found" });
    //     return;
    //   }
    //
    //   res.status(StatusCodes.OK).send(rubric); // Send the found rubric back
    // }),
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
  asyncHandler((req: Request, res: Response) => {
    console.log(req, res);
    // // this always returns an array, even if empty
    // const rubrics = await rubricService.getAllRubrics();
    // res.status(StatusCodes.OK).send(rubrics);
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
  asyncHandler((req: Request, res: Response) => {
    console.log(req, res);
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     res.status(StatusCodes.BAD_REQUEST).send({ errors: errors.array() });
    //     return;
    //   }
    //
    //   // get the params
    //   const { id } = req.params;
    //
    //   // does the rubric already exist?
    //   const existingRubric = await rubricService.getRubricById(Number(id));
    //
    //   // if not, create a new rubric
    //   if (!existingRubric) {
    //     const newRubric = await rubricService.createRubric(
    //       req.body as PrismaRubric,
    //     );
    //     res.status(StatusCodes.CREATED).json(newRubric);
    //     return;
    //   }
    //
    //   // Otherwise, update the existing rubric
    //   const updatedRubric = await rubricService.updateRubric(
    //     Number(id),
    //     req.body as PrismaRubric,
    //   );
    //
    //   if (!updatedRubric) {
    //     res
    //       .status(StatusCodes.INTERNAL_SERVER_ERROR)
    //       .json({ error: "Failed to update rubric" });
    //     return;
    //   }
    //
    //   // No error, send back the updated rubric
    //   res.status(StatusCodes.OK).send(updatedRubric);
    // }),
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
  asyncHandler((req: Request, res: Response) => {
    console.log(req, res);
    // const { title } = req.params;
    //
    // if (!title) {
    //   res
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json({ error: 'Rubric title is required!' });
    //   return;
    // }
    //
    // const rubric = await rubricService.getRubricIdByTitle(title);
    //
    // if (rubric) {
    //   res.status(StatusCodes.OK).json({ exists: true, id: rubric.id });
    // } else {
    //   res.status(StatusCodes.NOT_FOUND).json({ exists: false, id: -1 });
    // }
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
  asyncHandler((req: Request, res: Response) => {
    console.log(req, res);
    // const { id } = req.params;
    //
    // // delete the rubric
    // await rubricService.deleteRubric(Number(id));
    // res.status(StatusCodes.NO_CONTENT).send(); // Deletion was successful
  }),
);

export default router;
