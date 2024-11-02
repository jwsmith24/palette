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
  loading: boolean; // added by the useFetch hook to trigger loading effects
  error: string | null;
  errors?: string[];
}

/**
 * Defines the requests sent to the backend from the useFetch hook.
 */
export interface PaletteAPIRequest {
  baseURL: string;
  headers: HeadersInit;
  method: string;
  body: string;
}
