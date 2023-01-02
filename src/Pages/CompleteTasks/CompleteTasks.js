import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Loading from "../LoadingButton/Loading";

const CompleteTasks = () => {
  const { user } = useContext(AuthContext);
  const [doneTask, setDoneTask] = useState([]);
  const navigate = useNavigate();

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/gettasks/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  useEffect(() => {
    const taskDone = tasks.filter((task) => task.done);
    setDoneTask(taskDone);
  }, [tasks]);

  //incomplete handle
  const incompleteTask = (id) => {
    fetch(`http://localhost:5000/undonetask/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.error("Your task is not completed");
        navigate("/mytasks");
      });
  };

  // task deletehandle
  const handleTaskDelete = (id) => {
    const processed = window.confirm("Are you sure want to delete");
    if (processed) {
      fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success("Deleted successfully");
            const remaining = tasks.filter((r) => r._id !== id);
            setDoneTask(remaining);
            refetch();
          }
        });
    }
  };

  //data loading button
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className=" pb-6">
        <h3 className="text-2xl text-center mt-10 font-semibold text-sky-500">
          {doneTask.length < 2 ? (
            <div>Your {doneTask.length} Task is completed</div>
          ) : (
            <div>Your {doneTask.length} Tasks are completed</div>
          )}
        </h3>
      </div>
      {doneTask &&
        doneTask.map((task) => (
          <div
            key={task._id}
            className="max-w-lg p-6  mx-auto mt-10 bg-[#CFE8FC] border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                <Icon
                  icon="fluent-mdl2:completed-solid"
                  className="text-green-500"
                  width="22"
                ></Icon>
                <div className="pl-3 pb-1">
                  {/* className={isChecked ? "line-through" : ""} */}
                  <p>{task.task}</p>
                </div>
              </div>

              <div className="flex items-center ml-3">
                <button
                  onClick={() => {
                    incompleteTask(task._id);
                  }}
                  type="button"
                  className="text-gray-900 bg-white border border-green-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-2 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <span className="text-green-500"> Incomplete</span>
                </button>
                <button
                  onClick={() => handleTaskDelete(task._id)}
                  data-modal-toggle="popup-modal"
                  id="popup-modal"
                  type="button"
                  className="text-gray-900 bg-white border border-red-700 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <Icon
                    icon="material-symbols:delete"
                    className="text-red-700"
                  ></Icon>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CompleteTasks;
