import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";

export default function MyCalendar() {
    //example handleClick function
    //should later open day view with planned workout and option to add new workout
    const handleDateClick = (arg) => {
      alert(arg.dateStr);
    };
  
    return (
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
      </div>
    );
  }