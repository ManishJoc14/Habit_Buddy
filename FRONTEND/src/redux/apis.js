import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:3001";

// login
export const login = ({ email, password }) => {
  return axios.post(`${REACT_APP_BASE_URL}/login`, { email, password });
};

// signup
export const signup = ({ name, email, password }) => {
  return axios.post(`${REACT_APP_BASE_URL}/signup`, { name, email, password });
};
// changeDetails
export const changeDetails = ({ name, email, password }, newDetails) => {
  return axios.post(
    `${REACT_APP_BASE_URL}/changeDetails`,
    {
      newName: newDetails.name,
      newEmail: newDetails.email,
      newPassword: newDetails.password,
    },
    {
      headers: { name, email, password },
    }
  );
};

