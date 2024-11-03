import { config } from "../app";
import { CreateRubricRequest } from "@types/CanvasAPIProtocol/CreateRubricRequest";
import { CreateRubricResponse } from "@types/CanvasAPIProtocol/CreateRubricResponse";
import { GetRubricRequest } from "@types/CanvasAPIProtocol/GetRubricRequest";
import { CanvasRubric } from "@types/CanvasAPITypes/CanvasRubric";
import { UpdateRubricResponse } from "@types/CanvasAPIProtocol/UpdateRubricResponse";
import { DeleteRubricRequest } from "@types/CanvasAPIProtocol/DeleteRubricRequest";

const API_CONFIG = {
  baseURL: "https://canvas.instructure.com/api/v1",
  headers: {
    // get the token from the environment variables
    Authorization: `Bearer ${config.parsed?.CANVAS_API_TOKEN}`,
    Accept: "application/json",
  },
} as const;

interface APIError {
  param: string;
  msg: string;
}

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

// Error handling utility
const handleAPIErrors = (errors: APIError[]): string[] => {
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
): Promise<APIResponse<T>> {
  try {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      // add the API_CONFIG headers and modify the request body for the specific request
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
    });

    // Handle any errors
    if (!response.ok) {
      const errorData = (await response.json()) as {
        error?: string;
        errors?: APIError[]; // define response.json structure we expect
      };
      const errors = errorData.errors ? handleAPIErrors(errorData.errors) : [];

      return {
        success: false,
        error: errorData.error,
        errors, // todo: maybe update naming convention here to not be so confusing
      };
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return { success: true };
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
  ): Promise<APIResponse<CreateRubricResponse>> {
    return fetchAPI<CreateRubricResponse>(
      `${API_CONFIG.baseURL}/courses/${courseID}/rubrics`,
      {
        method: "POST",
        body: JSON.stringify(request),
      },
    );
  },

  async getRubric(
    request: GetRubricRequest,
  ): Promise<APIResponse<CanvasRubric>> {
    if (request.type === "course") {
      return fetchAPI<CanvasRubric>(
        `${API_CONFIG.baseURL}/courses/${request.course_id}/rubrics/${request.id}`,
      );
    } else {
      // request type is account
      return fetchAPI<CanvasRubric>(
        `${API_CONFIG.baseURL}/accounts/${request.account_id}/rubrics/${request.id}`,
      );
    }
  },

  async updateRubric(
    request: CreateRubricRequest,
    courseID: number,
  ): Promise<APIResponse<UpdateRubricResponse>> {
    return fetchAPI<UpdateRubricResponse>(
      `${API_CONFIG.baseURL}/courses/${courseID}/rubrics`,
      {
        method: "PUT",
        body: JSON.stringify(request),
      },
    );
  },

  async deleteRubric(
    request: DeleteRubricRequest,
  ): Promise<APIResponse<CanvasRubric>> {
    return fetchAPI<CanvasRubric>(
      `${API_CONFIG.baseURL}/courses/${request.course_id}/rubrics/${request.id}`,
      {
        method: "DELETE",
      },
    );
  },

  //   async listAllRubrics(courseID: number): Promise<APIResponse<CanvasRubric[]>> {
  //     throw new Error("Not yet implemented");
  // }
};
