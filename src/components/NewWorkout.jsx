import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


export function NewWorkout() {

  const [date, setDate] = useState(new Date());


  const today = new Date();
  let selectedDate = date.toLocaleDateString();
  return (
    <div className="d-flex flex-column align-items-center p-4">
        <h2>{selectedDate}</h2>
      <div className ="d-flex justify-content-between dateSelection date-picker">
      <DatePicker selected={date} onChange={(dateSelect) => setDate(dateSelect)} />
      <button onClick={() => setDate(today)} className="btn btn-outline-secondary" data-bs-toggle="button">Today</button>
      </div>
      <ul className="list-group">
        <li className="list-group-item">Abs</li>
        <li className="list-group-item">Back</li>
        <li className="list-group-item">Biceps</li>
        <li className="list-group-item">Chest</li>
        <li className="list-group-item">Legs</li>
        <li className="list-group-item">Shoulders</li>
        <li className="list-group-item">Triceps</li>
      </ul>
    </div>
  );
}
