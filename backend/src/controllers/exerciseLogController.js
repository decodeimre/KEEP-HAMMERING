import { ExerciseLog } from "../models/ExerciseLogModel.js";

export const saveNewExerciseSet = async (req, res, next) => {
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
};

export const deleteExerciseSet = async (req, res, next) => {
  try {
    const { setID, exerciseLogID } = req.body;

    const updatedExercise = await ExerciseLog.findByIdAndUpdate(
      exerciseLogID,
      { $pull: { sets: { _id: setID } } }, // pulls objects that match out of the array
      { new: true } // returns the new updated object, not the old one before the update
    );
    if (updatedExercise.sets.length === 0) {
      await ExerciseLog.findByIdAndDelete(exerciseLogID);
    }
    res.status(200).json(updatedExercise);
  } catch (err) {
    next(err);
  }
};

export const getSelectedSet = async (req, res, next) => {
  try {
    const { exerciseID, setID } = req.params;
    const selectedSet = await ExerciseLog.findOne( //returns array
      {
        _id: exerciseID,
        "sets._id": setID,
      },
      { "sets.$": 1 } // returns only the matched set, not the ExerciseLog that contains the set
    );
    if (selectedSet && selectedSet.sets.length > 0) {
      const foundSet = selectedSet.sets[0];
      res.status(200).json(foundSet);
    } else {
      res.status(404).json({ message: "Set not found." });
    }
  } catch (err) {
    next(err);
  }
};

export const updatedExerciseSet = async (req, res, next) => {
  try {
    const { setID, exerciseLogID, updatedSet } = req.body;
    const updatedExercise = await ExerciseLog.findByIdAndUpdate(
      { _id: exerciseLogID, "sets._id": setID },
      {
        $set: {
          "sets.$.weight": updatedSet.weight,
          "sets.$.reps": updatedSet.reps,
          "sets.$.unit": updatedSet.unit,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedExercise);
  } catch (err) {
    next(err);
  }
};
