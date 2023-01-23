import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyTaskCard = ({ task, refetch, handleTaskDelete }) => {
  const [isUpdating, setIsUpdating] = useState("");

  const navigate = useNavigate();

  const handleDone = (id) => {
    fetch(`https://react-task-management-server.vercel.app/donetask/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Your task is completed");
        navigate("/completetasks");
      });
  };

  // update form field
  const handleUpdateTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    // console.log(task);

    const updateDoc = {
      task: task,
    };
    // console.log(isUpdating);
    fetch(
      `https://react-task-management-server.vercel.app/edittask/${isUpdating}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateDoc),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        toast.success("Updated successfully");
        setIsUpdating("");
      });
  };

  //canceling update
  const cencelUpdate = () => {
    setIsUpdating("");
  };

  return (
    <div>
      {isUpdating === task._id ? (
        <>
          <form
            className="space-y-6 lg:px-20 responsive"
            onSubmit={handleUpdateTask}
          >
            <div className="lg:w-2/5 md:w-3/5 sm:w-4/5 responsive-card p-6  mx-auto mt-10 bg-[#CFE8FC] border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-700">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="">
                    <input
                      type="text"
                      name="task"
                      id="task"
                      defaultValue={task.task}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 py-[9px] dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center ml-3">
                  <button
                    onClick={cencelUpdate}
                    title="click for edit"
                    type="button"
                    className="text-gray-900 bg-white border border-red-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    <Icon
                      icon="material-symbols:cancel-outline"
                      className="text-red-500"
                      width="22"
                    ></Icon>
                  </button>
                  <button
                    type="submit"
                    className="text-gray-900 bg-white border border-blue-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    <Icon
                      icon="material-symbols:update-rounded"
                      className="text-blue-500"
                      width="22"
                    ></Icon>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="lg:w-2/5 md:w-3/5 sm:w-4/5 responsive-card pl-6 pb-7 mx-auto mt-10 bg-[#70C5B9] border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-700">
            <div className="flex justify-end py-1 pr-2">
              <Link to={`/details/${task._id}`}>
                <Icon
                  icon="ic:twotone-remove-red-eye"
                  width="24"
                  className="dark:text-green-500"
                ></Icon>
              </Link>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => handleDone(task._id)}
                  title="click for complete"
                  type="button"
                  className="text-gray-900 bg-white border border-red-400 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3.5 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <Icon
                    icon="carbon:task-complete"
                    className="text-red-700 dark:text-red-500"
                    width="16"
                  ></Icon>
                </button>

                <div className="pl-5">
                  <div className="focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2  dark:border-gray-500 dark:text-white">
                    <p>{task?.task}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center ml-3 pr-4">
                <button
                  onClick={() => {
                    setIsUpdating(task._id);
                  }}
                  title="click for edit"
                  type="button"
                  className="text-gray-900 bg-white border border-green-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <Icon
                    icon="line-md:edit"
                    className="text-green-500"
                    width="22"
                  ></Icon>
                </button>
                <button
                  onClick={() => handleTaskDelete(task._id)}
                  title="click for delete"
                  data-modal-toggle="popup-modal"
                  id="popup-modal"
                  type="button"
                  className="text-gray-900 bg-white border border-red-700 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3.5 py-1.5 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <Icon
                    icon="material-symbols:delete"
                    className="text-red-700"
                    width="18"
                  ></Icon>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTaskCard;
