const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

// Create a new feedback entry
router.post("/add", async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const newFeedback = new Feedback({rating, comment });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
