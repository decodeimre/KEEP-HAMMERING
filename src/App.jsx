import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";

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

function MyCalendar() {

  //example handleClick function 
  //should later open day view with planned workout and option to add new workout
  const handleDateClick = (arg) => {
    alert (arg.dateStr)
  } 

  return (
    <div id="calendar">

    <FullCalendar
      plugins={[multiMonthPlugin, interactionPlugin]}
      initialView="multiMonthYear"
      multiMonthMaxColumns={1}
      dateClick={handleDateClick}
      height="100%"
      events={[//eventsArray goes in here - workouts saved in DB  - example eventObject: 
        { title: 'The Title', // a property!
          start: '2024-09-01', // a property!
          end: '2024-09-02', // see important note below about 'end' 
          color: "pink" // a property!
        }
      ]}
      />
      </div>
  );
}
