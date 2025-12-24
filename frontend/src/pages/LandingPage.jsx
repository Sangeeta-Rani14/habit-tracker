import React from 'react';

const LandingPage = () => {
  // Your Color Palette
  const colors = {
    darkBlue: "#16697a",
    mediumBlue: "#489fb5",
    lightBlue: "#82c0cc",
    offWhite: "#ede7e3",
    accentOrange: "#ffa62b",
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: colors.offWhite }}>
    


      {/* Hero Section / Middle Lines */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 relative overflow-hidden">
        
        {/* Aesthetic Lines Container */}
        <div className="w-full max-w-4xl space-y-4 mb-12 opacity-80">
          <div className="h-1 w-3/4 rounded-full" style={{ backgroundColor: colors.darkBlue }}></div>
          <div className="h-1 w-full rounded-full" style={{ backgroundColor: colors.mediumBlue }}></div>
          <div className="h-1 w-1/2 rounded-full" style={{ backgroundColor: colors.lightBlue }}></div>
          <div className="h-1 w-2/3 rounded-full" style={{ backgroundColor: colors.mediumBlue }}></div>
        </div>

        {/* Heading */}
        <div className="text-center z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight uppercase" 
              style={{ color: colors.darkBlue }}>
            Build Better Habits.<br />
            <span className="opacity-90">Transform Your Life.</span>
          </h2>
        </div>
      </main>

     
    </div>
  );
};

export default LandingPage;