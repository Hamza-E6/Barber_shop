const mongoose = require('mongoose');

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  cutType: { type: String, required: true }, // Type of haircut
  email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
  date: { type: Date, required: true },
  status: { type: String, default: 'pending' }, 
});

// Export the model with a more suitable name
module.exports = mongoose.model('Appointment', appointmentSchema);
