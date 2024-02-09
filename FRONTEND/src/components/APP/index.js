import React, { useEffect } from "react";
import LeftSideBar from "../leftSidebar";
import RightSideBar from "../rightSidebar/RightsideBar";
import { useDispatch } from "react-redux";
import { viewNoteAsync } from "../../redux/notesThunk";
import { signupUserAsync } from "../../redux/userThunk";

const AppPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        const userCredentials = JSON.parse(
          localStorage.getItem("userCredentials")
        );
        if (userCredentials) {
          dispatch(signupUserAsync(userCredentials));
          dispatch(viewNoteAsync(userCredentials));
        } else {
          alert("sigup first");
        }
      } catch (error) {
        console.log("Error viewing notes: " + error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <LeftSideBar />
      <RightSideBar />
    </>
  );
};

export default AppPage;
