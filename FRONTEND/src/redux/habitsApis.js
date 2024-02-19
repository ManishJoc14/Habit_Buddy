import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:3001";

// addHabit
export const add_Habit = (
    { id, note, category, startDate, endDate, description, priority, done, completedDays },
    { name, email, password }
  ) => {
    return axios.post(
      `${REACT_APP_BASE_URL}/addHabit`,
      { id, note, category, startDate, endDate, description, priority, done , completedDays},
      {
        headers: { name, email, password },
      }
    );
  };
  
  // editHabit
  export const edit_Habit = (
    { id, note, category, startDate, endDate, description, priority, done , completedDays},
    { name, email, password }
  ) => {
    return axios.post(
      `${REACT_APP_BASE_URL}/editHabit`,
      { id, note, category, startDate, endDate, description, priority, done , completedDays},
      { headers: { name, email, password } }
    );
  };
  
  // viewHabit
  export const view_Habit = ({ name, email, password }) => {
    return axios.get(`${REACT_APP_BASE_URL}/viewHabit`, {
      headers: { name, email, password },
    });
  };
  // deleteHabit
  export const delete_Habit = ({ id }, { name, email, password }) => {
    return axios.delete(
      `${REACT_APP_BASE_URL}/deleteHabit`,
      { id },
      { headers: { name, email, password } }
    );
  };
  
  // checkHabit
  export const check_Habit = ({ id, done }, { name, email, password }) => {
    return axios.post(
      `${REACT_APP_BASE_URL}/checkHabit`,
      { id, done },
      { headers: { name, email, password } }
    );
  };
  