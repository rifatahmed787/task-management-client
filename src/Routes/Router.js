import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTasks from "../Pages/AddTasks/AddTasks";
import CompleteTasks from "../Pages/CompleteTasks/CompleteTasks";
import InCompleteTasks from "../Pages/InCompleteTasks/InCompleteTasks";
import MyTasks from "../Pages/MyTasks/MyTasks";
import ErrorPage from "../Shared/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
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
        path: "/incompletetasks",
        element: <InCompleteTasks></InCompleteTasks>,
      },
    ],
  },
]);
