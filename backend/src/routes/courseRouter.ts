import express from "express";
import {
  getAllCourses,
  getAssignments,
} from "../controllers/courseController.js";

const router = express.Router();

/**
 * @route - GET courses/
 */
router.get("/", getAllCourses);

/**
 * @route - GET courses/:course_id/assignments
 */
router.get("/:courseId/assignments", getAssignments);

export default router;
