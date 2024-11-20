import React, { useState } from "react";
import Papa from "papaparse";
import { CSVRow, Criteria, Rubric } from "@local_types";
import { createCriterion, createRating } from "@utils";

interface CSVUploadProps {
  rubric: Rubric | undefined; // Current rubric state
  setRubric: React.Dispatch<React.SetStateAction<Rubric | undefined>>; // Setter for rubric state
  closeImportCard: () => void; // Callback to close the import card
}

const CSVUpload: React.FC<CSVUploadProps> = ({
  rubric,
  setRubric,
  closeImportCard,
}) => {
  const [showParsingOptions, setShowParsingOptions] = useState(false); // Modal for parsing versions

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, version: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      version === 1 ? parseCSVVersion1(file) : parseCSVVersion2(file);
    } else {
      alert("Unsupported file format. Please upload a CSV file.");
    }
  };

  // Version 1 Parsing
  const parseCSVVersion1 = (file: File) => {
    Papa.parse(file, {
      header: false, // Keeps the output an array
      complete: (results) => {
        console.log("Parsed CSV data (Version 1):", results.data);

        // Filter valid rows
        const parsedData = results.data.filter((row): row is CSVRow => {
          return (
            Array.isArray(row) &&
            typeof row[0] === "string" &&
            row
              .slice(1)
              .every(
                (cell) => typeof cell === "string" || typeof cell === "number",
              )
          );
        });

        updateRubricWithCSVVersion1(parsedData);
      },
    });
  };

  const updateRubricWithCSVVersion1 = (data: CSVRow[]) => {
    if (!rubric) return;

    const newCriteria = data
      .slice(1) // Skip header row
      .map((row) => {
        const criterionTitle = row[0]?.trim();
        if (!criterionTitle) return null;

        const criterion: Criteria = createCriterion(criterionTitle, "", 0, []);
        for (let i = 1; i < row.length; i += 2) {
          const points = Number(row[i]);
          const description = row[i + 1]?.toString();
          if (description) {
            criterion.ratings.push(createRating(points, description));
          }
        }
        criterion.updatePoints();
        return criterion;
      })
      .filter(Boolean); // Remove invalid rows

    setRubric((prevRubric) =>
      prevRubric
        ? {
            ...prevRubric,
            criteria: [...prevRubric.criteria, ...newCriteria],
          }
        : createCriterion(),
    );

    closeImportCard(); // Close modal/dialog
  };

  // Version 2 Parsing
  const parseCSVVersion2 = (file: File) => {
    Papa.parse(file, {
      header: false, // Keeps the output an array
      complete: (results) => {
        console.log("Parsed CSV data (Version 2):", results.data);

        // Filter valid rows
        const parsedData = results.data.filter((row): row is CSVRow => {
          return Array.isArray(row) && typeof row[0] === "string"; // Ensure first column (Criteria) exists
        });

        updateRubricWithCSVVersion2(parsedData);
      },
    });
  };

  const updateRubricWithCSVVersion2 = (data: CSVRow[]) => {
    if (!rubric) return;

    const newCriteria = data
      .slice(1) // Skip header row
      .map((row) => {
        const criterionTitle = row[0]?.trim(); // Column A: Criteria
        const longDescription = row[1]?.trim() || ""; // Column B: Long Description (optional)
        const maxPoints = parseFloat(row[2]); // Column C: Max Points

        if (!criterionTitle || isNaN(maxPoints)) {
          console.warn("Invalid row format, skipping:", row);
          return null;
        }

        const criterion: Criteria = createCriterion(criterionTitle, longDescription, maxPoints, []);

        // Parse ratings (starting from Column D)
        for (let i = 3; i < row.length; i++) {
          const ratingText = row[i]?.toString().trim();
          if (!ratingText) continue;

          const match = ratingText.match(/\(([^)]+)\)$/); // Extract deduction from parentheses
          const deduction = match ? parseFloat(match[1]) : 0;
          const points = maxPoints + deduction;
          const description = ratingText.replace(/\s*\([^)]*\)$/, ""); // Remove parentheses from text

          if (!isNaN(points) && description) {
            criterion.ratings.push(createRating(points, description));
          }
        }

        return criterion;
      })
      .filter(Boolean);

    setRubric((prevRubric) =>
      prevRubric
        ? {
            ...prevRubric,
            criteria: [...prevRubric.criteria, ...newCriteria],
          }
        : createCriterion(),
    );

    closeImportCard(); // Close modal/dialog
  };

  const triggerFileInput = (version: number) => {
    const fileInput = document.getElementById(`csv-file-upload-version-${version}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div>
      {/* Import CSV Button */}
      <button
        className="transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-violet-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500"
        onClick={() => setShowParsingOptions(true)}
        type="button"
      >
        Import CSV
      </button>

      {/* Hidden File Inputs for each version */}
      <input
        type="file"
        accept=".csv"
        id="csv-file-upload-version-1"
        className="hidden"
        onChange={(e) => handleFileChange(e, 1)}
      />
      <input
        type="file"
        accept=".csv"
        id="csv-file-upload-version-2"
        className="hidden"
        onChange={(e) => handleFileChange(e, 2)}
      />

      {/* Parsing Options Modal */}
      {showParsingOptions && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Select Parsing Version</h2>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => {
                  triggerFileInput(1);
                  setShowParsingOptions(false);
                }}
              >
                Version 1
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={() => {
                  triggerFileInput(2);
                  setShowParsingOptions(false);
                }}
              >
                Version 2
              </button>
            </div>
            <button
              className="mt-4 text-red-500"
              onClick={() => setShowParsingOptions(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
