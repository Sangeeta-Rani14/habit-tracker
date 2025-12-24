import React from 'react'

const Footer = () => {
      const colors = {
    darkBlue: "#16697a",
    mediumBlue: "#489fb5",
    lightBlue: "#82c0cc",
    offWhite: "#ede7e3",
    accentOrange: "#ffa62b",
  };
  return (
<>
    {/* Footer */}
      <div className="px-8 py-10 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto w-full border-t border-gray-200">
        <p className="text-sm font-medium mb-4 md:mb-0" style={{ color: colors.darkBlue }}>
          © {new Date().getFullYear()} Habit Tracker. All rights reserved.
        </p>
        
        {/* Social Icons Placeholder */}
        <div className="flex space-x-6">
          {['Twitter', 'Instagram', 'Facebook'].map((social) => (
            <a key={social} href="#" className="text-sm font-semibold transition-colors hover:opacity-70" 
               style={{ color: colors.mediumBlue }}>
              {social}
            </a>
          ))}
        </div>
      </div>
</>
  )
}

export default Footer