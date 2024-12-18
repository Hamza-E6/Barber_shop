import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Barber
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link to="/schedule" className="hover:text-gray-300 transition duration-300">
            Schedule an Appointment
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-300">
            About
          </Link>
        </nav>
        <Link
          to="/login"
          className="hidden md:inline-block bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Dashboard
        </Link>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center py-4 space-y-4">
            <Link to="/" className="hover:text-gray-300 transition duration-300">
              Home
            </Link>
            <Link to="/schedule" className="hover:text-gray-300 transition duration-300">
              Schedule an Appointment
            </Link>
            <Link to="/about" className="hover:text-gray-300 transition duration-300">
              About
            </Link>
            <Link
              to="/login"
              className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

