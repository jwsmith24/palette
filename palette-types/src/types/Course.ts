/**
 * Defines a Course object within the Palette context.
 */

export interface Course {
  id: number; // REQUIRED: Canvas-assigned unique identifier for the course
  name: string; // Course name to display in the Palette app
  courseCode: string; // Short code identifying the course (e.g., "CS101")
  termId: number; // Identifier for the term to which the course belongs
  isPublic: boolean; // Indicates if the course is publicly accessible
  defaultView: "feed" | "wiki" | "modules" | "assignments" | "syllabus"; // Default view for the course in Canvas
  enrollments: Array<{
    type: "teacher" | "ta"; // Enrollment type filtered to include only teachers or TAs
    enrollmentState: "active"; // Ensures only active enrollments are included
  }>;
  key: string; // Unique key used for React rendering
}
