import { Exercise } from "../models/ExerciseModel.js";
import { Router } from "express";


export const exerciseRouter = Router();

exerciseRouter.get(`/:muscle`, async (req, res, next) => {
    const {muscle} = req.params
    try {
        const searchedExercises = await Exercise.find({targetMuscle: muscle});
        res.status(200).json(searchedExercises)

    }catch (err) {
        res.send(err.message)
    }
})