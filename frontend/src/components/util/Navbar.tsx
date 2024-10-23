import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [rubricsNavButtonActive, setRubricsNavButtonActive] = useState(false)
  const [clustersNavButtonActive, setClustersNavButtonActive] = useState(true)
  const [builderNavButtonActive, setBuilderNavButtonActive] = useState(true)
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)

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
    <nav>
        <AppBar position="static">
            <Toolbar className="bg-gradient-to-r from-red-500 via-green-500 to-purple-500 w-screen ">

                    <Box sx={{ justifyContent: 'flex-end' }}>
                        <Button onClick={handleHomeClicked}>
                            <Typography variant="h5" color="success">
                                HOME
                            </Typography>
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', lg: 'flex', xl:'flex' } }}>
                        <Button onClick={handleRubricsClicked} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Rubrics      
                        </Button>
                        <Button onClick={handleClustersClicked} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Clusters      
                        </Button>
                        <Button disabled= {true} onClick={handleBuilderClicked} sx={{ my: 2, color: 'white', display: 'block' }}>
                            Builder      
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none', xl:'none' } }}>
                        <Tooltip title="Menu">
                            <IconButton onClick={handleOpenNavMenu} aria-label="Example" sx={{ display: { xs: 'flex', md: 'none', lg: 'none', xl:'none' } }}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </IconButton>
                        </Tooltip>

                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleClosenNavMenu}
                        >
                            <MenuItem onClick={handleClosenNavMenu}>
                                <Typography sx={{ textAlign: 'center' }} component="a" href="/rubrics">Rubrics</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClosenNavMenu}>
                                <Typography sx={{ textAlign: 'center' }} component="a" href="/clusters">Clusters</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClosenNavMenu}>
                                <Typography sx={{ textAlign: 'center' }} component="a" href="/rubric-builder">Builder</Typography>
                            </MenuItem>
                        </Menu>
                        
                    </Box>
            
            

                    <Box sx={{ justifyContent: 'flex-end' }}>
                        
                        <Tooltip title="Settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User's Name" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        

                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        <MenuItem onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>Settings</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }} component="a" href="/">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

            </Toolbar>
        </AppBar>
    </nav>
    
  );
}
export default ResponsiveAppBar;
