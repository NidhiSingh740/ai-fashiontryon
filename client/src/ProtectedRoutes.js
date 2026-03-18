
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If no token exists, redirect to the auth/login page
  if (!token) {
    return <Navigate replace to="/auth" />;
  }

  // If token exists, render the Dashboard (children)
  return children;
};

export default ProtectedRoute;