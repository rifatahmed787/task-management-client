import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTasks from "../Pages/AddTasks/AddTasks";
import CompleteTasks from "../Pages/CompleteTasks/CompleteTasks";
import Home from "../Pages/HomePage/Home";
import MyTasks from "../Pages/MyTasks/MyTasks";
import Details from "../Pages/SeeDetails/Details";
import LogIn from "../Register/LogIn";
import SignUp from "../Register/SignUp";
import ErrorPage from "../Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addtasks",
        element: <AddTasks></AddTasks>,
      },
      {
        path: "/mytasks",
        element: (
          <PrivateRoute>
            <MyTasks></MyTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/details/${params.id}`),
      },
      {
        path: "/completetasks",
        element: (
          <PrivateRoute>
            <CompleteTasks></CompleteTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
