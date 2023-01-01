import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import { AuthContext } from "../../Context/AuthProvider";

const AddTasks = () => {
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imagebb_key;
  const [fileList, setFileList] = useState([]);

  const taskSubmit = (event) => {
    event.preventDefault();
    const img = fileList?.target?.files[0];
    const formData = new FormData();
    formData.append("image", img);
    const form = event.target;
    const taskValue = form.task.value;

    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const addTask = {
            img: imgData.data.url,
            task: taskValue,
            email: user.email,
            done: false,
          };
          fetch("https://react-task-management-server.vercel.app/addtasks", {
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
        }
      });
  };
  return (
    <div className="">
      <div className="lg:w-1/2 md:w-2/3 sm:w-2/5 mx-auto  p-4 mt-16 bg-[#CFE8FC] border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center items-center">
          <h5 className="text-xl mr-2 font-medium text-gray-900 dark:text-white">
            Add your list here
          </h5>
          <Icon icon="openmoji:crossed-fingers" width="28"></Icon>
        </div>
        <form className="space-y-6 lg:px-20" onSubmit={taskSubmit} action="#">
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
          <fieldset className="w-full space-y-1 dark:text-gray-100">
            <label htmlFor="files" className="block text-sm font-medium">
              Attachments
            </label>
            <div className="flex">
              <input
                type="file"
                name="files"
                onChange={setFileList}
                id="files"
                className="block w-full px-8 py-8 border-2 border-dashed rounded-md border-white bg-white dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
              />
            </div>
          </fieldset>
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
