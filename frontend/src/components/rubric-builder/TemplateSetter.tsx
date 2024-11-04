import { ChangeEvent, useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import createTemplate, { Template } from "../../models/Template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import templatesJson from "./templates.json";
import createRubricCriterion, {
  RubricCriterion,
} from "../../models/RubricCriterion.ts";

interface TemplateSetterProps {
  closeTemplateCard: () => void; // callback to close the import card
  onTemplatesOpen: () => void;
  handleSetTemplateTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onTemplateSelected: (t: Template) => void;
  criterion: RubricCriterion;
}

const TemplateSetter: React.FC<TemplateSetterProps> = ({
  closeTemplateCard,
  handleSetTemplateTitle,
  onTemplateSelected,
  criterion,
}: TemplateSetterProps) => {
  const [template, setTemplate] = useState<Template>(createTemplate() || null);
  const [anchorElTemlate, setAnchorElTemplate] = useState<null | HTMLElement>(
    null
  );
  const [userTemplates, setUserTemplates] = useState(templatesJson);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState("");

  useEffect(() => {
    console.log("refresh");
  });

  const handleTemplateTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTemplate = { ...template };
    newTemplate.title = event.target.value;
    setTemplate(newTemplate);
    // write to the json file here. needs criteria info.
    handleSetTemplateTitle(event);
  };

  const handleOpenTemplates = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorElTemplate(event.currentTarget);
    console.log("userTemplates");
    console.log(userTemplates);
  };

  const handleCloseTemplates = () => {
    setAnchorElTemplate(null);
  };

  const handleSave = () => {
    const newTemplate = { ...template };
    newTemplate.title = template.title;
    newTemplate.id = template?.id;
    newTemplate.key = template?.key;
    newTemplate.templateCriteria.push(criterion);
    console.log("newTemplate");
    onTemplateSelected(newTemplate);

    closeTemplateCard();
  };

  const handleSelectedExistingTemplate = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    const selectedTemplateTitle = event.currentTarget.textContent;
    const selectedTemplateJson = templatesJson.find(
      (tmplt) => tmplt.title === selectedTemplateTitle
    );

    //TODO: turn it into an object to be so that the current criteria can be added to it

    if (selectedTemplateTitle != null) {
      template.title = selectedTemplateJson?.title;
      template.id = selectedTemplateJson?.id;
      template.key = selectedTemplateJson?.key;
      setTemplateSelected(true);
      console.log("selectedTemplate");
      onTemplateSelected(template);
      setSelectedTemplateTitle(selectedTemplateTitle);
    }
    handleCloseTemplates();
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <div className={"flex justify-between items-center"}>
        <input
          placeholder={
            templateSelected ? `${selectedTemplateTitle}` : "New Template Name"
          }
          onChange={handleTemplateTitleChange}
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />

        <button
          className="px-1 py-4 text-2xl font-bond text-gray-950 hover:opacity-80 transition duration-300 transform hover:scale-105"
          onClick={handleOpenTemplates}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <Menu
          sx={{ mt: "45px" }}
          id="user-menu"
          anchorEl={anchorElTemlate}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElTemlate)}
          onClose={handleCloseTemplates}
        >
          {userTemplates.map((t, tKey) => (
            <MenuItem key={tKey} onClick={handleSelectedExistingTemplate}>
              {t.title}
            </MenuItem>
          ))}
        </Menu>

        <button
          onClick={handleSave}
          className="h-10 mt-4 bg-green-600 text-white font-bold rounded-lg py-2 px-4 transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default TemplateSetter;
