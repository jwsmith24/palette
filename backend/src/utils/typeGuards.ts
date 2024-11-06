import { CanvasAPIErrorResponse } from "palette-types/dist/canvasProtocol/CanvasAPIErrorResponse";
import { CanvasAPIError } from "palette-types/dist/canvasProtocol/CanvasAPIError";
import {
  CanvasAssociation,
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
  obj: unknown,
): obj is CanvasAPIErrorResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "errors" in obj &&
    obj.errors !== null &&
    Array.isArray(obj.errors) &&
    (obj.errors.length === 0 || obj.errors.every(isCanvasAPIError))
  );
}

/**
 * Type guard to check if an object is a CanvasRubric.
 * @param obj - The object to check.
 * @returns True if the object is a CanvasRubric, false otherwise.
 */
function isCanvasRubric(obj: unknown): obj is CanvasRubric {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "title" in obj &&
    "points_possible" in obj &&
    "data" in obj
  );
}

/**
 * Type guard to check if an object is a CanvasAssociation.
 * @param obj - The object to check.
 * @returns True if the object is a CanvasAssociation, false otherwise.
 */
function isCanvasAssociation(obj: unknown): obj is CanvasAssociation {
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
    "rubric_association" in obj &&
    isCanvasAssociation(obj.rubric_association)
  );
}
