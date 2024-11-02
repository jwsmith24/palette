export interface APIError {
  param: string;
  msg: string;
}

/**
 * Defines the response the frontend will use.
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

/**
 * Defines the requests sent to the backend.
 */
export interface APIRequest {
  baseURL?: string;
  headers?: HeadersInit;
  method?: string;
  body?: string;
}
