import {CanvasSubmissionResponse} from "palette-types/dist/canvasProtocol/canvasSubmissionResponse";
import {Assignment, CanvasAssignment, CanvasCourse, Course, Submission,} from "palette-types";

/**
 * Convert canvas course object to palette course object.
 * @param canvasCourse - course information from the Canvas API.
 * @returns Valid courses entry to display or null to be filtered out.
 */
export function mapToPaletteCourse(canvasCourse: CanvasCourse): Course | null {
  const teacherOrTaEnrollments = canvasCourse.enrollments?.filter(
    (enrollment) =>
      (enrollment.type === "teacher" || enrollment.type === "ta") &&
      enrollment.enrollment_state === "active",
  );

  // Return null if no matching enrollments are found
  if (!teacherOrTaEnrollments || teacherOrTaEnrollments.length === 0) {
    return null;
  }

  return {
    id: canvasCourse.id,
    name: canvasCourse.name,
    courseCode: canvasCourse.course_code,
    termId: canvasCourse.enrollment_term_id,
    isPublic: canvasCourse.is_public,
    defaultView: canvasCourse.default_view,
    enrollments: teacherOrTaEnrollments.map((enrollment) => ({
      type: enrollment.type as "teacher" | "ta", // Type assertions to ensure compatibility
      enrollmentState: enrollment.enrollment_state,
    })),
  } as Course;
}

/**
 * Convert CanvasAssignment object to Palette Assignment object.
 *
 * Stores rubric id to fetch rubric when needed.
 * @param canvasAssignment - assignment information from the Canvas API.
 * @returns Valid assignment entry to display.
 */
export function mapToPaletteAssignment(
  canvasAssignment: CanvasAssignment,
): Assignment {
  return {
    id: canvasAssignment.id,
    name: canvasAssignment.name,
    description: canvasAssignment.description || "",
    dueDate: canvasAssignment.due_at || "",
    pointsPossible: canvasAssignment.points_possible,
    rubricId:
      canvasAssignment.rubric && canvasAssignment.rubric_settings
        ? canvasAssignment.rubric_settings.id
        : undefined,
  };
}

/**
 * Canvas provides way more info than what we need. Pick from data and throw an error if something is missing.
 * @param canvasResponse
 */
export const mapToPaletteSubmission = (
  canvasResponse: CanvasSubmissionResponse,
): Submission => {
  if (!canvasResponse)
    throw new Error("Invalid canvas submission.. cannot transform.");

  try {
    const transformComments = [{ id: 1, authorName: "jake", comment: "hi" }];
    const transformAttachments = [
      { url: "super rad url", fileName: "super rad file name" },
    ];
    return {
      id: canvasResponse.id,
      user: {
        id: canvasResponse.user.id,
        name: canvasResponse.user.name,
        asurite: canvasResponse.user.display_name,
      },
      group: {
        id: canvasResponse.group.id,
        name: canvasResponse.group.name,
      },
      comments: transformComments,
      rubricAssessment: [],
      graded: canvasResponse.graded_at !== null,
      gradedBy: canvasResponse.grader_id,
      late: canvasResponse?.late || undefined,
      missing: canvasResponse?.missing || undefined,
      attachments: transformAttachments,
    } as Submission;
  } catch (error) {
    throw new Error(
      "Error transforming the submission response from Canvas",
      error as Error,
    );
  }
};
