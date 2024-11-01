import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const onRubrics = location.pathname === "/rubrics";
  const onTemplates = location.pathname === "/clusters";
  const onBuilder = location.pathname === "/rubric-builder";
  const onGrading = location.pathname === "/grading";

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClosenNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleHomeClicked = () => {
    navigate("/");
  };

  const handleRubricsClicked = () => {
    navigate("/rubrics");
  };

  const handleClustersClicked = () => {
    navigate("/clusters");
  };

  const handleBuilderClicked = () => {
    navigate("/rubric-builder");
  };

  const handleGradingClicked = () => {
    navigate("/grading");
  };

  const getNavButtonStyle = (isActive: boolean) =>
    `px-3 py-5 ${isActive ? "underline" : "no-underline hover:opacity-80 transition duration-300 transform hover:scale-105"}`;

  return (
    <div className="flex justify-between items-center h-16 mx-4">
      <div className={"flex"}>
        <button
          className="px-6 py-4 text-2xl font-bold text-gray-950 hover:opacity-80 transition duration-300 transform hover:scale-105"
          onClick={handleHomeClicked}
        >
          HOME
        </button>
        <button
          disabled={onRubrics}
          className={getNavButtonStyle(onRubrics)}
          onClick={handleRubricsClicked}
        >
          RUBRICS
        </button>

        <button
          disabled={onTemplates}
          className={getNavButtonStyle(onTemplates)}
          onClick={handleClustersClicked}
        >
          TEMPLATES
        </button>

        <button
          disabled={onBuilder}
          className={getNavButtonStyle(onBuilder)}
          onClick={handleBuilderClicked}
        >
          BUILDER
        </button>
        <button
          disabled={onGrading}
          className={getNavButtonStyle(onGrading)}
          onClick={handleGradingClicked}
        >
          GRADING
        </button>
      </div>

      <button
        className={`self-center px-5 py-1 h-12 bg-gray-500 text-white rounded-full font-semibold hover:opacity-80 transition duration-300 transform hover:scale-105`}
        onClick={handleOpenUserMenu}
      >
        U
      </button>

      <Menu
        sx={{ mt: "45px" }}
        id="hamburger-menu"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleClosenNavMenu}
      >
        <MenuItem onClick={handleRubricsClicked}>Rubrics</MenuItem>
        <MenuItem onClick={handleClustersClicked}>Templates</MenuItem>
        <MenuItem onClick={handleBuilderClicked}>Builder</MenuItem>
      </Menu>

      <Menu
        sx={{ mt: "45px" }}
        id="user-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
        <MenuItem onClick={handleHomeClicked}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
export default Navbar;
