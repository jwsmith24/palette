import { ChangeEvent, useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Template } from "../../../../palette-types/src/types/Template";
import { createTemplate } from "../../utils/templateFactory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import settingsJson from "../../../../backend/settings.json";
import { Criteria } from "palette-types";
import { createCriterion } from "../../utils/rubricFactory";
import { TemplateService } from "../../../../backend/src/TemplatesAPI/templateRequests";
import { useFetch } from "../../hooks/useFetch";

interface TemplateSetterProps {
  closeTemplateCard: () => void; // callback to close the import card
  onTemplatesOpen: () => void;
  handleSetTemplateTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onTemplateSelected: (t: Template) => void;
  criterion: Criteria;
}

const TemplateSetter: React.FC<TemplateSetterProps> = ({
  closeTemplateCard,
  handleSetTemplateTitle,
  onTemplateSelected,
  criterion,
}: TemplateSetterProps) => {
  const [template, setTemplate] = useState<Template>(createTemplate() || null);
  const [anchorElTemplate, setAnchorElTemplate] = useState<null | HTMLElement>(
    null
  );
  const [userTemplates, setUserTemplates] = useState(settingsJson.templates);
  const [criterionAdded, setCriterionAdded] = useState(false);
  const [updatingExistingTemplate, setUpdatingExistingTemplate] =
    useState(false);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState("");

  const { response: postTemplateResponse, fetchData: postTemplate } = useFetch(
    "/templates",
    {
      method: "POST",
      body: JSON.stringify(template), // use latest rubric data
    }
  );

  const { response: putTemplateResponse, fetchData: putTemplate } = useFetch(
    `/templates`,
    {
      method: "PUT",
      body: JSON.stringify(template),
    }
  );

  useEffect(() => {
    console.log("refresh");
  }, [template]);

  const handleTemplateTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (criterionAdded) {
      const newTemplate = { ...template };
      newTemplate.title = event.target.value;
      setTemplate(newTemplate);
    } else {
      console.log("new template");
      const newTemplate = { ...template };
      newTemplate.title = event.target.value;
      newTemplate.criteria.push(criterion);
      setTemplate(newTemplate);
      setCriterionAdded(true);
    }
    setUpdatingExistingTemplate(false);

    // write to the json file here. needs criteria info.
    handleSetTemplateTitle(event);
  };

  const handleOpenTemplates = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorElTemplate(event.currentTarget);
    console.log("before copy: open all");
    console.log(template);
  };

  const handleCloseTemplates = () => {
    setAnchorElTemplate(null);
  };

  // set the template name field of the current criterion and add it to the template.
  // send the template up to the criterion input so that it can detect changes and update the
  // criterion within the template.
  const handleSave = () => {
    handleFinalizeTemplate();
    if (updatingExistingTemplate) {
      console.log("updating existing template");
      putTemplate();
    } else {
      postTemplate();
    }
    closeTemplateCard();
  };

  const handleFinalizeTemplate = () => {
    criterion.template = template.key;
    template.criteria.push(criterion);
    setCriterionAdded(true); //should trigger a re-render
  };

  const handleSelectedExistingTemplate = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();
    template.criteria = [];

    const selectedTemplateTitle = event.currentTarget.textContent;
    const selectedTemplateJson = settingsJson.templates.find(
      (tmplt) => tmplt.title === selectedTemplateTitle
    );

    if (selectedTemplateTitle != null) {
      // if this template exist in the db
      // check if there is criteria in the db for this template. create criterion objects out of all of them and add them to the current template.
      if (selectedTemplateJson?.criteria != undefined) {
        selectedTemplateJson?.criteria.forEach((existingCriterion: any) => {
          const copyCriterion = createCriterion();

          copyCriterion.description = existingCriterion.description;
          copyCriterion.id = existingCriterion.id;
          copyCriterion.key = existingCriterion.key;
          copyCriterion.longDescription = existingCriterion.longDescription;
          copyCriterion.points = existingCriterion.points;
          copyCriterion.ratings = existingCriterion.ratings;
          copyCriterion.template = existingCriterion.template;
          template.criteria.push(copyCriterion);
        });
        template.title = selectedTemplateTitle;
      }

      // const newCriteria = [...template.criteria, criterion];
      // setTemplate({ ...template, criteria: newCriteria });
      console.log("template", template);
      setTemplateSelected(true);
      setSelectedTemplateTitle(selectedTemplateTitle);
      setUpdatingExistingTemplate(true);
      handleFinalizeTemplate();
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
          anchorEl={anchorElTemplate}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElTemplate)}
          onClose={handleCloseTemplates}
        >
          {settingsJson.templates.map((t, tKey) => (
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
