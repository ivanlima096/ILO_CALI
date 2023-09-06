import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayoyt";
import Home from "./Pages/Home";
import Training from "./Pages/Training";
import Exercises from "./Pages/Exercises";
import ExerciseForm from "./Pages/CreateExercise";
import CreateExercise from "./Pages/CreateExercise";
import UpdateExercise from "./Pages/UpdateExercise";

const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  children: [
    { index: true, element: <Home /> },
    {
      path: "training", element: <Training />
    },
    {
      path: "exercises", element: <Exercises />
    },
    {
      path: "create", element: <CreateExercise />
    },
    {
      path: ":id/update", element: <UpdateExercise />
    },
  ]



}])

export default router