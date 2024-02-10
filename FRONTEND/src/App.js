import React, { useEffect, useState } from "react";
import AppPage from "./components/APP";
import OtherRoute from "./routes/OtherRoute";
import { useDispatch } from "react-redux";
import { signupUserAsync } from "./redux/userThunk";
import { viewNoteAsync } from "./redux/notesThunk";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials")); 
    if (userCredentials) {
      dispatch(signupUserAsync({ ...userCredentials }));
      dispatch(viewNoteAsync({...userCredentials}));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch]);
  return (
    <>
      {isAuthenticated ? <AppPage setIsAuthenticated={setIsAuthenticated} /> : <OtherRoute setIsAuthenticated={setIsAuthenticated}/>}
    </>
  );
}

export default App;
