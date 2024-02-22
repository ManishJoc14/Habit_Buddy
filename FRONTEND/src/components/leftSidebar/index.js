import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./leftsidebar.css"
import { useSelector } from 'react-redux';

const LeftSideBar = () => {
  const location = useLocation();
  const notes = useSelector((state) => state.notes.notes);
  const habits = useSelector((state) => state.habits.habits);
  return (
    <>
    <aside
    id="logo-sidebar"
    className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div className="h-full px-3 pb-4 overflow-y-auto">
      <ul className="space-y-2 font-medium">

      {/* REVIEW /today */}
        {/* <li>
        <Link to='/today'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/today'? 'activelink' : ''} ${location.pathname === '/'? 'activelink' : ''} `}>event</span>
            <span className="ms-3">Today</span>
          </span>
          </Link>
        </li> */}
            
      {/* REVIEW /tasks */}
         <li>
        <Link to='/tasks'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/tasks' ? 'activelink' : ''} ${location.pathname === '/'? 'activelink' : ''}`}>task_alt</span>
            <span className="flex-1 ms-3 whitespace-nowrap">Tasks </span>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {notes.length}
            </span>
          </span>
          </Link>
        </li>
        
      {/* REVIEW /habits */}
        <li>
        <Link to='/habits'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/habits' ? 'activelink' : ''}`}>self_improvement</span>
            <span className="flex-1 ms-3 whitespace-nowrap">Habits</span>
            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
              {habits.length}
            </span>
          </span>
          </Link>
        </li>

      {/* REVIEW /categories */}
        {/* <li>
        <Link to='/categories'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/categories' ? 'activelink' : ''}`}>category</span>
            <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
          </span>
          </Link>
        </li> */}

      {/* REVIEW /dashboard */}
        <li>
        <Link to='/dashboard'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/dashboard' ? 'activelink' : ''}`}>dashboard</span>
            <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
          </span>
          </Link>
        </li>

      {/* REVIEW /timer */}
        <li>
        <Link to='/timer'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/timer' ? 'activelink' : ''}`}>timer</span>
            <span className="flex-1 ms-3 whitespace-nowrap">Timer</span>
          </span>
          </Link>
        </li>

      {/* REVIEW /settings */}
        <li>
        <Link to='/settings'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/settings' ? 'activelink' : ''}`}> settings </span>
            <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
          </span>
          </Link>
        </li>

      {/* REVIEW /contact */}
        <li>
        <Link to='/contact'>
          <span
            className="flex items-center p-2 text-gray-900 rounded-lg group sidebarlink"
          >
            <span className={`material-symbols-outlined sidebarlink-icon ${location.pathname === '/contact' ? 'activelink' : ''}`}>mail</span>
            <span className="flex-1 ms-3 whitespace-nowrap">Contact us</span>
          </span>
          </Link>
        </li>

      </ul>
    </div>
    </aside>
    </>
  )
}

export default LeftSideBar
