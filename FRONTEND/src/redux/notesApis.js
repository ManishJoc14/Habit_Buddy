import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:3001";

// addNote
export const add_Note = (
    { id, note, category, startDate, endDate, description, priority, done },
    { name, email, password }
  ) => {
    return axios.post(
      `${REACT_APP_BASE_URL}/addNote`,
      { id, note, category, startDate, endDate, description, priority, done },
      {
        headers: { name, email, password },
      }
    );
  };
  
  // editNote
  export const edit_Note = (
    { id, note, category, startDate, endDate, description, priority, done },
    { name, email, password }
  ) => {
    return axios.post(
      `${REACT_APP_BASE_URL}/editNote`,
      { id, note, category, startDate, endDate, description, priority, done },
      { headers: { name, email, password } }
    );
  };
  
  // viewNote
  export const view_Note = ({ name, email, password }) => {
    return axios.get( `${REACT_APP_BASE_URL}/viewNote`, {
      headers: { name, email, password },
    });
  };
  // deleteNote
  export const delete_Note = ({ id }, { name, email, password }) => {
    return axios.delete(
      `${REACT_APP_BASE_URL}/deleteNote`,
      { id },
      { headers: { name, email, password } }
    );
  };
  
  // checkNote
  export const check_Note = ({ id, done }, { name, email, password }) => {
    return axios.post(
      `${REACT_APP_BASE_URL}/checkNote`,
      { id, done },
      { headers: { name, email, password } }
    );
  };
  