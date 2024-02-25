import React from "react";
import { useSelector } from "react-redux";
import "./dashboard.css";
import { calculateStreak } from "../../utils/calculateStreak";
import Chart from "./Chart";

const Dashboard = () => {
  const habits = useSelector((state) => state.habits.habits);
  const calculateDaysCompleted = (startDate, endDate, completedDays) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const { currentStreak, bestStreak } = calculateStreak(completedDays);
    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays = Math.round(Math.abs((start - end) / oneDay)) + 1;
    const totalDaysUptoToday =
      Math.round(Math.abs((new Date() - start) / oneDay)) + 1;
    const completed = completedDays.length;
    const failedDays = totalDaysUptoToday - completed;
    const habitScore = Math.round((completed / totalDays) * 100);
    return {
      totalDays,
      completed,
      failedDays,
      habitScore,
      currentStreak,
      bestStreak,
    };
  };

  return (
    <div>
      <h1 className="habitTitle">Habits Dashboard</h1>
      {habits.map((habit) => {
        const { id, startDate, endDate, completedDays, note } = habit;
        const { totalDays, completed, failedDays, habitScore } =
          calculateDaysCompleted(startDate, endDate, completedDays);
        return (
          <div
            key={id}
            className="mainHabitDashboard"
          >
            <div
              className={`HabitBox rounded bg-gray-50 dark:bg-gray-800 note-box ${habit.category}`}
            >
              <h3 className="habitName">{note}</h3>
              <p className="detailhabit">Total Days: {totalDays}</p>
              <p className="detailhabit">Days Completed: {completed || 0}</p>
              <p className="detailhabit">Days Failed: {failedDays || 0}</p>
              <p className="detailhabit">Habit Score: {habitScore || 0}%</p>
            </div>
            <Chart
              habitChartData={[
                { name: "completed", value: completed },
                { name: "failed", value: failedDays },
              ]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
