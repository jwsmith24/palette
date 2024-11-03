import React from "react";
import Papa from "papaparse";
import { CSVRow } from "./RubricBuilder.tsx";

interface CSVUploadProps {
  onDataChange: (data: CSVRow[]) => void;
  closeImportCard: () => void; // callback to close the import card
}

const CSVUpload: React.FC<CSVUploadProps> = ({
  onDataChange,
  closeImportCard,
}: CSVUploadProps) => {
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
      header: false, // keeps the output an array to sync with parsing xlsx files
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);

        // Validate each row to ensure it matches CSVRow type
        const parsedData = results.data.filter((row): row is CSVRow => {
          return (
            Array.isArray(row) &&
            typeof row[0] === "string" &&
            row
              .slice(1)
              .every(
                (cell) => typeof cell === "string" || typeof cell === "number"
              )
          );
        });
        console.log("Validated CSV data:", results.data);
        onDataChange(parsedData); // Pass validated data to parent
      },
    });
    closeImportCard();
  };

  const handleTemp = () => {
    console.log("templateJson");
  };

  return (
    <div className={"flex justify-center items-center gap-10"}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
      />

      {/* Cancel Button */}
      <button
        onClick={closeImportCard}
        className=" mt-4 bg-red-600 text-white font-bold rounded-lg py-2 px-4 transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Cancel
      </button>
    </div>
  );
};

export default CSVUpload;
