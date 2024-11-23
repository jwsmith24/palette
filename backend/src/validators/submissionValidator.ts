/**
 * Submission validation for incoming POST and PUT requests from the Palette application. Ensures the backend has
 * required information for sending a valid submission to the Canvas API.
 */
import { body, ValidationChain } from "express-validator";

export const submissionValidator: ValidationChain[] = [
  body("id").isNumeric().withMessage("submission id must be a number"),
  body("comments").optional().isArray(),
  body("comments.*.text_comment")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each comment must have a non-empty text_comment"),
  body("submission").optional().isObject(),
  body("submission.group_comment")
    .isBoolean()
    .withMessage("non-boolean value passed as group_comment"),
  body("rubric_assessment")
    .isArray()
    .withMessage("rubric_assessment must be an array"),
  body("rubric_assessment.*.id")
    .optional()
    .isString()
    .withMessage("Criterion id must be a string"),
  body("rubric_assessment.*.description")
    .isString()
    .notEmpty()
    .withMessage("Criterion description must be a non-empty string"),
  body("rubric_assessment.*.long_description")
    .optional()
    .isString()
    .withMessage("Criterion long_description must be a string"),
  body("rubric_assessment.*.points")
    .isNumeric()
    .withMessage("Criterion points must be a number"),
  body("rubric_assessment.*.criterion_use_range")
    .optional()
    .isBoolean()
    .withMessage("Criterion criterion_use_range must be a boolean"),
  body("rubric_assessment.*.ratings")
    .isArray()
    .withMessage("Criterion ratings must be an array"),
];
