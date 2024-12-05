import React from "react";
import "../css/Header.css";
import { Button } from "@mui/material";
const Header = ({ setIsLogin, setIsLoggedIn, isLoggedIn }) => {
  return (
    <header>
      <h1>QUIZO</h1>
      <div className="navigate-btns">
        {isLoggedIn ? (
          <>
            <Button
              variant="text"
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.setItem("isLoggedIn", false);
              }}
            >
              User_Name
            </Button>
          </>
        ) : null}
        {!isLoggedIn ? (
          <>
            <Button
              variant="text"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Login
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setIsLogin(false);
              }}
            >
              SignUp
            </Button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
