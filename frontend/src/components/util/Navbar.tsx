import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function Navbar() {
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // map url paths to label
  const navOptions = {
    "/rubrics": "Rubrics",
    "/clusters": "Templates",
    "/rubric-builder": "Builder",
    "/grading": "Grading",
  };
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const renderNavButtons = () => (
    <div className={"flex justify-between items-center gap-6 mx-4"}>
      {Object.entries(navOptions).map(([path, label]) => (
        <button
          key={path}
          disabled={isActive(path)}
          className={
            isActive(path)
              ? "underline"
              : "no-underline hover:opacity-80 transition duration-300 transform" +
                " hover:scale-105"
          }
          onClick={() => navigate(path)}
        >
          {label.toUpperCase()}
        </button>
      ))}
    </div>
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserAnchor(null);
  };

  const handleHomeClicked = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center h-16 mx-4">
      {renderNavButtons()}

      <button
        className={`self-center px-5 py-1 h-12 bg-gray-500 text-white rounded-full font-semibold hover:opacity-80 transition duration-300 transform hover:scale-105`}
        onClick={handleOpenUserMenu}
      >
        P
      </button>

      <Menu
        sx={{ mt: "45px" }}
        id="user-menu"
        anchorEl={userAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(userAnchor)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
        <MenuItem onClick={handleHomeClicked}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default Navbar;
