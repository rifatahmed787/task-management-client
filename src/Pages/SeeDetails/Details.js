import React from "react";
import { useLoaderData } from "react-router-dom";
import "../AddTasks/AddTasks.css";

const Details = () => {
  const details = useLoaderData();
  return (
    <div className="pb-12 responsive">
      <div className="rounded-md shadow-md bg-gray-300 sm:w-1/3  dark:bg-gray-900 dark:text-gray-100 mx-auto mt-5">
        {details &&
          details?.map((detail) => (
            <div key={detail._id}>
              <div className="flex items-center justify-between p-3">
                <p>See details here...</p>
              </div>
              <img
                src={detail.img}
                alt=""
                className="object-cover object-center w-full h-72 dark:bg-gray-500"
              />
              <div className="p-3">
                <div className="py-5">
                  <p className="text-md">
                    <span className="text-blue-700">Details:</span>{" "}
                    {detail.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Details;
