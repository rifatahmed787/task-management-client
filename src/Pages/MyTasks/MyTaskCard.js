import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./MyTaskCard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const MyTaskCard = ({
  task,
  tasks,
  handleTaskDelete,
  handleStatusUpdate,
  handleCheckboxChange,
}) => {
  const [isUpdating, setIsUpdating] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const handleChangeCheckbox = () => {
    if (task.done) return null;

    handleCheckboxChange(task._id);
  };

  const handleDone = (id) => {
    fetch(`http://localhost:5000/donetask/${id}`, {
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
    console.log(task);

    const updateDoc = {
      task: task,
    };
    // fetch(`http://localhost:5000/edittask/${updateTask}`, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(updateDoc),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setUpdateTask("");
    //   });
  };

  const renderUpdateForm = () => (
    <form className="space-y-6 lg:px-20" action="#" onSubmit={handleUpdateTask}>
      <div className="">
        <input
          type="text"
          name="task"
          id="task"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <Icon icon="material-symbols:update-rounded" width="16"></Icon>
      </button>
    </form>
  );

  return (
    <div>
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
                    onClick={() => handleDone(task._id)}
                    id="helper-radio-5"
                    name="helper-radio"
                    type="checkbox"
                    checked={isChecked}
                    value=""
                    className="w-4 h-4 text-blue-600   focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    htmlFor="helper-radio-5"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    <p className={isChecked ? "line-through" : ""}>
                      {task.task}
                    </p>
                  </label>
                </div>
              </div>
            </li>
          </ul>

          <div className="flex items-center ml-3">
            {isUpdating === task._id ? (
              renderUpdateForm()
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsUpdating(task._id);
                  }}
                  type="button"
                  className="text-gray-900 bg-white border border-green-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  <Icon
                    icon="material-symbols:edit"
                    className="text-green-500"
                  ></Icon>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTaskCard;
