import React from 'react';
import Papa from 'papaparse';
import { CSVRow } from './RubricBuilder.tsx';

interface CSVUploadProps {
  onDataChange: (data: CSVRow[]) => void;
  closeImportCard: () => void; // callback to close the import card
}

const CSVUpload: React.FC<CSVUploadProps> = ({
  onDataChange,
  closeImportCard,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      parseCSV(file);
    } else {
      alert('Unsupported file format. Please upload a CSV or XLSX file.');
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: false, // keeps the output an array to sync with parsing xlsx files
      complete: (results) => {
        console.log('Parsed CSV data:', results.data);
        onDataChange(results.data as CSVRow[]); // Pass parsed data to parent
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
    closeImportCard();
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">
        Import CSV or XLSX
      </h2>
      <div className={'flex justify-between items-center'}>
        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />

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
