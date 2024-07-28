import mongoose from "mongoose";

const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  targetMuscle: { type: String, required: true },
  secondaryMuscle: [String],
  type: { type: String, required: true },
  notes: String,
});

exerciseSchema.post('insertMany', function(error, docs, next) {
  if (error.name === 'ValidationError') {
    console.error('Error in schema validation:', error.message);
    next(error);
  } else {
    next(error);
  }
});

export const Exercise = model("Exercise", exerciseSchema);
