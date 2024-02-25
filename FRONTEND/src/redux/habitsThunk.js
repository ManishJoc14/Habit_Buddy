import { createAsyncThunk } from "@reduxjs/toolkit";
import { add_Habit, delete_Habit, view_Habit , check_Habit, edit_Habit } from "./habitsApis";

export const addHabitAsync = createAsyncThunk(
  "habitsManager/addHabitAsync",
  async ([{ id, note, category, startDate, endDate, description, priority, done, completedDays}, userCredentials], thunkAPI) => {
    try {
      const response = await add_Habit({id, note, category, startDate, endDate, description, priority, done, completedDays}, userCredentials);
      // console.log(response.data);
      return response?.data; // object; habit which was added  {id, note, category, startDate, endDate, description, priority, done, completedDays}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const viewHabitAsync = createAsyncThunk(
  "habitsManager/viewHabitAsync",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await view_Habit(userCredentials);
      return response.data; // array of habits obj [{id, note, category, startDate, endDate, description, priority, done, completedDays}, ....]
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteHabitAsync = createAsyncThunk(
  "habitsManager/deleteHabitAsync",
  async ([{id}, userCredentials],thunkAPI) => {
    try {
      const response = await delete_Habit({id}, userCredentials);
      return response?.data; //id 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkHabitAsync = createAsyncThunk(
  "habitsManager/checkHabitAsync",
  async ([{id, done, today}, userCredentials],thunkAPI) => {
    try {
      const response = await check_Habit({id, done, today}, userCredentials);
      return response?.data; //id of habit
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editHabitAsync = createAsyncThunk(
  "habitsManager/editHabitAsync",
  async ([{ id, note, category, startDate, endDate, description, priority, done, completedDays}, userCredentials], thunkAPI) => {
    try {
      const response = await edit_Habit({id, note, category, startDate, endDate, description, priority, done, completedDays}, userCredentials);
      return response?.data; // object; habit which was edited  {id, note, category, startDate, endDate, description, priority, done}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
