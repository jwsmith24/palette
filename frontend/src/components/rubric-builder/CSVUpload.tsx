import React from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

interface CSVUploadProps {
  onDataChange: (data: unknown[]) => void;
  closeImportCard: () => void; // callback to close the import card
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataChange, closeImportCard, }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "csv") {
      parseCSV(file);
    } else if (fileExtension === "xlsx") {
      parseXLSX(file);
    } else {
      alert("Unsupported file format. Please upload a CSV or XLSX file.");
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: false, // keeps the output an array to sync with parsing xlsx files
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);
        onDataChange(results.data); // Pass parsed data to parent
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  const parseXLSX = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // First sheet of the rubric data
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert the sheet to JSON format
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("Parsed XLSX data:", jsonData); // Log parsed XLSX data
      onDataChange(jsonData); // Pass parsed data to parent
        closeImportCard();
    };

    reader.readAsArrayBuffer(file);
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
          onChange={handleFileChange}
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

export default CSVUpload;
