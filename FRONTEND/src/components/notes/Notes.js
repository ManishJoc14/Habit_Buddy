import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "flowbite-react";
import { checkNoteAsync, deleteNoteAsync } from "../../redux/notesThunk";
import { formatStartDate } from "../../utils/formatStartDate";
import { getDaysLeft } from "../../utils/getDaysLeft";
import { getCurrentday } from "./../../utils/getCurrentday";
import "./Note.css";
import Calenderstrip from "../calenderStrip";
import NoteHeader from "./NoteHeader";
import EditNoteModal from "../editNoteModal";

const Notes = () => {
  const [noteToBeRendered, setNotesToBeRendered] = useState([]);
  const [selecteddate, setSelectedDate] = useState(getCurrentday());
  const [noteTobeEdited, setNoteTobeEdit] = useState({});

  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    e.preventDefault();
    try {
      const userCredentials = JSON.parse(
        localStorage.getItem("userCredentials")
      );
      if (userCredentials) {
        dispatch(deleteNoteAsync([{ id }, userCredentials]));
      } else {
        alert("sigup first");
      }
    } catch (error) {
      console.log("Error deleting note" + error);
    }
  };

  const handleCheck = (e, id, done) => {
    e.preventDefault();
    try {
      const userCredentials = JSON.parse(
        localStorage.getItem("userCredentials")
      );

      if (userCredentials) {
        dispatch(checkNoteAsync([{ id, done }, userCredentials]));
      } else {
        alert("sigup first");
      }
    } catch (error) {
      console.log("Error deleting note" + error);
    }
  };
  const handleEdit = (e, note) => {
    e.preventDefault();
    const modal = document.getElementById("modalEdit");
    modal.classList.remove("hidden");
    setNoteTobeEdit(note);
  };
  const handlechange = () => {};

  return (
    <>
      <NoteHeader
        setNotesToBeRendered={setNotesToBeRendered}
        noteToBeRendered={noteToBeRendered}
        selecteddate={selecteddate}
        setSelectedDate={setSelectedDate}
      />
      <Calenderstrip setSelectedDate={setSelectedDate} />
      <EditNoteModal noteTobeEdited={noteTobeEdited} />
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-4">
        {noteToBeRendered.length > 0 ? (
          <>
            {noteToBeRendered.map((note) => (
              <div
                className={` rounded bg-gray-50 dark:bg-gray-800 note-box ${note.category}`}
                key={note.id}
              >
                <span className="note-header">
                  <span className={`category ${note.category}`}>
                    {note.category} | {formatStartDate(note.startDate)} |{" "}
                    {note.priority}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flag"
                      height="16"
                      viewBox="0 -960 960 960"
                      width="16"
                    >
                      <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
                    </svg>
                  </span>
                  <Dropdown
                    label="Dropdown left start"
                    placement="left-start"
                    dismissOnClick={false}
                    className="note-edit"
                    renderTrigger={() => <span className="dots">...</span>}
                  >
                    <Dropdown.Item onClick={(e) => handleEdit(e, note)}>
                      <span className="material-symbols-outlined edit">
                        edit
                      </span>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleDelete(e, note.id)}>
                      <span className="material-symbols-outlined delete">
                        delete
                      </span>
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </span>

                <p className="note-title">{note.note}</p>
                <p className="note-description">{note.description}</p>
                <hr className="hrline" />
                <p className="checkbox-container">
                  {" "}
                  <span className="daysleft">
                    {getDaysLeft(new Date().toISOString(), note.endDate)} Days
                    left
                  </span>{" "}
                  <input
                    type="checkbox"
                    value={note.done}
                    onChange={handlechange}
                    onClick={(e) => handleCheck(e, note.id, note.done)}
                    checked={note.done === true || parseInt(note.done) === 1}
                  />
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h3>No notes available...</h3>
          </>
        )}
      </div>
    </>
  );
};

export default Notes;
