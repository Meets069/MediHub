const User = require('../models/user.model'); // Make sure this path matches your project
const bcrypt = require('bcrypt');

// Fetch user details by email
const getUserProfile = async (req, res) => {
    try {
        const userEmail = req.params.email; // Get email from request URL
        console.log("Fetching profile for:", userEmail);

        const user = await User.findOne({ email: userEmail }).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user); // Send user details to frontend
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userEmail = req.params.email; // Get email from request URL
        const { name, age, specialization } = req.body; // Get updated details

        console.log("Updating profile for:", userEmail, "Data:", req.body);

        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { name, age, specialization },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
router.get("/user/profile/:email", async (req, res) => {
    const email = req.params.email;
    console.log("Fetching user:", email); // Debug log
  
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json(user);
  });
  
  router.put("/user/profile/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const updatedData = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        updatedData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
module.exports = { register, getUserProfile, updateUserProfile };

const register = async (req, res) => {
    try {
        console.log("Received Register Request:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
