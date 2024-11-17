import React from "react";
import Papa from "papaparse";
import { CSVRow } from "@local_types";
import { Criteria, PaletteAPIResponse, Rubric } from "palette-types";
import { createCriterion, createRating } from "@utils";

interface CSVUploadProps {
  rubric: Rubric | undefined; // Current rubric state
  setRubric: React.Dispatch<React.SetStateAction<Rubric | undefined>>; // Setter for rubric state
}

const CSVUpload: FC<CSVUploadProps> = ({ rubric, setRubric }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      parseCSV(file);
    } else {
      alert("Unsupported file format. Please upload a CSV file.");
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: false, // Keeps the output an array
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);

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

        updateRubricWithCSV(parsedData);
      },
    });
  };

  const updateRubricWithCSV = (data: CSVRow[]) => {
    if (!rubric) return;

    const clearedRubric = { ...rubric, criteria: [] };
    const existingCriteriaDescriptions = new Set(
      clearedRubric.criteria.map((criterion) =>
        criterion.description.trim().toLowerCase(),
      ),
    );

    const newCriteria = data
      .slice(1) // Skip the header row
      .map((row) => {
        if (typeof row[0] !== "string" || !row[0].trim()) return null;
        if (existingCriteriaDescriptions.has(row[0].trim().toLowerCase()))
          return null;

        const criterion: Criteria = createCriterion(row[0], "", 0, []);
        for (let i = 1; i < row.length; i += 2) {
          const points = Number(row[i]);
          const description = row[i + 1] as string;
          if (description)
            criterion.ratings.push(createRating(points, description));
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
        : createRubric(),
    );
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("csv-file-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex items-center">
      {/* Hidden File Input */}
      <input
        type="file"
        accept=".csv"
        id="csv-file-upload"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Import CSV Button */}
      <button
        className="transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-violet-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500"
        onClick={triggerFileInput}
        type="button"
      >
        Import CSV
      </button>
    </div>
  );
};

export default CSVUpload;