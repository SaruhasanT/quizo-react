import React, { useRef, useState } from "react";
import "../css/Login.css";
import PrimaryButton from "./PrimaryButton";
import google from "../assets/images/google-icon.svg";
import facebook from "../assets/images/facebook-svgrepo-com (1).svg";
import apple from "../assets/images/apple-logo-svgrepo-com.svg";
import { motion } from "framer-motion";
import { validateEmail, validatePassword } from "../utils/validateData";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { log } from "../store/userSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Login = ({ isLogin, setIsLogin, setIsLoggedIn }) => {
  const newUser = useSelector((store) => store.users.user);
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const repeatPassword = useRef(null);
  const isCreadentialsValid = () => {
    return (
      emailError == null && passwordError == null && repeatPasswordError == null
    );
  };
  const isLogingCreadentialValid = () => {
    return emailError == null && passwordError == null;
  };
  const checkEmail = () => {
    const err = validateEmail(email.current.value);
    setEmailError(err);
  };
  const checkPassword = () => {
    const err = validatePassword(password.current.value);
    setPasswordError(err);
  };
  function emptyErr() {
    setEmailError(null);
    setPasswordError(null);
    setRepeatPasswordError(null);
  }
  function createNewUser() {
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(log(user));
        console.log(newUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  function logUser() {
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(log(user));
        setIsLogin(null);
        setIsLoggedIn(true);
        console.log(newUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setPasswordError(errorMessage);
      });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="login-window"
    >
      <h1 className="title">{isLogin ? "LOGIN" : "SIGNUP"}</h1>
      <input ref={email} type="text" placeholder="Email" />
      <p className="error-msg">{emailError}</p>
      <input ref={password} type="password" placeholder="Password" />
      <motion.p
        animate={{
          x: [-20, 2, 0],
        }}
        className="error-msg"
      >
        {passwordError}
      </motion.p>
      {!isLogin ? (
        <>
          <input
            ref={repeatPassword}
            type="password"
            placeholder="Repeat Password"
          />
          <p className="error-msg">{repeatPasswordError}</p>
        </>
      ) : null}
      {isLogin ? (
        <>
          <PrimaryButton
            text="Login"
            backgroundColor="black"
            width="150px"
            onClick={() => {
              checkEmail();
              checkPassword();

              if (
                isLogingCreadentialValid() &&
                email.current.value !== "" &&
                password.current.value !== ""
              ) {
                logUser();
              }
              localStorage.setItem("isLoggedIn", true);
            }}
          />
          <span
            className="switch"
            onClick={() => {
              setIsLogin(false);
              emptyErr();
              const loginWindow = document.querySelector(".login-window");
              console.log(loginWindow);
              loginWindow.classList.add("open");
            }}
          >
            New here, Click to sign up!
          </span>
        </>
      ) : null}

      {!isLogin ? (
        <>
          <PrimaryButton
            text="SignUp"
            backgroundColor="#844D00"
            bgColor="#54370D"
            width="150px"
            onClick={() => {
              checkEmail();
              checkPassword();

              if (
                isCreadentialsValid() &&
                email.current.value !== "" &&
                password.current.value !== ""
              ) {
                setIsLogin(null);
                setIsLoggedIn(true);
                createNewUser();
              }
              console.log(emailError, passwordError, repeatPasswordError);
            }}
          />
          <span
            className="switch"
            onClick={() => {
              checkEmail();
              checkPassword();
              setIsLogin(true);
              if (password.current.value !== repeatPassword.current.value) {
                setRepeatPasswordError("Password doesn't match!");
              } else {
                setRepeatPasswordError(null);
              }
              emptyErr(null);
            }}
          >
            Already a member, Click to login!
          </span>
        </>
      ) : null}
      <div className="auth-icons">
        <div>
          <img
            style={{
              width: 33,
            }}
            src={google}
            alt=""
          />
        </div>
        <div>
          <img
            style={{
              width: 33,
            }}
            src={facebook}
            alt=""
          />
        </div>
        <div>
          <img
            style={{
              width: 33,
            }}
            src={apple}
            alt=""
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
