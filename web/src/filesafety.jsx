import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'

import { useUser } from './providers/userProvider';

import Pages from './pages';

export default function FILESAFETY() {
  const user = useUser();

  function isUserVerified() {
    return (user && user?.isVerified);
  };

  function isUserSubscribed() {
    return (user && user?.Subscription);
  };
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={user ? (isUserSubscribed() && isUserVerified()) ? <Pages.Dashboard.Overview /> : <Navigate to={!isUserVerified() ? "/authentication/verify" : "/homepage"} /> : <Navigate to={"/authentication/login"} />} />
            <Route path="homepage" element={<Pages.Homepage />} />
            <Route path="products" element={user ? (isUserSubscribed() && isUserVerified()) ? <Pages.Dashboard.Products /> : <Navigate to={!isUserVerified() ? "/authentication/verify" : "/homepage"} /> : <Navigate to={"/authentication/login"} />} />
            <Route path="activations" element={user ? (isUserSubscribed() && isUserVerified()) ? <Pages.Dashboard.Activations /> : <Navigate to={!isUserVerified() ? "/authentication/verify" : "/homepage"} /> : <Navigate to={"/authentication/login"} />} />
            <Route path="logs" element={user ? (isUserSubscribed() && isUserVerified()) ? <Pages.Dashboard.Logs /> : <Navigate to={!isUserVerified() ? "/authentication/verify" : "/homepage"} /> : <Navigate to={"/authentication/login"} />} />
            <Route path="authentication">
              <Route path="login" element={user ? <Navigate to={"/"} /> : <Pages.Authentication.Login />} />
              <Route path="register" element={user ? <Navigate to={"/"} /> : <Pages.Authentication.Register />} />
              <Route path="verify" element={isUserVerified() ? <Navigate to={"/dashboard"} /> : <Pages.Authentication.Verify />} />
            </Route>
            <Route path="*" element={<Navigate to={"/"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};