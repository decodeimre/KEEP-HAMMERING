import {abs, back, biceps, shoulders, triceps, legs, chest} from './exercises.js';
import { Exercise } from '../Models/ExerciseModel.js';
import mongoose from 'mongoose'



const URL = "mongodb+srv://decodeimre:N85qF3viKztGOsPU@cluster0.839zvwc.mongodb.net/KeepHammering";

mongoose.connect(URL);
  mongoose.connection.on("connected", () => console.log("connected to MongoDB"));
  

async function seedDatabase () {

    
    try {
        await Exercise.deleteMany();
        console.log('database cleared');

      

     
        const absExercises = await Exercise.insertMany(abs) ;
        const backExercises =  await Exercise.insertMany(back);
        const bicepsExercises = await Exercise.insertMany(biceps);
        const shouldersExercises = await Exercise.insertMany(shoulders);
        const tricepsExercises = await Exercise.insertMany(triceps);
        const chestExercises = await Exercise.insertMany(chest);
        const legsExercises = await Exercise.insertMany(legs)
        
 
        console.log(absExercises, backExercises, bicepsExercises, shouldersExercises, tricepsExercises, chestExercises, legsExercises)
      
        mongoose.connection.close();        
    }catch(err) {
        console.log(err.message);
        mongoose.connection.close();
    }
    


}

seedDatabase();