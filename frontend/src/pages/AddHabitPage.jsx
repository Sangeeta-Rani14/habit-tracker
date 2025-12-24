import React, { useState } from 'react';
import api from '../api/axios'
import { useNavigate } from 'react-router-dom';
const HabitForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    frequency: "Daily",
    color: "#489fb5",
  });
  const navigate =useNavigate()

  const colors = {
    darkBlue: "#16697a",
    mediumBlue: "#489fb5",
    lightBlue: "#82c0cc",
    offWhite: "#ede7e3",
    accentOrange: "#ffa62b",
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleColorSelect = (hex) => {
    setFormData((prev) => ({
      ...prev,
      color: hex,
    }));
  };

  
const handleCreateHabit = async (e) => {
  e.preventDefault();
  console.log(formData)
  const response = await  api.post('http://localhost:5000/api/habits', formData);
  if (response.status === 201 && response.data.success) {
        navigate("/dashboard");
      }
  console.log("Success!");
  console.log("Habit Created:", response.data);
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.offWhite }}>
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-10 relative overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-10 -mt-10" style={{ backgroundColor: colors.accentOrange }}></div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight" style={{ color: colors.darkBlue }}>
            CREATE NEW HABIT
          </h2>
          <p className="text-gray-500 font-medium">Small steps lead to big changes.</p>
        </div>

        <form className="space-y-6" onSubmit={handleCreateHabit}>
          {/* Habit Name */}
          <div>
            <label className="block text-xs uppercase font-black tracking-widest mb-2 ml-1" style={{ color: colors.mediumBlue }}>
              What is your habit?
            </label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. Read for 30 mins"
              className="w-full px-5 py-4 rounded-2xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-blue-200 focus:outline-none transition-all text-lg"
              style={{ color: colors.darkBlue }}
              required
            />
          </div>

          {/* Frequency Selector */}
          <div>
            <label className="block text-xs uppercase font-black tracking-widest mb-3 ml-1" style={{ color: colors.mediumBlue }}>
              Frequency
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Daily', 'Weekly', 'Custom'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${
                    formData.frequency === opt ? 'border-transparent shadow-md' : 'border-gray-100 text-gray-400'
                  }`}
                  style={{
                    backgroundColor: formData.frequency === opt ? colors.darkBlue : 'transparent',
                    color: formData.frequency === opt ? 'white' : colors.darkBlue,
                  }}
                  onClick={() => setFormData(prev => ({ ...prev, frequency: opt }))}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Color Tag Picker */}
          <div>
            <label className="block text-xs uppercase font-black tracking-widest mb-3 ml-1" style={{ color: colors.mediumBlue }}>
              Category Color
            </label>
            <div className="flex space-x-4">
              {[colors.mediumBlue, colors.accentOrange, "#ff6b6b", "#4ecdc4"].map((hex) => (
                <button 
                  key={hex}
                  type="button"
                  className={`w-10 h-10 rounded-full border-4 border-white shadow-sm hover:scale-110 transition-transform ${
                    formData.color === hex ? 'ring-2 ring-offset-2 ring-orange-400' : ''
                  }`}
                  style={{ backgroundColor: hex }}
                  onClick={() => handleColorSelect(hex)}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button 
              type="button"
              className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-colors"
              onClick={() => setFormData({ title: "", frequency: "Daily", color: colors.mediumBlue })}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 rounded-2xl font-bold text-white shadow-lg transform transition-transform hover:-translate-y-1 active:scale-95"
              style={{ backgroundColor: colors.accentOrange }}
            >
              Start Tracking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
