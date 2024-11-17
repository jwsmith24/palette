import {
  CanvasAPIError,
  CanvasAPIErrorResponse,
  CanvasAssociation,
  CanvasCriterion,
  CanvasRating,
  CanvasRubric,
  RubricObjectHash,
} from "palette-types";

/**
 * Type guard to check if an object is a CanvasAPIError.
 * @param obj - The object to check.
 * @returns True if the object is a CanvasAPIError, false otherwise.
 */
function isCanvasAPIError(obj: unknown): obj is CanvasAPIError {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "message" in obj &&
    typeof obj.message === "string"
  );
}

/**
 * Type guard to check if an object is a CanvasAPIErrorResponse.
 * @param obj - The object to check.
 * @returns True if the object is a CanvasAPIErrorResponse, false otherwise.
 */
export function isCanvasAPIErrorResponse(
  obj: unknown
): obj is CanvasAPIErrorResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    ("errors" in obj
      ? Array.isArray(obj.errors) &&
        obj.errors.length > 0 &&
        obj.errors.every(isCanvasAPIError)
      : isCanvasAPIError(obj))
  );
}

/**
 * Type guard to check if an object is a CanvasRubric.
 * @param obj - The object to check.
 * @returns True if the object is a CanvasRubric, false otherwise.
 */
export function isCanvasRubric(obj: unknown): obj is CanvasRubric {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "title" in obj &&
    "points_possible" in obj &&
    "data" in obj &&
    // data can be null, an empty array, or an array of CanvasCriterion
    (obj.data === null ||
      (Array.isArray(obj.data) &&
        (obj.data.length === 0 || obj.data.every(isCanvasCriterion))))
  );
}

export function isCanvasCriterion(obj: unknown): obj is CanvasCriterion {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "description" in obj &&
    "points" in obj &&
    "ratings" in obj &&
    // ratings can be null, an empty array, or an array of CanvasRating
    (obj.ratings === null ||
      (Array.isArray(obj.ratings) &&
        (obj.ratings.length === 0 || obj.ratings.every(isCanvasRating))))
  );
}

export function isCanvasRating(obj: unknown): obj is CanvasRating {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "description" in obj &&
    "points" in obj
  );
}

/**
 * Type guard to check if an object is a CanvasAssociation.
 * @param obj - The object to check.
 * @returns True if the object is a CanvasAssociation, false otherwise.
 */
export function isCanvasAssociation(obj: unknown): obj is CanvasAssociation {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "rubric_id" in obj &&
    "association_id" in obj &&
    "association_type" in obj &&
    "use_for_grading" in obj &&
    "summary_data" in obj &&
    "purpose" in obj &&
    "hide_score_total" in obj &&
    "hide_points" in obj &&
    "hide_outcome_results" in obj
  );
}

/**
 * Type guard to check if an object is a RubricObjectHash.
 * @param obj - The object to check.
 * @returns True if the object is a RubricObjectHash, false otherwise.
 */
export function isRubricObjectHash(obj: unknown): obj is RubricObjectHash {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "rubric" in obj &&
    isCanvasRubric(obj.rubric) &&
    // if rubric_association is present, it must be a CanvasAssociation
    ("rubric_association" in obj
      ? isCanvasAssociation(obj.rubric_association)
      : true)
  );
}

/**
 * Type guard to check if an object is a list of CanvasRubrics.
 * @param {unknown} obj - The object to check.
 * @returns {boolean} True if the object is a paginated list of CanvasRubrics, false otherwise.
 */
export function isPaginatedRubricsList(obj: unknown): obj is CanvasRubric[] {
  // the response is an array of CanvasRubrics
  return Array.isArray(obj) && obj.every(isCanvasRubric);
}
