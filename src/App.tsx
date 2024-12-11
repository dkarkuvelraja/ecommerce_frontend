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
function App() {
  return (
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
  );
}

export default App;
