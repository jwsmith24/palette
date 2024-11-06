import {PaletteAPIErrorData, PaletteAPIResponse} from "palette-types";

/**
 * Creates a success response for the Palette API.
 * @param data The data to include in the response.
 * @param message Optional message to include in the response.
 * @returns A PaletteAPIResponse object indicating success.
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
): PaletteAPIResponse<T> {
  return {
    data,
    success: true,
    message: message || "Request successful",
  };
}

/**
 * Creates an error response for the Palette API.
 * @param error The error message to include in the response.
 * @param errors Optional array of PaletteAPIErrorData to include in the response.
 * @returns A PaletteAPIResponse object indicating failure.
 */
export function createErrorResponse(
  error: string,
  errors?: PaletteAPIErrorData[],
): PaletteAPIResponse<null> {
  return {
    data: null,
    success: false,
    message: "Request failed",
    error,
    errors: errors || [],
  };
}
