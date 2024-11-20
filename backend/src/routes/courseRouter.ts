import express from "express";
import { rubricValidationErrorHandler } from "../middleware/rubricValidationErrorHandler.js";

import { handleDeleteRubric } from "../controllers/rubricControllers/handleDeleteRubric.js";
import rubricValidator from "../validators/rubricValidator.js";
import {
  assignmentParamValidator,
  courseParamValidator,
  idAndCourseParamValidator,
} from "../validators/baseParamValidators.js";

import {
  getAllCourses,
  getAssignment,
  getAssignments,
} from "../controllers/courseController.js";

import {
  createRubric,
  getAllRubrics,
  getRubric,
  updateRubric,
} from "../controllers/rubricController.js";

import { getSubmissions } from "../controllers/submissionController.js";

const router = express.Router();

/**
 * Submission Routes
 */
router.get(
  "/:course_id/assignments/:assignment_id/submissions",
  courseParamValidator,
  assignmentParamValidator,
  getSubmissions,
);

/**
 * @route POST /courses/:courseID/rubrics
 * @description Create a new rubric in a specific course.
 */
router.post(
  "/:course_id/rubrics/:assignment_id",
  courseParamValidator,
  assignmentParamValidator,
  rubricValidator,
  rubricValidationErrorHandler,
  createRubric,
);

/**
 * @route GET /courses/:course_id/rubrics/:id
 * @description Get a rubric by its ID in a specific course.
 */
router.get(
  "/:course_id/rubrics/:rubric_id",
  idAndCourseParamValidator,
  rubricValidationErrorHandler,
  getRubric,
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
  "/:course_id/rubrics/:rubric_id/:assignment_id",
  idAndCourseParamValidator,
  assignmentParamValidator,
  rubricValidator,
  rubricValidationErrorHandler,
  updateRubric,
);

/**
 * @route DELETE /courses/:course_id/rubrics/:id
 * @description Delete a rubric by its ID in a specific course.
 */
router.delete(
  "/:course_id/rubrics/:rubric_id",
  idAndCourseParamValidator,
  rubricValidationErrorHandler,
  handleDeleteRubric,
);

/**
 * @route GET /courses/:courseID/assignments
 * @description Get all assignments for a course
 */
router.get("/:course_id/assignments", getAssignments);

/**
 * @route GET /courses/:courseId/assignments/:assignmentId
 */
router.get("/:course_id/assignments/:assignment_id", getAssignment);

export default router;
