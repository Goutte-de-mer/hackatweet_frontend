import { createSlice } from "@reduxjs/toolkit";

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState: [],
  reducers: {
    setTweets: (state, action) => {
      state.splice(0, state.length, ...action.payload);
    },
    addTweet: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export const { addTweet, setTweets } = tweetsSlice.actions;
export default tweetsSlice.reducer;
