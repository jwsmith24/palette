import { CanvasAssociation } from "../canvasTypes/CanvasAssociation";
import { CanvasAPIErrorResponse } from "./CanvasAPIErrorResponse";

export type CreateRubricAssociationResponse =
  | CanvasAssociation
  | CanvasAPIErrorResponse;
