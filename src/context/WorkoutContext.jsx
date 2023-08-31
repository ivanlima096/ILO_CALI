import { createContext, useContext, useState } from "react";

export const WorkoutContext = createContext({})

export function WorkoutProvider({ children }) {
  const [workout, setWorkout] = useState(null)

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}


export const useWorkout = () => {
  return useContext(WorkoutContext)
}