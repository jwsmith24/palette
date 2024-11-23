import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Papa from "papaparse";
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
import settingsJson from "../../../../backend/settings.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Template } from "palette-types";

interface TemplateUploadProps {
  closeImportCard: () => void; // callback to close the template import card
  onTemplateSelected: (template: Template) => void;
}

const TemplateUpload: React.FC<TemplateUploadProps> = ({
  closeImportCard,
  onTemplateSelected,
}: TemplateUploadProps) => {
  const [templateTitle, setTemplateTitle] = useState<string | null>(null);

  const handleImportTemplate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("import template");

    const selectedTemplateTitle = event.currentTarget.textContent;
    setTemplateTitle(selectedTemplateTitle);

    for (const template of settingsJson.templates) {
      if (template.title === selectedTemplateTitle) {
        onTemplateSelected(template as Template);
      }
    }
    closeImportCard();
  };

  return (
    <div className={"flex justify-center items-center gap-10"}>
      <ul>
        {settingsJson.templates.map((t, tKey) => (
          <li key={tKey} onClick={handleImportTemplate}>
            <button>{t.title}</button>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateUpload;
