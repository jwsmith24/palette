import config from "../config";
import { isCanvasAPIErrorResponse } from "./typeGuards";

export const CanvasAPIConfig = {
  baseURL: "https://canvas.asu.edu/api/v1",
  headers: {
    // get the token from the environment variables
    Authorization: `Bearer ${config!.CANVAS_API_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json", // must be a string!
  },
} as const;

/**
 * Generic fetch wrapper function to avoid similar fetch requests in each CRUD method.
 * @param endpoint - URL of the target endpoint: api/<endpoint>.
 * @param options - Modify request body for specific requests.
 * @returns A promise that resolves to the API response object.
 * @throws Error will throw an error if an unknown error response format is encountered.
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}, // default options (none)
): Promise<T> {
  try {
    const url = `${CanvasAPIConfig.baseURL}${endpoint}`;

    // send the request and handle the response using promise chaining
    const response = await fetch(url, {
      ...options,
      headers: {
        ...CanvasAPIConfig.headers,
        ...(options.headers || {}),
      } as HeadersInit,
    });

    // parse and log the JSON response
    const json = (await response.json()) as unknown; // who knows what Canvas will return...

    // handle errors
    if (!response.ok) {
      // check if the error response is a Canvas API error
      if (isCanvasAPIErrorResponse(json)) {
        // pass the first error to the error handling middleware
        throw new Error(json.errors[0].message);
      } else {
        // if the error response is not a Canvas API error, throw a generic error
        // and log the response for debugging
        console.error("Unknown Canvas API response format:", json);
        throw new Error("Canvas API returned an unexpected error response");
      }
    }

    return json as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Canvas API Error: ${error.message}`);
    }
    throw error; // rethrow the error for the caller to handle
  }
}
