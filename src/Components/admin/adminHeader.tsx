import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SparklezLogo } from '../../assets/imageSvg/SparklezLogo';
import { SparklezTitle } from '../../assets/imageSvg/SparklezTitle';
import { Container, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import SearchField from '../Fields/searchField';
import Login from '../Login'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SideBar from '../sideBar';
import LoginIcon from '@mui/icons-material/Login';
export default function AdminHeader() {
  return (
    <div>      <AppBar position="static" color="default" sx={{ backgroundColor: "white !important" }}>
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
          {/* <SearchField value="" placeHolder="Search" icon={true} changeFunction={searchFunction} name="search" /> */}
          <Button color="inherit" sx={{ ml: 1 }} className="minWidth45"><FavoriteBorderOutlinedIcon /> </Button>
          <Button color="inherit" className="minWidth45"><ShoppingCartOutlinedIcon /></Button>
          {/* <Button color="inherit">Contact</Button> */}
          {/* <Button color="inherit" onClick={() => setLoginPopOpen(!loginPopOpen)}><Typography variant="body1" component="div" sx={{ flexGrow: 1, color: "#353535", fontWeight: "500" }}>
            Login
          </Typography></Button> */}
        </Box>
        {/* <SideBar open={open} DrawerList={DrawerList} toggleDrawer={toggleDrawer} /> */}
      </Toolbar>
    </Container>
  </AppBar></div>
  )
}
