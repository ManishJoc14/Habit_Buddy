import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "flowbite-react";
import { checkNoteAsync, deleteNoteAsync } from "../../redux/thunk";
import "./Note.css";
import { formatStartDate } from "../../utils/formatStartDate";
import { getDaysLeft } from "../../utils/getDaysLeft";
import NoteHeader from "./NoteHeader";
import Calenderstrip from "../calenderStrip";
import { getCurrentday } from './../../utils/getCurrentday';

const Notes = () => {
  const [noteToBeRendered, setNotesToBeRendered] = useState([]);
  const [selecteddate, setSelectedDate] = useState(getCurrentday());



  const dispatch = useDispatch();

  const handleDelete = (e, id) => {
    try {
      dispatch(deleteNoteAsync({ id }));
    } catch (error) {
      console.log("Error deleting note" + error);
    }
  };

  const handleCheck = (e, id, done) => {
    try {
      dispatch(checkNoteAsync({ id, done }));
    } catch (error) {
      console.log("Error deleting note" + error);
    }
  };
  const handlechange = () => {};

  return (
    <>
      <Calenderstrip setSelectedDate={setSelectedDate}/>
      <NoteHeader setNotesToBeRendered={setNotesToBeRendered} selecteddate={selecteddate} />
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
                    <Dropdown.Item>
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
                    checked={note.done === true}
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
