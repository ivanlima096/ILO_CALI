import ExerciseForm from "../components/ExerciseForm";
import { useWorkout } from "../context/WorkoutContext";

export default function UpdateExercise({ exerciseToUpdate }) {
  return (
    <>
      <h1>Atualizar Exercício</h1>
      <ExerciseForm exerciseToUpdate={exercises} />
    </>
  )
}