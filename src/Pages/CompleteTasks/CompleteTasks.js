import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const CompleteTasks = () => {
  const [task, setTask] = useState([]);
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
            setTask(remaining);
            refetch();
          }
        });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <button
          disabled
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline mr-3 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
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
          <div className="max-w-lg p-6  mx-auto mt-10 bg-[#CFE8FC] border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between">
              <img
                className="flex items-center w-10 h-10 rounded-full"
                src={task.img}
                alt=""
              />
              <ul>
                <li>
                  <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <div className="flex items-center h-5">
                      <input
                        // onClick={() => handleDone(task._id)}
                        id="helper-radio-5"
                        name="helper-radio"
                        type="checkbox"
                        // checked={isChecked}
                        value=""
                        className="w-4 h-4 text-blue-600   focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        htmlFor="helper-radio-5"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        {/* className={isChecked ? "line-through" : ""} */}
                        <p>{task.task}</p>
                      </label>
                    </div>
                  </div>
                </li>
              </ul>

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
