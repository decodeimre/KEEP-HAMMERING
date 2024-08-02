import { timeStamp } from "console";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const workoutSetSchema = new Schema(
  {
    date: { type: String, required: true,},
    targetMuscle: { type: String, required: true },
    exercise: { type: String, required: true },
    unit: { type: String, required: true, default: "kg" },
    weight: { type: Number, required: true, default: 0 },
    reps: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

workoutSetSchema.post("create", function (error, docs, next) {
  if (error.name === "ValidationError") {
    console.error("Error in schema validation:", error.message);
    next(error);
  } else {
    next(error);
  }
});

export const WorkoutSet = model("WorkoutSet", workoutSetSchema);
