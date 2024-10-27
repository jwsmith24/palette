import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';



function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  

  const navigate = useNavigate();
  const location = useLocation();


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
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


  return (
        <div>

        </div>
    
  );
}
export default Navbar;
