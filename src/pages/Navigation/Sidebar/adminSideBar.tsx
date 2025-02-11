import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { Box, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Tooltip } from "@mui/material";
import { sidebarMenu } from "./sidebar-property";
import { AccountCircle, ExpandLess, ExpandMore, Logout, Settings } from "@mui/icons-material";
import { logoutSuccess } from "HelperFunctions/message";
import { infoToast } from "HelperFunctions/utils";
import useScreenSize from "HelperFunctions/hooks/useScreenSize";

interface adminSideBarPorps {
  handleMobileMenu?: Function;
}

export default function AdminSideBar({ handleMobileMenu = () => {} }: adminSideBarPorps) {
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const isSmallDevice = width <= 480;
  const [sidebarList, setSidebarList] = useState(sidebarMenu || []);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuOpen = (e: any) => {
    setMenuAnchorEl(e.target);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/admin/managelistings");
  };

  const logOut = () => {
    const message = logoutSuccess("Praveen");
    infoToast(message);
    setTimeout(() => {
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      navigate("/");
    }, 2000);
  };

  const handleMenuItemNavigate = (path: string) => {
    if(path) navigate(path);
    if (isSmallDevice) {
      handleMobileMenu();
    }
  };

  const handleSubMenuOpen = (id: string) => {
    const updatedList = sidebarList.map((list: any) => {
      return {
        ...list,
        menu: list.menu?.map((menu: any) => {
          if (menu?.id === id) {
            return { ...menu, isOpen: !menu.isOpen };
          }
          return menu;
        }),
      };
    });
    setSidebarList(updatedList);
  };

  return (
    <>
      <Box className="overflow-y-auto custom-scroll-bar pt-4 h-[calc(100%-60px)] sm:h-[calc(100%-80px)]">
        {sidebarList.map((list) => {
          return (
            <List
              className="sidebar-list"
              component="nav"
              subheader={
                <ListSubheader className="header" component="div">
                  {list.title}
                </ListSubheader>
              }
            >
              {list.menu?.map((menu : any) => {
                const Icon = menu.icon;
                const isMulipleMenu = menu?.isNested || false
                return (
                  <>
                    <ListItem className="sidebar-menu">
                      <ListItemButton className="sidebar-menu-button" onClick={()=> isMulipleMenu ? handleSubMenuOpen(menu?.id) : handleMenuItemNavigate(menu?.navigate) }>
                        <ListItemIcon className="!min-w-8">
                          <Icon className="icon" />
                        </ListItemIcon>
                        <ListItemText primary={menu.name} className="!flex-initial" sx={{ "& .MuiTypography-root": { fontSize: { xs: "0.75rem", sm: "0.85rem" }, width: "fit-content" } }} />
                        {isMulipleMenu && (<>{ menu.isOpen ? <ExpandLess /> : <ExpandMore />}</>) }
                      </ListItemButton>
                    </ListItem>
                    {isMulipleMenu && (
                      <Collapse in={menu.isOpen} timeout="auto" unmountOnExit>
                        <List className="!pl-5" component="div">
                          {menu.subMenu?.map((subMenu: any) => {
                            const SubMenuIcon = subMenu.icon;
                            return (
                              <ListItem className="sidebar-menu">
                                <ListItemButton className="sidebar-menu-button" onClick={()=> handleMenuItemNavigate(subMenu?.navigate)}>
                                  <ListItemIcon className="!min-w-8">
                                    <SubMenuIcon className="icon" />
                                  </ListItemIcon>
                                  <ListItemText primary={subMenu.name} className="!flex-initial" sx={{ "& .MuiTypography-root": { fontSize: { xs: "0.75rem", sm: "0.85rem" }, width: "fit-content" } }} />
                                </ListItemButton>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    )}
                  </>
                );
              })}
            </List>
          );
        })}
      </Box>
      <Divider className="!border-white" />
      <List>
        <ListItem className="!p-2">
          <div className="bg-primary sm:bg-white text-white sm:text-black rounded-lg flex justify-between items-center w-full">
            <ListItemButton>
              <ListItemIcon className="!min-w-8">
                <AccountCircle className="!text-white sm:!text-gray-600 !text-lg" />
              </ListItemIcon>
              <ListItemText className="!flex-initial !text-white sm:!text-gray-600" sx={{ "& .MuiTypography-root": { fontSize: { sm: "0.875rem" }, fontWeight: 500, letterSpacing: "0.0275rem", width: "fit-content" } }}>
                Praveen
              </ListItemText>
            </ListItemButton>
            <Divider orientation="vertical" flexItem className="!border-white sm:!border-gray-500 !self-center !border !h-6" />
            <Tooltip title="Settings">
              <IconButton size="medium" className="size-8 broder rounded-md !flex-1" onClick={(e) => handleMenuOpen(e)}>
                <Settings className="!text-white sm:!text-gray-600 !text-lg" />
              </IconButton>
            </Tooltip>
          </div>
        </ListItem>
      </List>
      <Menu
        elevation={0}
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={() => handleMenuClose()}
        onClick={() => handleMenuClose()}
        classes={{
          paper: "!border !text-sm drop-shadow-md",
        }}
        className="profile-menu"
        transformOrigin={{ horizontal: isSmallDevice ? "right" : "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem className="menu-item" onClick={() => handleProfile()}>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem className="menu-item" onClick={() => logOut()}>
          <ListItemIcon className="!min-w-5">
            <Logout className="!text-sm sm:!text-base" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
