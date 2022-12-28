import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <div className="">
        <br />
        {error && (
          <>
            <div className="flex flex-col  justify-center items-center">
              <img
                src="https://i.ibb.co/QcqvNGF/814629-preview.jpg"
                alt=""
                className="w-96 rounded-full"
              />
            </div>
            <div className="text-center -mt-16">
              <Link to="/">
                <button
                  type="button"
                  class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Back To Home
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ErrorPage;
