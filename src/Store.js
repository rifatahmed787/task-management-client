import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import taskReducer from "./components/services/reducers/TaskReducer";

const Store = createStore(taskReducer, applyMiddleware(thunk));

export default Store;
