import { createContext, useReducer } from "react";

const ACTIONS = {
  SET_EXERCISE_DETAILS: "SET_EXERCISE_DETAILS",
  UPDATE_CURRENT_SET: "UPDATE_CURRENT_SET",
  TOGGLE_EDIT_MODE: "TOGGLE_EDIT_MODE",
  RESET_FORM: "RESET_FORM",
  SET_SELECTED_LOG: "SET_SELECTED_LOG",
};

const initialState = {
  userID: '',
  exerciseDetails: {},
  currentSet: { weight: 0, reps: 0, unit: "kg", id: "" },
  isEditMode: false,
  exerciseLogID: "",
};

function currentExerciseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_EXERCISE_DETAILS:
      return { ...state, exerciseDetails: action.payload };
    case ACTIONS.UPDATE_CURRENT_SET:
      return {
        ...state,
        currentSet: { ...state.currentSet, ...action.payload },
      };
    case ACTIONS.TOGGLE_EDIT_MODE:
      return { ...state, isEditMode: action.payload };
    case ACTIONS.RESET_FORM:
      return {
        ...state,
        currentSet: initialState.currentSet,
        isEditMode: false,
        exerciseLogID: "",
      };
    case ACTIONS.SET_SELECTED_LOG:
      return { ...state, exerciseLogID: action.payload };
    default:
      return state;
  }
}

export const currentExerciseContext = createContext();

export const CurrentExerciseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currentExerciseReducer, initialState);

  return (
    <currentExerciseContext.Provider
      value={{
        state,
        dispatch,
        ACTIONS,
      }}
    >
      {children}
    </currentExerciseContext.Provider>
  );
};
