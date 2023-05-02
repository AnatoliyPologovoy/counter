import {
    countReducerActionsType,
    CountStateType,
    incrementCountAC,
    resetCountAC,
    setCountDataAC, setErrorAC, setInputMaxAC, setInputStartAC, setStatusInputModeAC
} from "../state/countReducer";
import {CountApp, CountAppDispatchType} from "./CountApp";
import {connect} from "react-redux";
import {AppStateType} from "../state/Redux";

const mapStateToProps = (state: AppStateType): CountStateType => {
    return {
        countData: state.countApp.countData,
        errorData: state.countApp.errorData,
        inputMax: state.countApp.inputMax,
        inputStart: state.countApp.inputStart,
        isChangeInputMode: state.countApp.isChangeInputMode
    }
}

const mapDispatchToProps =
    (dispatch: (action: countReducerActionsType) => void):
        CountAppDispatchType => {
        return {
            incrementCount: () => dispatch(incrementCountAC()),
            resetCount: () => dispatch(resetCountAC()),
            setCount: () => dispatch(setCountDataAC()),
            setError: (error) => dispatch(setErrorAC(error)),
            setInputMax: (value) => dispatch(setInputMaxAC(value)),
            setInputStart: (value) => dispatch(setInputStartAC(value)),
            setStatusInputMode: (status) => dispatch(setStatusInputModeAC(status))
        }
    }

export const CountAppContainer = connect(mapStateToProps, mapDispatchToProps)(CountApp)