import { createSlice } from "@reduxjs/toolkit";
import {
  addHabitAsync,
  checkHabitAsync,
  deleteHabitAsync,
  editHabitAsync,
  viewHabitAsync,
} from "./habitsThunk";

const habitsSlice = createSlice({
  name: "habitsManager",
  initialState: {
    habits: [], //array of habits object
    status: "idle",
    error: null,
  },
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action?.payload);
    },
    deleteHabits: (state, action) => {
      state.habits = [];
    },
  },
  extraReducers: (builder) => {
    //addHabitAsync
    builder
      .addCase(addHabitAsync.pending, (state) => {
        state.status = "adding/pending";
      })
      .addCase(addHabitAsync.fulfilled, (state, action) => {
        state.status = "adding/fulfilled";
        //console.log(action.payload); // object; habit which was added {habit, category, startDate, endDate, description, priority, done, completedDays}
        state.habits.push(action?.payload);
      })
      .addCase(addHabitAsync.rejected, (state, action) => {
        state.status = "adding/rejected";
        state.error = action?.payload;
      });

    //editHabitAsync
    builder
      .addCase(editHabitAsync.pending, (state) => {
        state.status = "editing/pending";
      })
      .addCase(editHabitAsync.fulfilled, (state, action) => {
        state.status = "editing/fulfilled";
        //console.log(action.payload); // object; habit which was edited {habit, category, startDate, endDate, description, priority, done, completedDays}
        const index = state.habits.findIndex(
          (habit) => habit.id === action.payload.id
        );
        state.habits[index] = action?.payload;
      })
      .addCase(editHabitAsync.rejected, (state, action) => {
        state.status = "editing/rejected";
        state.error = action?.payload;
      });

    //viewHabitAsync
    builder
      .addCase(viewHabitAsync.pending, (state) => {
        state.status = "viewing/Pending";
      })
      .addCase(viewHabitAsync.fulfilled, (state, action) => {
        state.status = "viewing/fulfilled";
        state.habits = [...(action?.payload || [])];
      })
      .addCase(viewHabitAsync.rejected, (state, action) => {
        state.status = "viewing/failed";
        state.error = action?.payload;
      });

    //deleteHabitAsync
    builder
      .addCase(deleteHabitAsync.pending, (state) => {
        state.status = "deleting/Pending";
      })
      .addCase(deleteHabitAsync.fulfilled, (state, action) => {
        state.status = "deleting/fulfilled";
        state.habits = state?.habits?.filter(
          (habit) => habit.id !== action?.payload
        );
      })
      .addCase(deleteHabitAsync.rejected, (state, action) => {
        state.status = "deleting/failed";
        state.error = action?.payload;
      });

    //checkHabitAsync
    builder
      .addCase(checkHabitAsync.pending, (state) => {
        state.status = "checking/Pending";
      })
      .addCase(checkHabitAsync.fulfilled, (state, action) => {
        state.status = "checking/fulfilled";
        state.habits = state?.habits?.map((habit) => {
          if (habit.id === action?.payload) {
            habit.done = !habit.done;
          }
          return habit;
        });
      })
      .addCase(checkHabitAsync.rejected, (state, action) => {
        state.status = "checking/failed";
        state.error = action?.payload;
      });
  },
});

export const { addHabit, deleteHabits } = habitsSlice.actions;
export default habitsSlice.reducer;
