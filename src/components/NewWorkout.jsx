import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


export function NewWorkout() {

  const [startDate, setStartDate] = useState(new Date());

  const today = new Date();
  console.log(today)
  return (
    <div className="d-flex flex-column align-items-center">
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <h2> wuaaat</h2>
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
