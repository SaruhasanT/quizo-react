import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    questions: questionReducer,
    users: userReducer,
  },
});
export default store;
