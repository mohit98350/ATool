import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams,Link } from "react-router-dom";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [name, setname] = useState('');
    const history = useHistory();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    //   function /////////////////////////////////////////////////////////////////////////////// function

    let A_uname;

    useEffect(() => {
        A_uname = localStorage.getItem('username')
        setname(A_uname)
    }, [])

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        history.go('/')
        // setIsLogged(false);
    };


    return (
        <>
            <AppBar position="static" style={{ background: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>  
                    <Link to ="/home">
                    <img  className='home_logo' src='../atool.png'/>
                    </Link>                  
                        

                        <Box sx={{ flexGrow: 1, display: { xs:'flex', md: 'none', color: 'black' } }}>
                          
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex', color: 'black' } }}>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="My Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black' }}>
                                    
                                    {name}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45', color: 'black' }}
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

                                {/* <MenuItem key={5} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem> */}
                                <MenuItem key={6} onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
          
            
        </>
    );
};
export default Navbar;
