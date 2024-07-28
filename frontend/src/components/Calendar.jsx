import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { DateContext } from "./context/dateContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCalendar() {

  const {setCurrentDate} = useContext(DateContext)
  const navigate = useNavigate();
    //example handleClick function
    //should later open day view with planned workout and option to add new workout
    const handleDateClick = (arg) => {
      setCurrentDate(new Date(arg.date))
      navigate('/workoutLog')
    };
  
    return (
      <div className="container calendar-container">
      <div id="calendar">
        <FullCalendar
          plugins={[multiMonthPlugin, interactionPlugin]}
          initialView="multiMonthYear"
          multiMonthMaxColumns={1}
          dateClick={handleDateClick}
          height="100%"
          events={[
            //eventsArray goes in here - workouts saved in DB  - example eventObject:
            {
              title: "The Title", // a property!
              start: "2024-09-01", // a property!
              end: "2024-09-02", // see important note below about 'end'
              color: "pink", // a property!
            },
          ]}
        />
      </div></div>
    );
  }