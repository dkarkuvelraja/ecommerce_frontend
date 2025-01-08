// import React from 'react'

// export default function Header() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">Ecom</div>
//       <ul className="navbar-links">
//         <li><a href="home">Home</a></li>
//         <li><a href="about">About</a></li>
//         <li><a href="login">Login</a></li>
//         <li><a href="signUp">SignUp</a></li>
//       </ul>
//     </nav>
//   )
// }

import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SparklezLogo } from '../assets/imageSvg/SparklezLogo.tsx';
import { SparklezTitle } from '../assets/imageSvg/SparklezTitle.tsx';
import { Container, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import SearchField from './Fields/searchField.tsx';
import Login from './Login.tsx'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SideBar from './sideBar.tsx';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [loginPopOpen, setLoginPopOpen] = useState(false)
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const searchFunction = () => {
    console.log("first")
  }
  const handleClose = () => {
    setLoginPopOpen(!loginPopOpen)
  }
  const navigate = useNavigate();
  const routerFunction = (url : string) => {
    navigate(url)
}
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {window.location.pathname.split("/")[1] === "admin" ? 
              <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start" }}>
              <Button color="inherit" sx={{ ml: 1, justifyContent: "flex-start" }} className="minWidth45 sideBarContent" onClick = {() => routerFunction("/admin/manageCategory")}> Manage Category </Button>
              <Button color="inherit" sx={{ ml: 1, justifyContent: "flex-start" }} className="minWidth45 sideBarContent" onClick = {() => routerFunction("/admin/addListing")}>Listing Management</Button>
              {/* <Button color="inherit">Contact</Button> */}
              <Button className="sideBarContent" sx={{ ml: 1, justifyContent: "flex-start" }} color="inherit" onClick={() => setLoginPopOpen(!loginPopOpen)}><LoginIcon /> {" "} <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontWeight: "500", textAlign: 'left', fontSize: '0.875rem' }}>
                Login
              </Typography></Button>
            </Box>
            :
            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start" }}>
                <SearchField value="" placeHolder="Search" icon={true} changeFunction={searchFunction} name="search" />
                <Button color="inherit" sx={{ ml: 1, justifyContent: "flex-start" }} className="minWidth45 sideBarContent"><FavoriteBorderOutlinedIcon /> Favourites </Button>
                <Button color="inherit" sx={{ ml: 1, justifyContent: "flex-start" }} className="minWidth45 sideBarContent"><ShoppingCartOutlinedIcon /> Cart</Button>
                {/* <Button color="inherit">Contact</Button> */}
                <Button className="sideBarContent" sx={{ ml: 1, justifyContent: "flex-start" }} color="inherit" onClick={() => setLoginPopOpen(!loginPopOpen)}><LoginIcon /> {" "} <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontWeight: "500", textAlign: 'left', fontSize: '0.875rem' }}>
                  Login
                </Typography></Button>
              </Box>
              }
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <>
      <AppBar position="static" color="default" sx={{ backgroundColor: "white !important" }}>
        <Container maxWidth="lg">

          <Toolbar>
            {/* Menu Icon */}

            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              {/* <MenuIcon /> */}
              {SparklezLogo}
            </IconButton>

            {/* Title */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {SparklezTitle}
            </Typography>

            {/* Navigation Buttons */}
            <Box sx={{
              display: { xs: 'none', sm: 'block' }
            }}>
              <SearchField value="" placeHolder="Search" icon={true} changeFunction={searchFunction} name="search" />
              <Button color="inherit" sx={{ ml: 1 }} className="minWidth45"><FavoriteBorderOutlinedIcon /> </Button>
              <Button color="inherit" className="minWidth45"><ShoppingCartOutlinedIcon /></Button>
              {/* <Button color="inherit">Contact</Button> */}
              <Button color="inherit" onClick={() => setLoginPopOpen(!loginPopOpen)}><Typography variant="body1" component="div" sx={{ flexGrow: 1, color: "#353535", fontWeight: "500" }}>
                Login
              </Typography></Button>
            </Box>
            <SideBar open={open} DrawerList={DrawerList} toggleDrawer={toggleDrawer} />
          </Toolbar>
        </Container>
      </AppBar>
      <Login loginPopOpen={loginPopOpen} handleClose={handleClose} />
    </>
  );
};

export default Header;