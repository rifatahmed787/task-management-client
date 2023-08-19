import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthProvider";
import TitleHook from "../../Shared/TitleHook";
import addlistbanner from "../../asset/image/addtask.jpg";

import "./AddTasks.css";

import axios from "axios";

const AddTasks = () => {
  const { user } = useContext(AuthContext);
  // const imageHostKey = process.env.REACT_APP_imagebb_key;
  const [fileList, setFileList] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [filePreview, setFilePreview] = useState();

  const navigate = useNavigate();

  //titlehook
  TitleHook("Add Work");

  useEffect(() => {
    if (!fileList) {
      setImagePreview(undefined);
      setFilePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(fileList);
    if (fileList.type.startsWith("image")) {
      setImagePreview(objectUrl);
    } else {
      setFilePreview(objectUrl);
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [fileList]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFileList(undefined);
      return;
    }

    setFileList(e.target.files[0]);
  };

  //remove selected image
  const removeSelectedImage = () => {
    setFileList();
  };

  //fetching getToken data
  axios
    .get("/getNotificationToken")
    .then((response) => {
      const token = response.data.token;
      // Use the token here, e.g., store it in your database or associate it with the user's account
      console.log("User notification token:", token);
    })
    .catch((error) => {
      console.error("Error retrieving notification token:", error);
    });

  const taskSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const taskValue = form.task.value;
    const detailsValue = form.details.value;

    // ...

    // Uploading image
    if (fileList && fileList.type.startsWith("image")) {
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("upload_preset", "jujslbiy");

      // Use Cloudinary API for image upload
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dztlowlu0/image/upload",
          formData
        )
        .then((response) => {
          const imageUrl = response.data.secure_url;

          const addTask = {
            img: imageUrl,
            task: taskValue,
            details: detailsValue,
            email: user.email,
            done: false,
          };

          // Continue with your submission using addTask
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
            .catch((error) => {
              console.error("Error adding task:", error);
              toast.error("Error adding task. Please try again later.");
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image. Please try again later.");
        });
    }

    // Uploading file
    if (fileList && !fileList.type.startsWith("image")) {
      const formData = new FormData();
      formData.append("file", fileList);

      // Use Cloudinary API for file upload
      axios
        .post("https://api.cloudinary.com/v1_1/dztlowlu0/raw/upload", formData)

        .then((response) => {
          const fileUrl = response.data.secure_url;

          const addTask = {
            file: fileUrl, // Assuming you have a field to store the file URL
            task: taskValue,
            details: detailsValue,
            email: user.email,
            done: false,
          };

          // Continue with your submission using addTask
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
            .catch((error) => {
              console.error("Error adding task:", error);
              toast.error("Error adding task. Please try again later.");
            });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file. Please try again later.");
        });
    }
  };

  return (
    <div className="responsive dark:bg-[#0F172A] pb-5">
      <div className="relative after:absolute after:content-normal after:bg-black after:opacity-30 after:h-full after:w-full after:top-0 after:left-0">
        <img
          src={addlistbanner}
          alt=""
          className="w-full bg-no-repeat  bg-cover relative"
        />

        <div className="absolute top-16 md:top-32 lg:top-1/3 left-0 right-0 text-center z-10">
          <h1 className="error font-bold  lg:text-5xl text-4xl text-white">
            Add Your Task Here
          </h1>
          <p className="md:text-lg text-white flex justify-center items-center  font-bold mt-3 text-brand2 text-base">
            <Link to="/" className="hover:-translate-x-1 duration-300">
              <span>Home</span>
            </Link>
          </p>
        </div>
      </div>

      <div className=" lg:w-1/2 md:w-2/3 sm:w-2/5 mx-auto  p-4 my-16 border border-indigo-800 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6 lg:px-20" onSubmit={taskSubmit}>
          <div className="">
            <label
              htmlFor="task"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Work Title
            </label>
            <input
              type="text"
              name="task"
              id="task"
              autoComplete="on"
              className="bg-indigo-100 border border-indigo-800 focus:border-indigo-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 py-4 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white"
              placeholder="Work Title"
              required
            />
          </div>

          {/* details section  */}
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
              className="bg-indigo-100 border border-indigo-800 focus:border-indigo-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 py-4 dark:bg-gray-600 dark:border-white dark:placeholder-gray-400 dark:text-white"
              placeholder="Add Details"
              required
            />
          </div>

          <fieldset className="w-full space-y-5 dark:text-gray-100 ">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="/" className="w-32" />
                <button onClick={removeSelectedImage}>Remove This Image</button>
              </>
            ) : (
              <div className="">
                <label for="files" className="block text-sm font-medium">
                  Attachments
                </label>
                <div className="flex">
                  <input
                    type="file"
                    name="files"
                    autoComplete="on"
                    onChange={onSelectFile}
                    id="files"
                    className="px-8 py-5 w-full border border-dashed border-indigo-800 mt-2 rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
                  />
                </div>
              </div>
            )}
          </fieldset>
          <button
            type="submit"
            className=" text-white bg-indigo-500 hover:bg-indigo-700 duration-500 w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
