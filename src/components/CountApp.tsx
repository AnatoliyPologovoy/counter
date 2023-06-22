import React, {useCallback, useMemo} from 'react';
import '../App.css';
import {Monitor} from "./Monitor";
import SuperButton from "./SuperButton";
import {InputCount} from "./InputCount";
import {
    ErrorDataType,
    incrementCountAC,
    resetCountAC,
    setErrorAC,
    setInputMaxAC,
    setInputStartAC,
    setStatusInputModeAC
} from "../state/countReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../state/Store";


export function CountApp() {
    const monitorCount = useSelector<AppStateType, number>(state => state.countApp.monitorCount)
    const errorData = useSelector<AppStateType, ErrorDataType>(state => state.countApp.errorData)
    const inputMax = useSelector<AppStateType, number>(state => state.countApp.inputMax)
    const inputStart = useSelector<AppStateType, number>(state => state.countApp.inputStart)
    const isChangeInputMode = useSelector<AppStateType, boolean>(state => state.countApp.isChangeInputMode)

    const dispatch = useDispatch()

    const incrementCount = () => dispatch(incrementCountAC())
    const resetCount = () => dispatch(resetCountAC())
    const setStatusInputMode = (status: boolean) => dispatch(setStatusInputModeAC(status))

    // const [isEditMode, setIsEditMode] = useState(false) // for 2 variant counter

    const checkError = (inputStart: number, inputMax: number) => {
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
        dispatch(setErrorAC(errorValue))
    }

    //input
    const changeInputMax = useCallback((maxValue: number) => {
        dispatch(setInputMaxAC(maxValue))
        setStatusInputMode(true)
        checkError(inputStart, maxValue)
    }, [inputStart])

    const changeInputStart = useCallback((startValue: number) => {
        dispatch(setInputStartAC(startValue))
        setStatusInputMode(true)
        checkError(startValue, inputMax)
    }, [inputMax])

    const applySettings = useCallback(() => {
        resetCount()
        setStatusInputMode(false)
        // setIsEditMode(false) for 2 variant counter
    }, [])

    //toggle mode for 2 variant counter
    // const activateEnableMode = () => {
    //     // setIsEditMode(true)
    // }

    //disabling button
    const isError = !!errorData
    const isMaxCount = monitorCount === inputMax

    const isDisableReset = isError || monitorCount === inputStart || isChangeInputMode
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
    const monitorValue = isChangeInputMode ? 'Enter values and press "Set"' : monitorCount

    //Settings window
    const settingsWindow =
        <div className="settings">
            <div className='inputWrapper'>
                <InputCount
                    changeInput={changeInputMax}
                    inputValue={inputMax}
                    title="Max value :"
                    error={errorInputMax}
                />
                <InputCount
                    changeInput={changeInputStart}
                    inputValue={inputStart}
                    title="Start value :"
                    error={errorInputStart}
                />
            </div>
            <SuperButton cb={applySettings} name={'Set'} isDisabled={isDisableSet}/>
        </div>


    return (
        <div className="App">
            {/*{isEditMode ?*/}
            {settingsWindow}
            <div className="main">
                <Monitor value={monitorValue} isMaxCount={isMaxCount} error={errorData}/>
                <div className="styleButtonWrapper">
                    <SuperButton cb={incrementCount} name={'+'} isDisabled={isDisableIncrement}/>
                    <SuperButton cb={resetCount} name={'Reset'} isDisabled={isDisableReset}/>
                    {/*<SuperButton cb={activateEnableMode} name={'Set'} isDisabled={false}/>*/}
                </div>
            </div>
        </div>
    );
}


