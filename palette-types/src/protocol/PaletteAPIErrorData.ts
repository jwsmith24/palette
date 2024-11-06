/**
 * Defines a consistent error type for use within the application that matches the validation object returned by
 * express-validator.
 */
export interface PaletteAPIErrorData {
  type: string; // Error type (e.g., 'field')
  location: string; // Location in the request (e.g., 'body')
  path: string; // The field name that caused the error
  value?: unknown; // The invalid value, if provided
  msg: string; // The error message
}
