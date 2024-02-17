import React, { useEffect, useState } from "react";
import AppPage from "./components/APP";
import OtherRoute from "./routes/OtherRoute";
import { useDispatch } from "react-redux";
import { signupUserAsync } from "./redux/userThunk";
import { viewNoteAsync } from "./redux/notesThunk";
import { toast } from 'react-toastify';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials")); 
    if (userCredentials) {
      dispatch(signupUserAsync({ ...userCredentials }))
      .unwrap()
      .then(() => {
        dispatch(viewNoteAsync({ ...userCredentials }));
        setIsAuthenticated(true);
        toast.success("Welcome to HabitBuddy");
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        toast.error("Signup failed:", error);
      });
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
