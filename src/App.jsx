import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WorkoutProvider } from "./context/WorkoutContext";

function App() {

  return (
    <WorkoutProvider>
      <RouterProvider router={router} />
    </WorkoutProvider>
  )
}

export default App
