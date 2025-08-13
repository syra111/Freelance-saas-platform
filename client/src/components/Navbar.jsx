import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-5 bg-white shadow-md fixed w-full top-0 z-10">
      <h1 className="text-2xl font-bold text-green-600">Freelance SaaS</h1>

      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/jobs" className="hover:text-green-600">Browse Jobs</Link>

        {user ? (
          <>
            <span className=" text-green-600 font-semibold">Hello, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-600">Login</Link>
            <Link
              to="/signup"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-green-600 text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Browse Jobs</Link>

          {user ? (
            <>
              <span className="text-gray-700 font-semibold">Hello, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
