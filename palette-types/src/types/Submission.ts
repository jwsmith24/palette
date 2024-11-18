import {Criteria} from "./Criteria";

/**
 * Defines the Submission type for use within the Palette application.
 *
 */
export interface Submission {
  user: {
    id: number;
    name: string;
    asurite: string; // stored as user.login_id in Canvas Submission response
  };
  comment: string;
  isGroupComment: boolean;
  rubricAssessment: Criteria[];
  // used to track if a student has submitted an assignment or not. (workflow_state on Canvas Submission response)
  submitted: boolean;
  late: boolean;
  missing: boolean;
  attachments: {
    fileName: string;
    url: string;
  }[];
}
