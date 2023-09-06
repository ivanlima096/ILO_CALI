import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WorkoutProvider } from "./context/WorkoutContext";
import { ExercisesProvider } from "./context/ExercisesContext";

function App() {

  return (
    <WorkoutProvider>
      <ExercisesProvider>
        <RouterProvider router={router} />
      </ExercisesProvider>
    </WorkoutProvider>
  )
}

export default App
