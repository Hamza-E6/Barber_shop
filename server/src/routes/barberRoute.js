const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // Adjust path as necessary
const checkAuthBarber = require("../middlewares/auth")
const jwt = require('jsonwebtoken');
// Route to get all appointments
router.get('/', checkAuthBarber , async (req, res) => {
    try {
        // Fetch all appointments from the database
        const appointments = await Appointment.find();

        // Respond with the list of appointments
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/updateStatus', checkAuthBarber , async (req, res) => {
    try {
        const { id, status } = req.body;
        const appointment = await Appointment.findById(id);
        appointment.status = status;
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Compare provided credentials with environment variables
        if (
            email !== process.env.BARBER_EMAIL ||
            password !== process.env.BARBER_PASSWORD
        ) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '2h' } // Token expiration
        );

        // Return the token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;

