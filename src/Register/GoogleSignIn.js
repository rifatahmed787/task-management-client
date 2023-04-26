import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { Icon } from "@iconify/react";

const GoogleSignIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/addtasks";
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully sign up");
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="mt-2 ">
      <button
        onClick={handleGoogleSignIn}
        aria-label="Login with Google"
        type="button"
        className="btn btn-outline flex items-center justify-center w-full px-10 py-3 space-x-4 relative  overflow-hidden font-medium  rounded-lg group border border-orange-400 hover:border-orange-300 hover:bg-orange-500 hover:text-white"
      >
        <Icon icon="mdi:google" width="24" />
        <p className="font-semibold">CONTINUE WITH GOOGLE</p>
      </button>
    </div>
  );
};

export default GoogleSignIn;
