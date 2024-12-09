import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const Layout = ({ setIsLoggedIn, setIsLogin, isLoggedIn }) => {
  const currentUser = useSelector((store) => store.users);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(
          addUser({ uid: uid, email: user.email, name: user.displayName })
        );
        console.log(currentUser);
      } else {
      }
    });
  }, []);
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
