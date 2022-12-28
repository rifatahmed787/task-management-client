import React from "react";
import { toast } from "react-hot-toast";

const AddTasks = () => {
  const taskSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const taskValue = form.task.value;

    const addTask = {
      task: taskValue,
    };

    fetch("http://localhost:5000/addtasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Task added successfully");
          form.reset();
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="">
      <div className="lg:w-1/2 md:w-2/3 sm:w-2/5 mx-auto  p-4 mt-16 bg-[#CFE8FC] border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6 lg:px-20" onSubmit={taskSubmit} action="#">
          <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">
            Add your daily tasks
          </h5>
          <div className="">
            <label
              htmlFor="task"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Tasks
            </label>
            <input
              type="text"
              name="task"
              id="task"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Add Tasks"
              required
            />
          </div>
          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
