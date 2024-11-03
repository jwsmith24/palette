import { ReactElement, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { TurnedInRounded } from "@mui/icons-material";

export default function TemplateSetter({
  closeTemplateCard,
}: {
  closeTemplateCard: () => void;
}): ReactElement {
  const [templateSetterActive, setTemplateSetterActive] = useState(false); // file input display is open or not
  const [anchorElTemlate, setAnchorElTemplate] = useState<null | HTMLElement>(
    null
  );

  const handleOpenTemplates = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTemplate(event.currentTarget);
  };

  const handleCloseTemplates = () => {
    setAnchorElTemplate(null);
  };

  const handleTemp = () => {
    console.log("");
  };

  return (
    <div className="border border-gray-700 p-6 rounded-lg shadow-xl bg-gray-700">
      <div className={"flex justify-between items-center"}>
        <input
          placeholder="New Template Name"
          className="mt-4 mb-4 border border-gray-600 rounded-lg p-3 text-gray-300 hover:bg-gray-800 transition duration-300 cursor-pointer focus:outline-none"
        />

        <button
          className="px-1 py-4 text-2xl font-bond text-gray-950 hover:opacity-80 transition duration-300 transform hover:scale-105"
          onClick={handleOpenTemplates}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <button
          onClick={handleCloseTemplates}
          className="h-10 mt-4 bg-green-600 text-white font-bold rounded-lg py-2 px-4 transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save
        </button>

        <Menu
          sx={{ mt: "45px" }}
          id="hamburger-menu"
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
        ></Menu>
      </div>
    </div>
  );
}
