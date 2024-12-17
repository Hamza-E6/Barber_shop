const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Adjust path as necessary

// Route to create an appointment
router.post('/createAppointment', async (req, res) => {
    try {
        // Extract data from the request body
        const { firstname, lastname, cutType, email, date } = req.body;

        // Validate required fields
        if (!firstname || !lastname || !cutType || !email || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new appointment
        const newAppointment = new Appointment({
            firstname,
            lastname,
            cutType,
            email,
            date: new Date(date), // Convert date to ISO format
        });

        // Save the appointment to the database
        await newAppointment.save();

        // Respond with success message
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
