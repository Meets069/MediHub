const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set in environment variables.");
    process.exit(1);
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType, specialization, age } = req.body;

        if (!name || !email || !password || !userType) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
            specialization: userType === 'Doctor' ? specialization : undefined,
            age: userType === 'Patient' ? age : undefined
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user._id, userType: user.userType });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const otpStore = new Map(); // Store OTPs temporarily

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shah.meet0609@gmail.com',
        pass: 'yirqtzxtbdkwtgnu'
    }
});

// **1. Send OTP**
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
    otpStore.set(email, { otp, expiresAt: Date.now() + 300000 }); // OTP valid for 5 minutes

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email' });
});

// **2. Validate OTP**
router.post('/validate-otp', (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);

    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
        return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    if (storedOtp.otp !== parseInt(otp)) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.status(200).json({ message: 'OTP validated' });
});

// **3. Reset Password**
router.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;

    if (!otpStore.has(email)) {
        return res.status(400).json({ message: 'OTP validation required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    otpStore.delete(email);
    res.status(200).json({ message: 'Password reset successful' });
});



// let otpStore = {};

// // Send OTP
// router.post('/send-otp', async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore[email] = otp;

//     // Send email
//     const transporter = nodemailer.createTransport({ /* SMTP Config */ });
//     await transporter.sendMail({
//         to: email,
//         subject: 'Password Reset OTP',
//         text: `Your OTP is ${otp}`
//     });

//     res.json({ message: 'OTP sent successfully' });
// });

// // Verify OTP
// router.post('/verify-otp', (req, res) => {
//     const { email, otp } = req.body;
//     if (otpStore[email] === otp) {
//         res.json({ message: 'OTP verified' });
//     } else {
//         res.status(400).json({ message: 'Invalid OTP' });
//     }
// });

// // Reset Password
// router.post('/reset-password', async (req, res) => {
//     const { email, newPassword } = req.body;
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     await User.updateOne({ email }, { password: hashedPassword });
//     delete otpStore[email];
//     res.json({ message: 'Password updated successfully' });
// });

module.exports = router;