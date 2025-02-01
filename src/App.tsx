import React from 'react';
import './App.css';
// pages
import Home from './pages/home';
import ProductDetails from './pages/productDetails';
import About from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
// state management
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import client from './apollo/apolloClient';
import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalStyle } from './assets/style/index';
// components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import ManageCategory from './Components/admin/manageCategory';
import AddListing from './Components/admin/addListing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageListings from './Components/admin/manageListings';
import PrivateRoute from './protectedRoutes';
import Products from 'pages/products';

// import GlobalStyle from '../'
function App() {
  const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff", // Force white background
            color: '#000'
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'gray', // Default color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'orange', // Hover color
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'orange', // Focused color
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'gray',
            top :"-6px",
            fontSize: '14px', // Default label color
            '&.Mui-focused': {
              color: 'orange',
              fontSize: '1rem !important' // Focused label color
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
              <Route path='/admin/manageCategory' element={<ManageCategory />} />
              <Route path='/admin/addListing' element={<AddListing />} />
              <Route path='/admin/addListing/:id' element={<AddListing />} />
              <Route path='/admin/manageListings' element={<ManageListings />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
    <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
