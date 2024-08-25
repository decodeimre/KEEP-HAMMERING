import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import MyCalendar from "./components/utils/Calendar.jsx";
import TargetMuscleList from "./components/TargetMuscleList.jsx";
import ExerciseList from "./components/ExerciseList.jsx";
import ExerciseLog from "./components/ExerciseLog.jsx";
import LoginRegister from "./components/loginRegister/LoginRegister.jsx";
import ConfirmAccount from "./components/loginRegister/ConfirmAccount.jsx";
import { UserProvider } from "./components/context/userContext.jsx";
import { DailyWorkoutLog } from "./components/DailyWorkoutLog.jsx";
import { DateContextProvider } from "./components/context/dateContext.jsx";
import { NewWorkoutContextProvider } from "./components/context/newWorkoutContext.jsx";
import { CurrentExerciseProvider } from "./components/context/currentExerciseContext.jsx";
import { ExerciseLogsProvider } from "./components/context/exerciseLogsContext.jsx";
import { ExercisesProvider } from "./components/context/exercisesContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <DateContextProvider>
          <ExercisesProvider>
            <ExerciseLogsProvider>
              <CurrentExerciseProvider>
                <NewWorkoutContextProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={<LoginRegister />} />
                    <Route
                      path="/users/confirm/:token/:userID"
                      element={<ConfirmAccount />}
                    />
                    <Route path="/home" element={<MyCalendar />} />
                    <Route path="workoutLog" element={<DailyWorkoutLog />}>
                      <Route
                        path="targetMuscleList"
                        element={<TargetMuscleList />}
                      />
                      <Route
                        path=":muscle/exercises"
                        element={<ExerciseList />}
                      />
                      <Route
                        path=":muscle/exercises/:exerciseID"
                        element={<ExerciseLog />}
                      />
                      <Route
                        path="edit/:exercisesLogID/:setID"
                        element={<ExerciseLog />}
                      />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                  </Routes>
                </NewWorkoutContextProvider>
              </CurrentExerciseProvider>
            </ExerciseLogsProvider>
          </ExercisesProvider>
        </DateContextProvider>
      </UserProvider>
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
