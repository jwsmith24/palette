import { ReactElement, ChangeEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import createTemplate, { Template } from "../../models/Template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TurnedInRounded } from "@mui/icons-material";
interface TemplateSetterProps {
  closeTemplateCard: () => void; // callback to close the import card
  handleSetTemplateTitle: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TemplateSetter: React.FC<TemplateSetterProps> = ({
  closeTemplateCard,
  handleSetTemplateTitle,
}) => {
  const [template, setTemplate] = useState<Template>(createTemplate());
  const [anchorElTemlate, setAnchorElTemplate] = useState<null | HTMLElement>(
    null
  );

  const handleOpenTemplates = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTemplate(event.currentTarget);
    closeTemplateCard();
  };

  const handleCloseTemplates = () => {
    setAnchorElTemplate(null);
  };

  const handleTemp = () => {
    const templateJson = JSON.stringify(template, null, 2);
    console.log(templateJson);
    closeTemplateCard();
  };

  const handleTemplateTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTemplate = { ...template };
    newTemplate.title = event.target.value;
    setTemplate(newTemplate);
    handleSetTemplateTitle(event);
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <div className={"flex justify-between items-center"}>
        <input
          placeholder="New Template Name"
          onChange={handleTemplateTitleChange}
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />

        <button
          className="px-1 py-4 text-2xl font-bond text-gray-950 hover:opacity-80 transition duration-300 transform hover:scale-105"
          onClick={handleOpenTemplates}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <button
          onClick={handleTemp}
          className="h-10 mt-4 bg-green-600 text-white font-bold rounded-lg py-2 px-4 transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default TemplateSetter;
