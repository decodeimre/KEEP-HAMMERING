import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";
import GoBackButton from "./utils/GoBackButton.jsx";

export default function ExerciseList() {
  const { muscle } = useParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchURL = `http://localhost:3000/workoutLog/${muscle}/exercises`;

    async function fetchExercises() {
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        alert("ExerciseList error");
      }
    }

    fetchExercises();
  }, [muscle]);

  return (
    <>
      <ListGroup className="target-muscle-list">
        {exercises.map((exercise) => {
          return (
            <>
              <Link
                to={`/workoutLog/${muscle}/exercises/${exercise._id}`}
                style={{ textDecoration: "none" }}
              >
                <ListGroupItem
                  action
                  variant="dark"
                  className="target-muscle-item"
                  key={exercise._id}
                >
                  {exercise.name}
                </ListGroupItem>
              </Link>
            </>
          );
        })}
      </ListGroup>
      <GoBackButton />
    </>
  );
}
