import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const Layout = ({ setIsLoggedIn, setIsLogin, isLoggedIn }) => {
  const currentUser = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(
          addUser({ uid: uid, email: user.email, name: user.displayName })
        );
        console.log(user);
      } else {
        navigate("/");
        console.log(user);
      }
    });
  }, [auth]);
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
