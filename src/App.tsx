import './App.css';
import Header from './Components/Header/Header';
import Home from './Home';
import About from './Components/About';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './apollo/apolloClient';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { GlobalStyle } from './assets/style/index';
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
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
