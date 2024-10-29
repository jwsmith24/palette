import { Rubric } from '../models/Rubric.ts';

// Constants
const API_CONFIG = {
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
} as const; // make TS enforce immutability

// Types
interface APIError {
  param: string;
  msg: string;
}

interface APIResponse<T> {
  data?: T;
  error?: string;
  errors?: APIError[];
}

/**
 * Error-handling utility for fetchAPI wrapper. It currently logs errors to the server console.
 * @param errors
 */
const handleAPIErrors = (errors: APIError[]): void => {
  errors.forEach(({ param, msg }) => {
    console.log(`Field: ${param}, Message: ${msg}`);
  });
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
  options: RequestInit = {} // used for extend
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
      const errorData = await response.json();
      if (response.status === 400 && errorData.errors) {
        handleAPIErrors(errorData.errors);
      }

      return { error: errorData.error || 'An unknown error occurred' };
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return { data: undefined };
    }

    // Not an error, not 204, parse the response
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API Request failed:', error);
    return { error: 'Failed to complete request' };
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
  async create(rubric: Rubric): Promise<boolean> {
    const result = await fetchAPI<Rubric>('/rubrics', {
      method: 'POST',
      body: JSON.stringify(rubric),
    });

    if (result.data) {
      console.log('Rubric saved!', result.data);
      return true;
    }
    return false;
  },

  /**
   * Update an existing rubric in the database.
   * @param id The ID of the rubric to update
   * @param rubric The updated rubric data
   */
  async update(id: number, rubric: Rubric): Promise<boolean> {
    const result = await fetchAPI<Rubric>(`/rubrics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(rubric),
    });

    // this only checks if the result is non-null, we need to make sure the response was ok
    if (result.data || result.data === undefined) {
      // handles both 200 and 204 responses
      console.log('Rubric updated successfully!');
      return true;
    }
    return false;
  },

  /**
   * Checks if a rubric with the given title already exists in the database.
   * @param title The title to check
   * @return An object { exists: boolean, id: number } indicating if the title exists and the ID if it does. If the title does not exist, the ID will be a garbage value.
   */
  async checkTitleExists(
    title: string
  ): Promise<{ exists: boolean; id: number }> {
    console.log('Checking title:', title);
    const result = await fetchAPI<{ id: number }>(`/rubrics/title/${title}`);

    if (result.data) {
      return { exists: true, id: result.data.id };
    }
    return { exists: false, id: -1 };
  },

  /**
   * Delete an existing rubric from the database.
   * @param id The ID of the rubric to delete
   */
  async delete(id: number): Promise<boolean> {
    const result = await fetchAPI(`/rubrics/${id}`, {
      method: 'DELETE',
    });

    if (!result.error) {
      console.log('Rubric deleted!');
      return true;
    }
    return false;
  },
};
