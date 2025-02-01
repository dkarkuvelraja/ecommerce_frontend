import { AppBar, Autocomplete, Box, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Login from "../../Components/Login";
import { getCookie } from "../../HelperFunctions/basicHelpers";
import { useNavigate } from "react-router-dom";

import logoName from "../../assets/images/logo/logo-name-dark.png";
import logo from "../../assets/images/logo/logo-dark.png";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const popClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 5000);
  }, []);
  const logOut = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    navigate("/");
  };
  return (
    <>
      {/* {open && <Login loginPopOpen={open} popClose={popClose} />} */} 
      <Box className="hidden md:block bg-primary text-center p-2 text-sm">
        <span className="text-white">Get Exclusive Offers !!!</span>
      </Box>
      <div className="hidden md:block">
        <AppBar className="border-b p-3 px-20" elevation={0} sx={{ position: "relative" }}>
          <div className="grid grid-cols-2">
            <div className="flex gap-2 items-center">
              <img className="h-6" src={logo} alt="logo" />
              <img className="h-6" src={logoName} alt="company name" />
            </div>
            <div className="flex items-center justify-end gap-16">
              <Autocomplete
                className="w-3/6"
                freeSolo
                size="small"
                disableClearable
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px", // Adjust the border radius
                    padding: "3px 10px !important",
                  },
                }}
                renderOption={() => <p>hi</p>}
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          {params.InputProps.endAdornment}
                          <Search size={20} />
                        </>
                      ),
                    }}
                    placeholder="Search"
                  />
                )}
              />
              <div className="flex items-center gap-2">
                <IconButton>
                  <Heart size={20} />
                </IconButton>
                <IconButton>
                  <ShoppingCart size={20} />
                </IconButton>
                {!getCookie("accessToken") ? (
                  <Button sx={{ "&.MuiButton-root": { color: "#000 !important", textTransform: "capitalize", fontSize: "14px" } }} size="small" className="text-black lowercase" onClick={() => setOpen((curr) => !curr)}>
                    Login
                  </Button>
                ) : (
                  <Button sx={{ "&.MuiButton-root": { color: "#000 !important", textTransform: "capitalize", fontSize: "14px" } }} size="small" className="text-black lowercase" onClick={() => logOut()}>
                    LogOut
                  </Button>
                )}
              </div>
            </div>
          </div>
        </AppBar>
        <Box className="flex items-center justify-around p-3 px-2 md:px-20 border-b text-sm" sx={{ flexGrow: 1 }}>
          <span className="cursor-pointer" role="button">
            Home
          </span>
          <span className="cursor-pointer" role="button">
            Kurthis
          </span>
          <span className="cursor-pointer" role="button">
            Tops
          </span>
          <span className="cursor-pointer" role="button">
            T-shirts
          </span>
          <span className="cursor-pointer" role="button">
            Shirts
          </span>
          <span className="cursor-pointer" role="button">
            Jeans
          </span>
          <span className="cursor-pointer" role="button">
            Skirts
          </span>
          <span className="cursor-pointer" role="button">
            Bottom Wears
          </span>
          <span className="cursor-pointer" role="button">
            Loungwear
          </span>
          <span className="cursor-pointer" role="button">
            Shape Wear
          </span>
        </Box>
      </div>
      <div className="md:hidden space-y-2 py-2">
        <div className="grid grid-cols-2 px-4">
          <div className="flex gap-2 items-center">
            <img className="h-4" src={logo} alt="logo" />
            <img className="h-4" src={logoName} alt="company name" />
          </div>
          <div className="flex justify-end items-center">
            <IconButton>
              <Heart size={14} />
            </IconButton>
            <IconButton>
              <ShoppingCart size={14} />
            </IconButton>
          </div>
        </div>
        <div className="px-4">
          <Autocomplete
            freeSolo
            fullWidth
            size="small"
            disableClearable
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px", // Adjust the border radius
                padding: "3px 10px !important",
                height: '30px'
              },
            }}
            renderOption={() => <p>hi</p>}
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      <Search size={16} />
                    </>
                  ),
                }}
                placeholder="Search"
              />
            )}
          />
        </div>
        <div className="p-2 px-4">
          <ul className="flex text-xs space-x-3 overflow-scroll w-full" style={{ scrollbarWidth: "none" }}>
            <li>Home</li>
            <li>Kurthis</li>
            <li>Tops</li>
            <li className="flex-none w-12">T-shirts</li>
            <li>Shirts</li>
            <li>Jeans</li>
            <li>Skirts</li>
            <li className="flex-none w-18">Bottom Wears</li>
            <li>Loungwear</li>
            <li className="flex-none w-18">Shape Wear</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
