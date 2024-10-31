import { Rubric } from "../../../palette-types/src";

/**
 * Define base Request to communicate with the backend API.
 */
const API_CONFIG = {
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
} as const; // enforce immutability

// Types
export interface APIError {
  param: string;
  msg: string;
}

/**
 * Used to trim down the Response object received from the backend to the essentials needed by the frontend.
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

/**
 * Error handler helper function. Will likely replace with node util tool.
 * @param errors
 */
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
        errors,
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
 * Backend API methods for Rubric CRUD operations.
 */
export const BackendAPI = {
  /**
   * Create a new rubric in the database.
   * @param rubric The rubric data to save
   */
  async create(rubric: Rubric): Promise<APIResponse<Rubric>> {
    const result = await fetchAPI<Rubric>("/rubrics", {
      method: "POST",
      body: JSON.stringify(rubric),
    });

    if (result.success) {
      console.log("Rubric saved!", result.data);
    }
    return result;
  },

  /**
   * Update an existing rubric in the database.
   * @param id The ID of the rubric to update
   * @param rubric The updated rubric data
   */
  async update(id: number, rubric: Rubric): Promise<APIResponse<Rubric>> {
    const result = await fetchAPI<Rubric>(
      `/rubrics/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        body: JSON.stringify(rubric),
      },
    );

    if (result.success) {
      // handles both 200 and 204 responses
      console.log("Rubric updated successfully!");
    }
    return result;
  },

  /**
   * Checks if a rubric with the given title already exists in the database.
   * @param title The title to check
   * @return An object { exists: boolean, id: number } indicating if the title exists and the ID if it does. If the title does not exist, the ID will be a garbage value.
   */
  async checkTitleExists(
    title: string,
  ): Promise<{ exists: boolean; id: number; error?: string }> {
    // add optional error field
    // check for empty or whitespace only title
    if (!title.trim()) {
      console.warn("Rubric does not have a title!");
      return { exists: false, id: -1, error: "Rubric must have a title" };
    }

    const result = await fetchAPI<{ id: number }>(
      `/rubrics/title/${encodeURIComponent(title)}`,
    );
    console.log(result.data);
    if (result.data && result.data.id) {
      return { exists: true, id: result.data.id };
    }
    return { exists: false, id: -1 };
  },

  /**
   * Delete an existing rubric from the database.
   * @param id The ID of the rubric to delete
   */
  async delete(id: number): Promise<boolean> {
    const result = await fetchAPI(`/rubrics/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (!result.error) {
      console.log("Rubric deleted!");
      return true;
    }
    return false;
  },
};
