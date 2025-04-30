const mongoose = require("mongoose");

const PatientHistorySchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  disease: { type: String, required: true },
  lastVisit: { type: Date, required: true },
  medicine: { type: String, required: true }
});

module.exports = mongoose.model("PatientHistory", PatientHistorySchema);
