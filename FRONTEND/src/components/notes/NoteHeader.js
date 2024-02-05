import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCurrentDate } from "./../../utils/getcurrentTime";
import "./Note.css";
import { getNextDay } from "../../utils/getNextDay";

const NoteHeader = ({ setNotesToBeRendered }) => {
  const date = getCurrentDate();
  const { pathname } = useLocation();
  const currentDate = new Date().toISOString().split("T")[0];
  const notes = useSelector((state) => state.notes.notes);
  const [selectedItem, setSelectedItem] = useState("today");

  const toadysNotes = notes.filter((note) => {
    const startDate = note.startDate.split("T")[0];
    return currentDate === startDate;
  });

  const tomorrowsNotes = notes.filter((note) => {
    const startDate = note.startDate;
    return startDate.split("T")[0] === getNextDay(currentDate).split("T")[0];
  });

  const filteredNotes =
    pathname === "/tasks" || pathname === "/" ? toadysNotes : notes;

  useEffect(() => {
    setNotesToBeRendered(filteredNotes);
  }, [pathname, currentDate, notes]);

  const setTodaysNotes = () => {
    setSelectedItem("today");
    setNotesToBeRendered(toadysNotes);
  };
  const setTomorrowsNotes = () => {
    setSelectedItem("tomorrow");
    setNotesToBeRendered(tomorrowsNotes);
  };
  const setAllNotes = () => {
    setSelectedItem("all");
    setNotesToBeRendered(notes);
  };
  return (
    <>
      <div className="projects-section-header">
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
      </div>
    </>
  );
};

export default NoteHeader;
