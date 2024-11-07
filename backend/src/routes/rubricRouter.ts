// Router for all /rubrics requests
import express from "express";
import validateRubric from "../validators/rubricValidator.js";
import { handleCreateRubric } from "../controllers/handleCreateRubric.js";
import { rubricFieldErrorHandler } from "../middleware/rubricFieldErrorHandler.js";
import { handleGetAllRubrics } from "../controllers/handleGetAllRubrics.js";
import { handleGetRubricById } from "../controllers/handleGetRubricById.js";
import { handleUpdateRubric } from "../controllers/handleUpdateRubric.js";
import { handleDeleteRubric } from "../controllers/handleDeleteRubric.js";
import { handleGetRubricIdByTitle } from "../controllers/handleGetRubricIdByTitle.js";

const router = express.Router();

/**
 * @route POST /rubrics
 */
router.post("/", validateRubric, rubricFieldErrorHandler, handleCreateRubric);

/**
 * @route GET /rubrics/:id
 */
router.get("/:id", handleGetRubricById);

/**
 * @route GET /rubrics
 */
router.get("/", handleGetAllRubrics);

/**
 * @route PUT /rubrics/:id
 */
router.put("/:id", validateRubric, rubricFieldErrorHandler, handleUpdateRubric);

/**
 * @route GET /rubrics/title/:title
 */
router.get("/title/:title", handleGetRubricIdByTitle);

/**
 * @route DELETE /rubrics/:id
 */
router.delete("/:id", handleDeleteRubric);

export default router;
