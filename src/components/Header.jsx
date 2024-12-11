import { useState } from "react";
import "../css/Header.css";
import { Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const Header = ({ setIsLogin, setIsLoggedIn, isLoggedIn }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.users;
  });
  function signUserOut() {
    signOut(auth)
      .then(() => {
        dispatch(removeUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <h1>QUIZO</h1>
        <div className="navigate-btns">
          {user ? (
            <div>
              <Button
                variant="text"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Profile
              </Button>
              {isOpen && (
                <motion.div
                  className="user__popup"
                  animate={{
                    y: [-20, -5, 0],
                  }}
                  transition={{
                    duration: 0.1,
                  }}
                >
                  <ul>
                    <li>
                      <span>
                        <img
                          src="https://www.svgrepo.com/show/511909/edit-cover-1481.svg"
                          className="popup_icon edit_icon"
                          alt="edit icon"
                        />
                      </span>
                      Edit
                    </li>
                    <li>
                      <span>
                        <img
                          src="https://www.svgrepo.com/show/13688/settings.svg"
                          className="settings_icon popup_icon"
                          alt="settings icon"
                        />
                      </span>
                      Settings
                    </li>
                    <li
                      onClick={() => {
                        signUserOut();
                        setIsOpen(false);
                      }}
                    >
                      <span>
                        <img
                          src="https://www.svgrepo.com/show/520828/logout.svg"
                          alt="logout icon"
                          className="logout_icon popup_icon"
                        />
                      </span>
                      Log out
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          ) : null}
          {!user ? (
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
      {/* <div className="edit_popup">
        <TextField size="small" variant="outlined" label="Username" />
        <DatePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
        <Button variant="standard">SAVE</Button>
      </div> */}
    </>
  );
};

export default Header;
