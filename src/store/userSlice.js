import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStore",
  initialState: { user: {} },
  reducers: {
    log: (state, action) => {
      // state.user = action.payload;
      return action.payload;
    },
  },
});
export default userSlice.reducer;
export const { log } = userSlice.actions;
