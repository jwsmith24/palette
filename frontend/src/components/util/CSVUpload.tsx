import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library

interface CsvUploadProps {
  onDataChange: (data: string[]) => void; // Handles Data Changes
}

const CsvUpload: React.FC<CsvUploadProps> = ({ onDataChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop();

      if (fileExtension === "csv") {
        const reader = new FileReader();

        reader.onload = (e) => {
          const text = e.target?.result as string;
          const data = parseCsv(text);
          onDataChange(data); // Call the onDataChange prop with the parsed data
        };

        reader.onerror = () => {
          setError("Error reading file");
        };

        reader.readAsText(file);
      } else if (fileExtension === "xlsx") {
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(
            worksheet,
            { header: 1 },
          );

          const dataArray = jsonData.map((row) => row.join(" | ")); // Join the elements of each row with " | "
          onDataChange(dataArray); // Call the onDataChange prop with the parsed data
        };

        reader.onerror = () => {
          setError("Error reading file");
        };

        reader.readAsArrayBuffer(file);
      } else {
        setError("Invalid file type. Please upload a .csv or .xlsx file.");
      }
    }
  };

  const parseCsv = (text: string): string[] => {
    const rows = text.split("\n");
    return rows.map((row) => row.split(",").join(" | "));
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        In a rush? Upload a .CSV or .XLSX File
      </h2>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={handleCsvUpload}
        className="mt-4 mb-4 border border-gray-300 rounded-lg p-2 text-gray-700 hover:bg-gray-300 transition duration-300 cursor-pointer"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CsvUpload;