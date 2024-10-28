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
    <div>
      <div className="flex justify-normal sm h-16">
        <div>
          <button
            className="px-6 py-4 text-2xl font-bond text-gray-950 hover:opacity-80 transition duration-300 transform hover:scale-105"
            onClick={handleHomeClicked}
          >
            HOME
          </button>
        </div>
        <div>
          <button
            disabled={location.pathname == '/rubrics'}
            className={`px-3 py-5 ${onRubrics ? 'underline' : 'no-underline hover:opacity-80 transition duration-300 transform hover:scale-105'}`}
            onClick={handleRubricsClicked}
          >
            RUBRICS
          </button>
        </div>
        <div>
          <button
            disabled={location.pathname == '/clusters'}
            className={`px-3 py-5 ${onTemplates ? 'underline' : 'no-underline hover:opacity-80 transition duration-300 transform hover:scale-105'}`}
            onClick={handleClustersClicked}
          >
            TEMPLATES
          </button>
        </div>
        <div className="flex-grow">
          <button
            disabled={location.pathname == '/rubric-builder'}
            className={`px-3 py-5 ${onBuilder ? 'underline' : 'no-underline hover:opacity-80 transition duration-300 transform hover:scale-105'}`}
            onClick={handleBuilderClicked}
          >
            BUILDER
          </button>
        </div>
        <div className="flex justify-end px-2 py-2">
          <button
            className={`px-5 py-1 bg-gray-500 text-white rounded-full font-semibold hover:opacity-80 transition duration-300 transform hover:scale-105`}
            onClick={handleCloseUserMenu}
          >
            U
          </button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
