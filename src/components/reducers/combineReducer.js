import { combineReducers } from "redux";
import { notifications } from "./notifications";
import { profile } from "./profile";


export const combineReducer = combineReducers({
        notifications,
        profile,
    })