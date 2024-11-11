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
import { fetchAPI } from "../utils/fetchAPI.js";

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
