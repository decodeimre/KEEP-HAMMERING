import { timeStamp } from "console";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const workoutSetSchema = new Schema({
  weight: { type: Number, required: true, default: 0 },
  reps: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true, default: "kg" },
});

const exerciseLogSchema = new Schema(
  {
    date: { type: String, required: true },
    targetMuscle: { type: String, required: true },
    exerciseName: { type: String, required: true },
    notes: {type: String, required: true},
    sets: [workoutSetSchema],
  },
  { timestamps: true }
);

exerciseLogSchema.post("create", function (error, docs, next) {
  if (error.name === "ValidationError") {
    console.error("Error in schema validation:", error.message);
    next(error);
  } else {
    next(error);
  }
});

export const ExerciseLog = model("ExerciseLog", exerciseLogSchema);
