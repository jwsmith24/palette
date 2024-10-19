import React from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

interface CSVUploadProps {
  onDataChange: (data: any[]) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataChange }) => {
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
      header: true,
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
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="fileUpload" className="text-white font-semibold mb-2">
        Import Rubric
      </label>
      <input
        id="fileUpload"
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="bg-blue-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-blue-700 cursor-pointer"
      />
    </div>
  );
};

export default CSVUpload;
