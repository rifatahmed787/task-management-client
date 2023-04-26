import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import GoogleSignIn from "./GoogleSignIn";
import "./SignUp.css";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/addtasks";

  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        form.reset();
        toast.success("Successfully signed up");
        navigate(from, { replace: true });
        handleUpdateProfile(name);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleUpdateProfile = (name) => {
    const profile = {
      displayName: name,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => console.error(error));
  };

  // const handleResetPass = () => {
  //   resetPass(user?.email)
  //     .then(() => {
  //       toast.success("Password reset email sent");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div className="py-10 responsive">
      <div className="flex flex-col max-w-md p-6 border border-orange-400 shadow-2xl bg-[#F3F4F6] mx-auto  rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign up</h1>
          <p className="text-sm dark:text-gray-400">
            Sign up to access your account
          </p>
        </div>
        <form
          onSubmit={handleSignup}
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="name"
                className="w-full px-3 py-2 border border-orange-400 focus:border-orange-400 bg-orange-100 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-orange-400 focus:border-orange-400 bg-orange-100 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="on"
                placeholder="*****"
                className="w-full px-3 py-2 border border-orange-400 focus:border-orange-400 bg-orange-100 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>
            <p className="text-red-600">{error}</p>
          </div>

          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8  py-3 bg-orange-500 hover:bg-orange-500 font-semibold   dark:focus:ring-blue-800  rounded-lg text-white text-center mr-2 mb-2"
              >
                Sign up
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">
              Have an account?
              <Link
                to="/login"
                rel="noopener noreferrer"
                href="#"
                className="hover:underline text-orange-600 dark:text-violet-400"
              >
                Log In
              </Link>
              .
            </p>
            <div className="flex items-center w-full my-4">
              <hr className="w-full text-gray-500 dark:text-gray-400" />
              <p className="px-3 dark:text-gray-400">OR</p>
              <hr className="w-full dark:text-gray-400" />
            </div>
          </div>
        </form>
        <div>
          <GoogleSignIn></GoogleSignIn>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
