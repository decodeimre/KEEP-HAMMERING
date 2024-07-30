import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";
import GoBackButton from "./GoBackButton";

export default function ExerciseList() {

  const {muscle} = useParams();
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchURL = `http://localhost:3000/workoutLog/targetMuscleList/${muscle}`;
   
    async function fetchExercises() {
      const response = await fetch(fetchURL);
      console.log(response)
      let data = await response.json();
      setExercises(data)
      
    }

    fetchExercises()
  }, [muscle]);

  return <>
      <ListGroup className="target-muscle-list">
      {exercises.map((exercise, index) => {
        return <>
        <Link to={`/workoutLog/targetMuscleList/${muscle}/exercises`}>
        <ListGroupItem action variant="dark" className="target-muscle-item" key={index}>{exercise.name}</ListGroupItem>
        </Link>
        </>
      })}
      </ListGroup>
      <GoBackButton/>
    </>
  
}
