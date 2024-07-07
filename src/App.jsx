import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "react-calendar/dist/Calendar.css";
import { Header } from "./components/Header";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';

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

      <div className="container">
    <MyCalendar/>
      </div>
    </>
  );
}


function MyCalendar () {
  return (
    <FullCalendar
    plugins={[multiMonthPlugin, interactionPlugin]}
    initialView='multiMonthYear'
    multiMonthMaxColumns={1}
    />
  ) 
  

  return calendar
}