const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');  // ✅ Un-commented this line
const appointmentRoutes = require('./routes/appointment');
const patientHistory = require('./routes/patientHistory');
const feedbackRoutes = require('./routes/feedbackRoutes');
const userRoutes = require('./routes/userRoutes');

console.log('authRoutes:', authRoutes);
console.log('appointmentRoutes:', appointmentRoutes);
console.log('patientHistory:', patientHistory);
console.log('feedbackRoutes:', feedbackRoutes);
console.log('userRoutes:', userRoutes);

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: "http://localhost:4200", methods: ["GET", "POST", "PUT"] }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/patient-history', patientHistory);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
