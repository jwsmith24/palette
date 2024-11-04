import { PaletteAPIErrorData } from "./PaletteAPIErrorData";

/**
 * Used by the useFetch React hook embedded within components that need to make fetch requests to the backend.
 *
 * Filters the Response object received from the Express server to what the frontend needs.
 */
export interface PaletteAPIResponse<T> {
  data: T | null;
  success: boolean;
  message?: string; // optional message field to indicate result of action
  error: string | null;
  errors: PaletteAPIErrorData[];
  loading?: boolean; // added by the useFetch hook to trigger loading effects
}

/**
 * Creates a success response for the Palette API.
 * @param data The data to include in the response.
 * @param message Optional message to include in the response.
 * @returns A PaletteAPIResponse object indicating success.
 */
export function newPaletteSuccessResponse<T>(
  data: T,
  message?: string,
): PaletteAPIResponse<T> {
  return {
    data,
    success: true,
    message: message || "Request successful",
    error: null,
    errors: [],
  };
}

/**
 * Creates an error response for the Palette API.
 * @param error The error message to include in the response.
 * @param errors Optional array of PaletteAPIErrorData to include in the response.
 * @returns A PaletteAPIResponse object indicating failure.
 */
export function newPaletteErrorResponse(
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
