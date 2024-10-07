import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import Home from './components/pages/Home';

import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

const App = () => {
  //protecting pages /check iff user is log in or not
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Navbar />

      <Routes>
       

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Registration />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
