import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//The PrivateRoute component should check if the user is authenticated:
//If authenticated, it will render the Home component.
//If not authenticated, it will redirect to the /login page.

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
