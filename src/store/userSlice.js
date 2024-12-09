import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      // state.user = action.payload;
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});
export default userSlice.reducer;
export const { addUser } = userSlice.actions;
