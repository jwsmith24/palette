/**
 * Entry point for type definitions.
 */

/**
 * This is messy right now, will eventually adding a barreling tool or something to simplify exports.
 */

export * from "./Types/Criteria";
export * from "./Types/Rating";
export * from "./Types/Rubric";

export * from "./Protocol/PaletteAPIErrorData";
export * from "./Protocol/PaletteAPIRequest";
export * from "./Protocol/PaletteAPIResponse";

export * from "./CanvasAPIProtocol/CreateRubricRequest";
export * from "./CanvasAPIProtocol/CreateRubricResponse";
export * from "./CanvasAPIProtocol/DeleteRubricRequest";
export * from "./CanvasAPIProtocol/GetRubricRequest";
export * from "./CanvasAPIProtocol/UpdateRubricRequest";
export * from "./CanvasAPIProtocol/UpdateRubricResponse";

export * from "./CanvasAPITypes/CanvasAssessment";
export * from "./CanvasAPITypes/CanvasAssociation";
export * from "./CanvasAPITypes/CanvasCriterion";
export * from "./CanvasAPITypes/CanvasRating";
export * from "./CanvasAPITypes/CanvasRubric";
