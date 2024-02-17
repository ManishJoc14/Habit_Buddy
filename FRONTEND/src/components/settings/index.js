import React, { useState } from "react";
import styles from "./Settings.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeDetailsAsync } from "../../redux/userThunk";
import { toast } from "react-toastify";

const Settings = () => {
  const { name, email, password } = useSelector(
    (state) => state.userDetails.userDetails
  );
  const handleEdit = () => {
    const modal = document.getElementById("authentication-modal");
    modal.classList.remove("hidden");
  };
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.userImg}>
          <img src={require("../../assets/man.png")} alt="user" />
        </div>
        <div className={styles.userDetails}>
          <div className={styles.label}>
            <p>Name :</p>
            <p>Email :</p>
            <p>Password :</p>
          </div>
          <div className={styles.detail}>
            <p>{name}</p>
            <p>{email}</p>
            <p>{password}</p>
          </div>
        </div>

       <button className={styles.editBtn} onClick={handleEdit}>
       <span
            className="material-symbols-outlined"
          >
            edit
          </span>
          Change Details
       </button>
      </div>
      <AuthModal />
    </div>
  );
};

export default Settings;

const AuthModal = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails.userDetails);
  const [newDetils, setNewDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewDetails((prev) => ({ ...prev, [name]: value }));
  };
  const closeModal = () => {
    const modal = document.getElementById("authentication-modal");
    modal.classList.add("hidden");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = newDetils;

    if (name && email && password) {
      dispatch(changeDetailsAsync([userDetails, newDetils]));
      toast.success("Details Changed !!");
      const elem = document.getElementById("authentication-modal");
      elem.classList.add("hidden");
      localStorage.setItem("userCredentials", JSON.stringify({ ...newDetils }));
    } else {
      toast.error("Incomplete details !!");
    }
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className=" hidden overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        style={{ marginLeft: "auto" }}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change details
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newDetils.name}
                    onChange={handleChange}
                    placeholder="New Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={newDetils.email}
                    onChange={handleChange}
                    placeholder="New email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={newDetils.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
