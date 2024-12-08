import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = ({ setIsLoggedIn, setIsLogin, isLoggedIn }) => {
  return (
    <>
      <Header
        setIsLogin={setIsLogin}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
