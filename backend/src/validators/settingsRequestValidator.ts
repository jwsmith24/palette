/**
 * This file contains the validation schema for the settings request
 * It uses the express-validator library to validate the query parameters
 * The params must match the Settings type defined in the userController.ts file
 */

import { query, ValidationChain } from "express-validator";

const allowedFields = [
  "userName",
  "templateCriteria",
  "token",
  "preferences",
  "preferences.darkMode",
  "preferences.defaultScale",
];

export const getUserSettingsValidator: ValidationChain[] = [
  query("fields")
    .optional()
    .isString()
    .withMessage("Fields must be a string")
    .custom((field) => {
      const requestedFields = (field as string).split(",");
      const invalidFields = requestedFields.filter(
        (field) => !allowedFields.includes(field),
      );
      if (invalidFields.length > 0) {
        throw new Error(
          `Invalid fields requested: ${invalidFields.join(", ")}`,
        );
      }
      return true;
    }),
];
