import React, { useContext } from "react";
import { Link } from "react-router-dom";
import todo from "../../asset/image/todo1.jpg";
import { AuthContext } from "../../Context/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <section className="pb-10 bg-[#B3DFBC] dark:bg-black">
        <div className="bg-[#B3DFBC] dark:bg-black">
          <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
            <h1 className="text-3xl font-bold leading-none sm:text-6xl xl:max-w-3xl dark:text-gray-400">
              Add your daily task here
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-500">
              There's no need to waste a good part of your day attending to
              tasks that can be taken care of by task management or even
              automated. When you don't have to worry about simple daily tasks,
              there will be more time to get work done.
            </p>

            <div className="lg:flex flex-wrap justify-center items-center">
              <p className="px-3 text-xl dark:text-white">Logged in?</p>
              {user?.email ? (
                <Link to="/addtasks">
                  <button
                    type="button"
                    className="px-8 py-3 m-2 text-lg font-semibold rounded outline outline-cyan-500 dark:bg-gray-800 dark:text-gray-50"
                  >
                    Get started
                  </button>
                </Link>
              ) : (
                <Link to="/signup">
                  <button
                    type="button"
                    className="px-8 py-3 m-2 text-lg font-semibold rounded outline outline-cyan-500 dark:bg-gray-800 dark:text-gray-50"
                  >
                    Get started
                  </button>
                </Link>
              )}

              <p className="px-3 text-xl dark:text-white">else</p>
              <Link to="/login">
                <button
                  type="button"
                  className="px-8 py-3 m-2 text-lg font-semibold border rounded outline outline-blue-500 dark:border-gray-700 dark:text-gray-50"
                >
                  Log In First
                </button>
              </Link>
            </div>
          </div>
        </div>
        <img
          src={todo}
          alt=""
          className="w-1/2 mx-auto mb-12 -mt-10 rounded-lg shadow-md lg:-mt-40 dark:bg-gray-500"
        />
      </section>
    </div>
  );
};

export default Home;
