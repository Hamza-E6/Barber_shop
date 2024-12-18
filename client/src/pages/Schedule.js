import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

export default function Schedule() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [cutType, setCutType] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstname && lastname && cutType && email && dateTime) {
      setLoading(true); // Set loading state while the request is being processed

      try {
        // Send the data to the backend
        const response = await axios.post('http://localhost:5000/api/user/createAppointment', {
          firstname,
          lastname,
          cutType,
          email,
          date: dateTime, // Send the full date and time
        });

        // Handle success
        if (response.status === 201) {
          alert('Appointment scheduled successfully!');
          setFirstname('');
          setLastname('');
          setEmail('');
          setCutType('');
          setDateTime('');
        }
      } catch (error) {
        console.error('Error scheduling appointment:', error);
        alert('An error occurred while scheduling your appointment.');
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Schedule an Appointment</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cutType" className="block text-gray-700 font-bold mb-2">
              Cut Type
            </label>
            <select
              id="cutType"
              value={cutType}
              onChange={(e) => setCutType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a cut type</option>
              <option value="Buzz Cut">Buzz Cut</option>
              <option value="Crew Cut">Crew Cut</option>
              <option value="Fade">Fade</option>
              <option value="Pompadour">Pompadour</option>
              <option value="Undercut">Undercut</option>
              <option value="Caesar Cut">Caesar Cut</option>
              <option value="Ivy League">Ivy League</option>
              <option value="Quiff">Quiff</option>
              <option value="Mullet">Mullet</option>
              <option value="Taper">Taper</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="dateTime" className="block text-gray-700 font-bold mb-2">
              Date & Time
            </label>
            <input
              type="datetime-local"
              id="dateTime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Scheduling...' : 'Schedule Appointment'}
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
