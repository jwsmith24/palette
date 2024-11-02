/**
 * Defines a consistent error type for use within the application.
 */
export interface PaletteAPIError {
  param: string;
  msg: string;
}

/**
 * Used by the useFetch React hook embedded within components that need to make fetch requests to the backend.
 *
 * Filters the Response object received from the Express server to what the frontend needs.
 */
export interface PaletteAPIResponse<T> {
  data: T | null;
  success: boolean;
  error: string | null;
  errors: PaletteAPIError[];
  loading?: boolean; // added by the useFetch hook to trigger loading effects
}

/**
 * Defines the requests sent to the backend from the useFetch hook.
 */
export interface PaletteAPIRequest {
  baseURL: string;
  headers?: HeadersInit; // optional because some requests not require any custom headers
  method: string;
  body?: string; // optional since GET requests don't need a body
}
