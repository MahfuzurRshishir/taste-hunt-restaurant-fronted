"use client";
import React, { useEffect } from "react";



const Home: React.FC = () => {
  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/rolecheck';
    } else {
      window.location.href = '/auth/login';
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Live animated background using SVG waves */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,197.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,197.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,165.3C672,171,768,181,864,165.3C960,149,1056,107,1152,101.3C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,197.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Main content box */}
      <div className="relative bg-white/80 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-lg w-full mx-4">
        {/* Greetings */}
        <p className="text-lg md:text-xl text-gray-700 font-medium text-center mb-2">
          👋 Welcome, To Our Restaurant!
        </p>
        {/* Restaurant Name */}
        <h1 className="mb-8 text-4xl md:text-5xl font-extrabold text-center text-purple-700 drop-shadow-lg tracking-wide">
          Taste Hunt Restaurant
        </h1>
        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-6 mt-4 w-full justify-center">
          <a href="/auth/register" className="btn btn-primary btn-lg px-8 shadow-md w-full md:w-auto">
            Register
          </a>
          <a href="/auth/login" onClick={handleLoginClick} className="btn btn-outline btn-lg px-8 shadow-md w-full md:w-auto">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;