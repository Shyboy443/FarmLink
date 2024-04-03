const express = require('express');
const router = express.Router();


const Appointment = require('../Models/appointmentModel');

// Allow requests from all origins



// Create a new appointment
router.post('/add', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.send(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send();
        }
        res.send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update appointment by ID 
router.put('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'email', 'message', 'date', 'time'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!appointment) {
            return res.status(404).send();
        }

        res.send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete appointment by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment) {
            return res.status(404).send();
        }

        res.send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;