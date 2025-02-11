import React, { useState } from "react";
// pages
import NotFound from "NotFound";
// state management
import { ApolloProvider } from "@apollo/client";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import client from "./apollo/apolloClient";
import { Box, Container } from "@mui/material";
// components
import AdminHeader from "pages/Navigation/Header/adminHeader";
import AdminSideBar from "pages/Navigation/Sidebar/adminSideBar";

// instruction modal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// admin layout
const AdminLayout = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMobileMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="overflow-hidden relative h-dvh">
      <AdminHeader handleMobileMenu={handleMobileMenu} isMobileMenuOpen={isMenuOpen} />
      <Container className="h-full my-3" maxWidth="xl">
        <Box className="grid sm:grid-cols-6 gap-4 overflow-hidden h-[calc(100vh-60px)] sm:h-[calc(100vh-100px)]">
          <div className="hidden sm:block">
            <Box
              className="h-[calc(100vh-60px)] sm:h-[calc(100vh-100px)] bg-primary text-white rounded-md shadow-sm overflow-y-auto scroll-p-4 
              scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 "
            >
              <AdminSideBar />
            </Box>
          </div>
          <div className="h-[calc(100vh-60px)] sm:h-[calc(100vh-100px)] col-span-5 overflow-y-auto relative custom-scroll-bar">
            <Outlet />
          </div>
        </Box>
      </Container>
    </div>
  );
};

const RootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <RouterProvider router={RootRouter} />
      </ApolloProvider>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
