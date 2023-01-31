import React from "react";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import "../AddTasks/AddTasks.css";
import { Icon } from "@iconify/react";

const Details = () => {
  const { user } = useContext(AuthContext);
  const details = useLoaderData();

  return (
    <div className="pb-12 responsive">
      <div className="max-w-lg p-4 shadow-md dark:bg-gray-900 dark:text-gray-100 mx-auto bg-[#70C5B9] rounded-lg mt-5">
        <div className="flex justify-between pb-4 border-bottom">
          {details &&
            details?.map((detail) => (
              <div key={detail._id}>
                <div className=" pb-4 border-bottom">
                  <div className="flex justify-between ">
                    <div className="flex items-center space-x-2">
                      {user?.photoURL ? (
                        <img
                          className="rounded-full"
                          style={{ width: "30px" }}
                          src={user?.photoURL}
                          alt=""
                          title={user?.displayName}
                        />
                      ) : (
                        <Icon icon="mdi:user-circle" width="32"></Icon>
                      )}
                      <div className="-space-y-1">
                        <h2 className="text-sm font-semibold leading-none">
                          {user?.displayName}
                        </h2>
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <h2 className=" mb-0 capitalize font-semibold dark:text-gray-100">
                        Task Details
                      </h2>
                    </div>
                  </div>
                </div>
                <img
                  src={detail?.img}
                  alt=""
                  className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                />
                <div className="p-3">
                  <div className="py-5">
                    <p className="text-md">
                      <span className="text-black font-semibold">Details:</span>{" "}
                      {detail.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
