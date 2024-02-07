import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNoteAsync } from "../../redux/thunk";
import { v4 as uuidv4 } from 'uuid';

const AddNoteModal = () => {
  const dispatch = useDispatch();
  const [noteData, setNoteData] = useState({
    id : uuidv4(),
    note: "",
    category: "",
    startDate: "",
    endDate: "",
    description: "",
    priority: 1,
    done : false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const {id, note, category, startDate, endDate, description, priority, done} = noteData;
      if(id && note && category && startDate && endDate && description && priority && !done){
        dispatch(addNoteAsync({ ...noteData }));
        setNoteData({
          id : uuidv4(),
          note: "",
          category: "",
          startDate: "",
          endDate: "",
          description: "",
          priority: 1,
          done : false
        });
      }else{
        alert("Incomplete");
      }
    } catch (error) {
      // Handle the error, you can log it or show a user-friendly message
      console.error("Error adding note:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(noteData);
  return (
    <>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden cursor-pointer overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* REVIEW[epic=AddModal] Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            {/* REVIEW Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add new task
              </h3>

              {/* REVIEW Add Button */}
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
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

            {/* REVIEW form  Modal body*/}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="note"
                    id="name"
                    onChange={handleChange}
                    value={noteData.note}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Task name"
                    required=""
                  />
                </div>

                {/* REVIEW Date */}
                <div className="col-span-2">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <div date-rangepicker="" className="grid-cols-2">
                    {/* REVIEW startDate */}
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none cursor-pointer">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        name="startDate"
                        type="datetime-local"
                        onChange={handleChange}
                        value={noteData.startDate}
                        required
                        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    {/* REVIEW endDate */}
                    <div className="relative">
                      <div className="absolute cursor-pointer inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        name="endDate"
                        type="datetime-local"
                        onChange={handleChange}
                        value={noteData.endDate}
                        required
                        className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* REVIEW priority */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="priority"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Priority
                  </label>
                  <input
                    type="number"
                    name="priority"
                    id="priority"
                    onChange={handleChange}
                    value={noteData.priority}
                    min={1}
                    className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder={1}
                    required
                  />
                </div>

                {/* REVIEW category */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={noteData.category}
                    required
                    className="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option className="cursor-pointer">Select category</option>
                    <option className="cursor-pointer"value="Health">Health</option>
                    <option className="cursor-pointer"value="Study">Study</option>
                    <option className="cursor-pointer"value="Exercise">Exercise</option>
                    <option className="cursor-pointer"value="Entertainmaint">Entertainmaint</option>
                    <option className="cursor-pointer"value="Sleep">Sleep</option>
                  </select>
                </div>

                {/* REVIEW description */}
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="block  p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Task description here"
                    name="description"
                    onChange={handleChange}
                    required
                    value={noteData.description}
                  />
                </div>
              </div>

              {/* REVIEW Submit button */}
              <button
                type="submit"
                onClick={handleSubmit}
                data-modal-toggle="crud-modal"
                className="text-white inline-flex cursor-pointer items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Task
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default AddNoteModal;
