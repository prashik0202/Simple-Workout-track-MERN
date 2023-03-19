const Workout = require('../model/workoutModel');
const mogoose = require('mongoose');
const { default: mongoose } = require('mongoose');


// function to get all workout:
const getAllWorkout = async(req,res) => {
    const user_id = req.user._id;
    const workouts = await Workout.find({user_id}).sort({createdAt : -1});
    res.status(200).json(workouts);
}

// function to get paticular workout:
const getWorkout = async(req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : 'Unable to find workout'})
    }
    const workout = await Workout.findById(id);
    if(!workout){
        return res.status(404).json({error : 'Unable to find workout'});
    }
    res.status(200).json(workout);
}

// function to create a workout:
const createWorkout = async(req,res) => {
    const { title , reps , load } = req.body;

    let emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error : "Please Enter missing details",emptyFields});
    }
    try{
        const user_id = req.user._id;
        const workout = await Workout.create({ title , reps , load , user_id});
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error : error.message});
    }
}
//function to delete a workout:
const deleteWorkout = async(req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : 'Unable to find workout'})
    }
    const workout = await Workout.findByIdAndDelete({ _id : id});
    if(!workout){
        return res.status(404).json({error : 'Unable to find workout'});
    }
    res.status(200).json(workout);
}
//function to update a workout:
const updateWorkout = async(req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error : 'Unable to find workout'})
    }
    const workout = await Workout.findByIdAndUpdate({ _id : id} , {
        ...req.body
    })
    if(! workout){
        return res.status(404).json({error : 'Unable to find workout'});
    }
    res.status(200).json(workout);
}

module.exports = {
    createWorkout,
    getAllWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
}