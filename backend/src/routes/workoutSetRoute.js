import { WorkoutSet } from "../models/WorkoutSetModel.js";
import { Router } from "express";

export const workoutSetRouter = Router();

workoutSetRouter.post(`/exercise-log/save`, async (req, res, next) => {
  try {
    const newWorkoutSet = req.body;
    const exercisesByMuscleGroup = await WorkoutSet.create(newWorkoutSet);
    console.log(newWorkoutSet)
    res.status(200).json(newWorkoutSet);
  } catch (err) {
    res.send(err.message);
    next(err);
  }
});
