import { AppBar, Autocomplete, Avatar, Button, Container, CssBaseline, Divider, IconButton, ListItemIcon, Menu, MenuItem, TextField, Toolbar, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import Login from "../../Components/Login";
import { getCookie } from "../../HelperFunctions/basicHelpers";
import { useLocation, useNavigate } from "react-router-dom";
import { FavoriteBorder, Logout, ShoppingCartOutlined } from "@mui/icons-material";
import { infoToast, logoDark, logoDarkName } from "HelperFunctions/utils";
import { logoutSuccess } from "HelperFunctions/message";
import { ElevationScroll, HideOnScroll } from "../../Components/HeaderScroll";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "apollo/query";


interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function Header(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  // const isAuth = getCookie("accessToken");
  const isAuth = localStorage.getItem('loginUserToken');
  const [categories, setCategories] = useState([]);
  //fetch data
  const { data: categoryData, refetch } = useQuery(GET_CATEGORIES, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(()=>{
    refetch();
  }, [location.pathname,refetch])

  useEffect(()=>{
    const categories = categoryData?.getAllCategory?.response || [];
    setCategories(categories);
  }, [categoryData])

  const handleLogModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);


  const handleMenuOpen = (e : any) =>{
    setMenuAnchorEl(e.target)
  }

  const handleMenuClose = () =>{
    setMenuAnchorEl(null)
  }

  const handleProfile = () =>{
    navigate("/admin/managelistings");
  }

  const logOut = () => {
    const message = logoutSuccess('Praveen');
    infoToast(message);
    setTimeout(()=>{
      localStorage.removeItem('loginUserToken');
      // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      navigate("/");
    }, 2000)
  };
  const redirection = () => {
    navigate("/")
  }
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <HideOnScroll {...props}>
            <Container className="bg-primary text-white text-sm text-center p-1 sm:p-1.5" maxWidth="xl" sx={{ display: { xs: "none", sm: "block" } }}>
              <h6 className="text-white tracking-wide">Get Exclusive Offers !!!</h6>
            </Container>
          </HideOnScroll>
          <Container maxWidth='xl'>
            <Toolbar sx={{ px: { xs: 0, sm: 3 }, minHeight: { xs: "48px", sm: "60px" } }}>
              <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center" onClick = {redirection}>
                  <img className="h-3 sm:h-6" src={logoDark} alt="logo" />
                  <img className="h-3 sm:h-6" src={logoDarkName} alt="company name" />
                </div>
                <div className="grow">
                  <div className="flex items-center justify-end md:gap-16">
                    <Autocomplete
                      className="w-64 hidden md:block"
                      freeSolo
                      size="small"
                      disableClearable
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px", // Adjust the border radius
                          padding: "3px 10px !important",
                          bgcolor: "#8080802e",
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
                                <Search size={18} color="gray" />
                              </>
                            ),
                          }}
                          placeholder="Search"
                        />
                      )}
                    />
                    <div className="flex items-center space-x-1 sm:space-x-3">
                      <div className="hover:text-primary cursor-pointer flex items-center">
                        <FavoriteBorder className="!text-lg md:!text-2xl !font-normal !text-gray-400" />
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                        <ShoppingCartOutlined className="!text-lg md:!text-2xl !text-gray-400" />
                      </div>
                      <div className="">
                        {isAuth ? (
                          <Tooltip title='Account Settings'>
                            <IconButton size="small" onClick={(e) => handleMenuOpen(e)}>
                              <Avatar className="!text-sm sm:!text-base !size-6 sm:!size-8">U</Avatar>
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Button onClick={() => setIsAuthModal((prev) => !prev)} size="small" variant="outlined" className="!font-normal !text-xs md:!text-sm !capitalize !rounded-md !text-black !border-primary  hover:!bg-transparent hover:!text-primary hover:ring-1 ring-secondary !min-w-min">
                            Login
                          </Button>
                        )}
                      </div>
                      <Menu elevation={0} anchorEl={menuAnchorEl} open={isMenuOpen} onClose={() =>handleMenuClose()} onClick={()=>handleMenuClose()}
                          classes={{ 
                            paper: '!border !text-sm mt-2'
                          }}
                          className="profile-menu"
                          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                          <MenuItem className="menu-item" onClick={() => handleProfile()}>Profile</MenuItem>
                          <Divider />
                          <MenuItem className="menu-item" onClick={() => logOut()}>
                            <ListItemIcon className="!min-w-5">
                              <Logout className="!text-base" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </Toolbar>
          </Container>
          <Divider />
          <Container maxWidth="xl">
            <div className="p-2 text-xs md:text-sm overflow-scroll md:overflow-hidden">
              <ul className="nav-menu flex justify-center space-x-3 md:space-x-20 w-min md:w-full">
                <li onClick={()=> navigate('/')}>Home</li>
                {
                  categories?.map((item : any, index)=> (
                    <li>{item?.category_name}</li>
                  ))
                }
              </ul>
            </div>
          </Container>
          <Divider />
        </AppBar>
      </ElevationScroll>
      <Toolbar className="!min-h-20 md:!min-h-32" />
      {isAuthModal && <Login onClose={handleLogModal} />}
    </>
  );
}

export default Header;
