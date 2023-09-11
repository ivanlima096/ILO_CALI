import { createContext, useContext, useEffect, useState } from "react"
import exercisesData from "../Data/exercisesData.json"

export const ExercisesContext = createContext({})

export function ExercisesProvider({ children }) {
  const [exercises, setExercises] = useState([])

  useEffect(() => {

    const storedExercises = localStorage.getItem("savedExercises")
    if (storedExercises) {
      try {
        setExercises(JSON.parse(storedExercises))
      } catch (error) {
        alert("Erro ao analisar os exercícios do Local Storage:", error)
      }
    } else {
      setExercises(exercisesData)
      localStorage.setItem("savedExercises", JSON.stringify(exercisesData))
    }
  }, [])

  const removeExercise = (exerciseToRemove) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== exerciseToRemove.id)
    localStorage.setItem("savedExercises", JSON.stringify(updatedExercises))
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
