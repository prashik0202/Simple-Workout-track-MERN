const express = require('express');
const router = express.Router();
const Workout = require('../model/workoutModel');
const { createWorkout,
    getAllWorkout, 
    getWorkout, 
    deleteWorkout, 
    updateWorkout } = require('../controllers/workoutController');

// GET all workouts:
router.get('/',getAllWorkout);
// GET single workout:
router.get('/:id',getWorkout);
//POST Workout:
router.post('/',createWorkout);
// DELETE workout:
router.delete('/:id',deleteWorkout)
// Update Workout:
router.patch('/:id',updateWorkout)

module.exports = router;