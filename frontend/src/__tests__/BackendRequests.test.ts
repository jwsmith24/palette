/**
 * Test suite for the BackendAPI module
 */

import { BackendAPI } from "../Protocol/BackendRequests.ts";
import { Rubric } from "../models/Rubric.ts";

global.fetch = jest.fn(); // mock fetch to avoid making actual HTTP requests

describe("BackendAPI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a rubric and return true if successful", async () => {
      const mockRubric: Rubric = {
        id: 1,
        title: "Test Rubric",
        rubricCriteria: [],
        description: "",
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => mockRubric,
      });

      const result = await BackendAPI.create(mockRubric);
      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/rubrics",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(mockRubric),
        }),
      );
    });

    it("should return false if creation fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => ({ error: "Failed to create rubric" }),
      });

      const result = await BackendAPI.create({
        id: 1,
        title: "Test Rubric",
        rubricCriteria: [],
        description: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("update", () => {
    it("should update a rubric and return true if successful", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await BackendAPI.update(1, {
        id: 1,
        title: "Updated Rubric",
        rubricCriteria: [],
        description: "",
      });
      expect(result.success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/rubrics/1",
        expect.objectContaining({
          method: "PUT",
        }),
      );
    });

    it("should return false if update fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => ({ error: "Failed to update rubric" }),
      });

      const result = await BackendAPI.update(1, {
        id: 1,
        title: "Updated Rubric",
        rubricCriteria: [],
        description: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("checkTitleExists", () => {
    it("should return { exists: true, id: id } if title exists", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => ({ id: 2 }),
      });

      const result = await BackendAPI.checkTitleExists("rubric 1");
      expect(result).toEqual({ exists: true, id: 2 });
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/rubrics/title/rubric%201",
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }),
      );
    });

    it("should return { exists: false, id: -1 } if title does not exist", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => ({ error: "Rubric not found" }),
      });

      const result = await BackendAPI.checkTitleExists("Non-Existent Title");
      expect(result).toEqual({ exists: false, id: -1 });
    });
  });

  describe("delete", () => {
    it("should delete a rubric and return true if successful", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await BackendAPI.delete(1);
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/rubrics/1",
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });

    it("should return false if deletion fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => ({ error: "Failed to delete rubric" }),
      });

      const result = await BackendAPI.delete(1);
      expect(result).toBe(false);
    });
  });
});
