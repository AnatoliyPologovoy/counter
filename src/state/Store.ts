import {combineReducers, legacy_createStore} from "redux";
import {countReducer} from "./countReducer";
import {getStateFromLS, setStateInLS} from "../utils/stateFromLS";

const rootReducer = combineReducers({
    countApp: countReducer
})
export const store
    = legacy_createStore(rootReducer, getStateFromLS("countData"))

export type AppStateType = ReturnType<typeof rootReducer>

store.subscribe(()=> {
    setStateInLS("countData", store.getState())
})

