import { PaletteAPIErrorData } from "./PaletteAPIErrorData";

/**
 * Used by the useFetch React hook embedded within components that need to make fetch requests to the backend.
 *
 * Filters the Response object received from the Express server to what the frontend needs.
 */
export interface PaletteAPIResponse<T> {
  data?: T; // OPTIONAL: data only present if no errors occurred
  success: boolean;
  message?: string; // OPTIONAL: message field to indicate result of action
  error?: string;
  errors?: PaletteAPIErrorData[];
  loading?: boolean; // OPTIONAL: added by the useFetch hook to trigger loading effects
}
