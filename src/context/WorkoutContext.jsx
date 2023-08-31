import { createContext, useContext, useState } from "react";

export const WorkoutContext = createContext({})

export function WorkoutProvider({ children }) {
  const [workout, setWorkout] = useState(() => {
    const storedWorkout = localStorage.getItem("savedWorkout")
    if (!storedWorkout) return null
    const workout = JSON.parse(storedWorkout)
    return workout
  })

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}


export const useWorkout = () => {
  return useContext(WorkoutContext)
}