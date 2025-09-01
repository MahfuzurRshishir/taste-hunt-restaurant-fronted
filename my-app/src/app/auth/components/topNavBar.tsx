"use client";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-2 bg-white/90 ">
      {/* Restaurant Name at top-left */}
      <div className="text-2xl font-bold text-purple-700 tracking-wide">
        Taste Hunt Restaurant
      </div>
      {/* Navigation Links at top-right */}
      <div className="flex gap-4">
        <a href="/" className="btn btn-ghost rounded-full">Home</a>
        <a href="/auth/login" className="btn btn-outline rounded-full">Login</a>
        <a href="/auth/register" className="btn btn-primary rounded-full">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;