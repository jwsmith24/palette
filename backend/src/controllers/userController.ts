import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
import { createSuccessResponse } from "../utils/paletteResponseFactories.js";
import { Settings } from "palette-types";

// Construct an absolute path
const settingsPath = "./settings.json";

/**
 * Handles the GET request to retrieve a user's settings.
 *
 * @param {Request} req - The Express request object (not used in this handler).
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export const getUserSettings = asyncHandler((req: Request, res: Response) => {
  // Read and parse settings from file
  const settingsData = fs.readFileSync(settingsPath, "utf8");
  const settings: Settings = JSON.parse(settingsData) as Settings;

  const { fields } = req.query;

  if (fields) {
    // Split the 'fields' parameter into an array of requested fields
    const requestedFields = (fields as string).split(",");

    // Filter the settings to include only the requested fields
    const filteredSettings = requestedFields.reduce<Partial<Settings>>(
      (result, field) => {
        // Get the value of the nested field from the settings object
        const value = getNestedField(settings, field);
        if (value !== undefined) {
          const keys = field.split(".");
          const lastKey = keys.pop()!;
          let current = result as Record<string, unknown>;

          // Traverse or create the nested structure in the result
          for (const key of keys) {
            if (!current[key]) current[key] = {};
            current = current[key] as Record<string, unknown>;
          }

          // Assign the value to the last key in the nested structure
          current[lastKey] = value;
        }
        return result;
      },
      {},
    );
    // Respond with the filtered settings
    res.json(createSuccessResponse(filteredSettings));
    return;
  }

  // Return all settings if no fields are specified
  res.json(createSuccessResponse(settings));
});

// controller for update user settings
export const updateUserSettings = asyncHandler(
  (req: Request, res: Response) => {
    const body = req.body as Partial<Settings>;
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;

    // Update the settings with the new values
    const updatedSettings = deepMerge({ ...settings }, body);

    // Write the updated settings back to the file
    fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings, null, 2));

    res.json(
      createSuccessResponse(updatedSettings, "Settings updated successfully"),
    );
  },
);

/**
 * Deeply (i.e., recursively) merges two objects, overwriting properties in the target object with
 * properties from the source object if they exist.
 * @param {T} target - The target object to merge into.
 * @param {Partial<T>} source - The source object to merge from. Must be a subset of T.
 * @returns {T} - The merged object.
 *
 */
function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      // Ensure the target has a nested object to merge into
      if (!target[key]) (target as unknown)[key] = {};

      // Recursively merge nested objects
      (target as unknown)[key] = deepMerge(
        target[key] as object,
        source[key] as Partial<object>,
      );
    } else {
      // Directly assign the value if not an object
      (target as unknown)[key] = source[key];
    }
  }
  return target;
}

/**
 * Helper function to get the value of a nested field from an object.
 *
 * @param {unknown} obj - The object to retrieve the nested field from.
 * @param {string} path - The dot-separated path to the nested field.
 * @returns {unknown} - The value of the nested field, or undefined if not found.
 */
const getNestedField = (obj: unknown, path: string): unknown => {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc ? (acc as Record<string, unknown>)[key] : undefined),
      obj,
    );
};
