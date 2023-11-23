import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "friends",
  initialState: { firstname: "John", username: "JohnCena", token: null },
  reducers: {
    login: (state, action) => {
      state.firstname = action.payload.firstname;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.firstname = null;
      state.username = null;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
