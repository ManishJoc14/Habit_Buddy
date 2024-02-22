// store.js
import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import userReducer from "./userSlice";
import habitReducer from "./habitsSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    userDetails: userReducer,
    habits: habitReducer,
  },
});

export default store;
