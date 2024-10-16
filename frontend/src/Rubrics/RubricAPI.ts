import {
    RubricAssociationPurpose,
    RubricAssociationType,
    Rubric,
    RubricCriterion
} from "./Rubric";
import {RubricAssociation} from "./Rubric";


/**
 * This type represents the request body for creating a new Rubric.
 */
// Interface for the Create Rubric request
// A RubricObjectHash object represents a response from the Rubric API for
// creating a single rubric and update a single rubric requests
interface RubricObjectHash {
    rubric: Rubric;
    rubric_association: RubricAssociation;
}

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

export type CreateRubricResponse = RubricObjectHash;

export type ValidCreateRubricRequest = Required<CreateRubricRequest>;

// Interface for the Update Rubric request
export interface UpdateRubricRequest {
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

export type UpdateRubricResponse = RubricObjectHash;

// Request for deleting a Rubric and removing all RubricAssociations.
export interface DeleteSingleRubricRequest {
    course_id: number; // The ID of the course
    id: number; // The ID of the rubric
}

export interface GetSingleRubricRequest {
    rubric_id: number
    course_id: number
    params?: "assessments"
        | "graded_assessments" | "peer_assessments"
        | "associations" | "assignment_associations"
        | "course_associations" | "account_associations";
    style?: "full" | "comments_only";
}

// Interface for the UpdateSingleRubricRequest
export interface UpdateSingleRubricRequest {
    rubric_id: number; // The ID of the rubric
    rubric_association_id: number; // The ID of the object with which the rubric is associated

    course_id: number; // The ID of the course

    // The rubric object
    rubric: {
        title: string; // The title of the rubric
        free_form_criterion_comments: boolean; // Whether custom comments can be written in the ratings field
        skip_updating_points_possible: boolean; // Whether to update the points possible
        criteria: { [key: number]: RubricCriterion }; // An indexed hash of RubricCriteria objects
    };

    // The rubric_association object
    rubric_association: {
        association_id: number; // The ID of the object this rubric is associated with
        association_type: RubricAssociationType // The type of object this rubric is associated with
        use_for_grading: boolean; // Whether the associated rubric is used for grade calculation
        hide_score_total: boolean; // Whether the score total is displayed within the rubric
        purpose: RubricAssociationPurpose // The purpose of the association
    };
}

export type UpdateSingleRubricResponse = RubricObjectHash;


/**
 * Deletes a Rubric and removes all RubricAssociations.
 * @param request the request object
 */
export function deleteSingleRubric(request: DeleteSingleRubricRequest): Promise<Rubric> {
    const url = `/api/v1/courses/${request.course_id}/rubrics/${request.id}`;
    return fetch(url, {
        method: "DELETE",
    }).then(response => response.json());
}


function listRubrics(account_id: number) {
    // todo: implement this function
}


/**
 * Gets a rubric with the given course_id and id.
 * @param request
 */
function getSingleRubric(request: GetSingleRubricRequest): Promise<Rubric> {
    if (request.params === undefined && request.style === undefined) {
        const url = `/api/v1/courses/${request.course_id}/rubrics/${request.rubric_id}`;
        return fetch(url).then(response => response.json());
    }

    let url = `/api/v1/courses/${request.course_id}/rubrics/${request.rubric_id}`;
    // add the include parameters if it is defined
    if (request.params !== undefined) {
        for (const param of request.params) {
            url += `include[]=${param}&`;
        }
    }
    // add the style parameter if it is defined (only 1)
    if (request.style !== undefined) {
        url += `style=${request.style}`;
    }

    return fetch(url).then(response => response.json());
}

export function updateSingleRubric(request: UpdateSingleRubricRequest): Promise<UpdateSingleRubricResponse> {
    const url = `/api/v1/courses/${request.course_id}/rubrics/${request.rubric_id}`;
    return fetch(url, {
        method: "PUT",
        body: JSON.stringify(request),
    }).then(response => response.json());
}

export function createSingleRubric(course_id: number, request: CreateRubricRequest): Promise<CreateRubricResponse> {
    const url = `/api/v1/courses/${course_id}/rubrics`;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
    }).then(response => response.json());
}
