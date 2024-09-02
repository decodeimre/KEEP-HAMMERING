import { ExerciseLog } from "../models/ExerciseLogModel.js";


export const getAllExerciseLogs = async (req, res, next) => {
  const userID = req.params.uID;
  console.log('userId from request:', userID)
  try {
    //could put in a find for user first, to see if ID exists
    
    const allExerciseLogs = await ExerciseLog.find({userID: userID});
    if (allExerciseLogs.length === 0) {
      res.status(400).json({msg: 'no exercise logs found'})
    }
    res.status(200).json({msg: 'exercise logs fetch successful', allExerciseLogs})
  }catch (err) {
    next(err)
  }
}

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
      }, {new: true});
      console.log(updateLoggedExercise)
      res.status(200).json(updateLoggedExercise);
    } else {
      try {
        const newWorkoutSet = req.body;
        const newSet = await ExerciseLog.create(newWorkoutSet);
        console.log(newSet);
        res.status(200).json(newSet);
      } catch (err) {
        console.log(err.message);
        next(err);
      }
    }
  } catch (err) {
    console.log(err.message);
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

export const updatedExerciseSet = async (req, res, next) => {
  console.log('update Exercise request body:', req.body)
  try {
    const { exerciseLogID, updatedSet } = req.body
    const setID = updatedSet._id;
    console.log(exerciseLogID);
    console.log(updatedSet);
    const updatedExercise = await ExerciseLog.findOneAndUpdate(
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
    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise log or set not found" });
    }
   console.log(updatedExercise)
    res.status(200).json(updatedExercise);
  } catch (err) {
    next(err);
  }
};

// export const getSelectedSet = async (req, res, next) => {
//   try {
//     const { setID } = req.params;
//     const { date } = req.query;
//     console.log(date);
//     console.log(setID);
//     const selectedExerciseLog = await ExerciseLog.findOne(
//       //returns array
//       {
//         date: date,
//         "sets._id": setID,
//       }
//     );
//     console.log(selectedExerciseLog);
//     if (selectedExerciseLog && selectedExerciseLog.sets.length > 0) {
//       const foundSet = selectedExerciseLog.sets[0];
//       res.status(200).json(selectedExerciseLog);
//     } else {
//       res.status(404).json({ message: "Set not found." });
//     }
//   } catch (err) {
//     next(err);
//   }
// };
