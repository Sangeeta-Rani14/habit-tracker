import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange= (e)=>{
    const { name, value } = e.target;
   setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const submit=async (e)=>{
       e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      
        if (res.status === 200 && res.data.success) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
      console.log(res.data);
      
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }

  const colors = {
    darkBlue: "#16697a",
    mediumBlue: "#489fb5",
    lightBlue: "#82c0cc",
    offWhite: "#ede7e3",
    accentOrange: "#ffa62b",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: colors.offWhite }}>
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tighter" style={{ color: colors.darkBlue }}>
            HABIT TRACKER
          </h1>
          <p className="text-gray-500 mt-2">Start your journey to a better you.</p>
        </div>

        <form className="flex flex-col space-y-5" onSubmit={submit}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold mb-1 ml-1" style={{ color: colors.darkBlue }}>Full Name</label>
            <input 
              type="text" 
              name='name'
              value={formData.name}
              onChange={onChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
              style={{ focusRing: colors.mediumBlue }}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold mb-1 ml-1" style={{ color: colors.darkBlue }}>Email Address</label>
            <input 
              type="email" 
              name='email'
              value={formData.email}
              onChange={onChange}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold mb-1 ml-1" style={{ color: colors.darkBlue }}>Password</label>
            <input 
              type="password" 
              name='password'
              value={formData.password}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: colors.accentOrange }}
          >
            Create Account
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? 
          <Link to='/login' className="ml-1 font-bold cursor-pointer hover:underline" style={{ color: colors.mediumBlue }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;