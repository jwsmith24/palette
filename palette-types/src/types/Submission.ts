import {Criteria} from "./Criteria";

/**
 * Defines the Submission type for use within the Palette application.
 *
 */
export interface Submission {
  id: number;
  user: {
    id: number;
    name: string;
    asurite: string; // stored as user.login_id in Canvas Submission response
  };
  group?: {
    id: number;
    name?: string;
  };
  comments: {
    id: number;
    authorName: string;
    comment: string;
  }[];
  rubricAssessment: Criteria[];
  // used to track if a student has submitted an assignment or not. (workflow_state on Canvas Submission response)
  graded: boolean;
  gradedBy: number; // grader ID
  late?: boolean;
  missing?: boolean;
  attachments?: {
    filename: string;
    url: string;
  }[];
}
