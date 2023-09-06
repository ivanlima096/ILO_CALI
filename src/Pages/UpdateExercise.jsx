import { useParams } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";
import { useExercises } from "../context/ExercisesContext";


export default function UpdateExercise() {
  const { id } = useParams()
  const { getExercise } = useExercises()

  const exercise = getExercise(id)
  console.log(exercise);
  console.log(id);
  return (
    <>
      <h1>Atualizar Exercício</h1>
      <ExerciseForm exerciseToUpdate={exercise} />
    </>
  )
}