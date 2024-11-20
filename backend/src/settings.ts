import { Settings } from "palette-types";
import fs from "fs";
import merge from "lodash/merge.js";

// the settings path
const SETTINGS_PATH = "./settings.json";

const defaultSettings: Settings = {
  userName: "admin",
  templateCriteria: [],
  token: "default token",
  preferences: {
    darkMode: false,
    defaultScale: 1,
  },
};

// the settings object
let settings: Settings | null = null;

/**
 * The settings API defines the interface for the singleton settings object. It provides
 * utility functions for working with the settings object, such as getting and
 * updating the settings object.
 */
export const SettingsAPI = {
  /**
   * Get the settings object. If `includeSensitiveFields` is true, the sensitive fields
   * will be included. DO NOT use this option when communicating the settings object to the client.
   *
   * If `onlyInclude` is provided, only the specified fields will be included in the return object. These fields
   * can be nested using dot notation (e.g. `preferences.darkMode`). To include multiple fields, separate them with commas.
   * An example of this would be `["preferences.darkMode", "token"]`.
   * @param includeSensitiveFields Whether to include sensitive fields (like the Canvas API token) in the settings object.
   * @param onlyInclude An array of specific settings to retrieve from the settings object.
   * @returns The settings object.
   */
  getUserSettings(
    includeSensitiveFields: boolean = false,
    onlyInclude?: string[],
  ): Settings | Partial<Settings> {
    // lazy load the settings object
    if (settings === null) {
      initializeSettings();
    }

    // create a return value that is a copy of the settings object
    let returnValue = { ...settings } as Settings;

    // mask out sensitive fields, if requested
    if (!includeSensitiveFields) {
      returnValue = { ...returnValue, token: "REDACTED" } as Settings;
    }

    // filter the return object, if requested
    if (onlyInclude) {
      return getFilteredSettings(onlyInclude, returnValue);
    }

    // otherwise return the unfiltered object
    return returnValue;
  },

  /**
   * Update the settings object and performs a settings file write. `newSettings` can be any subset of the settings object.
   *
   * Example usage: to update only the `token` field, pass `{ token: "new token" }`. To update only the `darkMode` preference,
   * pass `{ preferences: { darkMode: false } }`. That way, you don't have to pass the entire settings object
   * every time you want to update a single field.
   *
   * @param newSettings The subset of the Settings object to update
   */
  updateUserSettings(newSettings: Partial<Settings>): void {
    if (settings === null) {
      initializeSettings();
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    settings = merge(settings, newSettings) as Settings;
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
  },
};

/**
 * Helper function to initialize the settings object by reading the settings file. If the settings file
 * does not exist, create it with the default user settings.
 */
function initializeSettings() {
  if (!fs.existsSync(SETTINGS_PATH)) {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2));
    settings = defaultSettings;
  } else {
    // read the settings file
    settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf-8")) as Settings;
  }
}

/**
 * Helper function to filter the settings object based on the requested fields.
 * @param {string[]} onlyInclude - The array of fields to include in the filtered settings object.
 * @param {Settings} returnValue - The settings object to filter.
 * @returns {Partial<Settings>} - The filtered settings object.
 */
function getFilteredSettings(onlyInclude: string[], returnValue: Settings) {
  return onlyInclude.reduce<Partial<Settings>>((result, field) => {
    const value = getNestedField(returnValue, field);
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
  }, {});
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
