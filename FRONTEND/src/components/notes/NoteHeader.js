import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
// import { useLocation } from "react-router-dom";
import "./Note.css";
import { getNextDay } from "../../utils/getNextDay";
import { getCurrentday } from "./../../utils/getCurrentday";

const NoteHeader = ({
  setNotesToBeRendered,
  selecteddate,
  noteToBeRendered,
}) => {
  const currentDate = getCurrentday();
  // const { pathname } = useLocation();
  const notes = useSelector((state) => state.notes.notes);
  // const [selectedItem, setSelectedItem] = useState("today");

  useEffect(() => {
    const notesOfSelectedDate = notes.filter((note) => {
      const startDate = note.startDate.split("T")[0];
      return selecteddate === startDate;
    });
    setNotesToBeRendered(notesOfSelectedDate);
  }, [selecteddate, setNotesToBeRendered, notes]);

  const toadysNotes = notes.filter((note) => {
    const startDate = note.startDate.split("T")[0];
    // console.log(startDate);
    // console.log(currentDate);
    return currentDate === startDate;
  });

  const tomorrowsNotes = notes.filter((note) => {
    const startDate = note.startDate;
    return startDate.split("T")[0] === getNextDay(currentDate).split("T")[0];
  });

  // const filteredNotes =
  //   pathname === "/tasks" || pathname === "/" ? toadysNotes : notes;

  // useEffect(() => {
  //   setNotesToBeRendered(filteredNotes);
  // }, [pathname, currentDate, notes]);

  const setTodaysNotes = () => {
    // setSelectedItem("today");
    setNotesToBeRendered(toadysNotes);
  };
  const setTomorrowsNotes = () => {
    // setSelectedItem("tomorrow");
    setNotesToBeRendered(tomorrowsNotes);
  };
  const setAllNotes = () => {
    // setSelectedItem("all");
    setNotesToBeRendered(notes);
  };

  const sortByPriority = () => {
    const copyOfNoteToBeRendered = [...noteToBeRendered];
    copyOfNoteToBeRendered.sort(
      (a, b) => parseInt(a.priority) - parseInt(b.priority)
    );
    setNotesToBeRendered(copyOfNoteToBeRendered);
  };
  const suffleNotes = () => {
    const copyOfNoteToBeRendered = [...noteToBeRendered];
    copyOfNoteToBeRendered.sort((a, b) => Math.random() - Math.random());
    setNotesToBeRendered(copyOfNoteToBeRendered);
  };
  return (
    <>
      {/* <div className="projects-section-header">
        <p>Tasks</p>
        <p className="time">{date}</p>
      </div>
      <div className="projects-section-line">
        <div
          className={`item-status ${
            selectedItem === "today" ? "selected" : ""
          }`}
          onClick={setTodaysNotes}
        >
          <span className="status-number">{toadysNotes.length}</span>
          <span className="status-type">Today's</span>
        </div>

        <div
          className={`item-status ${
            selectedItem === "tomorrow" ? "selected" : ""
          }`}
          onClick={setTomorrowsNotes}
        >
          <span className="status-number">{tomorrowsNotes.length}</span>
          <span className="status-type">Tomorrow's</span>
        </div>

        <div
          className={`item-status ${selectedItem === "all" ? "selected" : ""}`}
          onClick={setAllNotes}
        >
          <span className="status-number">{notes.length}</span>
          <span className="status-type">Total</span>
        </div>
      </div> */}

      <div className="w-100 absolute cursor-pointer right-24">
        <Dropdown
          label="Dropdown left start"
          placement="left-start"
          dismissOnClick={false}
          className="note-edit"
          renderTrigger={() => (
            <span className="dot">
              <span className="material-symbols-outlined">sort</span>
            </span>
          )}
        >
          <Dropdown.Item onClick={setTodaysNotes}>Today's</Dropdown.Item>
          <Dropdown.Item onClick={setTomorrowsNotes}>Tomorrow's</Dropdown.Item>
          <Dropdown.Item onClick={setAllNotes}>ALL</Dropdown.Item>
          <Dropdown.Item onClick={sortByPriority}>SortByPriority</Dropdown.Item>
          <Dropdown.Item onClick={suffleNotes}>Suffle</Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
};

export default NoteHeader;
