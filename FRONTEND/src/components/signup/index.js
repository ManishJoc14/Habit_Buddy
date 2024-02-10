import React, { useState } from "react";
import "../login/login.css";
import { useDispatch } from "react-redux";
import { signupUserAsync } from "../../redux/userThunk";

const Signup = ({setIsAuthenticated}) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    if (name && email && password) {
      dispatch(signupUserAsync({ ...userData }));
      localStorage.setItem("userCredentials", JSON.stringify({ ...userData }));
      setIsAuthenticated(true);    
    } else {
      alert("incomplete form");
    }
  };
  return (
    <>
      <div className="container ml-auto mt-3">
        <div className="box">
          <div className="header">
            <header>
              <img src="images/logo.png" alt="" />
            </header>
            <p>Continue to HabitBuddy</p>
          </div>
          <div className="input-box">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={handleChange}
              className="input-field"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              value={userData.email}
              onChange={handleChange}
              className="input-field"
              id="email"
              name="email"
              required
            />
            <i className="bx bx-envelope" />
          </div>
          <div className="input-box">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="input-field"
              name="password"
              id="password"
              required
            />
            <i className="bx bx-lock" />
          </div>
          <div className="input-box">
            <input
              type="submit"
              className="input-submit"
              defaultValue="SIGN IN"
              onClick={handleSubmit}
            />
          </div>
          <div className="bottom">
            <span>
              {/* <Link to="/login">Login</Link> */}
            </span>
            <span>
              <a href=" ">Forgot Password?</a>
            </span>
          </div>
        </div>
        {/* <div className="wrapper" /> */}
      </div>
    </>
  );
};

export default Signup;
