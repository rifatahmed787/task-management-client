import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, LogOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //dark mode handler
  const themeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogOut = () => {
    LogOut()
      .then(() => {
        toast.success("Successfully loged out");
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  const menuItems = (
    <>
      <li
        className={`py-5 font-semibold text-white ${
          scrolled ? "text-black dark:text-white" : ""
        } ${location.pathname === "/" ? "border-b-2 border-indigo-800" : ""}`}
      >
        <Link to="/">Home</Link>
      </li>
      {user?.uid ? (
        <>
          <li
            className={`py-5 font-semibold text-white ${
              scrolled ? "text-black dark:text-white" : ""
            }  ${
              location.pathname === "/addtasks"
                ? "border-b-2 border-indigo-800"
                : ""
            }`}
          >
            <Link to="/addtasks">Add Task</Link>
          </li>
          <li
            className={`py-5 font-semibold text-white ${
              scrolled ? "text-black dark:text-white" : ""
            } ${
              location.pathname === "/mytasks"
                ? "border-b-2 border-indigo-800"
                : ""
            }`}
          >
            <Link to="/mytasks">My Task</Link>
          </li>
          <li
            className={`py-5 font-semibold text-white ${
              scrolled ? "text-black dark:text-white" : ""
            } ${
              location.pathname === "/completetasks"
                ? "border-b-2 border-indigo-800"
                : ""
            }`}
          >
            <Link to="/completetasks">Complete Task</Link>
          </li>
          <li
            className={`font-semibold text-white ${
              scrolled ? "text-black dark:text-white" : ""
            }`}
          >
            <button onClick={handleLogOut}>Log out</button>
          </li>
          <>
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
          </>
        </>
      ) : (
        <>
          <li
            className={`font-semibold mr-2 py-5 text-white ${
              scrolled ? "text-black dark:text-white" : ""
            } ${
              location.pathname === "/signup"
                ? "border-b-2 border-indigo-800 text-white"
                : ""
            }`}
          >
            <Link to="/signup">Sign up</Link>
          </li>

          <li
            className={`font-semibold mr-2 py-5 text-white ${
              scrolled ? "text-black dark:text-white" : ""
            } ${
              location.pathname === "/login"
                ? "border-b-2 border-indigo-800 text-white"
                : ""
            }`}
          >
            <Link to="/login">Log in</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div
      className={`fixed top-0 z-50 w-full transition duration-500 ${
        scrolled
          ? `bg-white dropdown-menu shadow-lg ${
              theme === "dark" ? "bg-gradient-backdrop" : ""
            }`
          : "bg-transparent"
      } `}
    >
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-14 ">
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center dtext-white"
          >
            <Icon
              icon="cil:task"
              width="32"
              className={`text-white ${
                scrolled ? "text-black dark:text-white" : ""
              }`}
            />
            <span
              className={`ml-2 text-xl font-bold tracking-wide uppercase text-white focus:shadow-outline ${
                scrolled ? "text-black dark:text-white" : ""
              }`}
            >
              My-Task
            </span>
          </Link>
          <ul className=" items-center hidden space-x-7 lg:flex">
            {menuItems}
          </ul>
          <div className="mt-1.5">
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                onClick={themeToggle}
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 "></div>
            </label>
          </div>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-black" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full dark:bg-black">
                <div className="p-5 bg-white dark:bg-black border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <Icon
                          icon="cil:task"
                          width="32"
                          className={`text-white ${
                            scrolled ? "text-black dark:text-white" : ""
                          }`}
                        />
                        <span
                          className={`ml-2 text-xl font-bold tracking-wide uppercase text-white focus:shadow-outline ${
                            scrolled ? "text-black dark:text-white" : ""
                          }`}
                        >
                          My-Task
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">{menuItems}</ul>
                    <div className="mt-2">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          onClick={themeToggle}
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
