import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const colors = {
    darkBlue: "#16697a",
    mediumBlue: "#489fb5",
    lightBlue: "#82c0cc",
    offWhite: "#ede7e3",
    accentOrange: "#ffa62b",
  };
const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get('/habits');
        console.log(response)
        setHabits(response.data);
      } catch (error) {
        console.error("Failed to load habits", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (loading) return <p>Loading your habits...</p>;

const user = JSON.parse(localStorage.getItem("user"));


const handleDelete = async (habitId) => {
      
    if (!window.confirm("Are you sure you want to delete this habit?")) return;

    try {
        await api.delete(`/habits/${habitId}`);
        
        setHabits((prevHabits) => prevHabits.filter(h => h._id !== habitId));
        
        console.log("Deleted successfully");
    } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
        alert("Failed to delete habit");
    }
};
const handleToggle = async (habitId) => {
  
  try {
    
    const response = await api.patch(`/habits/${habitId}/toggle`);
    const updatedHabit = response.data;

    setHabits((prevHabits) =>
      prevHabits.map((h) => (h._id === habitId ? updatedHabit : h))
    );
  } catch (error) {
    console.error("Toggle failed:", error.message);
    alert("Could not update habit. Please try again.");
  }
};

const currentStreak = habits.length > 0 
  ? Math.max(...habits.map(h => h.currentStreak || 0)) 
  : 0;


const calculateCompletionRate = () => {
  if (habits.length === 0) return 0;
  
  const todayStr = new Date().toLocaleDateString('en-CA');
  
 
  const completedToday = habits.filter(habit => 
    (habit.completedDates || []).includes(todayStr)
  ).length;

  return Math.round((completedToday / habits.length) * 100);
};

const completionRate = calculateCompletionRate();

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ backgroundColor: colors.offWhite }}>
      
      {/* Header Area */}
      <header className="max-w-6xl mx-auto flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold uppercase tracking-tighter" style={{ color: colors.darkBlue }}>
           Welcome back, {user?.name}
          </h2>
          <p className="text-gray-500">You have {habits.length} habits tracked today.</p>
        </div>
        <Link
          to="/add-habit"
          className="px-6 py-3 rounded-xl font-bold text-white shadow-md hover:opacity-90 transition-all"
          style={{ backgroundColor: colors.darkBlue }}
        >
          + Add Habit
        </Link>
      </header>

      {/* Stats Summary */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4" style={{ borderColor: colors.accentOrange }}>
          <p className="text-sm text-gray-400 font-bold uppercase">Current Streak</p>
          <h3 className="text-4xl font-black" style={{ color: colors.darkBlue }}>{currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4" style={{ borderColor: colors.mediumBlue }}>
          <p className="text-sm text-gray-400 font-bold uppercase">Today's Completion Rate</p>
          <h3 className="text-4xl font-black" style={{ color: colors.darkBlue }}>{completionRate}%</h3>
        </div>
      </section>

      {/* Habits Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {habits.map((habit) => {
  const today = new Date().toLocaleDateString("en-CA");
  const isCompletedToday = (habit.completedDates || []).some(
    d => new Date(d).toLocaleDateString("en-CA") === today
  );

  return (
    <div
      key={habit._id}
      className="bg-white p-6 rounded-3xl shadow-md flex flex-col justify-between"
      
    >
      <div>
        <div className="flex justify-between items-start">
          <h4 className="text-xl font-bold" style={{ color: habit.color }}>
            {habit.title}
          </h4>
          <span
            className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ backgroundColor: colors.offWhite, color: colors.mediumBlue }}
          >
            🔥 {habit.currentStreak}
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => handleToggle(habit._id)}
          className={`flex-grow py-3 rounded-xl font-bold transition-all ${
            isCompletedToday ? "opacity-50" : "hover:scale-105"
          }`}
          style={{
            backgroundColor: isCompletedToday
              ? colors.lightBlue
              : colors.accentOrange,
            color: "white",
          }}
        >
          {isCompletedToday ? "Done for today" : "Mark Complete"}
        </button>

        <button
          onClick={() => handleDelete(habit._id)}
          className="ml-3 p-3 text-gray-300 hover:text-red-400 transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  );
})}
      </main>
    </div>
  );
};

export default Dashboard;
