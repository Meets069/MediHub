const express = require('express');
const User = require('../models/User');

const router = express.Router();

// ✅ Get User Profile by Email
router.get('/profile/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// ✅ Update User Profile
router.put('/profile/:email', async (req, res) => {
    try {
        const { name, specialization, age, userType } = req.body;
        
        // Validate required fields
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (userType === 'Doctor' && !specialization) {
            return res.status(400).json({ message: 'Specialization is required for doctors' });
        }
        if (userType === 'Patient' && !age) {
            return res.status(400).json({ message: 'Age is required for patients' });
        }

        let updateData = { name };
        if (userType === 'Doctor') updateData.specialization = specialization;
        if (userType === 'Patient') updateData.age = age;

        const user = await User.findOneAndUpdate(
            { email: req.params.email },
            { $set: updateData },  
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router; // ✅ Ensure this is correctly exported as a function
