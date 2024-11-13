import express from "express";
import { rubricValidationErrorHandler } from "../middleware/rubricValidationErrorHandler.js";
import { handleCreateRubricAssociation } from "../controllers/rubricControllers/handleCreateRubricAssociation.js";

import { handleUpdateRubric } from "../controllers/rubricControllers/handleUpdateRubric.js";
import rubricValidator from "../validators/rubricValidator.js";
import {
  courseParamValidator,
  idAndCourseParamValidator,
} from "../validators/baseParamValidators.js";
import {
  getAllCourses,
  getAssignments,
} from "../controllers/courseController.js";

import {
  createRubric,
  deleteRubric,
  getAllRubrics,
  getRubricById,
} from "../controllers/rubricController.js";

const router = express.Router();

/**
 * @route POST /courses/:courseID/rubrics
 * @description Create a new rubric in a specific course.
 */
router.post(
  "/:course_id/rubrics",
  courseParamValidator,
  rubricValidator,
  rubricValidationErrorHandler,
  createRubric,
);

/**
 * @route POST /courses/:course_id/rubric_associations
 * @description Create a new rubric association in a specific course.
 */
router.post(
  "/:course_id/rubric_associations",
  courseParamValidator,
  rubricValidationErrorHandler,
  handleCreateRubricAssociation,
);

/**
 * @route GET /courses/:course_id/rubrics/:id
 * @description Get a rubric by its ID in a specific course.
 */
router.get(
  "/:course_id/rubrics/:id",
  idAndCourseParamValidator,
  rubricValidationErrorHandler,
  getRubricById,
);

/**
 * @route GET /courses/:course_id/rubrics
 * @description Get all rubrics in a specific course.
 * @route - GET courses/
 */
router.get(
  "/:course_id/rubrics",
  courseParamValidator,
  rubricValidationErrorHandler,
  getAllRubrics,
);

/**
 * @route GET /courses
 * @description Get all courses for the current user
 */
router.get("/", getAllCourses);

/**
 * @route PUT /courses/:course_id/rubrics/:id
 * @description Update a rubric by its ID in a specific course.
 */
router.put(
  "/:course_id/rubrics/:id",
  idAndCourseParamValidator,
  rubricValidator,
  rubricValidationErrorHandler,
  handleUpdateRubric,
);

/**
 * @route DELETE /courses/:course_id/rubrics/:id
 * @description Delete a rubric by its ID in a specific course.
 */
router.delete(
  "/:course_id/rubrics/:id",
  idAndCourseParamValidator,
  rubricValidationErrorHandler,
  deleteRubric,
);

/**
 * @route GET /courses/:courseID/assignments
 * @description Get all assignments for a course
 */
router.get("/:courseId/assignments", getAssignments);

export default router;
