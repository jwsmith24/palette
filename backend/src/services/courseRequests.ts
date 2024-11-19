/**
 * Service functionality for course and assignment-related queries.
 */

import { fetchAPI } from "../utils/fetchAPI.js";
import {
  Assignment,
  CanvasAssignment,
  CanvasCourse,
  Course,
  Submission,
} from "palette-types";
import { CanvasSubmissionResponse } from "palette-types/dist/canvasProtocol/canvasSubmissionResponse";
import {
  mapToPaletteAssignment,
  mapToPaletteCourse,
  mapToPaletteSubmission,
} from "./transformers";

const SUBMISSION_QUERY_PARAMS =
  "?submissions?include[]=group&include[]=user&include[]=submission_comments&grouped=true";

/**
 * Defines CRUD operations for courses from the Canvas API.
 */
export const CoursesAPI = {
  /**
   * Gets all courses that the user is enrolled in with the role of Teacher or TA.
   *
   * @returns Promise for a filtered array of course objects.
   */
  async getCourses(): Promise<Course[]> {
    const canvasCourses = await fetchAPI<CanvasCourse[]>(
      "/courses?enrollment_type=teacher&per_page=25",
    );

    // map canvas courses to palette courses and filter out any null entries
    return canvasCourses
      .map(mapToPaletteCourse)
      .filter((course): course is Course => course !== null);
  },

  async getAssignments(courseId: string): Promise<Assignment[]> {
    if (!courseId) {
      throw new Error("Course ID is undefined");
    }
    const canvasAssignments = await fetchAPI<CanvasAssignment[]>(
      `/courses/${courseId}/assignments?per_page=50`,
    );
    return canvasAssignments.map(mapToPaletteAssignment);
  },

  async getAssignment(
    courseId: string,
    assignmentId: string,
  ): Promise<Assignment> {
    const canvasAssignment = await fetchAPI<CanvasAssignment>(
      `courses/${courseId}/assignments/${assignmentId}`,
    );

    return mapToPaletteAssignment(canvasAssignment);
  },

  async getSubmissions(
    courseId: string,
    assignmentId: string,
  ): Promise<Submission[]> {
    const canvasSubmissions = await fetchAPI<CanvasSubmissionResponse[]>(
      `courses/${courseId}/assignments/${assignmentId}/submissions${SUBMISSION_QUERY_PARAMS}`,
    );

    return canvasSubmissions.map(mapToPaletteSubmission);
  },
};
