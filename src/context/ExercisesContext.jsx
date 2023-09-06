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
    const newExercises = exercises.filter((ex) => ex.name !== exerciseToRemove.name);
    setExercises(newExercises);
  };

  return (
    <ExercisesContext.Provider value={{ exercises, setExercises, removeExercise }}>
      {children}
    </ExercisesContext.Provider>
  )
}


export const useExercises = () => {
  return useContext(ExercisesContext)
}