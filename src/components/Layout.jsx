import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
const Layout = ({ setIsLoggedIn, setIsLogin, isLoggedIn }) => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default Layout;
