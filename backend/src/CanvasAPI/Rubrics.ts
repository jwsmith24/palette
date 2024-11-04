import config from "../config.js";
import {
  CanvasRubric,
  CreateRubricRequest,
  CreateRubricResponse,
  DeleteRubricRequest,
  GetRubricRequest,
  UpdateRubricResponse,
} from "palette-types";

const CanvasAPIConfig = {
  baseURL: "https://canvas.asu.edu/api/v1",
  headers: {
    // get the token from the environment variables
    Authorization: `Bearer ${config!.CANVAS_API_TOKEN}`,
    Accept: "application/json",
  },
} as const;

export interface CanvasAPIError {
  param: string;
  msg: string;
}

export interface CanvasAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

// Error handling utility
const handleAPIErrors = (errors: CanvasAPIError[]): string[] => {
  return errors.map(({ msg }) => msg); // extract messages from each error object
};

/**
 * <p>Generic fetch wrapper function to avoid similar fetch requests in each CRUD method.</p>
 * @param endpoint url of the target endpoint: api/<endpoint>
 * @param options modify request body for specific requests
 *
 * returns an APIResponse object
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}, // used for extend
): Promise<CanvasAPIResponse<T>> {
  try {
    const url = `${CanvasAPIConfig.baseURL}${endpoint}`;
    // log the request method and endpoint
    console.log(`${options.method || "GET"} ${endpoint}`);
    const response = await fetch(url, {
      ...options,
      // add the API_CONFIG headers and modify the request body for the specific request
      headers: {
        ...CanvasAPIConfig.headers,
        ...(options.headers || {}),
      },
    });

    // Handle any errors
    if (!response.ok) {
      const errorData = (await response.json()) as {
        error?: string;
        errors?: CanvasAPIError[]; // define response.json structure we expect
      };
      const errors = errorData.errors ? handleAPIErrors(errorData.errors) : [];

      return {
        success: false,
        error: errorData.error,
        errors, // todo: maybe update naming convention here to not be so confusing
      };
    }

    // parse response if not an error
    const data = (await response.json()) as T;
    return { success: true, data };
  } catch (error) {
    console.error("API Request failed:", error);
    return { success: false, error: "Failed to complete request" };
  }
}

/**
 * <p>API methods for interacting with Canvas Rubrics.</p>
 */
export const RubricsAPI = {
  async createRubric(
    request: CreateRubricRequest,
    courseID: number,
  ): Promise<CanvasAPIResponse<CreateRubricResponse>> {
    return fetchAPI<CreateRubricResponse>(
      `${CanvasAPIConfig.baseURL}/courses/${courseID}/rubrics`,
      {
        method: "POST",
        body: JSON.stringify(request),
      },
    );
  },

  async getRubric(
    request: GetRubricRequest,
  ): Promise<CanvasAPIResponse<CanvasRubric>> {
    if (request.type === "course") {
      return fetchAPI<CanvasRubric>(
        `${CanvasAPIConfig.baseURL}/courses/${request.course_id}/rubrics/${request.id}`,
      );
    } else {
      // request type is account
      return fetchAPI<CanvasRubric>(
        `${CanvasAPIConfig.baseURL}/accounts/${request.account_id}/rubrics/${request.id}`,
      );
    }
  },

  async updateRubric(
    request: CreateRubricRequest,
    courseID: number,
  ): Promise<CanvasAPIResponse<UpdateRubricResponse>> {
    return fetchAPI<UpdateRubricResponse>(
      `${CanvasAPIConfig.baseURL}/courses/${courseID}/rubrics`,
      {
        method: "PUT",
        body: JSON.stringify(request),
      },
    );
  },

  async deleteRubric(
    request: DeleteRubricRequest,
  ): Promise<CanvasAPIResponse<CanvasRubric>> {
    return fetchAPI<CanvasRubric>(
      `${CanvasAPIConfig.baseURL}/courses/${request.course_id}/rubrics/${request.id}`,
      {
        method: "DELETE",
      },
    );
  },

  //   async listAllRubrics(courseID: number): Promise<APIResponse<CanvasRubric[]>> {
  //     throw new Error("Not yet implemented");
  // }
};
