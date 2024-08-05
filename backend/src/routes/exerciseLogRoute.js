import { ExerciseLog } from "../models/ExerciseLogModel.js";
import { Router } from "express";

export const exerciseLogRouter = Router();

exerciseLogRouter.post(`/exercise-log/save`, async (req, res, next) => {
  try {
    const { date, exerciseName } = req.body;
    const exerciseAlreadyLogged = await ExerciseLog.findOne({
      date: date,
      exerciseName: exerciseName,
    });
    if (exerciseAlreadyLogged) {
      const newSet = req.body.sets;
      const existingSets = exerciseAlreadyLogged.sets;
      const updatedSets = [...existingSets, newSet];
      const ID = exerciseAlreadyLogged._id;
      const updateLoggedExercise = await ExerciseLog.findByIdAndUpdate(ID, {
        sets: updatedSets,
      });
      res.status(200).json(updateLoggedExercise);
    } else {
      try {
        const newWorkoutSet = req.body;
        const newSet = await ExerciseLog.create(newWorkoutSet);
        // console.log(newSet);
        res.status(200).json(newSet);
      } catch (err) {
        // console.log(err.message);
        next(err);
      }
    }
  } catch (err) {
    // console.log(err.message);
    next(err);
  }
});

exerciseLogRouter.get("/", async (req, res, next) => {
  try {
    const searchedDate = req.query.date;
    const dailyWorkoutSets = await ExerciseLog.find({ date: searchedDate });
    res.status(200).json(dailyWorkoutSets);
  } catch (err) {
    // console.log(err.message);
    next(err);
  }
});
