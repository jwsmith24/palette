import {
  CanvasRubric,
  CreateRubricRequest,
  CreateRubricResponse,
  DeleteRubricRequest,
  DeleteRubricResponse,
  GetRubricRequest,
  GetRubricResponse,
  UpdateRubricResponse,
} from "palette-types";
import { isCanvasAPIErrorResponse } from "../utils/typeGuards.js";
import config from "../config.js";
import util from "util";

const CanvasAPIConfig = {
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
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}, // default options (none)
): Promise<T> {
  try {
    const url = `${CanvasAPIConfig.baseURL}${endpoint}`;
    logCanvasAPIRequest(options, url);

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
    logCanvasAPIResponse(response, json);

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

/**
 * API methods for interacting with Canvas Rubrics.
 */
export const RubricsAPI = {
  /**
   * Create a new rubric in a specific course.
   * @param request - The request object containing rubric details.
   * @param courseID - The ID of the course.
   * @returns A promise that resolves to the created rubric response.
   */
  async createRubric(
    request: CreateRubricRequest,
    courseID: number,
  ): Promise<CreateRubricResponse> {
    return fetchAPI<CreateRubricResponse>(`/courses/${courseID}/rubrics`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  },

  /**
   * Get a rubric by its ID.
   * @param request - The request object containing rubric ID and type (course or account).
   * @returns A promise that resolves to the retrieved rubric response.
   */
  async getRubric(request: GetRubricRequest): Promise<GetRubricResponse> {
    if (request.type === "course") {
      return fetchAPI<CanvasRubric>(
        `/courses/${request.course_id}/rubrics/${request.id}`,
      );
    } else {
      // request type is account
      return fetchAPI<CanvasRubric>(
        `/accounts/${request.account_id}/rubrics/${request.id}`,
      );
    }
  },

  /**
   * Update an existing rubric in a specific course.
   * @param request - The request object containing updated rubric details.
   * @param courseID - The ID of the course.
   * @returns A promise that resolves to the updated rubric response.
   */
  async updateRubric(
    request: CreateRubricRequest,
    courseID: number,
  ): Promise<UpdateRubricResponse> {
    return fetchAPI<UpdateRubricResponse>(`/courses/${courseID}/rubrics`, {
      method: "PUT",
      body: JSON.stringify(request),
    });
  },

  /**
   * Delete a rubric by its ID.
   * @param request - The request object containing rubric ID and course ID.
   * @returns A promise that resolves to the deleted rubric response.
   */
  async deleteRubric(
    request: DeleteRubricRequest,
  ): Promise<DeleteRubricResponse> {
    return fetchAPI<DeleteRubricResponse>(
      `/courses/${request.course_id}/rubrics/${request.id}`,
      {
        method: "DELETE",
      },
    );
  },

  //   async listAllRubrics(courseID: number): Promise<CanvasRubric[] | CanvasAPIErrorResponse> {
  //     throw new Error("Not yet implemented");
  // }
};

/**
 * Utility function to log API requests to the console.
 * @param options the request options
 * @param url the target URL
 */
function logCanvasAPIRequest(options: RequestInit, url: string) {
  console.log(`\nCanvas API Request: ${options.method} ${url}`);
  if (options.body) {
    console.log(
      `Canvas API Request Body (parsed JSON): ${util.inspect(
        JSON.parse(options.body as string),
        {
          depth: 50,
          colors: true,
        },
      )}`,
    );
  }
}

/**
 * Utility function to log API responses to the console.
 * @param response the response object
 * @param data the response data
 */
function logCanvasAPIResponse<T>(response: Response, data: T) {
  console.log("\nCanvas API Status:", response.status);
  console.log(
    "Canvas API Response Data:\n",
    util.inspect(data, {
      depth: 50,
      colors: true,
    }),
  );
}
