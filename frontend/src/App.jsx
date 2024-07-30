import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header.jsx";
import MyCalendar from "./components/Calendar.jsx";
import { Routes, Route } from "react-router-dom";
import { WorkoutLog } from "./components/WorkoutLog.jsx";
import { DateContextProvider } from "./components/context/dateContext.jsx";
import TargetMuscleList from "./components/TargetMuscleList.jsx";
import ExerciseList from "./components/ExerciseList.jsx";
import { ExerciseDetails } from "./components/ExerciseDetails.jsx";



function App() {
  return (
    <>
      <DateContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/workoutLog" element={<WorkoutLog />}>
            <Route path="targetMuscleList" element={<TargetMuscleList />} />
            <Route path=':muscle/exercises' element={<ExerciseList/>}/>
            <Route path=':muscle/exercises/:exerciseID' element={<ExerciseDetails/>}/>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
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
