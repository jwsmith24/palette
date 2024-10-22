/**
 * This module provides functions for interacting with Rubrics in Canvas by making API requests and
 * handling responses. The request/response types themselves are defined in the Protocol module.
 */

import {DeleteSingleRubricRequest} from "../Protocol/DeleteSingleRubric";
import {GetSingleRubricRequest} from "../Protocol/GetSingleRubric";
import {
    UpdateSingleRubricRequest,
    UpdateSingleRubricResponse
} from "../Protocol/UpdateSingleRubric";
import {CreateRubricRequest, CreateRubricResponse} from "../Protocol/CreateRubric";
import {Rubric} from "./RubricTypes";


/**
 * Deletes a Rubric and removes all RubricAssociations.
 * @param req the request containing the course_id and id (for the Rubric)
 */
export function deleteSingleRubric(req: DeleteSingleRubricRequest): Promise<Rubric> {
    const url = `/api/v1/courses/${req.course_id}/rubrics/${req.id}`;
    return fetch(url, {
        method: "DELETE",
    }).then(res => res.json());
}



/**
 * Gets a rubric with the given course_id and id.
 * @param req the request object (either GetSingleCourseRubricRequest or GetSingleAccountRubricRequest)
 */
export function getSingleRubric(req: GetSingleRubricRequest): Promise<Rubric> {
    let url: string;

    // determine the URL based on the request type
    if (req.type === 'course') {
        url = `/api/v1/courses/${req.course_id}/rubrics/${req.id}`;
    } else if (req.type === 'account') {
        url = `/api/v1/accounts/${req.account_id}/rubrics/${req.id}`;
    } else {
        throw new Error('Invalid request type');
    }

    // append the query parameters (if present)
    const params: string[] = [];
    if (req.params) {
        params.push(...req.params.map(param => `include[]=${param}`));
    }
    if (req.style) {
        params.push(`style=${req.style}`);
    }

    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    return fetch(url).then(res => res.json());
}

/**
 * Updates a Rubric with the given courseId and id.
 * @param req the request object
 * @param courseId the ID of the course to update the Rubric in
 */
export function updateSingleRubric(req: UpdateSingleRubricRequest, courseId: number): Promise<UpdateSingleRubricResponse> {
    const url = `/api/v1/courses/${courseId}/rubrics/${req.id}`;
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(req),
    }).then(res => res.json());
}

/**
 * Creates a new Rubric in the given course.
 * @param courseId the ID of the course to create the Rubric in
 * @param req the request object
 */
export function createSingleRubric(courseId: number, req: CreateRubricRequest): Promise<CreateRubricResponse> {
    const url = `/api/v1/courses/${courseId}/rubrics`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(req),
    }).then(res => res.json());
}
