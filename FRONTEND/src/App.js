import Nav from "./components/navbar";
import LeftSideBar from "./components/leftSidebar";
import RightSideBar from "./components/rightSidebar/RightsideBar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewNoteAsync } from "./redux/thunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(viewNoteAsync());
      } catch (error) {
        console.log("Error viewing notes: " + error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <Nav />
      <LeftSideBar />
      <RightSideBar />
    </>
  );
}

export default App;
