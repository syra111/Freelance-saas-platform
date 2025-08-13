import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p>© {new Date().getFullYear()} Freelance SaaS. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/jobs" className="hover:underline">Browse Jobs</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
