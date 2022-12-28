import React from "react";
import { Icon } from "@iconify/react";

const MyTasks = () => {
  return (
    <div className="">
      <h3 className="text-2xl text-center mt-10 font-semibold text-sky-500">
        5 Tasks Active
      </h3>
      <div className="max-w-lg p-6  mx-auto mt-10 bg-[#CFE8FC] border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between">
          <p className="flex items-center">Reading book</p>
          <div className="flex items-center ml-3">
            <button
              type="button"
              className="text-gray-900 bg-white border border-green-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <Icon
                icon="material-symbols:edit"
                className="text-green-500"
              ></Icon>
            </button>
            <button
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
    </div>
  );
};

export default MyTasks;
