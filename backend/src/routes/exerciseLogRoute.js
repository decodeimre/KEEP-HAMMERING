import { ExerciseLog } from "../models/ExerciseLogModel.js";
import { Router } from "express";
import { saveNewExerciseSet } from "../controllers/saveNewExercise.js";

export const exerciseLogRouter = Router();

exerciseLogRouter.post(`/exercise-log/save`, saveNewExerciseSet);

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

exerciseLogRouter.delete("/exercise-log/delete-set", async (req, res, next) => {
  try {
    const { setID, exerciseLogID } = req.body;

    const updatedExercise = await ExerciseLog.findByIdAndUpdate(
      exerciseLogID,
      { $pull: { sets: { _id: setID } } },
      { new: true }
    );
    if (updatedExercise.sets.length === 0) {
      await ExerciseLog.findByIdAndDelete(exerciseLogID);
      res.status(200).json(updatedExercise);
    }
  } catch (err) {
    next(err);
  }
});
