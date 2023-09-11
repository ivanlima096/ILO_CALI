import { createContext, useContext, useEffect, useState } from "react";
import workoutData from "../Data/workoutData.json"

export const WorkoutContext = createContext({})

export function WorkoutProvider({ children }) {
  const [workout, setWorkout] = useState([])

  useEffect(() => {
    const storedWorkouts = localStorage.getItem("savedWorkouts")
    if (storedWorkouts) {
      try {
        setWorkout(JSON.parse(storedWorkouts))
      } catch (error) {
        alert("Erro ao analisar os exercícios do Local Storage:", error)
      }
    } else {
      setWorkout(workoutData)
      localStorage.setItem("savedWorkouts", JSON.stringify(workoutData))
    }
  }, [])

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}


export const useWorkout = () => {
  return useContext(WorkoutContext)
}