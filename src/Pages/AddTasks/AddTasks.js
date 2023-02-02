import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import png from "../../asset/image/cloud-upload-regular-240.png";
import { AuthContext } from "../../Context/AuthProvider";
import TitleHook from "../../Shared/TitleHook";
import "./AddTasks.css";

const AddTasks = () => {
  const { user } = useContext(AuthContext);
  // const imageHostKey = process.env.REACT_APP_imagebb_key;
  const [fileList, setFileList] = useState();
  const [preview, setPreview] = useState();

  const navigate = useNavigate();

  //titlehook
  TitleHook("Add Tasks");

  useEffect(() => {
    if (!fileList) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(fileList);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [fileList]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFileList(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setFileList(e.target.files[0]);
  };

  //remove selected image
  const removeSelectedImage = () => {
    setFileList();
  };

  const taskSubmit = (event) => {
    event.preventDefault();
    // const img = fileList?.target?.files[0];
    const img = fileList;
    console.log(img);
    const formData = new FormData();
    formData.append("file", img);
    const form = event.target;
    const taskValue = form.task.value;
    const detailsValue = form.details.value;

    formData.append("upload_preset", "jujslbiy");
    // const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    const url = "https://api.cloudinary.com/v1_1/dztlowlu0/image/upload";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.asset_id) {
          const addTask = {
            img: imgData.url,
            task: taskValue,
            details: detailsValue,
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
                navigate("/mytasks");
                form.reset();
              }
            })
            .catch((error) => console.error(error));
        }
      });
  };
  return (
    <div className="responsive pb-10">
      <div className=" lg:w-1/2 md:w-2/3 sm:w-2/5 mx-auto  p-4 my-8 bg-[#70C5B9] border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center items-center">
          <h5 className="text-xl mr-2 font-medium text-gray-900 dark:text-white">
            Add your list here
          </h5>
        </div>
        <form className="space-y-6 lg:px-20" onSubmit={taskSubmit}>
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
              autoComplete="on"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-4 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white"
              placeholder="Add Tasks"
              required
            />
          </div>

          <div className="">
            <label
              htmlFor="task"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add Details
            </label>
            <input
              autoComplete="on"
              type="text"
              name="details"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-4 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white"
              placeholder="Add Details"
              required
            />
          </div>
          <fieldset className="w-full space-y-1 dark:text-gray-100">
            <label htmlFor="files" className="block text-sm font-medium">
              Attachments
            </label>
            {fileList ? (
              <>
                <img src={preview} alt="/" className="w-1/2" />
                <button onClick={removeSelectedImage}>Remove This Image</button>
              </>
            ) : (
              <div className="flex">
                <input
                  type="file"
                  name="files"
                  autoComplete="on"
                  onChange={onSelectFile}
                  id="files"
                  className="hidden"
                />

                <label htmlFor="files">
                  <img src={png} alt="" className="block w-36" />
                </label>
              </div>
            )}
          </fieldset>
          <button
            type="submit"
            className=" text-white bg-[#000000] hover:bg-[#000000] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
