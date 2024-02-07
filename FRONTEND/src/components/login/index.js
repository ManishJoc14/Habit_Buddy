import React from "react";
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="box">
          <div className="header">
            <header>
              <img src="images/logo.png" alt="" />
            </header>
            <p>Log In to HabitBuddy</p>
          </div>
          <div className="input-box">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              className="input-field"
              id="email"
              required
            />
            <i className="bx bx-envelope" />
          </div>
          <div className="input-box">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              className="input-field"
              id="pass"
              required
            />
            <i className="bx bx-lock" />
          </div>
          <div className="input-box">
            <input
              type="submit"
              className="input-submit"
              defaultValue="SIGN IN"
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
