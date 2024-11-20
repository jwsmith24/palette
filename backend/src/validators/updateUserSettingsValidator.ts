import { z } from "zod";
import { body, CustomValidator, ValidationChain } from "express-validator";

/**
 * Zod schema for the user settings object. Strict means that only the fields
 * defined in the schema are allowed.
 */
const settingsSchema = z
  .object({
    userName: z.string(),
    templateCriteria: z.array(z.object({ criteria: z.string() })),
    token: z.string(),
    preferences: z
      .object({
        darkMode: z.boolean().optional(),
        defaultScale: z.number().optional(),
      })
      .strict(), // throw validation error for additional fields
  })
  .strict(); // throw validation error for additional fields

/**
 * Zod schema for a partial user settings object. Partial here means that we can update
 * a subset of the fields without needing to provide all fields.
 */
const updateSettingsSchema = settingsSchema.partial();

/**
 * Custom validator to check if the request body is a valid user settings object.
 */
const isZodPartialSettings: CustomValidator = (value) => {
  const validation = validateFieldWithZod(updateSettingsSchema)(value);
  if (validation !== true) {
    throw new Error(validation.toString()); // Combine errors into a single string
  }
  return true;
};

/**
 * Validates a field using a Zod schema.
 * @param schema The Zod schema to use for validation.
 * @returns A function that validates a field against the schema.
 */
const validateFieldWithZod = (schema: z.ZodTypeAny) => {
  return (value: unknown) => {
    try {
      schema.parse(value); // Validate the value
      return true; // Return true if valid
    } catch (error) {
      // Return error messages if invalid
      return (error as z.ZodError).issues.map((issue) => issue.message);
    }
  };
};

export const updateUserSettingsValidator: ValidationChain[] = [
  body().custom(isZodPartialSettings),
];
