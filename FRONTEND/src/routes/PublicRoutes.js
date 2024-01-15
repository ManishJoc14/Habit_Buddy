import React from "react";
import { Routes, Route } from "react-router-dom";
import Notes from "../components/notes/Notes";
import Habits from './../components/habits';
import Categories from './../components/categories';
import Dashboard from './../components/dashboard';
import Timer from './../components/timer';
import Settings from './../components/settings';
import Contact from './../components/contact';
const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Notes />} />
        {/* <Route path="/today" element={<Notes />} /> */}
        <Route path="/tasks" element={<Notes />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
