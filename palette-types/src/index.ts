/**
 * Barrel file for type definitions. Allows easy importing from a single 'palette-types' alias without any messy config.
 */

// Export everything from canvasProtocol
export * from "./canvasProtocol/CreateRubricRequest";
export * from "./canvasProtocol/CreateRubricResponse";
export * from "./canvasProtocol/DeleteRubricRequest";
export * from "./canvasProtocol/DeleteRubricResponse";
export * from "./canvasProtocol/GetRubricRequest";
export * from "./canvasProtocol/GetRubricResponse";
export * from "./canvasProtocol/UpdateRubricRequest";
export * from "./canvasProtocol/UpdateRubricResponse";
export * from "./canvasProtocol/CanvasAPIError";
export * from "./canvasProtocol/CanvasAPIErrorResponse";

// Export everything from canvasTypes
export * from "./canvasTypes/CanvasAssessment";
export * from "./canvasTypes/CanvasAssociation";
export * from "./canvasTypes/CanvasCriterion";
export * from "./canvasTypes/CanvasRating";
export * from "./canvasTypes/CanvasRubric";
export * from "./canvasTypes/RubricObjectHash";

// Export everything from protocol
export * from "./protocol/PaletteAPIErrorData";
export * from "./protocol/PaletteAPIRequest";
export * from "./protocol/PaletteAPIResponse";

// Export everything from types
export * from "./types/Criteria";
export * from "./types/Rating";
export * from "./types/Rubric";
export * from "./types/Course";
export * from "./types/Template";
