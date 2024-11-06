import Papa from "papaparse";
import { Rubric } from "../../models/Rubric";

interface CSVExportProps {
  rubric: Rubric;
}

const CSVExport: React.FC<CSVExportProps> = ({ rubric }) => {
  const handleExportToCSV = () => {
    // Prepare header 
    const header = ["Criteria/Title", "Rating", "Reason", "Rating", "Reason", "Rating", "Reason"];

    // Prepare data rows based on the rubric structure
    const data = rubric.rubricCriteria.map((criterion) => {
      const row = [criterion.description];
      criterion.ratings.forEach((rating, index) => {
        row.push(rating.points.toString(), rating.description);
      });

      // Fill any remaining cells if there are fewer than 3 ratings per criterion
      while (row.length < header.length) {
        row.push("", ""); // Empty "Rating" and "Reason" cells
      }

      return row;
    });

    // Combine header and data
    const csvData = [header, ...data];

    // Convert to CSV format using PapaParse
    const csv = Papa.unparse(csvData);

    // Trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${rubric.title || "Rubric"}.csv`);
    link.click();
  };

  return (
    <button
      className="transition-all ease-in-out duration-300 bg-blue-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={handleExportToCSV}
    >
      Export to CSV
    </button>
  );
};

export default CSVExport;
