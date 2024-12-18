import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading , setLoading] = useState(true) ; 
  const navigate = useNavigate();


  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (token) {
        try {
          // Send a request to the backend to verify the token
          const response = await axios.post(
            'http://localhost:5000/api/barber/checkloggin',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in the headers
              },
            }
          );

          if (response.status === 200) {
            // User is logged in, redirect to the dashboard
            navigate('/dashboard');
          } else {
            // Invalid token, clear the token and stay on the current page
            localStorage.removeItem('token');
          }
        } catch (error) {
          localStorage.removeItem('token'); // Clear the token on error
        }
      }

      setLoading(false); // Set loading to false after checking
    };

    checkLoggedIn();
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {
      try {
        // Send POST request to the backend
        const response = await axios.post('http://localhost:5000/api/barber/login', {
          email: username, // Backend expects 'email' for the username
          password: password,
        });

        // If login is successful, save the token and navigate to the dashboard
        if (response.status === 200) {
          const { token } = response.data; // Assuming the backend returns a token
          localStorage.setItem('token', token); // Save token to localStorage
          navigate('/dashboard'); // Redirect to the dashboard
        }
      } catch (error) {
        console.error('Login error:', error);
        // Display an error message based on the response
        if (error.response) {
          alert(error.response.data.message || 'Login failed. Please try again.');
        } else {
          alert('An error occurred. Please check your connection and try again.');
        }
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return loading ? (<>Loading ...</>) : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Barber Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

