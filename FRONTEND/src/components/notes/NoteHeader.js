import React, {useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { getNextDay } from "../../utils/getNextDay";
import { getCurrentday } from "./../../utils/getCurrentday";
import "./Note.css";

const NoteHeader = ({
  setNotesToBeRendered,
  noteToBeRendered,
  selecteddate,
  setSelectedDate
}) => {
  const currentDate = getCurrentday();
  const notes = useSelector((state) => state.notes.notes);


  useEffect(() => {
    const notesOfSelectedDate = notes.filter((note) => {
      const startDate = note.startDate.split("T")[0];
      return selecteddate === startDate;
    });
    setNotesToBeRendered(notesOfSelectedDate);
  }, [selecteddate, setNotesToBeRendered, notes]);

  const toadysNotes = notes.filter((note) => {
    const startDate = note.startDate.split("T")[0];
    return currentDate === startDate;
  });

  const tomorrowsNotes = notes.filter((note) => {
    const startDate = note.startDate;
    return startDate.split("T")[0] === getNextDay(currentDate).split("T")[0];
  });

  const setTodaysNotes = () => {
    setNotesToBeRendered(toadysNotes);
    setSelectedDate(getCurrentday());
  };
  const setTomorrowsNotes = () => {
    setNotesToBeRendered(tomorrowsNotes);
    setSelectedDate(getNextDay(new Date()));
  };
  const setAllNotes = () => {
    setNotesToBeRendered(notes);
    setSelectedDate(null);
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
      <div className="w-100 absolute cursor-pointer right-24 sorter">
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
