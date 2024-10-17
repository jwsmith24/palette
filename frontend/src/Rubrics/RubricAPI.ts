import {
    RubricAssociationPurpose,
    RubricAssociationType,
    Rubric,
    RubricCriterion
} from "./Rubric";
import {RubricAssociation} from "./Rubric";


/**
 * This type is a return type for the following API requests:
 * 1. Create a new Rubric
 * 2. Update a single Rubric
 * 3. Get a single Rubric
 */
interface RubricObjectHash {
    rubric: Rubric;
    rubric_association: RubricAssociation;
}

/**
 * This type represents the request body for creating a new Rubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.create
 */
export interface CreateRubricRequest {
    id: number; // The ID of the rubric
    rubric_association_id: number; // The ID of the object associated with the rubric

// The rubric object
    rubric: {
        title: string; // Title of the rubric
        free_form_criterion_comments: boolean; // Whether free-form comments are allowed
        criteria: { [key: number]: RubricCriterion }; // An indexed hash of RubricCriteria objects
    };

// The rubric_association object
    rubric_association: {
        association_id: number; // The ID of the object this rubric is associated with
        association_type: RubricAssociationType // Type of object
        use_for_grading: boolean; // Whether rubric is used for grade calculation
        hide_score_total: boolean; // Whether to hide the score total
        purpose: RubricAssociationPurpose // Purpose of the association
    };
}

/**
 * This type represents the response body for creating a new Rubric.
 * It is a type alias for the RubricObjectHash interface.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.create
 */
export type CreateRubricResponse = RubricObjectHash;

/**
 * This type represents the request body for creating a new Rubric.
 * The request body must contain all required fields. (i.e. no optional fields).
 * Note: The necessity of all fields being present may be subject to change.
 */
export type ValidCreateRubricRequest = Required<CreateRubricRequest>;

/**
 * This type represents the request body for updating a Rubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export interface UpdateSingleRubricRequest {
    id: number; // The ID of the rubric
    rubric_association_id: number; // The ID of the object associated with the rubric

    // The rubric object
    rubric: {
        title: string; // Title of the rubric
        free_form_criterion_comments: boolean; // Whether free-form comments are allowed
        skip_updating_points_possible: boolean; // Whether to skip updating the points possible
        criteria: { [key: number]: RubricCriterion }; // An indexed hash of RubricCriteria objects
    };

    // The rubric_association object
    rubric_association: {
        association_id: number; // The ID of the object this rubric is associated with
        association_type: RubricAssociationType // Type of object
        use_for_grading: boolean; // Whether the rubric is used for grade calculation
        hide_score_total: boolean; // Whether to hide the score total
        purpose: RubricAssociationPurpose // Purpose of the association
    };
}

/**
 * This type represents the response body for updating a Rubric.
 * It is a type alias for the RubricObjectHash interface.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.update
 */
export type UpdateSingleRubricResponse = RubricObjectHash;

/**
 * This type represents the request body for deleting a Rubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics.destroy
 */
export interface DeleteSingleRubricRequest {
    course_id: number; // The ID of the course
    id: number; // The ID of the rubric
}

export interface BaseRubricRequest {
    id: number; // The ID of the rubric
    params?: RelatedRubricRecord[]; // include the specified related records in the response
    style?: "full" | "comments_only"; // the style of the rubric (applicable only if params include "assessments")
}

/**
 * This type represents the request body for updating a Rubric.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics_api.show
 */
export interface GetSingleCourseRubricRequest extends BaseRubricRequest {
    type: 'course';
    course_id: number; // The ID of the course
}

export interface GetSingleAccountRubricRequest extends BaseRubricRequest {
    type: 'account';
    account_id: number; // The ID of the account
}

export type GetSingleRubricRequest = GetSingleAccountRubricRequest | GetSingleCourseRubricRequest;

/**
 * This type represents the allowable values for the params field in the GetSingleRubricRequest type.
 *
 * https://canvas.instructure.com/doc/api/rubrics.html#method.rubrics_api.show
 */
export type RelatedRubricRecord = "assessments" | "graded_assessments"
    | "peer_assessments" | "associations" | "assignment_associations"
    | "course_associations" | "account_associations";

/**
 * Deletes a Rubric and removes all RubricAssociations.
 * @param req the request object
 */
export function deleteSingleRubric(req: DeleteSingleRubricRequest): Promise<Rubric> {
    const url = `/api/v1/courses/${req.course_id}/rubrics/${req.id}`;
    return fetch(url, {
        method: "DELETE",
    }).then(res => res.json());
}


function listRubrics(account_id: number) {
    // todo: implement this function
}


/**
 * Gets a rubric with the given course_id and id.
 * @param req the request object
 */
function getSingleRubric(req: GetSingleRubricRequest): Promise<Rubric> {
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

export function updateSingleRubric(req: UpdateSingleRubricRequest, courseId: number): Promise<UpdateSingleRubricResponse> {
    const url = `/api/v1/courses/${courseId}/rubrics/${req.id}`;
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(req),
    }).then(res => res.json());
}

export function createSingleRubric(courseId: number, req: CreateRubricRequest): Promise<CreateRubricResponse> {
    const url = `/api/v1/courses/${courseId}/rubrics`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(req),
    }).then(res => res.json());
}
