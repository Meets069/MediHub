// // const express = require('express');
// // const Appointment = require('../models/appointment');
// // const router = express.Router();

// // // Create Appointment
// // router.post('/', async (req, res) => {
// //     try {
// //         const { doctorName, specialization, date, time } = req.body;
// //         const newAppointment = new Appointment({
// //             doctorName,
// //             specialization,
// //             date,
// //             time
// //         });
// //         await newAppointment.save();
// //         res.status(201).json(newAppointment);
// //     } catch (error) {
// //         res.status(400).json({ error: error.message });
// //     }
// // });


// // // Get All Appointments
// // router.get('/', async (req, res) => {
// //     try {
// //         const appointments = await Appointment.find();
// //         res.json(appointments);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // // Update Appointment
// // router.put('/:id', async (req, res) => {
// //     try {
// //         const updatedAppointment = await Appointment.findByIdAndUpdate(
// //             req.params.id,
// //             req.body,
// //             { new: true }
// //         );
// //         res.json(updatedAppointment);
// //     } catch (error) {
// //         res.status(400).json({ error: error.message });
// //     }
// // });

// // // Delete Appointment
// // router.delete('/:id', async (req, res) => {
// //     try {
// //         await Appointment.findByIdAndDelete(req.params.id);
// //         res.json({ message: 'Appointment deleted successfully' });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

// // module.exports = router;

// const express = require('express');
// const Appointment = require('../models/appointment');
// const router = express.Router();

// // Create Appointment
// router.post('/', async (req, res) => {
//     try {
//         const { doctorName, specialization, name, email, description, date, time } = req.body;

//         const newAppointment = new Appointment({
//             doctorName,
//             specialization,
//             name, // Patient name
//             email, // Patient email
//             description, // Appointment description
//             date,
//             time
//         });

//         await newAppointment.save();
//         res.status(201).json(newAppointment);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Get All Appointments
// router.get('/', async (req, res) => {
//     try {
//         const appointments = await Appointment.find();
//         res.json(appointments);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update Appointment
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedAppointment = await Appointment.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.json(updatedAppointment);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Delete Appointment
// router.delete('/:id', async (req, res) => {
//     try {
//         await Appointment.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Appointment deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update appointment status
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedAppointment = await Appointment.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );
//         res.json(updatedAppointment);
//     } catch (error) {
//         res.status(500).json({ error: 'Error updating appointment status' });
//     }
// });

// module.exports = router;

const mongoose = require('mongoose');
const express = require('express');
const Appointment = require('../models/appointment');
const router = express.Router();

// Create Appointment
router.post('/', async (req, res) => {
    try {
        const { doctorName, specialization, name, email, description, date, time } = req.body;

        const newAppointment = new Appointment({
            doctorName,
            specialization,
            name, // Patient name
            email, // Patient email
            description, // Appointment description
            date,
            time,
            status: 'Pending' // ✅ Always set initial status as 'Pending'
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {


        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Appointment not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid update data', error: err.message });
  }
});
//         const appointmentId = req.params.id;
//         const { status } = req.body; // Get status from request body

//         console.log("Updating appointment ID:", appointmentId, "to status:", status); // ✅ Log for debugging

//         if (!status || (status !== "Approved" && status !== "Rejected")) {
//             return res.status(400).json({ message: "Invalid status update" });
//         }

//         const appointment = await Appointment.findById(appointmentId);
//         if (!appointment) {
//             return res.status(404).json({ message: "Appointment not found" });
//         }

//         // ✅ Update status dynamically
//         appointment.status = status;
//         await appointment.save();

//         res.json({ message: `Appointment ${status.toLowerCase()}`, appointment });
//     } catch (error) {
//         console.error("Error updating appointment:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });


// Update only appointment status
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid appointment ID' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json(updatedAppointment);
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete Appointment
router.delete('/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Separate Route to Update Only the Status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment status' });
    }
});

module.exports = router;

