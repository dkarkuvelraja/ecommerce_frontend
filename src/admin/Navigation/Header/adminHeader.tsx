import React, { useState } from "react";
import { AppBar, Avatar, Container, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip } from "@mui/material";
import { infoToast, logoDark, logoDarkName } from "HelperFunctions/utils";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "HelperFunctions/message";

export default function AdminHeader() {
  const navigate = useNavigate();
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

  return (
    <>
      <AppBar elevation={0} className="!text-black !border-b">
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, md: 3 }, minHeight: { xs: "48px", sm: "60px" } }}>
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <img className="h-4 md:h-6" src={logoDark} alt="logo" />
                <img className="h-4 md:h-6" src={logoDarkName} alt="company name" />
              </div>
              <div className="grow">
                <div className="flex items-center justify-end space-x-3">
                  <div className="">
                    <Tooltip title="Account Settings">
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e)}>
                        <Avatar className="!text-base !size-8">U</Avatar>
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Menu
                    elevation={0}
                    anchorEl={menuAnchorEl}
                    open={isMenuOpen}
                    onClose={() => handleMenuClose()}
                    onClick={() => handleMenuClose()}
                    classes={{
                      paper: "!border !text-sm mt-2",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem className="!text-sm !px-3 !py-1" onClick={() => handleProfile()}>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem className="!text-sm !px-3 !py-1" onClick={() => logOut()}>
                      <ListItemIcon className="!min-w-5">
                        <Logout className="!text-base" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
