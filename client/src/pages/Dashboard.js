import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

// Helper function to format date into a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      weekday: "short", // Weekday (Mon, Tue, etc.)
      year: "numeric",
      month: "short", // Month (Jan, Feb, etc.)
      day: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  ); // Time (HH:MM AM/PM)
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (token) {
        try {
          // Send a request to the backend to verify the token
          const response = await axios.post(
            "http://localhost:5000/api/barber/checkloggin",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include token in the headers
              },
            }
          );

          if (response.status !== 200) {
            localStorage.removeItem("token"); // Clear the token on error
            navigate("/login");
          }
        } catch (error) {
          localStorage.removeItem("token"); // Clear the token on error
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
      setIsLoading(false);
    };

    checkLoggedIn();
  }, [navigate]);

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch appointments from the back-end using axios
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/barber", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        });
        setAppointments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  // Update the status of an appointment using axios
  const updateStatus = async (id, status) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/barber/updateStatus",
        { id, status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      const updatedAppointment = response.data;
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id
            ? updatedAppointment
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to determine row color based on appointment status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-pink-300"; // Pink-Orange
      case "valid":
        return "bg-green-300"; // Green
      case "not_valid":
        return "bg-red-300"; // Red
      default:
        return "bg-white";
    }
  };

  return isLoading ? (
    <>Loading ...</>
  ) : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Cut</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className={getStatusColor(appointment.status)}
                >
                  <td className="py-3 px-4">{`${appointment.firstname} ${appointment.lastname}`}</td>
                  <td className="py-3 px-4">{formatDate(appointment.date)}</td>
                  <td className="py-3 px-4">
                    {new Date(appointment.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4">{appointment.status}</td>
                  <td className="py-3 px-4">{appointment.cutType}</td>
                  <td className="py-3 px-4">
                    {appointment.status === "pending" && (
                      <div>
                        <button
                          onClick={() => updateStatus(appointment._id, "valid")}
                          className="bg-green-500 text-white py-1 px-4 rounded mr-2"
                        >
                          Validate
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(appointment._id, "not_valid")
                          }
                          className="bg-red-500 text-white py-1 px-4 rounded"
                        >
                          Refuse
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Barber Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
