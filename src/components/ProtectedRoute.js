import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
  const user = useSelector((store) => store.user?.user);

  return !user ? (
    <Navigate to='/auth' replace />
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
