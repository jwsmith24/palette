import { ReactElement, useState } from "react";
import { Template } from "src/models/Template";

export default function TemplateSetter({
  closeTemplateCard,
}: {
  closeTemplateCard: () => void;
}): ReactElement {
  const [templateSetterActive, setTemplateSetterActive] = useState(false); // file input display is open or not

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <div className={"flex justify-between items-center"}>
        <input
          placeholder="New Template Name"
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />

        <button
          onClick={closeTemplateCard}
          className="h-10 mt-4 bg-green-600 text-white font-bold rounded-lg py-2 px-4 transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}
