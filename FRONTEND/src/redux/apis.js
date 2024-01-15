import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:3001";

// addNote
export const add_Note = ({ id, note, category, startDate, endDate, description, priority, done}) => {
  return axios.post(`${REACT_APP_BASE_URL}/addNote`, { id, note, category, startDate, endDate, description, priority, done});
};
// viewNote
export const view_Note = () => {
    return axios.get("http://localhost:3001/viewNote");
};
// deleteNote
export const delete_Note = ({id}) => {
    return axios.post("http://localhost:3001/deleteNote", {id});
};
// checkNote
export const check_Note = ({id, done}) => {
    return axios.post("http://localhost:3001/checkNote", {id, done});
};
  