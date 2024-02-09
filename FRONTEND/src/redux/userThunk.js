import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "./apis";

export const loginUserAsync = createAsyncThunk(
  "User/login",
  async ({ email, password}, thunkAPI) => {
    try {
      const response = await login({email, password});
      // console.log(response.data);
      return response?.data; // object; User who is loggedin  {name, email, password, notes}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const signupUserAsync = createAsyncThunk(
  "User/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await signup({ name, email, password });
      // console.log(response.data);
      return response?.data; // object; User which was created  {name, email, password, notes}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

