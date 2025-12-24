import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
      const colors = {
    darkBlue: "#16697a",
    mediumBlue: "#489fb5",
    lightBlue: "#82c0cc",
    offWhite: "#ede7e3",
    accentOrange: "#ffa62b",
  };
  return (
  <>
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold tracking-tighter" style={{ color: colors.darkBlue }}>
          HABIT TRACKER
        </h1>
        <div className="space-x-4">
          <Link to='/login' className="px-6 py-2 rounded-full font-medium transition-all hover:opacity-80" 
            style={{ backgroundColor: colors.lightBlue, color: 'white' }}>
            Login
          </Link>
          <Link to='/sign-up' className="px-6 py-2 rounded-full font-medium transition-all hover:opacity-80" 
            style={{ backgroundColor: colors.accentOrange, color: 'white' }}>
            Sign Up
          </Link>
        </div>
      </nav>
  </>
  )
}

export default Header