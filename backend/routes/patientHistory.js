const express = require('express');
const router = express.Router();
const PatientHistory = require('../models/patientHistory');

// Get all patient histories
router.get('/', async (req, res) => {
    try {
        const histories = await PatientHistory.find();
        res.json(histories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new patient history
router.post('/', async (req, res) => {
    try {
        const { patientName, disease, lastVisit, medicine } = req.body;

        if (!patientName || !disease || !lastVisit || !medicine) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newHistory = new PatientHistory({ patientName, disease, lastVisit, medicine });
        await newHistory.save();

        res.status(201).json({ message: "Patient history added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update patient history
router.put('/:id', async (req, res) => {
    try {
        const updatedHistory = await PatientHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete patient history
router.delete('/:id', async (req, res) => {
    try {
        await PatientHistory.findByIdAndDelete(req.params.id);
        res.json({ message: "History deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
