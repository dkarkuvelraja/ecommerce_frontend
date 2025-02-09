import React from "react";
import "./App.css";
// pages
import Home from "./pages/Home/home";
import ProductDetails from "./pages/productDetails";
import Products from "pages/products";
// admin pages
import ManageCategory from "admin/pages/manageCategory";
import AddListing from "admin/pages/addListing";
import ManageListings from "admin/pages/manageListings";
// page not found
import NotFound from "NotFound";
// state management
import { ApolloProvider } from "@apollo/client";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import client from "./apollo/apolloClient";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { GlobalStyle } from "./assets/style/index";
// components
import Header from "./Navigation/Header/Header";
import Footer from "./Navigation/Footer/Footer";
import AdminHeader from "admin/Navigation/Header/adminHeader";
import AdminSideBarComponent from "admin/Navigation/Sidebar/adminSideBar";

// instruction modal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// comon layout
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

// admin layout
const AdminLayout = () => {
  return (
    <div className="overflow-hidden relative h-dvh">
      <AdminHeader />
      <Container className="h-full my-3" maxWidth="xl">
        <div className="grid grid-cols-6 gap-4 h-full">
          <AdminSideBarComponent />
          <div className="col-span-5 overflow-y-scroll mb-20 relative">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

const RootRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "productDetails", element: <ProductDetails /> },
      { path: "products", element: <Products /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "manageCategory", element: <ManageCategory /> },
      { path: "addListing", element: <AddListing /> },
      { path: "addListing/:id", element: <AddListing /> },
      { path: "manageListings", element: <ManageListings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

// import GlobalStyle from '../'
function App() {
  const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff", // Force white background
            color: "#000",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray", // Default color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "orange", // Hover color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "orange", // Focused color
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "gray",
            top: "-6px",
            fontSize: "14px", // Default label color
            "&.Mui-focused": {
              color: "orange",
              fontSize: "1rem !important", // Focused label color
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <RouterProvider router={RootRouter} />
      </ApolloProvider>
      <ToastContainer position="top-right" />
    </ThemeProvider>
  );
}

export default App;
