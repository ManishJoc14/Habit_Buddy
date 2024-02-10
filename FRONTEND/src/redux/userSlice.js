import { createSlice } from "@reduxjs/toolkit";
import {
  changeDetailsAsync,
  loginUserAsync,
  signupUserAsync,
} from "./userThunk";

const userSlice = createSlice({
  name: "User",
  initialState: {
    userDetails: {}, //user object
    status: "idle",
    error: null,
  },
  reducers: {
    addDetails: (state, action) => {
      state.userDetails = action?.payload;
    },
  },
  extraReducers: (builder) => {
    //loginUserAsync
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "logging/pending";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "logging/fulfilled";
        //console.log(action.payload); // object; user with details
        state.userDetails = action?.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "logging/rejected";
        state.error = action?.payload;
      });

    builder
      .addCase(signupUserAsync.pending, (state) => {
        state.status = "signup/pending";
      })
      .addCase(signupUserAsync.fulfilled, (state, action) => {
        state.status = "signup/fulfilled";
        //console.log(action.payload); // object; user with details
        state.userDetails = action?.payload;
      })
      .addCase(signupUserAsync.rejected, (state, action) => {
        state.status = "signup/rejected";
        state.error = action?.payload;
      });

    builder
      .addCase(changeDetailsAsync.pending, (state) => {
        state.status = "changeDetails/pending";
      })
      .addCase(changeDetailsAsync.fulfilled, (state, action) => {
        state.status = "changeDetails/fulfilled";
        //console.log(action.payload); // object; new user details
        state.userDetails = { ...action?.payload };
      })
      .addCase(changeDetailsAsync.rejected, (state, action) => {
        state.status = "changeDetails/rejected";
        state.error = action?.payload;
      });
  },
});

export const { addDetails } = userSlice.actions;
export default userSlice.reducer;
