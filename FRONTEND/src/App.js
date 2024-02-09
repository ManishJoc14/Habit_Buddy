import Nav from "./components/navbar";
import React, { useEffect, useState } from "react";
import AppPage from "./components/APP";
import Home from "./components/home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (userCredentials) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      <Nav />
      {isAuthenticated ? <AppPage /> : <Home />}
    </>
  );
}

export default App;
