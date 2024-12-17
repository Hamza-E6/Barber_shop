const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const barberRoute = require('./routes/barberRoute');

const app = express();

// Connect to MongoDB


app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Define routes
app.use('/api/user', userRoute);
app.use('/api/barber' ,barberRoute);


module.exports = app;