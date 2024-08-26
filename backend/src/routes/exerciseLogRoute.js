import { Router } from "express";
import {
  getAllExerciseLogs,
  saveNewExerciseSet,
  deleteExerciseSet,
  updatedExerciseSet,
} from "../controllers/exerciseLogController.js";
import { protectRoute } from "../utils/protectRoute.js";

export const exerciseLogRouter = Router();

exerciseLogRouter.get(
  `/exercise-log/getAll/:uID`,
  protectRoute,
  getAllExerciseLogs
);
exerciseLogRouter.post(`/exercise-log/save`, saveNewExerciseSet);
exerciseLogRouter.delete(
  "/exercise-log/delete-set",
  deleteExerciseSet
);
exerciseLogRouter.put(
  "/exercise-log/update-set/",
  updatedExerciseSet
);
