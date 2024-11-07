import { CanvasRubric } from "../canvasTypes/CanvasRubric";
import { CanvasAPIErrorResponse } from "./CanvasAPIErrorResponse";

export type GetRubricResponse = CanvasRubric | CanvasAPIErrorResponse;
