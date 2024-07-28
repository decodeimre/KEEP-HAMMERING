import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header.jsx";
import MyCalendar from "./components/Calendar.jsx";
import { Routes, Route } from "react-router-dom";
import { WorkoutDisplay } from "./components/WorkoutDisplay.jsx";
import { DateContextProvider } from "./components/context/dateContext.jsx";
import TargetMuscleList from "./components/TargetMuscle.jsx";

function App() {
  return (
    <>
      <DateContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MyCalendar />} />
          <Route path="/workoutLog" element={<WorkoutDisplay />}>
            <Route path="targetMuscleList" element={<TargetMuscleList />} />
            {/* <Route path='targetMuscleList/:muscle' element={<ExerciseList/>}/>
            <Route path='targetMuscleList/:muscle/:exercise' element={<ExerciseDetails/>}/> */}
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
