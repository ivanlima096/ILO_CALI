import { createContext, useContext, useState } from "react";

export const ExercisesContext = createContext({})

export function ExercisesProvider({ children }) {
  const [exercises, setExercises] = useState(() => {
    const storedExercises = localStorage.getItem("savedExercises")
    if (!storedExercises) return []
    const exercises = JSON.parse(storedExercises)
    return exercises
  })

  const removeExercise = (exerciseToRemove) => {
    const savedExercises = JSON.parse(localStorage.getItem("savedExercises")) || []
    const updatedExercises = savedExercises.filter((ex) => ex.name !== exerciseToRemove.name)
    localStorage.setItem("savedExercises", JSON.stringify(updatedExercises));

    setExercises(updatedExercises)
  }

  const getExercise = (exerciseId) => {
    return exercises.find((exercise) => exercise.id === +exerciseId)
  }

  return (
    <ExercisesContext.Provider value={{ exercises, setExercises, removeExercise, getExercise }}>
      {children}
    </ExercisesContext.Provider>
  )
}


export const useExercises = () => {
  return useContext(ExercisesContext)
}