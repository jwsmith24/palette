import { render, screen, fireEvent } from "@testing-library/react";
import { vi, beforeEach, describe, it, expect } from "vitest";
import Papa from "papaparse";
import CSVExport from "@features/rubricBuilder/CSVExport";
import { Rubric } from "palette-types/src";

// Mock the unparse method from Papa Parse
vi.mock("papaparse", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    unparse: vi.fn(), // Mock `unparse` to track calls
  };
});

describe("CSVExport Component", () => {
  const mockRubric: Rubric = {
    title: "Sample Rubric",
    pointsPossible: 100,
    key: "unique-key-123",
    criteria: [
      {
        id: 1,
        description: "Criterion 1",
        longDescription: "Detailed description for Criterion 1",
        points: 10,
        ratings: [
          { points: 5, description: "Excellent", longDescription: "", key: "1" },
          { points: 3, description: "Good", longDescription: "", key: "2" },
          { points: 1, description: "Poor", longDescription: "", key: "3" },
        ],
        key: "criterion-key-1",
        updatePoints: vi.fn(),
      },
      {
        id: 2,
        description: "Criterion 2",
        longDescription: "Detailed description for Criterion 2",
        points: 20,
        ratings: [
          { points: 10, description: "Outstanding", longDescription: "", key: "4" },
          { points: 5, description: "Satisfactory", longDescription: "", key: "5" },
        ],
        key: "criterion-key-2",
        updatePoints: vi.fn(),
      },
      {
        id: 3,
        description: "Criterion 3",
        longDescription: "Detailed description for Criterion 3",
        points: 15,
        ratings: [
          { points: 7, description: "Good effort", longDescription: "", key: "6" },
          { points: 3, description: "Needs improvement", longDescription: "", key: "7" },
          { points: 1, description: "Poor", longDescription: "Further work required", key: "8" },
        ],
        key: "criterion-key-3",
        updatePoints: vi.fn(),
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip("triggers CSV export function with correct data", () => {

  });
/*
  it("triggers CSV export function with correct data", () => {
    render(<CSVExport rubric={mockRubric} />);

    // Find and click the export button
    const exportButton = screen.getByText("Export to CSV");
    fireEvent.click(exportButton);

    // Verify that Papa.unparse was called with correct data
    expect(Papa.unparse).toHaveBeenCalled();
    expect(Papa.unparse).toHaveBeenCalledWith(expect.any(Array)); // Adjust as necessary
  });
  */
});


