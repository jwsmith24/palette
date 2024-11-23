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
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null); // Track selected version
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected. Please choose a file to import.");
      return;
    }
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      if (selectedVersion === 1) {
        parseCSVVersion1(file);
      } else if (selectedVersion === 2) {
        parseCSVVersion2(file);
      } else {
        alert("Please select a parsing version before uploading.");
      }
    } else {
      alert("Unsupported file format. Please upload a CSV file.");
    }
  };

  // Version 1 Parsing
  const parseCSVVersion1 = (file: File) => {
    Papa.parse(file, {
      header: false, // keeps the output an array to sync with parsing xlsx files
      complete: (results) => {
        console.log("Parsed CSV data (Version 1):", results.data);

         // Validate each row to ensure it matches CSVRow type
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
      .filter(Boolean);

    setRubric((prevRubric) =>
      prevRubric
        ? {
            ...prevRubric,
            criteria: [...prevRubric.criteria, ...newCriteria],
          }
        : createCriterion(),
    );

    closeImportCard();
  };

  // Version 2 Parsing
  const parseCSVVersion2 = (file: File) => {
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        console.log("Parsed CSV data (Version 2):", results.data);

        const parsedData = results.data.filter((row): row is CSVRow => {
          return Array.isArray(row) && typeof row[0] === "string";
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
        const criterionTitle = row[0]?.trim();
        const longDescription = row[1]?.trim() || "";
        const maxPoints = parseFloat(row[2]);

        if (!criterionTitle || isNaN(maxPoints)) {
          console.warn("Invalid row format, skipping:", row);
          return null;
        }

        const criterion: Criteria = createCriterion(
          criterionTitle,
          longDescription,
          maxPoints,
          [],
        );

        // Parse ratings (starting from Column D)
        for (let i = 3; i < row.length; i++) {
          const ratingText = row[i]?.toString().trim();
          if (!ratingText) continue;

          const match = ratingText.match(/\(([^)]+)\)$/);
          const deduction = match ? parseFloat(match[1]) : 0;
          const points = maxPoints + deduction;
          const description = ratingText.replace(/\s*\([^)]*\)$/, "");

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

    closeImportCard();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Dropdown with button */}
      <div className="relative">
        <button
          className="transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-violet-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          {selectedVersion
            ? `Version ${selectedVersion}`
            : "Import CSV"}{" "}
          ▼
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 bg-gray-700 text-white mt-2 rounded-lg shadow-lg">
            <button
              onClick={() => {
                setSelectedVersion(1);
                setDropdownOpen(false);
              }}
              className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
            >
              Version 1
            </button>
            <button
              onClick={() => {
                setSelectedVersion(2);
                setDropdownOpen(false);
              }}
              className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
            >
              Version 2
            </button>
          </div>
        )}
      </div>

      {/* File Input */}
      <input
        type="file"
        accept=".csv"
        id="csv-file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        className={`transition-all ease-in-out duration-300 ${
          selectedVersion
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-600 cursor-not-allowed"
        } text-white font-bold rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500`}
        disabled={!selectedVersion}
        onClick={() => {
          const fileInput = document.getElementById(
            "csv-file-upload",
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.click();
          }
        }}
        type="button"
      >
        Select File
      </button>
    </div>
  );
};



export default CSVUpload;
