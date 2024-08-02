import { WorkoutSet } from "../models/WorkoutSetModel.js";
import { Router } from "express";

export const workoutSetRouter = Router();

workoutSetRouter.post(`/exercise-log/save`, async (req, res, next) => {
  try {
    const newWorkoutSet = req.body;
    const newSet = await WorkoutSet.create(newWorkoutSet);
    console.log(newSet)
    res.status(200).json(newSet);
  } catch (err) {
    res.send(err.message);
    next(err);
  }
});

workoutSetRouter.get('/', async (req,res,next) => {
  console.log('workoutSets GET is working')
  try {
    const searchedDate = req.query.date;
    const dailyWorkoutSets = await WorkoutSet.find({date: searchedDate});
    res.status(200).json(dailyWorkoutSets)
  }catch(err) {
    res.send(err.message);
    next(err)
  }
})