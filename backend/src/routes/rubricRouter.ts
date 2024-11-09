// Router for all /rubrics requests
import express from "express";
import { rubricValidationErrorHandler } from "../middleware/rubricValidationErrorHandler.js";
import { handleCreateRubricAssociation } from "../controllers/rubricControllers/handleCreateRubricAssociation.js";
import { handleGetRubricById } from "../controllers/rubricControllers/handleGetRubricById.js";
import { handleGetAllRubrics } from "../controllers/rubricControllers/handleGetAllRubrics.js";
import { handleUpdateRubric } from "../controllers/rubricControllers/handleUpdateRubric.js";
import { handleGetRubricIdByTitle } from "../controllers/rubricControllers/handleGetRubricIdByTitle.js";
import { handleDeleteRubric } from "../controllers/rubricControllers/handleDeleteRubric.js";
import updateRubricValidator from "../validators/updateRubricValidator.js";
import { handleCreateRubric } from "../controllers/rubricControllers/handleCreateRubric.js";
import createRubricValidator from "../validators/rubricValidator.js";
import { getRubricByIDValidator } from "../validators/getRubricByIDValidator.js";
import { getAllRubricsValidator } from "../validators/getAllRubricsValidator.js";

const router = express.Router();

/**
 * @route POST /rubrics
 */
router.post(
  "/",
  createRubricValidator(),
  rubricValidationErrorHandler,
  handleCreateRubric,
);

/**
 * @route POST /rubric_associations
 */
router.post("/rubric_associations", handleCreateRubricAssociation);

/**
 * @route GET /rubrics/:id
 */
router.get(
  "/:id",
  getRubricByIDValidator(),
  rubricValidationErrorHandler,
  handleGetRubricById,
);

/**
 * @route GET /rubrics
 */
router.get(
  "/",
  getAllRubricsValidator(),
  rubricValidationErrorHandler,
  handleGetAllRubrics,
);

/**
 * @route PUT /rubrics/:id
 */
router.put(
  "/:id",
  updateRubricValidator(),
  rubricValidationErrorHandler,
  handleUpdateRubric,
);

/**
 * @route GET /rubrics/title/:title
 */
router.get("/title/:title", handleGetRubricIdByTitle);

/**
 * @route DELETE /rubrics/:id
 */
router.delete("/:id", handleDeleteRubric);

export default router;
