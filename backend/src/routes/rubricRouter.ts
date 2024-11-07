// Router for all /rubrics requests
import express from 'express';
import validateRubric from '../validators/rubricValidator.js';
import { rubricFieldErrorHandler } from '@middleware';
import {
  handleCreateRubric,
  handleCreateRubricAssociation,
  handleDeleteRubric,
  handleGetAllRubrics,
  handleGetRubricById,
  handleGetRubricIdByTitle,
  handleUpdateRubric,
} from '@controllers';

const router = express.Router();

/**
 * @route POST /rubrics
 */
router.post("/", validateRubric, rubricFieldErrorHandler, handleCreateRubric);

/**
 * @route POST /rubric_associations
 */
router.post("/rubric_associations", handleCreateRubricAssociation);


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
