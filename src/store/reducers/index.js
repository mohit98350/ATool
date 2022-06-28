import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import projectReducer from "./project";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    counter:counterReducer,
    isLogged:loggedReducer,
    project:projectReducer,
});
export default rootReducers