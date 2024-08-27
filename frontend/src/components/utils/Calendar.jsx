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
  const { setCurrentDate } = useContext(DateContext);
  const { exerciseLogs } = useContext(ExerciseLogsContext);
  const navigate = useNavigate();

  const events = exerciseLogs.reduce((acc, log) => {
    const { date, targetMuscle } = log;

    // Check if we already have an event for this date
    const eventIndex = acc.findIndex((event) => event.start === date);

    if (eventIndex > -1) {
      // If the event exists for this date, add targetMuscle if it's not a duplicate
      const event = acc[eventIndex];
      if (!event.targetMuscles.includes(targetMuscle)) {
        event.targetMuscles.push(targetMuscle);
      }
    } else {
      // If there's no event for this date, create a new one
      acc.push({
        title: `Workout`,
        start: date,
        targetMuscles: [targetMuscle],
        className:['bg-light border-info']
      });
    }
    return acc;
  }, []);

  const muscleColors = {
    Abs: "red",
    Back: "blue",
    Biceps: "yellow",
    Chest: "green",
    Legs: "orange",
    Shoulders: "purple",
    Triceps: "grey",
  };

  const dailyEventContent = (eventInfo) => {
    const targetMuscles = eventInfo.event.extendedProps.targetMuscles;
    console.log(targetMuscles);
    const muscleIcon = (muscle) => {
      return (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-dot"
          size="xs"
          style={{ color: muscleColors[muscle], marginRight: ".2rem" }}
        />
      ) || null;
    };

    return (
      <div>
        {targetMuscles.map((muscle, index) => {
          console.log(muscleIcon(muscle))
         return <span key={index}>{muscleIcon(muscle)}</span>;
        })}
      </div>
    );
  };

  const handleDateClick = (arg) => {
    setCurrentDate(new Date(arg.date));
    navigate(`/workoutLog/`);
  };

  return (
    <div className="container calendar-container">
      <div id="calendar">
        <FullCalendar
          className="fullCalendar"
          plugins={[multiMonthPlugin, interactionPlugin]}
          initialView="multiMonthYear"
          multiMonthMaxColumns={1}
          dayCellDidMount={(info) => {
            info.el.style.cursor = "pointer";
          }}
          dateClick={handleDateClick}
          height="100%"
          events={events ? events : null}
          eventContent={dailyEventContent}
        />
      </div>
    </div>
  );
}
