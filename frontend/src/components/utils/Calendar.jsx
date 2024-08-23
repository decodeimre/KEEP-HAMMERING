import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { DateContext } from "../context/dateContext";
import { ExerciseLogsContext } from "../context/exerciseLogsContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import the FontAwesome library
import { library } from "@fortawesome/fontawesome-svg-core";

// Import the specific icons
import { faCircleDot, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

// Add the imported icons to the library
library.add(faCircleDot, faAngleLeft);

export default function MyCalendar() {

  const muscleColors = {
    Abs: "red",
    Back: "blue",
    Biceps: "yellow",
    Chest: "green",
    Legs: "orange",
    Shoulders: "purple",
    Triceps: "grey"
};

  const {date, setCurrentDate} = useContext(DateContext);
  const {exerciseLogs} = useContext(ExerciseLogsContext);

  const navigate = useNavigate();
    //example handleClick function
    //should later open day view with planned workout and option to add new workout
    const handleDateClick = (arg) => {
      setCurrentDate(new Date(arg.date))
      navigate(`/workoutLog/`)
    };
  
    return (
      <div className="container calendar-container">
      <div id="calendar">
        <FullCalendar
          className="fullCalendar"
          plugins={[multiMonthPlugin, interactionPlugin]}
          initialView="multiMonthYear"
          multiMonthMaxColumns={1}
          headerToolbar={{
            start: 'today', // "Today" button on the left
            center: 'title',
            end: 'prev,next', // Navigation buttons on the right
          }}
          dayCellDidMount={(info) => {
            info.el.style.cursor = 'pointer'
          }}
          dateClick={handleDateClick}
          height="100%"
          events={[
            //eventsArray goes in here - workouts saved in DB  - example eventObject:
            {
              title: "awesome" , 
              start: "2024-09-01", 
              end: "2024-09-02", // see important note below about 'end'
              color: "whitesmoke" 
            },
            {
              title: "awesome" , 
              start: "2024-09-03", 
              end: "2024-09-04",
              color: "whitesmoke" 
            },
            
          ]}
          //this is how we can display icons. (could be callback handling all targetmuscles from exerciseLoglist and create icon array)
          //now the eventContent works for all events - how to connect the right one?!?!
          eventContent={[<FontAwesomeIcon
              icon="fa-solid fa-circle-dot"
              style={{ color: "blue", marginRight: ".5rem" }}
            />, <FontAwesomeIcon
            icon="fa-solid fa-circle-dot"
            style={{ color: "red", marginRight: ".5rem" }}
          />]}
        />
      </div></div>
    );
  }