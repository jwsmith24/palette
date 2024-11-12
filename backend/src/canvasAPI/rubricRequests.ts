import {
  CanvasRubric,
  CreateRubricAssociationRequest,
  CreateRubricAssociationResponse,
  CreateRubricRequest,
  CreateRubricResponse,
  DeleteRubricRequest,
  DeleteRubricResponse,
  GetAllRubricsRequest,
  GetRubricRequest,
  Rubric,
  UpdateRubricRequest,
  UpdateRubricResponse,
} from "palette-types";
import {fetchAPI} from "../utils/fetchAPI.js";
import RubricUtils from "../utils/rubricUtils.js";

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
   * @param request - The request object containing rubric ID and type (course).
   * @returns A promise that resolves to the retrieved rubric response.
   */
  async getRubric(request: GetRubricRequest): Promise<Rubric> {
    return RubricUtils.toPaletteFormat(
      await fetchAPI<CanvasRubric>(
        `/courses/${request.course_id}/rubrics/${request.id}`,
      ),
    );
  },

  /**
   * Update an existing rubric in a specific course.
   * @param request - The request object containing updated rubric details.
   * @param courseID - The ID of the course.
   * @returns A promise that resolves to the updated rubric response.
   */
  async updateRubric(
    request: UpdateRubricRequest,
    courseID: number,
  ): Promise<UpdateRubricResponse> {
    return fetchAPI<UpdateRubricResponse>(
      `/courses/${courseID}/rubrics/${request.id}`,
      {
        method: "PUT",
        body: JSON.stringify(request),
      },
    );
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

  /**
   * Get all rubrics in a specific course.
   * @param {GetAllRubricsRequest} request - The request object containing course ID.
   * @returns {Promise<Rubric[]>} A promise that resolves to the retrieved rubrics response.
   */
  async getAllRubrics(request: GetAllRubricsRequest): Promise<Rubric[]> {
    const canvasRubrics = await fetchAPI<CanvasRubric[]>(
      `/courses/${request.courseID}/rubrics?per_page=100`,
    );

    return canvasRubrics.map((rubric) => {
      return RubricUtils.toPaletteFormat(rubric);
    });
  },

  /**
   * Create a new rubric association in a specific course. The association can be with a
   * specific assignment, or just the course itself.
   * @param request - The request object containing rubric association details.
   * @param courseID - The ID of the course.
   */
  async createRubricAssociation(
    request: CreateRubricAssociationRequest,
    courseID: number,
  ): Promise<CreateRubricAssociationResponse> {
    return fetchAPI<CreateRubricAssociationResponse>(
      `/courses/${courseID}/rubric_associations`,
      {
        method: "POST",
        body: JSON.stringify(request),
      },
    );
  },
};
