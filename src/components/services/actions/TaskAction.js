import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import {
  GET_TASK_FAILED,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
} from "../constants/TaskConstant";

export const getAllTask = () => async (dispatch) => {
  const { user } = useContext(AuthContext);
  dispatch({ type: GET_TASK_REQUEST });
  try {
    const res = await axios.get(
      `https://react-task-management-server.vercel.app/gettasks?email=${user?.email}`
    );
    dispatch({ type: GET_TASK_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_TASK_FAILED, payload: error.message });
  }
};
