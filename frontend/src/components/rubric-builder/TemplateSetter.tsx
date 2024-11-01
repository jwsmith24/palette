import { ReactElement } from "react";

export default function TemplateSetter(): ReactElement {
  const handleTemp = () => {
    console.log("temp");
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <div className={"flex justify-between items-center"}>
        <input
          placeholder="New Template Name"
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />
      </div>
    </div>
  );
}
