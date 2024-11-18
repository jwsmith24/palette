import React, { FC, useState } from "react";
import Papa from "papaparse";
import { CSVRow } from "@local_types";
import { Criteria, PaletteAPIResponse, Rubric } from "palette-types";
import { createCriterion, createRating, createRubric } from "@utils";

interface CSVUploadProps {
  rubric: Rubric | undefined; // Current rubric state
  setRubric: React.Dispatch<React.SetStateAction<Rubric | undefined>>; // Setter for rubric state
}

const CSVUpload: FC<CSVUploadProps> = ({ rubric, setRubric }) => {
  const [showParsingOptions, setShowParsingOptions] = useState(false);

  // Parse CSV for Version 1
  const parseCSVVersion1 = (file: File) => {
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        console.log("Parsed CSV data (Version 1):", results.data);

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

    const clearedRubric = { ...rubric, criteria: [] };

    const newCriteria = data
      .slice(1) // Skip header row
      .map((row) => {
        const criterionTitle = row[0]?.trim();
        if (!criterionTitle) return null;

        const criterion: Criteria = createCriterion(criterionTitle, "", 0, []);
        for (let i = 1; i < row.length; i += 2) {
          const points = Number(row[i]);
          const description = row[i + 1]?.toString();
          if (description)
            criterion.ratings.push(createRating(points, description));
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
        : createRubric(),
    );
  };

  // Parse CSV for Version 2
  const parseCSVVersion2 = (file: File) => {
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        console.log("Parsed CSV data (Version 2):", results.data);

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
        : createRubric(),
    );
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
      onChange={(e) => parseCSVVersion1(e.target.files![0])}
    />
    <input
      type="file"
      accept=".csv"
      id="csv-file-upload-version-2"
      className="hidden"
      onChange={(e) => parseCSVVersion2(e.target.files![0])}
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