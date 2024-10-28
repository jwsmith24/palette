import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const onRubrics = location.pathname == '/rubrics';
  const onTemplates = location.pathname == '/clusters';
  const onBuilder = location.pathname == '/rubric-builder';

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
    navigate('/');
  };

  const handleRubricsClicked = () => {
    navigate('/rubrics');
  };

  const handleClustersClicked = () => {
    navigate('/clusters');
  };

  const handleBuilderClicked = () => {
    navigate('/rubric-builder');
  };

  return (
    <div className="flex justify-start sm h-16">
      <button
        className="px-6 py-4 text-xl text-gray-950"
        onClick={handleHomeClicked}
      >
        HOME
      </button>
      <button
        disabled={location.pathname == '/rubrics'}
        className={`px-3 py-4 ${onRubrics ? 'underline' : 'no-underline'}`}
        onClick={handleRubricsClicked}
      >
        RUBRICS
      </button>
      <button
        disabled={location.pathname == '/clusters'}
        className={`px-3 py-4 ${onTemplates ? 'underline' : 'no-underline'}`}
        onClick={handleClustersClicked}
      >
        TEMPLATES
      </button>
      <button
        disabled={location.pathname == '/rubric-builder'}
        className={`px-3 py-4 ${onBuilder ? 'underline' : 'no-underline'}`}
        onClick={handleBuilderClicked}
      >
        BUILDER
      </button>
    </div>
  );
}
export default Navbar;
