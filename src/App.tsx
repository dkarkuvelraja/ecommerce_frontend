import './App.css';
import Header from './Components/Header.tsx';
import Home from './Components/Home.tsx';
import About from './Components/About.tsx';
import Login from './Components/Login.tsx';
import SignUp from './Components/SignUp.tsx';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './apollo/apolloClient.ts';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalStyle } from './assets/style/index.ts';
import ManageCategory from './Components/admin/manageCategory.tsx';
import AddListing from './Components/admin/addListing.tsx';
// import GlobalStyle from '../'
function App() {
  const theme = createTheme({
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff", // Force white background
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
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path='/admin/manageCategory' element ={<ManageCategory/>}/>
          <Route path='/admin/addListing' element ={<AddListing/>}/>

        </Routes>
      </Router>
    </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
