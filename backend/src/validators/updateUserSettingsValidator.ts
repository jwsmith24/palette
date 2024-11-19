import { body, ValidationChain } from "express-validator";
import { Settings } from "palette-types";

// Extract allowed fields from the Settings type
const allowedFields = new Set([
  "userName",
  "templateCriteria",
  "token",
  "preferences",
  "preferences.darkMode",
  "preferences.defaultScale",
]);

// Custom validation function to check if the fields are allowed
export const updateUserSettingsValidator: ValidationChain[] = [
  body().custom((value, { req }) => {
    const keys = Object.keys(req.body as Partial<Settings>);

    // Check if all fields are allowed
    const invalidFields = keys.filter((key) => !allowedFields.has(key));

    // If any fields are invalid, throw an error
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(", ")}`);
    }

    // All fields are valid
    return true;
  }),
];
