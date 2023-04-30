import {combineReducers, legacy_createStore} from "redux";
import {countReducer} from "./countReducer";

const rootReducer = combineReducers({
    countApp: countReducer
})
export const store = legacy_createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>