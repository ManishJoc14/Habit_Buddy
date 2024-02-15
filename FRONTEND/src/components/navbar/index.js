import React from "react";
import AddNoteModal from "../addNoteModal";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes } from "../../redux/notesSlice";
import AddHabitModal from "../addHabitModal";

const Nav = ({ setIsAuthenticated }) => {
  const { name, email } = useSelector((state) => state.userDetails.userDetails);
  const location = useLocation();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    localStorage.removeItem("userCredentials");
    setIsAuthenticated(false);
    dispatch(deleteNotes());
  };
  const handleAddTask = () => {
    const elem = document.getElementById("modalAddNote");
    elem.classList.remove("hidden");
  };
  const handleAddHabit = () => {
    const elem = document.getElementById("modalAddHabit");
    elem.classList.remove("hidden");
  };
  const openUser = () => {
    const elem = document.getElementById("dropdownUser");
    elem.classList.toggle("hidden");
  };
  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full"
        style={{ backgroundColor: "rgba(243, 246, 253, 1)" }}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link to="/" className="flex ms-2 md:me-24 ">
                <img
                  src={require("../../assets/logo.png")}
                  className="h-8 me-3 rounded "
                  alt="Habbit Buddy Logo"
                />
                <span
                  className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
                  style={{ fontSize: "1.8rem" }}
                >
                  HabitBuddy
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="mx-4">
                  {/* Modal toggle */}
                  <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className="addbutton block bg-gray-900 text-white font-medium rounded-lg text-sm px-3 py-3 text-center"
                    type="button"
                    onClick={
                      location.pathname === "/tasks"
                        ? handleAddTask
                        : handleAddHabit
                    }
                    style={{
                      display:
                        location.pathname === "/" ||
                        location.pathname === "/tasks" ||
                        location.pathname === "/habits"
                          ? ""
                          : "none",
                    }}
                  >
                    <span className="material-symbols-outlined">add</span>
                    Add {location.pathname === "/tasks" ? "task" : "habit"}
                  </button>
                  {/* SECTION Main modal */}
                  <AddNoteModal />
                  <AddHabitModal/>
                  {/* <EditNoteModal /> */}
                </div>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    onClick={openUser}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={require("../../assets/man.png")}
                      alt="User_Image"
                    />
                  </button>
                </div>
                <div
                  className="z-50 fixed top-6 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                  style={{
                    marginLeft:
                      location.pathname === "/tasks" ||
                      location.pathname === "/habits"
                        ? "10px"
                        : "-80px",
                  }}
                  id="dropdownUser"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {name}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate"
                      role="none"
                    >
                      {email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>
                    {/* <li>
                  <a href=" " className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Scores</a>
                </li> */}
                    <li>
                      <span
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
