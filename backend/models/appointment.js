const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    specialization: { type: String, required: true },
    name: { type: String, required: true }, // Patient name
    email: { type: String, required: true }, // Patient email
    description: { type: String }, // Appointment description
    date: { type: String },
    time: { type: String },
    status: { type: String, default: "Pending" }, // Added status column
    // approval: { type: Boolean, default: false } // Added approval column
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
