import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800  px-4 py-4 fixed w-full z-50">
      <Link to="/">
        <h2 className="text-2xl font-bold text-white text-center">To Do App</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
