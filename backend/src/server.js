import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import { Exercise } from './models/ExerciseModel.js';

const server = express();
server.use(express.json());
const PORT = process.env.PORT || 3000;

//environment variable does not work
const URL = process.env.DB_URL
console.log(URL)

mongoose.connect('mongodb+srv://decodeimre:N85qF3viKztGOsPU@cluster0.839zvwc.mongodb.net/KeepHammering');
mongoose.connection.on('connected', () => console.log("connected to MongoDB"));
mongoose.connection.on('error', (err) => console.log(err.message));

server.get('workoutLog/targetMuscleList/abs', (req, res, next) => {
    try {
        const absExercises = Exercise.find({targetMuscle: "Abs"});
        res.status(200).json(absExercises)

    }catch (err) {
        res.send(err.message)
    }
})


server.listen(PORT, ()=> console.log('server listening to port', PORT))