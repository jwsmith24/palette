/**
 * Defines the requests sent to the backend from the useFetch hook.
 */
export interface PaletteAPIRequest {
  baseURL: string;
  headers?: HeadersInit; // optional because some requests not require any custom headers
  method: string;
  body?: string; // optional since GET requests don't need a body
}
