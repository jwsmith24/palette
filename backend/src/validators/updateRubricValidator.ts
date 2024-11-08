/**
 * Express validator to be used when updating a rubric. This validator will do everything that the createRubricValidator does, but will also check for the presence of the id field in the request body.
 */

import { body } from "express-validator";
import createRubricValidator from "./rubricValidator.js";

/**
 * Define validation for rubrics being updated
 * This is an extension of the createRubricValidator
 * @returns {ValidationChain[]}
 */
const updateRubricValidator = () => [
  body("id").isNumeric().withMessage("ID field must be numeric"),
  ...createRubricValidator(),
];

export default updateRubricValidator;
