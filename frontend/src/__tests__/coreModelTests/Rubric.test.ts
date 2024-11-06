/**
 * Unit tests for Rubric.ts
 */

// Mock uuid to ensure the key is predictable for testing

import { createRubric } from "../../utils/rubricFactory.ts";
import { Criteria, Rubric } from "../../../../palette-types/src";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

describe("Rubric", () => {
  describe("createRubric", () => {
    it("should create a Rubric with default values", () => {
      const rubric = createRubric();

      // Assertions for default values
      expect(rubric.title).toBe("");
      expect(rubric.criteria).toEqual([]);
      expect(rubric.id).toBe(-1);
      expect(rubric.key).toBe("test-uuid"); // Mocked UUID
    });

    it("should create a Rubric with specified values", () => {
      const mockCriteria: Criteria[] = [
        {
          description: "Criterion 1",
          longDescription: "Description for Criterion 1",
          ratings: [],
          points: 10,
          template: "",
          updatePoints: jest.fn(), // mocks the function
          key: "key-1",
        },
        {
          description: "Criterion 2",
          longDescription: "Description for Criterion 2",
          ratings: [],
          points: 20,
          template: "",
          updatePoints: jest.fn(),
          key: "key-2",
        },
      ];

      const rubric: Rubric = createRubric("Test Rubric", mockCriteria, 123);
      console.log(rubric);
      // Assertions for specified values
      expect(rubric.title).toBe("Test Rubric");
      expect(rubric.criteria).toEqual(mockCriteria);
      expect(rubric.id).toBe(123);
      expect(rubric.key).toBe("test-uuid"); // Mocked UUID
    });
  });
});
