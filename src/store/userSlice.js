import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStore",
  initialState: { users: [] },
  reducers: {
    log: (state, action) => console.log(action.payload),
  },
});
export default userSlice;
