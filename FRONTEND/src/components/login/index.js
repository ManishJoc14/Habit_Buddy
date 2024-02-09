import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../redux/userThunk";

const Login = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(userData);
  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(loginUserAsync({...userData}))
  };
  return (
    <>
      <div className="container">
        <div className="box">
          <div className="header">
            <header>
              <img src="images/logo.png" alt="" />
            </header>
            <p>Login In to HabitBuddy</p>
          </div>
          <div className="input-box">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              className="input-field"
              onChange={handleChange}
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
              className="input-field"
              onChange={handleChange}
              id="password"
              name="password"
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
              <Link to="/signup">Sign Up</Link>
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

export default Login;
