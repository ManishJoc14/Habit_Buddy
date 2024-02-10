import React, { useEffect } from "react";
import LeftSideBar from "../leftSidebar/index";
import Nav from "../navbar/index";
import RightSideBar from "../rightSidebar/index";
import { useDispatch } from "react-redux";
import { viewNoteAsync } from "../../redux/notesThunk";

const AppPage = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    dispatch(viewNoteAsync({ ...userCredentials }));
  });
  return (
    <>
      <Nav setIsAuthenticated={setIsAuthenticated} />
      <LeftSideBar />
      <RightSideBar />
    </>
  );
};

export default AppPage;
