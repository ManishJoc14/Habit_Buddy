import React from "react";
import "./Note.css";
import { getCurrentDate } from "./../../utils/getcurrentTime";

const NoteHeader = () => {
  const date = getCurrentDate();
  const handleClick = ()=>{
   
  }
  return (
    <>
      <div className="projects-section-header">
        <p>Projects</p>
        <p className="time">{date}</p>
      </div>
      <div className="projects-section-line">
        <div className="projects-status">
          <div className="item-status" onClick={handleClick}>
            <span className="status-number">45</span>
            <span className="status-type">Today's</span>
          </div>
          <div className="item-status">
            <span className="status-number">24</span>
            <span className="status-type">Upcoming</span>
          </div>
          <div className="item-status">
            <span className="status-number">62</span>
            <span className="status-type">Total Projects</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteHeader;
