/**
 * Unit tests for Rubric.ts
 */

// Mock uuid to ensure the key is predictable for testing
import createRubric from "../models/Rubric.ts";
import { RubricCriterion } from "../models/RubricCriterion.ts";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

describe("Rubric", () => {
  describe("createRubric", () => {
    it("should create a Rubric with default values", () => {
      const rubric = createRubric();

      // Assertions for default values
      expect(rubric.title).toBe("");
      expect(rubric.description).toBe("Enter description");
      expect(rubric.rubricCriteria).toEqual([]);
      expect(rubric.id).toBe(-1);
      expect(rubric.key).toBe("test-uuid"); // Mocked UUID
    });

    it("should create a Rubric with specified values", () => {
      const mockCriteria: RubricCriterion[] = [
        {
          description: "Criterion 1",
          longDescription: "Description for Criterion 1",
          ratings: [],
          points: 10,
          updatePoints: jest.fn(), // mocks the function
          key: "key-1",
        },
        {
          description: "Criterion 2",
          longDescription: "Description for Criterion 2",
          ratings: [],
          points: 20,
          updatePoints: jest.fn(),
          key: "key-2",
        },
      ];

      const rubric = createRubric(
        "Test Rubric",
        mockCriteria,
        "Test Description",
        123,
      );

      // Assertions for specified values
      expect(rubric.title).toBe("Test Rubric");
      expect(rubric.description).toBe("Test Description");
      expect(rubric.rubricCriteria).toEqual(mockCriteria);
      expect(rubric.id).toBe(123);
      expect(rubric.key).toBe("test-uuid"); // Mocked UUID
    });
  });
});
