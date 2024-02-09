import { createSlice } from "@reduxjs/toolkit";
import {
  addNoteAsync,
  checkNoteAsync,
  deleteNoteAsync,
  editNoteAsync,
  viewNoteAsync,
} from "./notesThunk";

const notesSlice = createSlice({
  name: "notesManager",
  initialState: {
    notes: [], //array of notes object
    status: "idle",
    error: null,
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action?.payload);
    },
  },
  extraReducers: (builder) => {
    //addNoteAsync
    builder
      .addCase(addNoteAsync.pending, (state) => {
        state.status = "adding/pending";
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.status = "adding/fulfilled";
        //console.log(action.payload); // object; note which was added {note, category, startDate, endDate, description, priority, done}
        state.notes.push(action?.payload);
      })
      .addCase(addNoteAsync.rejected, (state, action) => {
        state.status = "adding/rejected";
        state.error = action?.payload;
      });

    //editNoteAsync
    builder
      .addCase(editNoteAsync.pending, (state) => {
        state.status = "editing/pending";
      })
      .addCase(editNoteAsync.fulfilled, (state, action) => {
        state.status = "editing/fulfilled";
        //console.log(action.payload); // object; note which was edited {note, category, startDate, endDate, description, priority, done}
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        state.notes[index] = action?.payload;
      })
      .addCase(editNoteAsync.rejected, (state, action) => {
        state.status = "editing/rejected";
        state.error = action?.payload;
      });

    //viewNoteAsync
    builder
      .addCase(viewNoteAsync.pending, (state) => {
        state.status = "viewing/Pending";
      })
      .addCase(viewNoteAsync.fulfilled, (state, action) => {
        state.status = "viewing/fulfilled";
        state.notes = [...(action?.payload || [])];
      })
      .addCase(viewNoteAsync.rejected, (state, action) => {
        state.status = "viewing/failed";
        state.error = action?.payload;
      });

    //deleteNoteAsync
    builder
      .addCase(deleteNoteAsync.pending, (state) => {
        state.status = "deleting/Pending";
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.status = "deleting/fulfilled";
        state.notes = state?.notes?.filter(
          (note) => note.id !== action?.payload
        );
      })
      .addCase(deleteNoteAsync.rejected, (state, action) => {
        state.status = "deleting/failed";
        state.error = action?.payload;
      });

    //checkNoteAsync
    builder
      .addCase(checkNoteAsync.pending, (state) => {
        state.status = "checking/Pending";
      })
      .addCase(checkNoteAsync.fulfilled, (state, action) => {
        state.status = "checking/fulfilled";
        state.notes = state?.notes?.map((note) => {
          if (note.id === action?.payload) {
            note.done = !note.done;
          }
          return note;
        });
      })
      .addCase(checkNoteAsync.rejected, (state, action) => {
        state.status = "checking/failed";
        state.error = action?.payload;
      });
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
