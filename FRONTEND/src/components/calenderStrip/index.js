import React from "react";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
// import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import "./calender.css";

const CalenderStripComponent = ({ setSelectedDate }) => {
  const onSelectedDay = (d) => {
    setSelectedDate(new Date(d).toISOString().split("T")[0]);
  };
  return (
    <div>
      <ReactHorizontalDatePicker
        selectedDay={onSelectedDay}
        enableScroll={true}
        enableDays={60}
        enableDaysBefore={1}
      />
    </div>
  );
};

export default CalenderStripComponent;
