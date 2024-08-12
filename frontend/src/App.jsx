import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header.jsx";
import MyCalendar from "./components/utils/Calendar.jsx";
import { Routes, Route } from "react-router-dom";
import { WorkoutLog } from "./components/WorkoutLog.jsx";
import { DateContextProvider } from "./components/context/dateContext.jsx";
import { NewWorkoutContextProvider } from "./components/context/newWorkoutContext.jsx";
import { ExerciseSetContextProvider } from "./components/context/exerciseSetContext.jsx";
import TargetMuscleList from "./components/TargetMuscleList.jsx";
import ExerciseList from "./components/ExerciseList.jsx";
import { ExerciseLog } from "./components/ExerciseLog.jsx";

function App() {
  return (
    <>
      <DateContextProvider>
        <NewWorkoutContextProvider>
          <ExerciseSetContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<MyCalendar />} />
              <Route path="/workoutLog" element={<WorkoutLog />}>
                <Route path="targetMuscleList" element={<TargetMuscleList />} />
                <Route path=":muscle/exercises" element={<ExerciseList />} />
                <Route
                  path=":muscle/exercises/:exerciseID"
                  element={<ExerciseLog />}
                />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </ExerciseSetContextProvider>
        </NewWorkoutContextProvider>
      </DateContextProvider>
    </>
  );
}

export default App;

const NoMatch = () => {
  return (
    <div>
      <h1>Sorry, path does not exist</h1>
    </div>
  );
};
