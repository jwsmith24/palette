import {RelatedRubricRecord} from "../Rubrics/RubricTypes";

export interface BaseRubricRequest {
    id: number;                         // The ID of the rubric
    params?: RelatedRubricRecord[];     // include the specified related records in the response
    style?: "full" | "comments_only";   // the style of the rubric (applicable only if params include "assessments")
}

export interface GetSingleCourseRubricRequest extends BaseRubricRequest {
    type: 'course';
    course_id: number; // The ID of the course
}

export interface GetSingleAccountRubricRequest extends BaseRubricRequest {
    type: 'account';
    account_id: number; // The ID of the account
}

/**
 * This type represents the request body for getting a single Rubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics_api.show
 */
export type GetSingleRubricRequest = GetSingleAccountRubricRequest | GetSingleCourseRubricRequest;