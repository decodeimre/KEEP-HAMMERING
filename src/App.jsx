import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header";
import MyCalendar from "./components/Calendar";

function App() {
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;

function HomePage() {
  return (
    <>
      <Header />

      <div className="container calendar-container">
        <MyCalendar />
      </div>
    </>
  );
}


