import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTasks from "../Pages/AddTasks/AddTasks";
import CompleteTasks from "../Pages/CompleteTasks/CompleteTasks";
import MyTasks from "../Pages/MyTasks/MyTasks";
import LogIn from "../Register/LogIn";
import SignUp from "../Register/SignUp";
import ErrorPage from "../Shared/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/addtasks",
        element: <AddTasks></AddTasks>,
      },
      {
        path: "/mytasks",
        element: <MyTasks></MyTasks>,
      },
      {
        path: "/completetasks",
        element: <CompleteTasks></CompleteTasks>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
