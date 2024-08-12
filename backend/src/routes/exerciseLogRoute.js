import { ExerciseLog } from "../models/ExerciseLogModel.js";
import { Router } from "express";
import { saveNewExerciseSet, deleteExerciseSet, updatedExerciseSet, getSelectedSet } from "../controllers/exerciseLogController.js";

export const exerciseLogRouter = Router();


exerciseLogRouter.get("/", async (req, res, next) => {
  try {
    const searchedDate = req.query.date;
    const dailyWorkoutSets = await ExerciseLog.find({ date: searchedDate });
    res.status(200).json(dailyWorkoutSets);
  } catch (err) {
    next(err);
  }
});



exerciseLogRouter.post(`/exercise-log/save`, saveNewExerciseSet);
exerciseLogRouter.delete("/exercise-log/delete-set", deleteExerciseSet);
exerciseLogRouter.get('/exercise-log/update-set/:setID', getSelectedSet);
exerciseLogRouter.put("/exercise-log/update-set/", updatedExerciseSet);


