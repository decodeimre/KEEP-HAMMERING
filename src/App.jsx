import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header";
import MyCalendar from "./components/Calendar";
import { Routes, Route } from "react-router-dom";
import { WorkoutDisplay } from "./components/WorkoutDisplay.jsx";
import TargetMuscleList from "./components/TargetMuscle.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MyCalendar />} />
        <Route path="/workout" element={<WorkoutDisplay />} />
        <Route
          path="/workout/targetMuscleList"
          element={<TargetMuscleList />}
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
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
