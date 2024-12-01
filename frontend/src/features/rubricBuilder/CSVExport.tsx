import Papa from "papaparse";
import { Rating, Rubric } from "palette-types";
import { FC } from "react";

interface CSVExportProps {
  rubric: Rubric;
}

export const CSVExport: FC<CSVExportProps> = ({ rubric }) => {
  const handleExportToCSV = () => {
    // Determine the maximum number of ratings across all criteria
    const maxRatings = Math.max(
      ...rubric.criteria.map((criterion) => criterion.ratings.length),
    );

    // Dynamically build header based on max number of ratings
    const header = ["Criteria/Title"];
    for (let i = 0; i < maxRatings; i++) {
      header.push(`Rating ${i + 1}`, `Reason ${i + 1}`);
    }

    // Prepare CSV data
    const data = rubric.criteria.map((criterion) => {
      // Initialize row with the criterion description
      const row = [criterion.description];

      // Add each rating and reason up to maxRatings
      criterion.ratings.forEach((rating: Rating) => {
        const reason = rating.longDescription
          ? `${rating.description}.\n${rating.longDescription}`
          : rating.description;

        row.push(rating.points.toString(), reason);
      });

      // Fill remaining cells if there are fewer ratings than maxRatings
      while (row.length < header.length) {
        row.push("", ""); // Empty "Rating" and "Reason" cells for missing ratings
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
    <div className="flex flex-col items-center gap-4">
      <button
        className="transition-all ease-in-out duration-300 bg-blue-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleExportToCSV}
        type={"button"}
      >
        Export to CSV
      </button>
    </div>
  );
};
