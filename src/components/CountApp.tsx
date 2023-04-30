import React, {useEffect} from 'react';
import '../App.css';
import {Monitor} from "./Monitor";
import SuperButton from "./SuperButton";
import {InputCount} from "./InputCount";
import {CountStateType, ErrorDataType} from "../state/countReducer";

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

export function CountApp(props: CountAppPropsType) {
    const {
        //state:
        countData,
        errorData,
        inputMax,
        inputStart,
        isChangeInputMode,
        //function:
        incrementCount,
        resetCount,
        setStatusInputMode,
        setInputMax,
        setInputStart,
        setCount,
        setError
    } = props

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
    const changeInputMax = (value: number) => {
        setInputMax(value)
        setStatusInputMode(true)
    }
    const changeInputStart = (value: number) => {
        setInputStart(value)
        setStatusInputMode(true)
    }
    // apply settings

    // set local storage:
    // const setLocalStorage = (countData: CountType) => {
    //     localStorage.setItem("countData", JSON.stringify(countData))
    // }

    const applySettings = () => {
        setCount()
        // setLocalStorage(currentCountData) set local storage
        // setIsEditMode(false) for 2 variant counter
        setStatusInputMode(false)
    }

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
    const errorInputStart = errorData?.input === 'start' || errorData?.input === 'all' || false
    const errorInputMax = errorData?.input === 'all' || false

    //monitor value
    const monitorValue = isChangeInputMode ? 'Enter values and press "Set"' : countData.count


    //Settings window
    const settingsWindow = (
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
    )

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

//
// const [countData, setCount] = useState<CountType>({
//     count: 0,
//     start: 0,
//     max: 5
// })
// const [inputMax, setInputMax] = useState<number>(countData.max)
// const [inputStart, setInputStart] = useState<number>(countData.start)
// const [error, setError] = useState<ErrorType>(null)
// // const [isEditMode, setIsEditMode] = useState(false) // for 2 variant counter
// const [isChangeInputMode, setIsChangeInputMode] = useState(false)
//
//
// //get data from localStorage
// useEffect(() => {
//     const savingData = localStorage.getItem("countData")
//     if (savingData) {
//         const currentCountData = JSON.parse(savingData)
//         setCount(currentCountData)
//         setInputMax(currentCountData.max)
//         setInputStart(currentCountData.start)
//     }
// }, [])
//
// //checking for error
// useEffect(() => {
//     let errorValue: ErrorType = null
//     if (inputStart >= inputMax) {
//         errorValue = {
//             text: 'Max value must be greater start value',
//             input: 'all'
//         }
//     }
//     if (inputStart < 0) {
//         errorValue = {
//             text: 'Start value cannot be a negative number',
//             input: 'start'
//         }
//     }
//     setError(errorValue)
//
// }, [inputMax, inputStart])
//
//
// //count:
// const changeCount = () => {
//     setCount({...countData, count: countData.count + 1})
// }
// const resetCount = () => {
//     setCount({...countData, count: countData.count = countData.start})
// }
// //input
// const changeInputMax = (value: number) => {
//     setInputMax(value)
//     setIsChangeInputMode(true)
// }
// const changeInputStart = (value: number) => {
//     setInputStart(value)
//     setIsChangeInputMode(true)
// }
// // apply settings
// const setLocalStorage = (countData: CountType) => {
//     localStorage.setItem("countData", JSON.stringify(countData))
// }
//
// const applySettings = () => {
//     const currentCountData = {
//         count: inputStart,
//         start: inputStart,
//         max: inputMax
//     }
//     setCount(currentCountData)
//     setLocalStorage(currentCountData)
//     // setIsEditMode(false) for 2 variant counter
//     setIsChangeInputMode(false)
// }
//
// //toggle mode
// const activateEnableMode = () => {
//     // setIsEditMode(true)  for 2 variant counter
// }
//
//
// //disabling button
// const isError = !!error
// const isMaxCount = countData.count === countData.max
//
// const isDisableReset = isError || countData.count === countData.start || isChangeInputMode
// const isDisableIncrement = isError || isMaxCount || isChangeInputMode
// const isDisableSet = isError || !isChangeInputMode
//
// //error for input
// const errorInputStart = error?.input === 'start' || error?.input === 'all' || false
// const errorInputMax = error?.input === 'all' || false
//
// //monitor value
// const monitorValue = isChangeInputMode ? 'Enter values and press "Set"' : countData.count
//
//
// //Settings window
// const settingsWindow = (
//     <div className="settings">
//         <div className='inputWrapper'>
//             <InputCount changeInput={changeInputMax}
//                         inputValue={inputMax}
//                         title="Max value :"
//                         error={errorInputMax}
//             />
//             <InputCount changeInput={changeInputStart}
//                         inputValue={inputStart}
//                         title="Start value :"
//                         error={errorInputStart}
//             />
//         </div>
//         <SuperButton cb={applySettings} name={'Set'} isDisabled={isDisableSet}/>
//     </div>
// )
//
// return (
//     <div className="App">
//         {/*{isEditMode ?*/}
//         { settingsWindow}
//         <div className="main">
//             <Monitor value={monitorValue} isMaxCount={isMaxCount} error={error}/>
//             <div className="styleButtonWrapper">
//                 <SuperButton cb={changeCount} name={'+'} isDisabled={isDisableIncrement}/>
//                 <SuperButton cb={resetCount} name={'Reset'} isDisabled={isDisableReset}/>
//                 {/*<SuperButton cb={activateEnableMode} name={'Set'} isDisabled={false}/>*/}
//             </div>
//         </div>
//     </div>


