import React, { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library

interface CsvUploadProps {
  onDataChange: (data: string[]) => void; // Handles Data Changes
  closeImportCard: () => void; // callback to close the import card
}

const CsvUpload: React.FC<CsvUploadProps> = ({
  onDataChange,
  closeImportCard,
}) => {
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
    closeImportCard();
  };

  const parseCsv = (text: string): string[] => {
    const rows = text.split("\n");
    return rows.map((row) => row.split(",").join(" | "));
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">
        Import CSV or XLSX
      </h2>
      <div className={"flex justify-between items-center"}>
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleCsvUpload}
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Cancel Button */}
        <button
          onClick={closeImportCard}
          className="h-10 mt-4 bg-red-600 text-white font-bold rounded-lg py-2 px-4 transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CsvUpload;
