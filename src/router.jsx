import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayoyt";
import Home from "./Pages/Home";
import Training from "./Pages/Training";

const router = createBrowserRouter([{
  path: "/",
  element: <RootLayout />,
  children: [
    { index: true, element: <Home /> },
    {
      path: "training", element: <Training />
    }
  ]



}])

export default router