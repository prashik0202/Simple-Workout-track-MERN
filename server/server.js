const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//middleware:
app.use(express.json());

// app.use((req,res,next) => {
//     console.log(req.path,req.method);
//     next();
// })

app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

// Connecting to DataBase:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const port = process.env.PORT;
        app.listen(port,() => {
            console.log('Connected to DataBase');
            console.log(`Server is started on : http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })

