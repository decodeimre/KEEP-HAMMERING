import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { exerciseRouter } from "./routes/exercisesRoute.js";



const server = express();
server.use(express.json());
server.use(cors())
const PORT = process.env.PORT || 3000;

//environment variable does not work
const URL = process.env.DB_URL
console.log(URL)

mongoose.connect('mongodb+srv://decodeimre:N85qF3viKztGOsPU@cluster0.839zvwc.mongodb.net/KeepHammering');
mongoose.connection.on('connected', () => console.log("connected to MongoDB"));
mongoose.connection.on('error', (err) => console.log(err.message));

server.use('/workoutLog', exerciseRouter)


server.listen(PORT, ()=> console.log('server listening to port', PORT))