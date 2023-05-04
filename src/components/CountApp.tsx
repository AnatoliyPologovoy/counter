import React, {useCallback, useEffect, useMemo} from 'react';
import '../App.css';
import {Monitor} from "./Monitor";
import SuperButton from "./SuperButton";
import {InputCount} from "./InputCount";
import {
    CountDataType,
    CountStateType,
    ErrorDataType,
    incrementCountAC,
    resetCountAC,
    setCountDataAC, setErrorAC, setInputMaxAC, setInputStartAC, setStatusInputModeAC
} from "../state/countReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../state/Redux";

export type CountAppPropsType = CountStateType & CountAppDispatchType

export type CountAppDispatchType = {
    incrementCount: () => void
    resetCount: () => void
    setStatusInputMode: (status: boolean) => void
    setInputMax: (value: number) => void
    setInputStart: (value: number) => void
    setCount: () => void
    setError: (error: ErrorDataType) => void
}

const InputCountMaxValue = React.memo(InputCount)
const InputCountStartValue = React.memo(InputCount)
const ButtonSet = React.memo(SuperButton)
const ButtonIncrement = React.memo(SuperButton)
const ButtonReset = React.memo(SuperButton)
const MonitorMemo = React.memo(Monitor)

export function CountApp() {
    const countData = useSelector<AppStateType, CountDataType>(state => state.countApp.countData)
    const errorData = useSelector<AppStateType, ErrorDataType>(state => state.countApp.errorData)
    const inputMax = useSelector<AppStateType, number>(state => state.countApp.inputMax)
    const inputStart = useSelector<AppStateType, number>(state => state.countApp.inputStart)
    const isChangeInputMode = useSelector<AppStateType, boolean>(state => state.countApp.isChangeInputMode)

    const dispatch = useDispatch()

    const incrementCount = () => dispatch(incrementCountAC())
    const resetCount = () => dispatch(resetCountAC())
    const setCount = () => dispatch(setCountDataAC())
    const setError = (error: ErrorDataType) => dispatch(setErrorAC(error))
    const setInputMax = (value: number) => dispatch(setInputMaxAC(value))
    const setInputStart = (value: number) => dispatch(setInputStartAC(value))
    const setStatusInputMode = (status: boolean) => dispatch(setStatusInputModeAC(status))

    // const [isEditMode, setIsEditMode] = useState(false) // for 2 variant counter

    //get data from localStorage
    // useEffect(() => {
    //     const savingData = localStorage.getItem("countData")
    //     if (savingData) {
    //         const currentCountData = JSON.parse(savingData)
    //         setCount(currentCountData)
    //         setInputMax(currentCountData.max)
    //         setInputStart(currentCountData.start)
    //     }
    // }, [])

    //checking for error
    useEffect(() => {
        let errorValue: ErrorDataType = null
        if (inputStart >= inputMax) {
            errorValue = {
                text: 'Max value must be greater start value',
                input: 'all'
            }
        }
        if (inputStart < 0) {
            errorValue = {
                text: 'Start value cannot be a negative number',
                input: 'start'
            }
        }
        setError(errorValue)

    }, [inputMax, inputStart])

    //input
    const changeInputMax = useCallback((value: number) => {
        setInputMax(value)
        setStatusInputMode(true)
    }, [])
    const changeInputStart = useCallback((value: number) => {
        setInputStart(value)
        setStatusInputMode(true)
    }, [])
    // apply settings

    // set local storage:
    // const setLocalStorage = (countData: CountType) => {
    //     localStorage.setItem("countData", JSON.stringify(countData))
    // }

    const applySettings = useCallback(() => {
        setCount()
        // setLocalStorage(currentCountData) set local storage
        // setIsEditMode(false) for 2 variant counter
        setStatusInputMode(false)
    }, [])

    //toggle mode for 2 variant counter
    // const activateEnableMode = () => {
    //     // setIsEditMode(true)
    // }

    //disabling button
    const isError = !!errorData
    const isMaxCount = countData.count === countData.max

    const isDisableReset = isError || countData.count === countData.start || isChangeInputMode
    const isDisableIncrement = isError || isMaxCount || isChangeInputMode
    const isDisableSet = isError || !isChangeInputMode

    //error for input
    const errorInputStart = useMemo(() => {
        return errorData?.input === 'start' || errorData?.input === 'all' || false
    }, [errorData])
    const errorInputMax = useMemo(() => {
        return errorData?.input === 'all' || false
    }, [errorData])

    //monitor value
    const monitorValue = isChangeInputMode ? 'Enter values and press "Set"' : countData.count

    //Settings window
    const settingsWindow =
        <div className="settings">
            <div className='inputWrapper'>
                <InputCountMaxValue changeInput={changeInputMax}
                                    inputValue={inputMax}
                                    title="Max value :"
                                    error={errorInputMax}
                />
                <InputCountStartValue changeInput={changeInputStart}
                                      inputValue={inputStart}
                                      title="Start value :"
                                      error={errorInputStart}
                />
            </div>
            <ButtonSet cb={applySettings} name={'Set'} isDisabled={isDisableSet}/>
        </div>


    return (
        <div className="App">
            {/*{isEditMode ?*/}
            {settingsWindow}
            <div className="main">
                <MonitorMemo value={monitorValue} isMaxCount={isMaxCount} error={errorData}/>
                <div className="styleButtonWrapper">
                    <ButtonIncrement cb={incrementCount} name={'+'} isDisabled={isDisableIncrement}/>
                    <ButtonReset cb={resetCount} name={'Reset'} isDisabled={isDisableReset}/>
                    {/*<SuperButton cb={activateEnableMode} name={'Set'} isDisabled={false}/>*/}
                </div>
            </div>
        </div>
    );
}


