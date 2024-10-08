import { Exercise } from "../models/ExerciseModel.js";
import { Router } from "express";

export const exerciseRouter = Router();


exerciseRouter.get('/', async(req,res,next) => {
  try {
    const allExercises = await Exercise.find()
    res.status(200).json(allExercises)
  }catch(err) {
    next(err)
  }
})





//--------------------------------------------------------------------------
// used at the beginning, now exercises fetched and saved in context:

// exerciseRouter.get(`/:muscle/exercises`, async (req, res, next) => {
//   const { muscle } = req.params;
//   try {
//     const exercisesByMuscleGroup = await Exercise.find({
//       targetMuscle: muscle,
//     });
//     res.status(200).json(exercisesByMuscleGroup);
//   } catch (err) {
//     next(err)
//   }
// });

// exerciseRouter.get("/:muscle/exercises/:exerciseID", async (req, res, next) => {
//   const { exerciseID } = req.params;
//   try {
//     const exercise = await Exercise.findById(exerciseID);
//     res.status(200).json(exercise);
//   } catch (err) {
//     next(err)
//   }
// });

