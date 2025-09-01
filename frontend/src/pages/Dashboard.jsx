import React, { useState } from "react";
import hero from "../../../assets/hero.png";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../context/UserContext";

const Dashboard = () => {
  const { user, loading, handleLogout } = User();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-inter text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl sm:text-3xl font-bold text-blue-600">
            Skill Swap
          </div>
          <ul className="hidden sm:flex gap-6 text-lg font-medium text-gray-700">
            <li>
              <Link
                to="/explore"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/requests"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Requests
              </Link>
            </li>
            <li className="relative">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {user.username} ▾
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-50">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between flex-grow max-w-7xl mx-auto w-full px-6 py-16 lg:py-24">
        <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Swap Skills with <span className="text-blue-600">Peers</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-8 text-gray-600 max-w-xl mx-auto lg:mx-0">
            Learn new things by exchanging your skills with others. Share what
            you know, and discover what you don’t.
          </p>
          <button
            onClick={() => navigate(user ? "/explore" : "/login")}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Get Started
          </button>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={hero}
            alt="Skill Swap Illustration"
            className="w-full max-w-md h-auto rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6 text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Skill Swap. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
