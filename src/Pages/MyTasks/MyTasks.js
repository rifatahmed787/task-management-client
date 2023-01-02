import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import Loading from "../LoadingButton/Loading";
import MyTaskCard from "./MyTaskCard";

const MyTasks = () => {
  const { user } = useContext(AuthContext);

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(
        `https://react-task-management-server.vercel.app/gettasks/${user?.email}`
      );

      const data = await res.json();
      const undoneItem = data.filter((task) => !task.done);
      return undoneItem;
    },
  });

  //task deletehandle
  const handleTaskDelete = (id) => {
    const processed = window.confirm("Are you sure want to delete");
    if (processed) {
      fetch(`https://react-task-management-server.vercel.app/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Deleted successfully");
            refetch();
          }
        });
    }
  };

  //handle checkbox
  // const handleCheckbox = (id) => {
  //   const newTask = tasks.map((task) => {
  //     if (task._id === id) {
  //       return { ...task, task: !task.done };
  //     } else {
  //       return task;
  //     }
  //   });
  //   // settasks(newTask);
  // };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pb-16">
      <h3 className="text-2xl text-center mt-10 font-semibold text-sky-500">
        {tasks.length < 2 ? (
          <div>You have {tasks?.length} Active Task</div>
        ) : (
          <div>You have {tasks?.length} Active Tasks</div>
        )}
      </h3>
      {tasks &&
        tasks?.map((task) => (
          <MyTaskCard
            key={task._id}
            refetch={refetch}
            task={task}
            handleTaskDelete={handleTaskDelete}
            // tasks={tasks}
            isLoading={isLoading}
            // handleCheckbox={handleCheckbox}
          ></MyTaskCard>
        ))}
    </div>
  );
};

export default MyTasks;
