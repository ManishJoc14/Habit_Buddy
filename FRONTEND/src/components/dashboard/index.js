import React from "react";
import { useSelector } from "react-redux";
import "./dashboard.css";
import { calculateStreak } from "../../utils/calculateStreak";

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
      {habits.map((habit) => {
        const { id, startDate, endDate, completedDays, note } = habit;
        const { totalDays, completed, failedDays, habitScore } =
          calculateDaysCompleted(startDate, endDate, completedDays);
        return (
          <div key={id} className="mainHabitDashboard">
            <div className="HabitBox">
              <h3>{note}</h3>
              <p>Total Days: {totalDays}</p>
              <p>Days Completed: {completed || 0}</p>
              <p>Days Failed: {failedDays || 0}</p>
              <p>Habit Score: {habitScore || 0}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
